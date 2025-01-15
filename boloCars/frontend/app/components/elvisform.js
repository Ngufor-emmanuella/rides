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
    expenses: '',
    expense_tag: '',
    comments: '',
  });

  const [totalAmountDue, setTotalAmountDue] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [formType, setFormType] = useState('revenue');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Calculatx amounts only for revenue fields
    if (formType === 'revenue' && (name === 'rental_rate_amount' || name === 'number_of_rental_days' || name === 'paid_amount')) {
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    const dataToSubmit = formType === 'revenue' 
    ? {
        destination: formData.destination,
        rental_rate_amount: formData.rental_rate_amount,
        number_of_rental_days: formData.number_of_rental_days,
        paid_amount: formData.paid_amount,
        driver_income: formData.driver_income,
      }
    : {
        expenses: formData.expenses,
        expense_tag: formData.expense_tag,
        comments: formData.comments,
      };


    try {
      const response = await fetch(`${apiUrl}/api/elvis-sections/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) throw new Error('Failed to submit');

      const data = await response.json();
      onFormSubmit(data);

      setFormData(prev => ({
        ...prev,
        ...(formType === 'revenue'
          ? {
            destination: '',
            rental_rate_amount: '',
            number_of_rental_days: '1',
            paid_amount: '',
            driver_income: '',
          }
          : {
            expenses: '',
            expense_tag: '',
            comments: '',
          }
        )
          
      }));
      setTotalAmountDue(0);
      setBalanceAmount(0);
      setSuccessMessage('Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Failed to submit the form.');
    }
  };

  return (
    <div className="prado1-box">

      <h2>Select Form Type</h2>
      <br />
      <select onChange={(e) => setFormType(e.target.value)} value={formType}>
        <option value="revenue">Revenue</option>
      
        <option value="expenses">Expenses</option>
      </select>

      <form onSubmit={handleSubmit}>
        {formType === 'revenue' && (
          <>
            <label>Destination:
              <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
            </label>

            <label>Rental Rate Amount:
              <input type="number" name="rental_rate_amount" value={formData.rental_rate_amount} onChange={handleChange} required />
            </label>

            <label>Number Of Rental Days:
              <input type="number" name="number_of_rental_days" value={formData.number_of_rental_days} onChange={handleChange} required />
            </label>

            <label>Paid Amount:
              <input type="number" name="paid_amount" value={formData.paid_amount} onChange={handleChange} required />
            </label>

            <label>Driver Income:
              <input type="number" name="driver_income" value={formData.driver_income} onChange={handleChange} required />
            </label>

            {/* Display calculated amounts */}
            <div>
              <h3>Total Amount Due: {totalAmountDue.toFixed(2)}</h3>
              <h3>Balance Amount Due: {balanceAmount.toFixed(2)}</h3>
            </div>
          </>
        )}

        {formType === 'expenses' && (
          <>
            <label>Expenses:
              <input type="number" name="expenses" value={formData.expenses} onChange={handleChange}  step="0.01" required />
            </label>

            <label>Expense Tag:
              <input type="text" name="expense_tag" value={formData.expense_tag} onChange={handleChange} required />
            </label>

            <label>Comments:
              <textarea name="comments" value={formData.comments} onChange={handleChange}></textarea>
            </label>
          </>
        )}

        <button type="submit">Submit</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default ElvisForm;