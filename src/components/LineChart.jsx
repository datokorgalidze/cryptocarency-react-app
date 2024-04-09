
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
// import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const chartRef = useRef();

    const coinPrice = coinHistory?.data?.history?.map((entry) => entry.price) || [];
    const coinTimestamp = coinHistory?.data?.history?.map((entry) => new Date(entry.timestamp).toLocaleDateString()) || [];

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
               
            },
        ],
    };

    const options = {
        scales: {
            y: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = chartRef.current.chartInstance;
            if (chartInstance) {
                chartInstance.destroy();
            }
        }

        const newChartInstance = new Chart(chartRef.current, {
            type: 'line',
            data: data,
            options: options,
        });

        chartRef.current.chartInstance = newChartInstance;
        // eslint-disable-next-line 
    }, [coinHistory, currentPrice, coinName]);

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        Change: {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price: $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <canvas ref={chartRef} />
        </>
    );
};

export default LineChart;
