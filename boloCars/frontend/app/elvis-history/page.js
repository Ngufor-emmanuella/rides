"use client";

import { useEffect, useState } from 'react';

const EditHistoryPage = () => {
    const [editHistory, setEditHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEditHistory = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/elvis-history/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEditHistory(data);
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
        <div>
            <h1>Edit History</h1>

            <h2>Previous Data</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Content Type</th>
                        <th>Object ID</th>
                        <th>Edited At</th>
                        <th>Previous Destination</th>
                        <th>Previous Rental Rate Amount</th>
                        <th>Previous Expenses</th>
                        <th>Previous Management Fee Accruals</th>
                        <th>Previous Driver Income</th>
                        <th>Previous Net Income</th>
                        <th>Previous Transaction</th>
                        <th>Previous Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {editHistory.map((item) => (
                        <tr key={item.id} style={{ border: '1px solid black' }}>
                            <td>{item.id}</td>
                            <td>{item.content_type}</td>
                            <td>{item.object_id}</td>
                            <td>{new Date(item.edited_at).toLocaleString()}</td>
                            <td>{item.previous_destination}</td>
                            <td>{item.previous_rental_rate_amount}</td>
                            <td>{item.previous_expenses}</td>
                            <td>{item.previous_management_fee_accruals}</td>
                            <td>{item.previous_driver_income}</td>
                            <td>{item.previous_net_income}</td>
                            <td>{item.previous_transaction}</td>
                            <td>{item.previous_comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Current Data</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Content Type</th>
                        <th>Object ID</th>
                        <th>Edited At</th>
                        <th>Current Destination</th>
                        <th>Current Rental Rate Amount</th>
                        <th>Current Expenses</th>
                        <th>Current Management Fee Accruals</th>
                        <th>Current Driver Income</th>
                        <th>Current Net Income</th>
                        <th>Current Transaction</th>
                        <th>Current Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {editHistory.map((item) => (
                        <tr key={item.id} style={{ border: '1px solid black' }}>
                            <td>{item.id}</td>
                            <td>{item.content_type}</td>
                            <td>{item.object_id}</td>
                            <td>{new Date(item.edited_at).toLocaleString()}</td>
                            <td>{item.current_destination}</td>
                            <td>{item.current_rental_rate_amount}</td>
                            <td>{item.current_expenses}</td>
                            <td>{item.current_management_fee_accruals}</td>
                            <td>{item.current_driver_income}</td>
                            <td>{item.current_net_income}</td>
                            <td>{item.current_transaction}</td>
                            <td>{item.current_comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditHistoryPage;