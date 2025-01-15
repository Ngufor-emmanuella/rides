'use client';
import '../styles/prado1.css';
import { useState } from 'react';

const ElvisForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    destination: '',
    rental_rate_amount: '',
    number_of_rental_days: '1',
    paid_amount: '',
    driver_income: '',
    comments: ''
  });

  const [totalAmountDue, setTotalAmountDue] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'rental_rate_amount' || name === 'number_of_rental_days' || name === 'paid_amount') {
      const rentalRate = parseFloat(name === 'rental_rate_amount' ? value : formData.rental_rate_amount) || 0;
      const rentalDays = parseInt(name === 'number_of_rental_days' ? value : formData.number_of_rental_days) || 1;
      const paidAmount = parseFloat(name === 'paid_amount' ? value : formData.paid_amount) || 0;

      const totalDue = rentalRate * rentalDays;
      setTotalAmountDue(totalDue);
      setBalanceAmount(totalDue - paidAmount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/elvis-sections/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to submit');
      const data = await response.json();
      onFormSubmit(data);
      setFormData({
        destination: '',
        rental_rate_amount: '',
        number_of_rental_days: '1',
        paid_amount: '',
        driver_income: '',
        comments: ''
      });
      setTotalAmountDue(0);
      setBalanceAmount(0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div className="prado1-box">

      <form onSubmit={handleSubmit}>
        <label> Destination:
          <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
        </label>

        <label> Rental Rate Amount:
          <input type="number" name="rental_rate_amount" value={formData.rental_rate_amount} onChange={handleChange} required />
        </label>

        <label> Number Of Rental Days:
          <input type="number" name="number_of_rental_days" value={formData.number_of_rental_days} onChange={handleChange} required />
        </label>

        <label> Paid Amount:
          <input type="number" name="paid_amount" value={formData.paid_amount} onChange={handleChange} required />
        </label>

        <label> Driver Income:
          <input type="number" name="driver_income" value={formData.driver_income} onChange={handleChange} required />
        </label>

        <label> Comments:
          <textarea name="comments" value={formData.comments} onChange={handleChange}></textarea>
        </label>

         {/* Display calculated amounts */}
        
        <div>
          <h3> Total Amount Due: {totalAmountDue.toFixed(2)} </h3>

          <h3>Balance Amount Due: {balanceAmount.toFixed(2)}</h3>

        </div>

        <button type="submit">Submit</button>

      </form>
    </div>
  );
};

export default ElvisForm;
