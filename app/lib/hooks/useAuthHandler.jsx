import { auth } from '@/app/lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PropTypes from "prop-types";

const useAuthRedirect = (redirectTo) => {
    const [user, loading, error] = useAuthState(auth);
    const userLocal = 'pantry_user_email'
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(true);
    console.log('Checking if the user has logged in already')

    useEffect(() => {
        console.log(user)
        if(loading) 
            return;
        // console.log(user?.email, userLocal, userLocal === user?.email)
        if (userLocal === user?.email)
            router.push(redirectTo);
        else 
            setIsRedirecting(false);
        
    }, [loading, user, userLocal, router, redirectTo]);

    return { isRedirecting };
}


const useNoAuthRedirect = (redirectTo) => {
    const [user, loading, error] = useAuthState(auth);
    const userLocal = process.env.NEXT_PUBLIC_SESSION_AUTH_EMAIL
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(true);

    useEffect(() => {
        if(loading) return;
        if (userLocal === null || !user?.email)
            router.push(redirectTo);
        else 
            setIsRedirecting(false);
        
    }, [loading, user, userLocal, router, redirectTo]);

    return { isRedirecting };
}

useAuthRedirect.propTypes = {
    redirectTo : PropTypes.string.isRequired
};

useNoAuthRedirect.propTypes = {
    redirectTo : PropTypes.string.isRequired
};

export { useAuthRedirect, useNoAuthRedirect };


