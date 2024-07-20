// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Statistics = ({ month }) => {
//     const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalNotSoldItems: 0 });

//     useEffect(() => {
//         fetchStatistics();
//     }, [month]);

//     const fetchStatistics = async () => {
//         try {
//             const response = await axios.get(`/api/statistics?month=${month}`);
//             setStats(response.data || { totalSale: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
//         } catch (error) {
//             console.error('Error fetching statistics', error);
//             setStats({ totalSale: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
//         }
//     };

//     return (
//         <div className="statistics">
//             <h2>Statistics - {month}</h2>
//             <div className="stats-box">
//                 <p>Total sale: {stats.totalSale}</p>
//                 <p>Total sold items: {stats.totalSoldItems}</p>
//                 <p>Total not sold items: {stats.totalNotSoldItems}</p>
//             </div>
//         </div>
//     );
// };

// export default Statistics;