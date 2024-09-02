import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './register.module.css'; // Make sure this path is correct

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/register/', {
                first_name: firstName,
                last_name: lastName,
                username: username,
                password: password,
                phone_number: phoneNumber,
                birthdate: birthdate
            });

            if (response.status === 201) {
                setMessage('Registration successful!');
                setError('');
                router.push('/login'); // Redirect to login page
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed');
            setMessage('');
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h1 className={styles.registerTitle}>Register</h1>
            {message && <p className={styles.message}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
            
            <form className={styles.registerForm} onSubmit={handleRegister}>
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="date"
                    className={styles.inputField}
                    placeholder="Birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                />
                <button type="submit" className={styles.submitButton}>Register</button>
            </form>
        </div>
    );
}


// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './register.module.css';


// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [birthdate, setBirthdate] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:8000/api/register/', {
//                 username,
//                 password,
//                 first_name: firstName,
//                 last_name: lastName,
//                 userprofile: {
//                     phone_number: phoneNumber,
//                     birthdate: birthdate,
//                 },
//             });
//             setSuccess('Registration successful!'); // Update the UI for success
//             // Redirect or perform other actions after successful registration
//         } catch (err) {
//             setError(err.response?.data?.detail || 'Registration failed'); // Update the UI for error
//         }
//     };

//     return (
//         // <div>
//         //     <h1>Register</h1>
//         //     {success && <p>{success}</p>}
//         //     {error && <p>{error}</p>}
//         //     <form onSubmit={handleRegister}>
//         //         <input
//         //             type="text"
//         //             placeholder="First Name"
//         //             value={firstName}
//         //             onChange={(e) => setFirstName(e.target.value)}
//         //             required
//         //         />
//         //         <input
//         //             type="text"
//         //             placeholder="Last Name"
//         //             value={lastName}
//         //             onChange={(e) => setLastName(e.target.value)}
//         //             required
//         //         />
//         //         <input
//         //             type="text"
//         //             placeholder="Username"
//         //             value={username}
//         //             onChange={(e) => setUsername(e.target.value)}
//         //             required
//         //         />
//         //         <input
//         //             type="password"
//         //             placeholder="Password"
//         //             value={password}
//         //             onChange={(e) => setPassword(e.target.value)}
//         //             required
//         //         />
//         //         <input
//         //             type="text"
//         //             placeholder="Phone Number"
//         //             value={phoneNumber}
//         //             onChange={(e) => setPhoneNumber(e.target.value)}
//         //             required
//         //         />
//         //         <input
//         //             type="date"
//         //             placeholder="Birthdate"
//         //             value={birthdate}
//         //             onChange={(e) => setBirthdate(e.target.value)}
//         //             required
//         //         />
//         //         <button type="submit">Register</button>
//         //     </form>
//         // </div>
//         <div className={styles.registerContainer}>
//       <form className={styles.registerForm} onSubmit={handleRegister}>
//         <h1 className={styles.registerTitle}>Register</h1>
//         {success && <p>{success}</p>}
//         {error && <p>{error}</p>}
//         <input
//           type="text"
//           className={styles.inputField}
//           placeholder="First Name"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           className={styles.inputField}
//           placeholder="Last Name"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           className={styles.inputField}
//           placeholder="Email"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           className={styles.inputField}
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           className={styles.inputField}
//           placeholder="Phone Number"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           required
//         />
//         <input
//           type="date"
//           className={styles.inputField}
//           placeholder="Birthdate"
//           value={birthdate}
//           onChange={(e) => setBirthdate(e.target.value)}
//           required
//         />
//         <button type="submit" className={styles.submitButton}>Register</button>
//       </form>
//     </div>
//     );
// };

// export default Register;