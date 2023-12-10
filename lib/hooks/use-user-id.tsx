// useUserId.ts
import { useContext } from 'react';
import { UserContext } from '@/app/context/UserContext';

export const useUserId = () => {
  const userId = useContext(UserContext);
  if (userId === undefined) {
    throw new Error('useUserId must be used within a UserProvider');
  }
  return userId;
};