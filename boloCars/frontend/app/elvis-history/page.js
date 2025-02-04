"use client";
import '../styles/prado1.css';
import { useEffect, useState } from 'react';
import '../styles/prado1.css';

const EditHistoryPage = () => {
    const [editHistory, setEditHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEditHistory = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const response = await fetch(`${apiUrl}core/api/elvis-history/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEditHistory(data); // Ensure this matches the structure of the response
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEditHistory();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="prado1-box">
        <h1>Edit History</h1>
    
        <h2>Previous Data</h2>
        <table className="table table-bordered table-striped">
            <thead className="table-dark">
                <tr>
                  
                    <th>Content Type</th>
                    <th>Object ID</th>
                    <th>Edited At</th>
                    <th>Previous Destination</th>
                    <th>Previous Rental Rate Amount</th>
                    <th>Previous Rental Days </th>
                    <th>Previous Car Expense Tag</th>
                    <th>Previous Driver's Income</th>
                    <th>Previous Total Amount Due</th>                   
                    <th>Previous Paid Amounts</th>
                    <th>Previous Balance Amount Due</th>
                    <th>Previous comments</th>
                </tr>
            </thead>
            <tbody>
                {editHistory.map((item) => (
                    <tr key={item.id}>
                     
                        <td>{item.content_type}</td>
                        <td>{item.object_id}</td>
                        <td>{new Date(item.edited_at).toLocaleString()}</td>
                        <td>{item.previous_destination}</td>
                        <td>{item.previous_number_of_rental_days}</td>
                        <td>{item.previous_car_expense}</td>
                        <td>{item.previous_expense_tag}</td>
                        <td>{item.previous_driver_income}</td>
                        <td>{item.previous_total_amount_due}</td>
                        <td>{item.previous_paid_amount}</td>
                       
                        <td>{item.previous_balance_amount_due}</td>
                        <td>{item.previous_comments}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    
        <h2>Current Data</h2>
        <table className="table table-bordered table-striped">
            <thead className="table-dark">
                <tr>
                
                    <th>Content Type</th>
                    <th>Object ID</th>
                    <th>Edited At</th>
                    <th>Current Destination</th>
                    <th>Current Rental Rate Amount</th>
                    <th>Current Rental Days</th>
                    <th>Current Car Expense Tag</th>
                    <th>Current Driver's Income</th>
                    <th> Current Total Amount Due</th>
                    <th>Current Paid Amounts</th>
                    <th>Current Balance Amount Due</th>
                    <th>Current Comments</th>
                </tr>       
        
            </thead>
            <tbody>
                {editHistory.map((item) => (
                    <tr key={item.id}>
                      
                        <td>{item.content_type}</td>
                        <td>{item.object_id}</td>
                        <td>{new Date(item.edited_at).toLocaleString()}</td>
                        <td>{item.current_destination}</td>
                        <td>{item.current_rental_rate_amount}</td>
                        <td>{item.current_number_of_rental_days}</td>
                        <td>{item.current_car_expense}</td>
                        <td>{item.current_driver_income}</td>
                        <td>{item.current_total_amount_due}</td>
                        <td>{item.current_paid_amount}</td>
                        <td>{item.current_balance_amount_due}</td>
                        <td>{item.current_comments}</td>
                    </tr>
                    
                     
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default EditHistoryPage;