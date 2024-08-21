// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import styles from './login.module.css';

// export default function Login() {
//     const [identifier, setIdentifier] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const router = useRouter();


//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:8000/login/', {
//                 identifier : 'identifier',
//                 password : 'password',
//             });

//             const token = response.data.access;
//         localStorage.setItem('token', token); // Save the token

//         // Make authenticated request
//         const userData = await axios.get('http://localhost:8000/users/', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//             setSuccess('Registration successful!'); // Update the UI for success
//             // Redirect or perform other actions after successful registration
//             console.log(userData.data); // Handle success
//             if (response.status === 200) {
//               router.push('/'); // Redirect to home page
//           }
//       } catch (err) {
//           setError('Invalid credentials');
//       }
//   };

//     return (
//         <div className={styles.loginContainer}>
//         <form className={styles.loginForm}>
//           <h2 className={styles.loginTitle}>Login</h2>
//           <input
//             type="text"
//             className={styles.inputField}
//             placeholder="Email"
//           />
//           <input
//             type="password"
//             className={styles.inputField}
//             placeholder="Password"
//           />
//           <button type="submit" className={styles.submitButton}>Log In</button>
//           <div className={styles.linkContainer}>
//             <a href="/forgot-password" className={styles.linkText}>Forgot Password?</a>
//           </div>
//         </form>
//       </div>
//         // <div>
//         //     <h1>Login</h1>
//         //     {error && <p>{error}</p>}
//         //     <form onSubmit={handleLogin}>
//         //         <input
//         //             type="text"
//         //             placeholder="Email or Phone"
//         //             value={identifier}
//         //             onChange={(e) => setIdentifier(e.target.value)}
//         //             required
//         //         />
//         //         <input
//         //             type="password"
//         //             placeholder="Password"
//         //             value={password}
//         //             onChange={(e) => setPassword(e.target.value)}
//         //             required
//         //         />
//         //         <button type="submit">Login</button>
//         //     </form>
//         // </div>
//     );
// }

import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './login.module.css';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login/', {
                identifier: identifier, // Pass the actual user input
                password: password,
            });

            const token = response.data.access;
            localStorage.setItem('token', token); // Save the token

            if (response.status === 200) {
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
                    onChange={(e) => setIdentifier(e.target.value)} // Update state on input
                    required
                />
                <input
                    type="password"
                    className={styles.inputField}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update state on input
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
