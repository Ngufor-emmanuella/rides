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
    car_expense: '',
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
        car_expense: '',
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

    // Prepare the data object
    const dataToSubmit = formDataList.map(formData => {
        const entry = {
            destination: formData.destination || '',
            rental_rate_amount: parseFloat(formData.rental_rate_amount) || 0,
            car_expense: parseFloat(formData.car_expense) || 0,
            driver_income: parseFloat(formData.driver_income) || 0,
            management_fee_accruals: parseFloat(formData.management_fee_accruals) || 0,
            net_income: parseFloat(formData.net_income) || 0,
            total_expenses: parseFloat(formData.total_expenses) || 0,
            number_of_rental_days: parseInt(formData.number_of_rental_days, 10) || 1,
            driver_salary: parseFloat(formData.driver_salary) || 0,
            comments: formData.comments,
        };

        // Only add expense_tag if it's not empty
        if (formType === 'car_expense' && formData.expense_tag) {
            entry.expense_tag = formData.expense_tag;
        }

        return entry;
    });

    try {
        const response = await fetch(`${apiUrl}core/api/elvis-sections/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSubmit), // Send as an array
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to submit: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        onFormSubmit(data);

        // Reset form data
        setFormDataList([{
            destination: '',
            rental_rate_amount: '',
            number_of_rental_days: '1',
            paid_amount: '',
            driver_income: '',
            car_expense: '',
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
        <option value="car_expense">Car Expense</option>
      </select>

      <form onSubmit={handleSubmit}>
        {formDataList.map((formData, index) => (
          <div key={index}>
            {formType === 'revenue' && (
              <>
                <label>Destination:
                  <input type="text" name="destination" value={formData.destination} onChange={(e) => handleChange(index, e)} />
                </label>

                <label>Rental Rate Amount:
                  <input type="number" name="rental_rate_amount" value={formData.rental_rate_amount} onChange={(e) => handleChange(index, e)}  />
                </label>

                <label>Number Of Rental Days:
                  <input type="number" name="number_of_rental_days" value={formData.number_of_rental_days} onChange={(e) => handleChange(index, e)}  />
                </label>

                <label>Paid Amount:
                  <input type="number" name="paid_amount" value={formData.paid_amount} onChange={(e) => handleChange(index, e)}  />
                </label>

                <label>Driver Income:
                  <input type="number" name="driver_income" value={formData.driver_income} onChange={(e) => handleChange(index, e)} />
                </label>

                <div>
                  <h3>Total Amount Due: {(formData.rental_rate_amount * formData.number_of_rental_days).toFixed(2)}</h3>
                  <h3>Balance Amount Due: {(formData.rental_rate_amount * formData.number_of_rental_days - formData.paid_amount).toFixed(2)}</h3>
                </div>

                <button type="button" onClick={() => handleRemoveField(index)}>Remove</button>
              </>
            )}

            {formType === 'car_expense' && (
              <>
                <label>Expenses:
                  <input type="number" name="car_expense" value={formData.car_expense} onChange={(e) => handleChange(index, e)} step="0.01"  />
                </label>

                <label>Expense Tag:
                  <input type="text" name="expense_tag" value={formData.expense_tag} onChange={(e) => handleChange(index, e)}  />
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