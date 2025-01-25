'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/prado1.css';
import ElvisForm from '../components/elvisform';

const Prado1 = () => {
    const [elvisSections, setElvisSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchElvisSections();
    }, []);

    const fetchElvisSections = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await fetch(`${apiUrl}core/api/prado1/`);
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

    // Function to handle form submission
    const handleFormSubmit = (newEntry) => {
        console.log('New entry submitted:', newEntry);
        fetchElvisSections(); // Refresh the sections after a successful submission
    };

    if (loading) return <div>Loading... Hold on please</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-5 prado1-box">
            <h1 className="text-center">Prado 1 Elvis Sections</h1>
            <br />

            {/* Pass the handleFormSubmit function to ElvisForm */}
            <ElvisForm onFormSubmit={handleFormSubmit} />
            <Link href="/elvis-history">
                <button className="btn btn-success btn-sm">Car History</button>
            </Link>
            <br />
            <br />
            <Link href="/elvis-monthly-goals">
                <button className="btn btn-success btn-sm">Car Monthly Details</button>
            </Link>

            <div className="row">
                {elvisSections.map((section) => (
                    <div key={section.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title" style={{ display: 'none' }}>Day: {section.id}</h5>
                                <p className="card-text">Date: {new Date(section.date_time).toLocaleDateString()}</p>
                                <p className="card-text">Destination: {section.destination}</p>
                                <p className="card-text"><strong>Rental Rate Amount: {section.rental_rate_amount}</strong></p>
                                <p className="card-text">Number Of Rental Days: {section.number_of_rental_days}</p>
                                <p className="card-text"><strong>Car Expense: {section.car_expense}</strong></p>
                                <p className="card-text">Expense Tag: {section.expense_tag}</p>
                                <p className="card-text">Driver's Income: {section.driver_income}</p>
                                <p className="card-text">Management Fee Accruals: {section.management_fee_accruals}</p>
                                <p className="card-text">Net Income: {section.net_income}</p>
                                <p className="card-text">Total Expenses: {section.total_expenses}</p>
                                <p className="card-text">Comments: {section.comments}</p>
                                <p className="card-text">Driver's salary: {section.driver_salary}</p>
                                <p className="card-text"><strong>Total Amount Due: {section.total_amount_due}</strong></p>
                                <p className="card-text"><strong>Paid Amounts: {section.paid_amount}</strong></p>
                                <p className="card-text"><strong>Balance Amount Due: {section.balance_amount_due}</strong></p>
                                <Link href={`/prado1-elvis/${section.id}`}>
                                    <button className="btn btn-success btn-sm">Edit</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Prado1;