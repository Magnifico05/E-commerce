import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function VerifyEmail() {
    const router = useRouter();
    const { token } = router.query;
    const [status, setStatus] = useState('Verifying...');

    useEffect(() => {
        if (token) {
            axios
                .post('/api/auth/verify-email', { token })
                .then(() => setStatus('Email verified successfully!'))
                .catch(() => setStatus('Email verification failed.'));
        }
    }, [token]);

    return (
        <div>
            <h1>{status}</h1>
        </div>
    );
}
