import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TransactionsTable from './components/TransactionsTable';
// import BarChart from './components/BarChart';
// import './components/Dashboard.css';  // Ensure this path is correct

// const App = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [stats, setStats] = useState({});
//     const [month, setMonth] = useState('March');
//     const [page, setPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         fetchTransactions();
//         fetchStatistics();
//     }, [month, page, searchTerm]);

//     const fetchTransactions = async () => {
//         try {
//             const response = await axios.get(`/api/transactions?month=${month}&page=${page}&search=${searchTerm}`);
//             setTransactions(response.data);
//         } catch (error) {
//             console.error('Error fetching transactions', error);
//         }
//     };

//     const fetchStatistics = async () => {
//         try {
//             const response = await axios.get(`/api/statistics?month=${month}`);
//             setStats(response.data);
//         } catch (error) {
//             console.error('Error fetching statistics', error);
//         }
//     };

//     const handleMonthChange = (e) => {
//         setMonth(e.target.value);
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     return (
//         <div className="dashboard-container">
//             <h1>Transaction Dashboard</h1>
//             <div className="search-container">
//                 <input
//                     type="text"
//                     placeholder="Search transaction"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                 />
//                 <select value={month} onChange={handleMonthChange}>
//                     <option value="January">January</option>
//                     <option value="February">February</option>
//                     <option value="March">March</option>
//                     <option value="April">April</option>
//                     <option value="May">May</option>
//                     <option value="June">June</option>
//                     <option value="July">July</option>
//                     <option value="August">August</option>
//                     <option value="September">September</option>
//                     <option value="October">October</option>
//                     <option value="November">November</option>
//                     <option value="December">December</option>
//                 </select>
//             </div>
//             <TransactionsTable transactions={transactions} page={page} setPage={setPage} />
//             <div className="stats-container">
//                 <div className="stats-box">
//                     <h3>Total Sale</h3>
//                     <p>{stats.totalSale || 0}</p>
//                 </div>
//                 <div className="stats-box">
//                     <h3>Total Sold Items</h3>
//                     <p>{stats.totalSoldItems || 0}</p>
//                 </div>
//                 <div className="stats-box">
//                     <h3>Total Not Sold Items</h3>
//                     <p>{stats.totalNotSoldItems || 0}</p>
//                 </div>
//             </div>
//             <div className="bar-chart-container">
//                 <BarChart month={month} />
//             </div>
//         </div>
//     );
// };

// export default App;
