import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ month }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchChartData();
    }, [month]);

    const fetchChartData = async () => {
        try {
            const response = await axios.get(`/api/bar-chart-data?month=${month}`);
            const data = response.data || [];

            const labels = data.map(item => item.range);
            const values = data.map(item => item.count);

            setChartData({
                labels: labels,
                datasets: [{
                    label: 'Transactions Count',
                    data: values,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1
                }]
            });
        } catch (error) {
            console.error('Error fetching chart data', error);
            setChartData({
                labels: [],
                datasets: [{
                    label: 'Transactions Count',
                    data: [],
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1
                }]
            });
        }
    };

    if (!chartData) return <div>Loading...</div>;

    return (
        <div className="bar-chart">
            <h2>Bar Chart Stats - {month}</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const BarChart = ({ month }) => {
//     const [chartData, setChartData] = useState(null);
//     const chartRef = useRef(null);

//     useEffect(() => {
//         fetchChartData();
//     }, [month]);

//     useEffect(() => {
//         return () => {
//             if (chartRef.current) {
//                 chartRef.current.destroy();
//             }
//         };
//     }, []);

//     const fetchChartData = async () => {
//         try {
//             const response = await axios.get(`/api/bar-chart-data?month=${month}`);
//             const data = response.data || [];

//             const labels = data.map(item => item.range);
//             const values = data.map(item => item.count);

//             setChartData({
//                 labels: labels,
//                 datasets: [{
//                     label: 'Transactions Count',
//                     data: values,
//                     backgroundColor: 'rgba(75,192,192,0.4)',
//                     borderColor: 'rgba(75,192,192,1)',
//                     borderWidth: 1
//                 }]
//             });
//         } catch (error) {
//             console.error('Error fetching chart data', error);
//             setChartData({
//                 labels: [],
//                 datasets: [{
//                     label: 'Transactions Count',
//                     data: [],
//                     backgroundColor: 'rgba(75,192,192,0.4)',
//                     borderColor: 'rgba(75,192,192,1)',
//                     borderWidth: 1
//                 }]
//             });
//         }
//     };

//     if (!chartData) return <div>Loading...</div>;

//     return (
//         <div className="bar-chart">
//             <h2>Bar Chart Stats - {month}</h2>
//             <Bar ref={chartRef} data={chartData} />
//         </div>
//     );
// };

// export default BarChart;