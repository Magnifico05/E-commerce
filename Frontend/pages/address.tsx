// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import styles from './address.module.css'; // Make sure this path is correct

// type AddressData = {
//     country: string;
//     governorate: string;
//     city: string;
//     street: string;
//     building: string;
//     apartment: string;
//     notes?: string;
// };

// export default function Address() {
//     const [country, setCountry] = useState('');
//     const [governorate, setGovernorate] = useState('');
//     const [city, setCity] = useState('');
//     const [street, setStreet] = useState('');
//     const [building, setBuilding] = useState('');
//     const [apartment, setApartment] = useState('');
//     const [notes, setNotes] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const router = useRouter();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             router.push('/login'); // Redirect to login page if not logged in
//         }
//     }, [router]);

//     const handleAddress = async (e : React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setIsLoading(true);

//         const token = localStorage.getItem('token');

//         if (!token) {
//             setError('You need to be logged in to register an address.');
//             return;
//         }

//         const addressData: AddressData = {
//             country,
//             governorate,
//             city,
//             street,
//             building,
//             apartment,
//             notes,
//         };

//         try {
//             const response = await axios.post('http://localhost:8000/addresses/', addressData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json', // Ensure the content type is set
//                 },
//             });

//             if (response.status === 201) {
//                 setMessage('Address registration successful!');
//                 setError('');
//                 // Optionally, you might want to reset the form fields here
//                 setCountry('');
//                 setGovernorate('');
//                 setCity('');
//                 setStreet('');
//                 setBuilding('');
//                 setApartment('');
//                 setNotes('');
//                 // Redirect to checkout page after a short delay to show the success message
//                 setTimeout(() => {
//                     router.push('/checkout');
//                 }, 2000);
//             }
//         } catch (err: any) {
//             // Handle different types of errors
//             if (err.response) {
//                 // Server responded with a status other than 2xx
//                 setError(err.response.data.detail || 'Address registration failed');
//             } else if (err.request) {
//                 // Request was made but no response received
//                 setError('No response from server. Please try again later.');
//             } else {
//                 // Something else happened while setting up the request
//                 setError('An unexpected error occurred.');
//             }
//             setMessage('');
//         }
//         setIsLoading(false);

//     };
//     //     try {
            
//     //         const response = await axios.post('http://localhost:8000/addresses/', {
//     //             country : country,
//     //             governorate : governorate,
//     //             city : city,
//     //             street : street,
//     //             building : building,
//     //             apartment : apartment,
//     //             notes : notes
//     //         });

//     //         if (response.status === 201) {
//     //             setMessage('Address registration successful!');
//     //             setError('');
//     //             router.push('/checkout'); // Redirect to checkout page
//     //         }
//     //     } catch (err : any) {
//     //         setError(err.response?.data?.detail || 'Address registration failed');
//     //         setMessage('');
//     //     }
//     // };
//     return (
//         <div className={styles.registerContainer}>
//             <h1 className={styles.registerTitle}>Address</h1>
//             {message && <p className={styles.message}>{message}</p>}
//             {error && <p className={styles.error}>{error}</p>}
            
//             <form className={styles.registerForm} onSubmit={handleAddress}>
//                 <input
//                     type="text"
//                     className={styles.inputField}
//                     placeholder="Country"
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="text"
//                     className={styles.inputField}
//                     placeholder="Governorate"
//                     value={governorate}
//                     onChange={(e) => setGovernorate(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="text"
//                     className={styles.inputField}
//                     placeholder="City"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="text"
//                     className={styles.inputField}
//                     placeholder="Street"
//                     value={street}
//                     onChange={(e) => setStreet(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="text"
//                     className={styles.inputField}
//                     placeholder="Building"
//                     value={building}
//                     onChange={(e) => setBuilding(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="text"
//                     className={styles.inputField}
//                     placeholder="Apartment"
//                     value={apartment}
//                     onChange={(e) => setApartment(e.target.value)}
//                     required
//                 /> 
//                 <textarea
//                     className={styles.inputField}
//                     placeholder="Notes"
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                 />
            
//                 {/* <button type="submit" className={styles.submitButton}>Register Address</button> */}
//                 <button type="submit" className={styles.submitButton} disabled={isLoading}>
//     {isLoading ? 'Registering...' : 'Register Address'}
// </button>
//             </form>
//         </div>
//     );
// }

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './address.module.css';

export default function Address() {
    const [country, setCountry] = useState('');
    const [governorate, setGovernorate] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [apartment, setApartment] = useState('');
    const [notes, setNotes] = useState('');
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleAddress = async (e : any) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error('No token found');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/addresses/', {
                country: country,
                governorate: governorate,
                city: city,
                street: street,
                building_number: building,
                apartment_number: apartment,
                notes: notes,
                delivery_cost: deliveryCost
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (response.status === 201) {
                setMessage('Address registration successful!');
                setError('');
                router.push('/checkout'); // Redirect to checkout page
            }
        } catch (err:any) {
            setError(err.response?.data?.detail || 'Address registration failed');
            setMessage('');
        }
    };
    return (
        <div className={styles.registerContainer}>
            <h1 className={styles.registerTitle}>Address</h1>
            {message && <p className={styles.message}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}

            <form className={styles.registerForm} onSubmit={handleAddress}>
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Governorate"
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Building"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Apartment"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    required
                />
                <textarea
                    className={styles.inputField}
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <button type="submit" className={styles.submitButton}>
                    Register Address
                </button>
            </form>
        </div>
    );
}
