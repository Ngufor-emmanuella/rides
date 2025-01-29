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
  const [errorMessage, setErrorMessage] = useState('');
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

    for (const formData of formDataList) {
      if (formType === 'revenue' && !formData.destination) {
        setErrorMessage('Destination is required for revenue.');
        return;
      }
    }

    const dataToSubmit = formDataList.map(formData => {
      const entry = {
        destination: formData.destination || (formType === 'car_expense' ? 'None' : ''),
        rental_rate_amount: parseFloat(formData.rental_rate_amount) || 0,
        car_expense: parseFloat(formData.car_expense) || 0,
        driver_income: parseFloat(formData.driver_income) || 0,
        number_of_rental_days: parseInt(formData.number_of_rental_days, 10) || 1,
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
      setErrorMessage(''); 
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Failed to submit the form.');
    }
  };

  return (
    <div className="container-fluid vh-100">
    <div className="row h-100 justify-content-center align-items-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Select Form Type</h2>
            
            <div className="mb-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="revenueRadio"
                  value="revenue"
                  checked={formType === 'revenue'}
                  onChange={() => setFormType('revenue')}
                />
                <label className="form-check-label" htmlFor="revenueRadio">Revenue</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="carExpenseRadio"
                  value="car_expense"
                  checked={formType === 'car_expense'}
                  onChange={() => setFormType('car_expense')}
                />
                <label className="form-check-label" htmlFor="carExpenseRadio">Car Expense</label>
              </div>
            </div>
  
            <form onSubmit={handleSubmit}>
              {formDataList.map((formData, index) => (
                <div key={index} className="mb-4">
                  {formType === 'revenue' && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Destination:</label>
                        <input type="text" className="form-control" name="destination" value={formData.destination} onChange={(e) => handleChange(index, e)} />
                      </div>
  
                      <div className="mb-3">
                        <label className="form-label">Rental Rate Amount:</label>
                        <input type="number" className="form-control" name="rental_rate_amount" value={formData.rental_rate_amount} onChange={(e) => handleChange(index, e)} />
                      </div>
  
                      <div className="mb-3">
                        <label className="form-label">Number Of Rental Days:</label>
                        <input type="number" className="form-control" name="number_of_rental_days" value={formData.number_of_rental_days} onChange={(e) => handleChange(index, e)} />
                      </div>
  
                      <div className="mb-3">
                        <label className="form-label">Paid Amount:</label>
                        <input type="number" className="form-control" name="paid_amount" value={formData.paid_amount} onChange={(e) => handleChange(index, e)} />
                      </div>
  
                      <div className="mb-3">
                        <label className="form-label">Driver Income:</label>
                        <input type="number" className="form-control" name="driver_income" value={formData.driver_income} onChange={(e) => handleChange(index, e)} />
                      </div>
  
                      <div className="mb-3">
                        <h5>Total Amount Due: {(formData.rental_rate_amount * formData.number_of_rental_days).toFixed(2)}</h5>
                        <h5>Balance Amount Due: {(formData.rental_rate_amount * formData.number_of_rental_days - formData.paid_amount).toFixed(2)}</h5>
                      </div>
                    </>
                  )}
  
                  {formType === 'car_expense' && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Expenses:</label>
                        <input type="number" className="form-control" name="car_expense" value={formData.car_expense} onChange={(e) => handleChange(index, e)} step="0.01" />
                      </div>
  
                      <div className="mb-3">
                        <label className="form-label">Expense Tag:</label>
                        <input type="text" className="form-control" name="expense_tag" value={formData.expense_tag} onChange={(e) => handleChange(index, e)} />
                      </div>
  
                      <div className="mb-3">
                        <label className="form-label">Comments:</label>
                        <textarea className="form-control" name="comments" value={formData.comments} onChange={(e) => handleChange(index, e)}></textarea>
                      </div>
                    </>
                  )}
  
                  <button type="button" className="btn btn-danger" onClick={() => handleRemoveField(index)}>Remove</button>
                </div>
              ))}
  
              <div className="mb-3">
                <button type="button" className="btn btn-secondary me-2" onClick={handleAddField}>Add Another Entry</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
  
            {successMessage && <p className="text-success">{successMessage}</p>}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ElvisForm;