"use client";
import { useEffect, useState } from 'react';
import '../styles/prado1.css';


const MonthlyGoalTable = () => {
    const [monthlyGoals, setMonthlyGoals] = useState([]);
    const [totalYearlyRental, setTotalYearlyRental] = useState(0);
    const [yearlyPercentage, setYearlyPercentage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const year = 2025; // Change year as needed

    useEffect(() => {
        const fetchMonthlyGoals = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/elvis-monthly-goal/${year}/`);
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
        <div className="prado1-box">
            <h1>Elvis Monthly Goals for {year}</h1>
            <h4>Monthly Target Goal : 1000.000 CFA </h4>



            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Total Rental Rate</th>
                        <th>Percentage of Goal</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyGoals.map((goal) => (
                        <tr key={goal.month_number} style={{ border: '1px solid black' }}>
                            <td>{goal.month_name}</td>
                            <td>{goal.total_rental_rate}</td>
                            <td>{goal.percentage_of_goal}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h5>Total Yearly Rental: {totalYearlyRental}</h5>
            <h5>Yearly Percentage: {yearlyPercentage}%</h5>
        </div>
    );
};

export default MonthlyGoalTable;