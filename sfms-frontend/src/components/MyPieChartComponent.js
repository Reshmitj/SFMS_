import React, { useEffect, useRef } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const MyPieChartComponent = ({ data, onPieClick }) => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const initChart = () => {
            if (chartContainer.current) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                chartInstance.current = new Chart(chartContainer.current, {
                    type: 'pie',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false, // Allow the chart to fill the container
                        onClick: (event, elements) => {
                            if (elements.length > 0) {
                                const clickedElementIndex = elements[0].index;
                                const label = data.labels[clickedElementIndex];
                                onPieClick(label); // Call the parent handler with the clicked label
                            }
                        },
                    },
                });
            }
        };

        initChart();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, onPieClick]);

    return <canvas ref={chartContainer} style={{ width: '100%', height: 'auto', maxHeight: '300px' }} />;
};

export default MyPieChartComponent;
