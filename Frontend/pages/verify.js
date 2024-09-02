import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './verify.module.css';

export default function VerifyEmail() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('request'); // 'request' or 'verify'
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRequestOTP = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/auth/request-otp', { email });
            setStep('verify');
            setMessage('OTP sent to your email!');
            setError('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to send OTP');
            setMessage('');
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/auth/verify-otp', { email, otp });
            setMessage('OTP verified successfully!');
            setError('');
        } catch (err) {
            setError(err.response?.data?.detail || 'OTP verification failed');
            setMessage('');
        }
    };

    return (
        // <div>
        //     <h1>OTP Verification</h1>
        //     {message && <p>{message}</p>}
        //     {error && <p>{error}</p>}
            
        //     {step === 'request' && (
        //         <form onSubmit={handleRequestOTP}>
        //             <input
        //                 type="email"
        //                 placeholder="Enter your email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 required
        //             />
        //             <button type="submit">Send OTP</button>
        //         </form>
        //     )}

        //     {step === 'verify' && (
        //         <form onSubmit={handleVerifyOTP}>
        //             <input
        //                 type="text"
        //                 placeholder="Enter OTP"
        //                 value={otp}
        //                 onChange={(e) => setOtp(e.target.value)}
        //                 required
        //             />
        //             <button type="submit">Verify OTP</button>
        //         </form>
        //     )}
        // </div>
        <div className={styles.verifyContainer}>
            <h1 className={styles.verifyTitle}>OTP Verification</h1>
            {message && <p className={styles.message}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
            
            {step === 'request' && (
                <form className={styles.verifyForm} onSubmit={handleRequestOTP}>
                    <input
                        type="email"
                        className={styles.inputField}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.submitButton}>Send OTP</button>
                </form>
            )}

            {step === 'verify' && (
                <form className={styles.verifyForm} onSubmit={handleVerifyOTP}>
                    <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.submitButton}>Verify OTP</button>
                </form>
            )}
        </div>
    );
}
