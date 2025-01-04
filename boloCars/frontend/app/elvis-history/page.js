'use client';
import { useEffect, useState } from 'react';

const ElvisHistory = () => {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistoryData = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const response = await fetch(`${apiUrl}/api/elvis/history/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHistoryData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryData();
    }, []);

    if (loading) return <div>Loading... Hold on please</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Elvis Section Edit History</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Change Type</th>
                        <th>Date Edited</th>
                        <th>Previous Values</th>
                        <th>Current Values</th>
                    </tr>
                </thead>
                <tbody>
                    {historyData.map((record) => {
                        const previousData = record.previous_data || {};
                        const currentData = record.current_data || {};

                        return (
                            <React.Fragment key={record.id}>
                                <tr>
                                    <td>{record.id}</td>
                                    <td>{record.history_type}</td>
                                    <td>{new Date(record.history_date).toLocaleString()}</td>
                                    <td>
                                        <div>
                                            <div><strong>Destination:</strong> {previousData.destination || 'N/A'}</div>
                                            <div><strong>Rental Rate Amount:</strong> {previousData.rental_rate_amount || 'N/A'}</div>
                                            <div><strong>Expenses:</strong> {previousData.expenses || 'N/A'}</div>
                                            <div><strong>Expense Tag:</strong> {previousData.expense_tag || 'N/A'}</div>
                                            <div><strong>Driver Income:</strong> {previousData.driver_income || 'N/A'}</div>
                                            <div><strong>Net Income:</strong> {previousData.net_income || 'N/A'}</div>
                                            <div><strong>Transaction:</strong> {previousData.transaction || 'N/A'}</div>
                                            <div><strong>Comments:</strong> {previousData.comments || 'N/A'}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div><strong>Destination:</strong> {currentData.destination || 'N/A'}</div>
                                            <div><strong>Rental Rate Amount:</strong> {currentData.rental_rate_amount || 'N/A'}</div>
                                            <div><strong>Expenses:</strong> {currentData.expenses || 'N/A'}</div>
                                            <div><strong>Expense Tag:</strong> {currentData.expense_tag || 'N/A'}</div>
                                            <div><strong>Driver Income:</strong> {currentData.driver_income || 'N/A'}</div>
                                            <div><strong>Net Income:</strong> {currentData.net_income || 'N/A'}</div>
                                            <div><strong>Transaction:</strong> {currentData.transaction || 'N/A'}</div>
                                            <div><strong>Comments:</strong> {currentData.comments || 'N/A'}</div>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ElvisHistory;