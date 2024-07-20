import React, { useState } from 'react';
import TransactionsTable from '../components/TransactionsTable';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { initializeDatabase } from '../services/api';

const Dashboard = () => {
    const [month, setMonth] = useState('January');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handleInitializeDatabase = async () => {
        try {
            await initializeDatabase();
            alert('Database initialized successfully');
        } catch (error) {
            alert('Error initializing database');
        }
    };

    return (
        <div className="dashboard">
            <h1>Transaction Dashboard</h1>
            <button onClick={handleInitializeDatabase}>Initialize Database</button>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search transaction"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                >
                    {[
                        'January', 'February', 'March', 'April', 'May',
                        'June', 'July', 'August', 'September', 'October',
                        'November', 'December'
                    ].map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>
            <TransactionsTable
                month={month}
                search={search}
                page={page}
                perPage={perPage}
                setPage={setPage} // Pass setPage as a prop
            />
            <BarChart month={month} />
            <PieChart month={month} />
        </div>
    );
};

export default Dashboard;
