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
        const cachedData = localStorage.getItem('elvisSections');
        if (cachedData) {
          setElvisSections(JSON.parse(cachedData));
          setLoading(false);
        } else {
          fetchElvisSections();
        }
      }, []);

    
    const fetchElvisSections = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/prado1/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setElvisSections(data.elvissections);
            localStorage.setItem('elvisSections', JSON.stringify(data.elvissections));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    // Function to handle form submission
    const handleFormSubmit = async (newEntry) => {
        console.log('New entry submitted:', newEntry);
        const updatedSections = [...elvisSections, newEntry];
        setElvisSections(updatedSections);
        localStorage.setItem('elvisSections', JSON.stringify(updatedSections));
    };

   
    return (
        <div className="container mt-5 prado1-box">
            <h1 className="text-center">Prado 1 Elvis Sections</h1>

            <ElvisForm onFormSubmit={handleFormSubmit} />

            <table className="table table-striped">
                <thead>
                    {/* Table Headers */}
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
                        <th>Number Of Rental Days</th>
                        <th>Total Amount Due</th>
                        <th>Paid Amounts</th>
                        <th>Balance Amount Due</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>

                {Array.isArray(elvisSections) && elvisSections.map((section) => (
                    <tr key={section.id}>
                        {/* Table Data */}
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
                        <td>{section.number_of_rental_days}</td>
                        <td>{section.total_amount_due}</td>
                        <td>{section.paid_amount}</td>
                        <td>{section.balance_amount_due}</td>

                        {/* Edit Button */}
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
