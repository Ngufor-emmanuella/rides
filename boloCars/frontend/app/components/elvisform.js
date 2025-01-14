'use client';
import { useState } from 'react';
import '../styles/prado1.css';

const ElvisForm = ({ onFormSubmit }) => {
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

    // Calculate totals
    const rentalRate = parseFloat(formData.rental_rate_amount) || 0;
    const rentalDays = parseInt(formData.number_of_rental_days) || 1;
    const paidAmount = parseFloat(formData.paid_amount) || 0;

    const totalAmountDue = rentalRate * rentalDays;
    const balanceAmountDue = totalAmountDue - paidAmount;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/elvis-sections/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            const data = await response.json();
            console.log('Response from API:', data);
            
            setSuccess('Data submitted successfully!');
            setError('');

            onFormSubmit(data); // Pass the complete object with ID back to parent component

            // Reset form fields
            setFormData({
                destination: '',
                rental_rate_amount: '',
                number_of_rental_days: '1',
                paid_amount: '',
                driver_income: '',
                comments: '',
            });

        } catch (err) {
            setError('Failed to submit data. Please check your input.');
            setSuccess('');
            console.error(err);
        }
    };

    return (
        <div className="prado1-box">
            <form onSubmit={handleSubmit}>
                <label>
                    Destination:
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
                </label>
                <label>
                    Rental Rate Amount:
                    <input type="number" name="rental_rate_amount" value={formData.rental_rate_amount} onChange={handleChange} required />
                </label>
                <label>
                    Number Of Rental Days:
                    <input type="number" name="number_of_rental_days" value={formData.number_of_rental_days} onChange={handleChange} required />
                </label>
                <label>
                    Paid Amount:
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

                {/* Display calculated amounts */}
                <div>
                    <h3>Total Amount Due: {totalAmountDue.toFixed(2)}</h3>
                    <h3>Balance Amount Due: {balanceAmountDue.toFixed(2)}</h3>
                </div>

                <button type="submit">Submit</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
    );
};

export default ElvisForm;
