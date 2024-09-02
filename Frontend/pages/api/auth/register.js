import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('http://localhost:8000/api/register/', req.body);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(error.response?.status || 500).json(error.response?.data || 'Internal Server Error');
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
