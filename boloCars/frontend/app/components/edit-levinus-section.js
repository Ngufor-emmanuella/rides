'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const EditLevinusSection = () => {
    const router = useRouter();
    const { id } = useParams(); // Get the ID from the URL
    const [formData, setFormData] = useState({
        destination: '',
        rental_rate_amount: '',
        expenses: '',
        expense_tag: '',
        driver_income: '',
        comments: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch current data when component mounts
    useEffect(() => {
        if (id && typeof window !== 'undefined') {
            const fetchData = async () => {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                console.log('Fetching data from:', `${apiUrl}/api/levinusupdate/${id}/`);

                try {
                    const response = await fetch(`${apiUrl}/api/levinusupdate/${id}/`);
                    
                    if (!response.ok) {
                        console.error('Response status:', response.status);
                        throw new Error('Failed to fetch data');
                    }
                    
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    setError(error.message);
                }
            };
            fetchData();
        }
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/levinusupdate/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            setSuccess('Data updated successfully!');
            setError('');
            router.push('/prado2-levinus'); // Redirect to the list page after update
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Form fields for editing go here */}
                <label>
                    Destination:
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
                </label>
                <label>
                    Rental Rate Amount:
                    <input type="number" name="rental_rate_amount" value={formData.rental_rate_amount} onChange={handleChange} required />
                </label>
                <label>
                    Expenses:
                    <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} required />
                </label>
                <label>
                    Expense Tag:
                    <input type="text" name="expense_tag" value={formData.expense_tag} onChange={handleChange} required />
                </label>
                <label>
                    Driver Income:
                    <input type="number" name="driver_income" value={formData.driver_income} onChange={handleChange} required />
                </label>
                <label>
                    Comments:
                    <textarea name="comments" value={formData.comments} onChange={handleChange}></textarea>
                </label>

                <button type="submit">Update</button>

                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
    );
};

export default EditLevinusSection;