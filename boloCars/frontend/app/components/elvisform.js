'use client';
import '../styles/prado1.css';
import { useState } from 'react';

const ElvisForm = ({ onFormSubmit }) => {
  const [formDataList, setFormDataList] = useState([{
    destination: '',
    rental_rate_amount: '',
    number_of_rental_days: '1',
    paid_amount: '',
    driver_income: '',
    expenses: '',
    expense_tag: '',
    comments: '',
  }]);

  const [successMessage, setSuccessMessage] = useState('');
  const [formType, setFormType] = useState('revenue');

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setFormDataList(prev => {
      const newFormDataList = [...prev];
      newFormDataList[index] = { ...newFormDataList[index], [name]: value };

      // Calculate amounts only for revenue fields
      if (formType === 'revenue' && (name === 'rental_rate_amount' || name === 'number_of_rental_days' || name === 'paid_amount')) {
        const rentalRate = parseFloat(newFormDataList[index].rental_rate_amount) || 0;
        const rentalDays = parseInt(newFormDataList[index].number_of_rental_days) || 1;
        const paidAmount = parseFloat(newFormDataList[index].paid_amount) || 0;

        newFormDataList[index].totalAmountDue = rentalRate * rentalDays;
        newFormDataList[index].balanceAmount = (rentalRate * rentalDays) - paidAmount;
      }

      return newFormDataList;
    });
  };

  const handleAddField = () => {
    setFormDataList(prev => [
      ...prev,
      {
        destination: '',
        rental_rate_amount: '',
        number_of_rental_days: '1',
        paid_amount: '',
        driver_income: '',
        expenses: '',
        expense_tag: '',
        comments: '',
      }
    ]);
  };

  const handleRemoveField = (index) => {
    setFormDataList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const dataToSubmit = formDataList.map(formData =>
      formType === 'revenue' 
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
          }
    );

    try {
      const response = await fetch(`${apiUrl}/api/elvis-sections/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) throw new Error('Failed to submit');

      const data = await response.json();
      
      onFormSubmit(data);

      // Reset form data
      setFormDataList([{
        destination: '',
        rental_rate_amount: '',
        number_of_rental_days: '1',
        paid_amount: '',
        driver_income: '',
        expenses: '',
        expense_tag: '',
        comments: '',
      }]);
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
        {formDataList.map((formData, index) => (
          <div key={index}>
            {formType === 'revenue' && (
              <>
                <label>Destination:
                  <input type="text" name="destination" value={formData.destination} onChange={(e) => handleChange(index, e)} required />
                </label>

                <label>Rental Rate Amount:
                  <input type="number" name="rental_rate_amount" value={formData.rental_rate_amount} onChange={(e) => handleChange(index, e)} required />
                </label>

                <label>Number Of Rental Days:
                  <input type="number" name="number_of_rental_days" value={formData.number_of_rental_days} onChange={(e) => handleChange(index, e)} required />
                </label>

                <label>Paid Amount:
                  <input type="number" name="paid_amount" value={formData.paid_amount} onChange={(e) => handleChange(index, e)} required />
                </label>

                <label>Driver Income:
                  <input type="number" name="driver_income" value={formData.driver_income} onChange={(e) => handleChange(index, e)} required />
                </label>

                <div>
                  <h3>Total Amount Due: {(formData.rental_rate_amount * formData.number_of_rental_days).toFixed(2)}</h3>
                  <h3>Balance Amount Due: {(formData.rental_rate_amount * formData.number_of_rental_days - formData.paid_amount).toFixed(2)}</h3>
                </div>

                <button type="button" onClick={() => handleRemoveField(index)}>Remove</button>
              </>
            )}

            {formType === 'expenses' && (
              <>
                <label>Expenses:
                  <input type="number" name="expenses" value={formData.expenses} onChange={(e) => handleChange(index, e)} step="0.01" required />
                </label>

                <label>Expense Tag:
                  <input type="text" name="expense_tag" value={formData.expense_tag} onChange={(e) => handleChange(index, e)} required />
                </label>

                <label>Comments:
                  <textarea name="comments" value={formData.comments} onChange={(e) => handleChange(index, e)}></textarea>
                </label>

                <button type="button" onClick={() => handleRemoveField(index)}>Remove</button>
              </>
            )}
          </div>
        ))}

        <button type="button" onClick={handleAddField}>Add Another Entry</button>
        <button type="submit">Submit</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default ElvisForm;