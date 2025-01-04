'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Prado1 = () => {
    const [elvisSections, setElvisSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const response = await fetch(`${apiUrl}/api/prado1/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setElvisSections(data.elvissections); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading... Hold on please</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Prado 1 Elvis Sections</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Num</th>
                        <th>Date</th>
                        <th>Destination</th>
                        <th>Rental Rate Amount</th>
                        <th>Expenses</th>
                        <th>Expense Tag</th>
                        <th>Management Fee Accruals</th>
                        <th>Driver's Income</th>
                        <th>Net Income</th>
                        <th>Transactions</th>
                        <th>Comments</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {elvisSections.map((section) => (
                        <tr key={section.id}>
                            <td>{section.id}</td>
                            <td>{new Date(section.date_time).toLocaleDateString()}</td>
                            <td>{section.destination}</td>
                            <td>{section.rental_rate_amount}</td>
                            <td>{section.expenses}</td>
                            <td>{section.expense_tag}</td>
                            <td>{section.management_fee_accruals}</td>
                            <td>{section.driver_income}</td>
                            <td>{section.net_income}</td>
                            <td>{section.transaction}</td>
                            <td>{section.comments}</td>
                            <td>
                                <Link href={`/prado1-elvis/${section.id}`}>
                                    <button className="btn btn-success btn-sm">Edit</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Prado1;