'use client';
import { useState } from 'react';
import '../styles/prado1.css';

const ElvisForm = ({ onFormSubmit }) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/elvis/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Get the error details
                console.error('Error details:', errorData); // Log the error details
                throw new Error('Failed to submit data');
            }
    
            const data = await response.json();
            setSuccess('Data submitted successfully!');
            setError('');
            setFormData({
                destination: '',
                rental_rate_amount: '',
                expenses: '',
                expenses_tag: '',
                driver_income: '',
                comments: '',
            });

            console.log(data);

        } catch (err) {
            setError('Failed to submit data. Please check your input.');
            setSuccess('');
            console.error(err);
        }
    };

    return (
        <div className="elvis-main" >
            <form onSubmit={handleSubmit}>
                <h2>Add New Elvis Section</h2>
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
            <button type="submit">Submit</button>
        </form>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
    );
};

export default ElvisForm;