"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    useSignInWithGoogle
} from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [
        signInWithGoogle,
    ] = useSignInWithGoogle(auth);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            router.push('/');
        } catch (error) {
            console.error(error);
            setError(error as string);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="flex justify-center">
                    <Button
                        onClick={handleGoogleSignIn}
                    >
                        Sign in with Google
                    </Button>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
        </div>
    );
}
