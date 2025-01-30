'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/prado1.css';

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
        fetchElvisSections();
    };

    if (loading) return <div>Loading... Hold on please</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container-fluid mt-5 prado1-box">
        <h1 className="text-center">Prado 1 Elvis Sections</h1>
        <br />
            <div className="d-flex justify-content-between mb-3">
            
            <Link href="/addform">
                <button className="btn btn-success btn-sm"> Add Rental Details</button>
            </Link>

            <Link href="/elvis-history">
                <button className="btn btn-success btn-sm">Car History</button>
            </Link>

            <Link href="/elvis-monthly-goals">
                <button className="btn btn-success btn-sm">Car Monthly Details</button>
            </Link>
        </div>
    
        <div className="table-container">
            <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Num</th>
                        <th>Date</th>
                        <th>Destination</th>
                        <th>Rental Rate Amount</th>
                        <th>Num of Rental Days</th>
                        <th>Total Amount Due</th>
                        <th>Car Expense</th>
                        <th>Expense Tag</th>
                        <th>Driver's Income</th>
                      
                        <th>Paid Amounts </th>
                        <th>Balance Amount Due</th>
                        
                        <th>Comments</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {elvisSections.map((section) => (
                        <tr key={section.id}>
                            <td>{section.id}</td>
                            <td>{new Date(section.date_time).toLocaleString()}</td>
                            <td>{section.destination}</td>
                            <td>{section.rental_rate_amount}</td>
                            <td>{section.number_of_rental_days}</td>
                            <td>{section.total_amount_due}</td>
                            
                            <td>{section.car_expense}</td>
                            <td>{section.expense_tag}</td>
                            <td>{section.driver_income}</td>
                          
                            <td>{section.paid_amount}</td>
                            <td>{section.balance_amount_due}</td>

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
            <br />
        </div>
    </div>
    
    );
};

export default Prado1;