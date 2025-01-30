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
        
        car_expense: '',
        expense_tag: '',
        comments:'',
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
                    const response = await fetch(`${apiUrl}core/api/elvisupdate/${id}/`);
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

        const totalDue = rentalRate * rentalDays;
        setTotalAmountDue(totalDue);
        setBalanceAmount(totalDue - paidAmount);
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
            const response = await fetch(`${apiUrl}core/api/elvisupdate/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Response:', response); 

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            setSuccess('Data updated successfully!');
            setError('');

            setTimeout(() => {
                router.push('/prado1-elvis');
            }, 1000);

        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    if (error) return <div>Error: {error}</div>;

    return (
     <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <br />
            <br />
                <div className="mb-3">
                    <label htmlFor="destination" className="form-label">Destination</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="destination" 
                        name="destination" 
                        value={formData.destination} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
              
                <div className="mb-3">
             
                    <label htmlFor="rental_rate_amount" className="form-label">Rental Rate Amount</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="rental_rate_amount" 
                        name="rental_rate_amount" 
                        value={formData.rental_rate_amount} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="number_of_rental_days" className="form-label">Number Of Rental Days</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="number_of_rental_days" 
                        name="number_of_rental_days" 
                        value={formData.number_of_rental_days} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="paid_amount" className="form-label">Paid Amount</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="paid_amount" 
                        name="paid_amount" 
                        value={formData.paid_amount} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="driver_income" className="form-label">Driver Income</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="driver_income" 
                        name="driver_income" 
                        value={formData.driver_income} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="car_expense" className="form-label">Expenses</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="car_expense" 
                        name="car_expense" 
                        value={formData.car_expense} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="expense_tag" className="form-label">Expense Tag</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="expense_tag" 
                        name="expense_tag" 
                        value={formData.expense_tag} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="comments" className="form-label">Comments</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="comments" 
                        name="comments" 
                        value={formData.comments} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <h4>Total Amount Due: {totalAmountDue.toFixed(2)}</h4>
                    <h4>Balance Amount Due: {balanceAmount.toFixed(2)}</h4>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
                
                {success && <div className="alert alert-success mt-3">{success}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    </div>
    <br />
 </div>

    );
};

export default EditElvisSection;