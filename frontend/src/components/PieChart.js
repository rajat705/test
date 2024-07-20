// src/components/PieChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ month }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchChartData();
    }, [month]);

    const fetchChartData = async () => {
        try {
            const response = await axios.get(`/api/pie-chart-data?month=${month}`);
            const data = response.data || [];

            const labels = data.map(item => item.category);
            const values = data.map(item => item.count);

            setChartData({
                labels: labels,
                datasets: [{
                    label: 'Items Count',
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            });
        } catch (error) {
            console.error('Error fetching chart data', error);
        }
    };

    if (!chartData) return <div>Loading...</div>;

    return (
        <div className="pie-chart">
            <h2>Pie Chart Stats - {month}</h2>
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;
