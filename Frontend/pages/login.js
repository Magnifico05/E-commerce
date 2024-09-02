// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import styles from './login.module.css';

// export default function Login() {
//     const [identifier, setIdentifier] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:8000/login/', {
//                 identifier: identifier, // Pass the actual user input
//                 password: password,
//             });

//             const token = response.data.access;
//             localStorage.setItem('token', token); // Save the token

//             if (response.status === 200) {
//                 router.push('/'); // Redirect to home page
//             }
//         } catch (err) {
//             setError('Invalid credentials');
//         }
//     };

//     return (
//         <div className={styles.loginContainer}>
//             <form className={styles.loginForm} onSubmit={handleLogin}>
//                 <h2 className={styles.loginTitle}>Login</h2>
//                 {error && <p className={styles.error}>{error}</p>}
//                 <input
//                     type="text"
//                     className={styles.inputField}
//                     placeholder="Email"
//                     value={identifier}
//                     onChange={(e) => setIdentifier(e.target.value)} // Update state on input
//                     required
//                 />
//                 <input
//                     type="password"
//                     className={styles.inputField}
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} // Update state on input
//                     required
//                 />
//                 <button type="submit" className={styles.submitButton}>Log In</button>
//                 <div className={styles.linkContainer}>
//                     <a href="/forgot-password" className={styles.linkText}>Forgot Password?</a>
//                 </div>
//             </form>
//         </div>
//     );
// }

import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './login.module.css';
import { useUser } from '../context/UserContext';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { setName } = useUser();  // Get setName from UserContext

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log('Logging in with', identifier, password);

            const response = await axios.post('http://localhost:8000/login/', {
                identifier: identifier,
                password: password,
            });

            console.log('Login response:', response);

            const token = response.data.access;

            console.log('Token:', token);

            localStorage.setItem('token', token); // Save the token

            // Fetch user data (including the name) after login
            const userResponse = await axios.get('http://localhost:8000/api/me/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('User data response:', userResponse);

            const name = userResponse.data.first_name;

            console.log('User name:', name);

            setName(name);  // Set the user's name in the context

            if (response.status === 200) {
                console.log(name);
                router.push('/'); // Redirect to home page
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <h2 className={styles.loginTitle}>Login</h2>
                {error && <p className={styles.error}>{error}</p>}
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className={styles.inputField}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className={styles.submitButton}>Log In</button>
                <div className={styles.linkContainer}>
                    <a href="/forgot-password" className={styles.linkText}>Forgot Password?</a>
                </div>
            </form>
        </div>
    );
}
