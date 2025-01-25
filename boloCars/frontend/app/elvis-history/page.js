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
            {editHistory.map((item) => (
                <div key={item.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                    <h3>ID: {item.id}</h3>
                    <p><strong>Content Type:</strong> {item.content_type}</p>
                    <p><strong>Object ID:</strong> {item.object_id}</p>
                    <p><strong>Edited At:</strong> {new Date(item.edited_at).toLocaleString()}</p>
                    <p><strong>Previous Destination:</strong> {item.previous_destination}</p>
                    <p><strong>Previous Rental Rate Amount:</strong> {item.previous_rental_rate_amount}</p>
                    <p><strong>Previous Expenses:</strong> {item.previous_expenses}</p>
                    <p><strong>Previous Management Fee Accruals:</strong> {item.previous_management_fee_accruals}</p>
                    <p><strong>Previous Driver Income:</strong> {item.previous_driver_income}</p>
                    <p><strong>Previous Net Income:</strong> {item.previous_net_income}</p>
                    <p><strong>Previous Transaction:</strong> {item.previous_transaction}</p>
                    <p><strong>Previous Comments:</strong> {item.previous_comments}</p>
                    <p><strong>Number Of Rental Days:</strong> {item.number_of_rental_days}</p>
                    <p><strong>Total Amount Due:</strong> {item.total_amount_due}</p>
                    <p><strong>Paid Amounts:</strong> {item.paid_amount}</p>
                    <p><strong>Balance Amount Due:</strong> {item.balance_amount_due}</p>
                </div>
            ))}

            <h2>Current Data</h2>
            {editHistory.map((item) => (
                <div key={item.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                    <h3>ID: {item.id}</h3>
                    <p><strong>Content Type:</strong> {item.content_type}</p>
                    <p><strong>Object ID:</strong> {item.object_id}</p>
                    <p><strong>Edited At:</strong> {new Date(item.edited_at).toLocaleString()}</p>
                    <p><strong>Current Destination:</strong> {item.current_destination}</p>
                    <p><strong>Current Rental Rate Amount:</strong> {item.current_rental_rate_amount}</p>
                    <p><strong>Current Expenses:</strong> {item.current_expenses}</p>
                    <p><strong>Current Management Fee Accruals:</strong> {item.current_management_fee_accruals}</p>
                    <p><strong>Current Driver Income:</strong> {item.current_driver_income}</p>
                    <p><strong>Current Net Income:</strong> {item.current_net_income}</p>
                    <p><strong>Current Transaction:</strong> {item.current_transaction}</p>
                    <p><strong>Current Comments:</strong> {item.current_comments}</p>
                    <p><strong>Number Of Rental Days:</strong> {item.number_of_rental_days}</p>
                    <p><strong>Total Amount Due:</strong> {item.total_amount_due}</p>
                    <p><strong>Paid Amounts:</strong> {item.paid_amount}</p>
                    <p><strong>Balance Amount Due:</strong> {item.balance_amount_due}</p>
                </div>
            ))}
        </div>
    );
};

export default EditHistoryPage;