import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ month, search, page, perPage, setPage }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchTransactions();
    }, [month, search, page, perPage]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/transactions', {
                params: {
                    month,
                    search,
                    page,
                    perPage
                }
            });
            setTransactions(response.data.transactions);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            console.error('Error fetching transactions', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="transactions-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Sale Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction._id}>
                            <td>{transaction._id}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page => (transactions.length === perPage ? page + 1 : page))} disabled={transactions.length < perPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const TransactionsTable = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);

//     useEffect(() => {
//         fetchTransactions();
//     }, [page, itemsPerPage]);

//     const fetchTransactions = async () => {
//         try {
//             const response = await axios.get(`/api/transactions?page=${page}&perPage=${itemsPerPage}`);
//             setTransactions(response.data.transactions);
//             setTotalPages(response.data.totalPages);
//         } catch (error) {
//             console.error('Error fetching transactions', error);
//         }
//     };

//     return (
//         <div className="dashboard-container">
//             <div className="dashboard-header">
//                 Transaction Dashboard
//             </div>
//             <div className="search-container">
//                 <button>Search transaction</button>
//                 <select>
//                     <option>Select Month</option>
//                     <option>January</option>
//                     <option>February</option>
//                     <option>March</option>
//                     <option>April</option>
//                     <option>May</option>
//                     <option>June</option>
//                     <option>July</option>
//                     <option>August</option>
//                     <option>September</option>
//                     <option>October</option>
//                     <option>November</option>
//                     <option>December</option>
//                     {/* Add other months as options */}
//                 </select>
//             </div>
//             <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Title</th>
//                             <th>Description</th>
//                             <th>Price</th>
//                             <th>Category</th>
//                             <th>Sold</th>
//                             <th>Image</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {transactions.map(transaction => (
//                             <tr key={transaction.id}>
//                                 <td>{transaction.id}</td>
//                                 <td>{transaction.title}</td>
//                                 <td>{transaction.description}</td>
//                                 <td>{transaction.price}</td>
//                                 <td>{transaction.category}</td>
//                                 <td>{transaction.sold ? 'Yes' : 'No'}</td>
//                                 <td><img src={transaction.image} alt={transaction.title} style={{ width: '50px', height: '50px' }} /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="pagination">
//                 <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
//                 <span>Page No: {page}</span>
//                 <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>Next</button>
//                 <span>Per Page: 
//                     <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
//                         <option value={10}>10</option>
//                         <option value={20}>20</option>
//                         <option value={50}>50</option>
//                     </select>
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default TransactionsTable;
