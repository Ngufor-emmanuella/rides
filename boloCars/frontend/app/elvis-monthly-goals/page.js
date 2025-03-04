"use client";
import { useEffect, useState } from 'react';
import '../styles/elvis-month.css';

const MonthlyGoalTable = () => {
    const [monthlyGoals, setMonthlyGoals] = useState([]);
    const [totalYearlyRental, setTotalYearlyRental] = useState(0);
    const [yearlyPercentage, setYearlyPercentage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const year = 2025; // Change year as needed

    useEffect(() => {
        const fetchMonthlyGoals = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            try {
                const response = await fetch(`${apiUrl}core/api/elvis-monthly-goal/${year}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMonthlyGoals(data.elvis_yearly_goal);
                setTotalYearlyRental(data.total_yearly_rental);
                setYearlyPercentage(data.yearly_percentage);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMonthlyGoals();
    }, [year]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="month-box">
            <h1>Elvis Monthly Goals for {year}</h1>
            <h4>Monthly Target Goal: 1,000,000 CFA</h4>

            <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Month Num</th>
                        <th>Month Name</th>
                        <th>Total Amount Due</th>
                        <th>Total Management Fee</th>
                        <th>Total Driver Income</th>
                        <th>Total Paid Amount</th>
                        
                        <th>Total Expenses</th>
                        <th>Net Income</th>
                      
                        <th>Balance Amount Due</th>
                        <th>Percentage of Goal</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {monthlyGoals.map((goal) => (
                        <tr key={goal.month_number} style={{ border: '1px solid black' }}>
                            <td>{goal.month_number}</td>
                            <td>{goal.month_name}</td>
                            <td>{goal.total_amount_due } </td>
                            <td>{goal.management_fee_accruals } </td>
                            <td>{goal.total_driver_income } </td>
                            <td>{goal.total_paid_amount } </td>
                            
                            <td>{goal.total_expenses} </td>
                            <td>{goal.net_income} </td>
                           
                            <td>{goal.balance_amount_due} </td>
                            <td>{goal.percentage_of_goal }%</td>
                        </tr>
                
                    ))}
                </tbody>
            </table>

            <br />
            <h5>Total Yearly Rental: {totalYearlyRental}</h5>
            <h5>Yearly Percentage: {yearlyPercentage}%</h5>
            <br />
           

        </div>
    );
};

export default MonthlyGoalTable;