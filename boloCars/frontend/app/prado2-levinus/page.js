'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const Prado2 = () => {
    const [levinussections, setLevinusSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
            try {
                const response = await fetch(`${apiUrl}/api/prado2/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLevinusSections(data.levinussections); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Prado 2 Levinus Sections</h1>
            <Link href="/levinusform">
                <button className="btn btn-primary"> Add Transactions</button>
            </Link>
            <br />

            <Link href="/levinus-history">
                <button className="btn btn-primary">See History</button>
            </Link>

            <br />

            <Link href="/levinus-monthly-goals">
                <button className="btn btn-primary">Monthly / Yearly Goals Percentage </button>
            </Link>

            <br />


            <table className="table">
                <thead>
                    <tr>
                        <th>ID Num</th>
                        <th>Date </th>
                        <th>Destination</th>
                        <th>Rental Rate Amount</th>
                        <th>Expenses</th>
                        <th>Expenses Tag</th>
                        <th>Management Fee Accruals</th>
                        <th>Driver's Income</th>
                        <th>Net Income</th>
                        <th>Transactions</th>
                        <th>Comments </th>
                    </tr>

                </thead>
                <tbody>
                    {levinussections.map((section) => (
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
                                <Link href={`/prado2-levinus/${section.id}`}>
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

export default Prado2;