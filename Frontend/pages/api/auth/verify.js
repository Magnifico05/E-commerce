import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('http://localhost:8000/api/verify-email/', req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(error.response?.status || 500).json(error.response?.data || 'Internal Server Error');
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
