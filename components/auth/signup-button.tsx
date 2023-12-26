'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import { IconSpinner } from '@/components/ui/icons';
import { Dialog, DialogTrigger } from '../ui/dialog';
import CheckEmailDialog from './check-email-dialog';
import { createSupabaseFrontendClient } from '@/app/auth/supabase';
import { createUser } from '@/app/actions';

interface SignUpButtonProps extends ButtonProps {
    text?: string;
    fullWidth?: boolean;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export function SignUpButton({
    text = 'Finish Sign Up',
    className,
    email = '',
    password = '',
    firstName = '',
    lastName = '',
    ...props
}: SignUpButtonProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const supabaseClient = createSupabaseFrontendClient();

    const handleSignUp = () => {
        setIsLoading(true);
        supabaseClient.auth
            .signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                    },
                },
            })
            .then(async (response) => {
                setIsLoading(false);
                if (response.error === null) {
                    // Successful email sent
                    setIsDialogOpen(true); // Open the dialog on successful sign up
                    // Call createUser function after successful sign up to create user on GCP
                    const newUser = {
                        email: email,
                        first_name: firstName,
                        last_name: lastName,
                        user_id: response.data.user?.id || '',
                    };
                    createUser(newUser);
                } else {
                    alert(response.error);
                }
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    return (
        <>
            <Button
                variant="outline"
                fullWidth
                onClick={handleSignUp}
                disabled={isLoading}
                className={cn(className)}
                {...props}
            >
                {isLoading ? (
                    <IconSpinner className="mr-2 animate-spin" />
                ) : null}
                {text}
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <CheckEmailDialog setIsDialogOpen={setIsDialogOpen} />
            </Dialog>
        </>
    );
}
