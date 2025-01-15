'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '../styles/prado1.css';


const EditElvisSection = () => {
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        destination: '',
        rental_rate_amount: '',
        number_of_rental_days: '1',
        paid_amount: '',
        driver_income: '',
        comments: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [totalAmountDue, setTotalAmountDue] = useState(0);
    const [balanceAmount, setBalanceAmount] = useState(0);

    // Fetch current data when component mounts
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                try {
                    const response = await fetch(`${apiUrl}/api/elvisupdate/${id}/`);
                    
                    if (!response.ok) {
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


     // Calculate total and balance amounts
     useEffect(() => {
        const rentalRate = parseFloat(formData.rental_rate_amount || '0');
        const rentalDays = parseInt(formData.number_of_rental_days || '1');
        const paidAmount = parseFloat(formData.paid_amount || '0');

        const totalDue = rentalRate * (rentalDays);
        setTotalAmountDue(totalDue);
        setBalanceAmount(totalDue - (paidAmount));
    }, [formData.rental_rate_amount, formData.number_of_rental_days, formData.paid_amount]);


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
            const response = await fetch(`${apiUrl}/api/elvisupdate/${id}/`, {
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
            router.push('/prado1-elvis'); // Redirect to the list page after update
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div  className="prado1-box">
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
                   number_of_rental_days:
                    <input type="number" name=" number_of_rental_days" value={formData.number_of_rental_days} onChange={handleChange} required />
                </label>
                <label>
                     paid_amount:
                    <input type="number" name="paid_amount" value={formData.paid_amount} onChange={handleChange} required />
                </label>
                <label>   
                    Driver Income:
                    <input type="number" name="driver_income" value={formData.driver_income} onChange={handleChange} required />
                </label>
                <label>
                    Comments:
                    <textarea name="comments" value={formData.comments} onChange={handleChange}></textarea>
                </label>

                <div>
                <h3>Total Amount Due: {totalAmountDue.toFixed(2)}</h3>
                <h3>Balance Amount Due: {balanceAmount.toFixed(2)}</h3>
                </div>

                <button type="submit">Update</button>

                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
    );
};

export default EditElvisSection;