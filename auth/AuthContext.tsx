/**
 * Importing necessary modules from react and supabase-js
 */
import {
  createContext, // Used to create a new context
  useContext, // Used to access the value of the nearest parent context
  ReactNode, // Type used for children that are allowed to be anything React can render
  useState, // React hook to add state to functional components
  useEffect, // React hook to perform side effects in functional components
  FC, // Type for functional components
} from "react";
import {
  SupabaseClient, // The main interface to interact with Supabase
  User, // Type for a Supabase user
  Session, // Type for a Supabase session
  AuthChangeEvent, // Type for an authentication event
} from "@supabase/supabase-js/dist/main/index.js";

/**
 * Interface for the authentication context
 * Contains the current session, user and methods for sign in, sign out and sign up
 */
interface AuthContextType {
  session: Session | null; // Current session
  user: User | null; // Current user
  signIn: (email: string, password: string) => Promise<void>; // Method to sign in a user
  signOut: () => Promise<void>; // Method to sign out a user
  signUp: (email: string, password: string) => Promise<void>; // Method to sign up a user
}

/**
 * Creating the authentication context with initial value as undefined
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Interface for the props of the AuthProvider component
 * Contains the Supabase client and children elements
 */
interface AuthProviderProps {
  supabaseClient: SupabaseClient; // Supabase client
  children: ReactNode; // Children elements
}

/**
 * AuthProvider component
 * Provides the authentication context to its children
 */
export const AuthProvider: FC<AuthProviderProps> = ({
  supabaseClient,
  children,
}) => {
  // State variables for session and user
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Effect hook to handle authentication state changes
  useEffect(() => {
    const fetchSessionAndUser = async () => {
      const {
        data: { session: currSession },
      } = await supabaseClient.auth.getSession();
      setSession(currSession);

      const { user: currUser } = (await supabaseClient.auth.getUser()).data;
      setUser(currUser);
    };

    fetchSessionAndUser();

    // Listen for authentication state changes
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event: AuthChangeEvent, currSession: Session | null) => {
        // Update session and user when the authentication state changes
        setSession(currSession);
        setUser(currSession ? currSession.user : null);
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabaseClient]);

  // Method to sign in a user
  const signIn = async (email: string, password: string) => {
    await supabaseClient.auth.signInWithPassword({ email, password });
  };

  // Method to sign up a user
  const signUp = async (email: string, password: string) => {
    await supabaseClient.auth.signUp({ email, password });
  };

  // Method to sign out a user
  const signOut = async () => {
    await supabaseClient.auth.signOut();
  };

  // Return the provider component
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ session, user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the authentication context.
 *
 * Returns the authentication context containing the current session, user, and authentication methods.
 * Throws an error if the context is undefined, i.e., if the hook is used outside of an AuthProvider.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // If the context is undefined, throw an error
  if (!context) {
    throw new Error("The useAuth hook must be used within the AuthProvider.");
  }

  return context;
};
