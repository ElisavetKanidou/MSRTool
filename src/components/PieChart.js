// src/components/PieChart.js
import React from 'react';
import './PieChart.css'; // Θα δημιουργήσουμε αυτό το CSS

function PieChart({ available, unavailable }) {
    const total = available + unavailable;
    const availablePercent = total > 0 ? (available / total) * 100 : 0;
    const unavailablePercent = total > 0 ? (unavailable / total) * 100 : 0;

    // CSS conic-gradient για το pie chart
    const gradient = `conic-gradient(
        #28a745 ${availablePercent}%,
        #dc3545 ${availablePercent}% ${availablePercent + unavailablePercent}%
    )`;

    return (
        <div className="pie-chart-container my-4 text-center">
             <h6>Συλλογή δεδομένων</h6>
            <div className="pie-chart" style={{ background: gradient }}></div>
            <div className="legend mt-3 d-flex justify-content-center gap-3">
                <div>
                    <span className="legend-color available"></span>
                    Διαθέσιμη ({availablePercent.toFixed(0)}%)
                </div>
                <div>
                    <span className="legend-color unavailable"></span>
                    Μη Διαθέσιμη ({unavailablePercent.toFixed(0)}%)
                </div>
            </div>

        </div>
    );
}

export default PieChart;