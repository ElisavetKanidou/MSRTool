// src/components/PieChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2'; // <-- Import Doughnut chart
import {
    Chart as ChartJS,
    ArcElement, // <-- Απαραίτητο για Pie/Doughnut
    Tooltip,
    Legend,
} from 'chart.js';

// --- ΕΓΓΡΑΦΗ ΤΩΝ MODULES ---
ChartJS.register(ArcElement, Tooltip, Legend);
// --------------------------

// Τα χρώματα που θα χρησιμοποιήσουμε
const STATUS_COLORS = {
    'Included': 'rgba(40, 167, 69, 0.7)',  // Πράσινο
    'Excluded': 'rgba(220, 53, 69, 0.7)',  // Κόκκινο
    'To Screen': 'rgba(255, 193, 7, 0.7)', // Κίτρινο
    'Other': 'rgba(108, 117, 125, 0.7)' // Γκρι για άλλα status αν υπάρξουν
};
const STATUS_BORDERS = {
    'Included': 'rgba(40, 167, 69, 1)',
    'Excluded': 'rgba(220, 53, 69, 1)',
    'To Screen': 'rgba(255, 193, 7, 1)',
    'Other': 'rgba(108, 117, 125, 1)'
};


function PieChart({ statusData }) {

    // --- Προετοιμασία δεδομένων ---
    const labels = Object.keys(statusData || {});
    const dataCounts = Object.values(statusData || {});
    const backgroundColors = labels.map(label => STATUS_COLORS[label] || STATUS_COLORS['Other']);
    const borderColors = labels.map(label => STATUS_BORDERS[label] || STATUS_BORDERS['Other']);

    const chartData = {
        labels: labels, // Π.χ., ['Included', 'Excluded', 'To Screen']
        datasets: [
            {
                label: '# of Studies',
                data: dataCounts, // Π.χ., [50, 80, 20]
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };
    // ---------------------------

    // --- Ρυθμίσεις εμφάνισης ---
     const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom', // Legend κάτω από το γράφημα
            },
            title: {
                display: true,
                text: 'Κατανομή Status Μελετών',
                padding: { // Λίγο padding στον τίτλο
                    bottom: 15
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                           label += context.parsed; // Η τιμή (count)
                           // Υπολογισμός ποσοστού
                           const total = context.dataset.data.reduce((a, b) => a + b, 0);
                           const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                           label += ` (${percentage}%)`;
                        }
                        return label;
                    }
                }
            }
        },
    };
    // --------------------------


    // Αν δεν υπάρχουν δεδομένα, μην εμφανίσεις τίποτα ή δείξε μήνυμα
    if (!labels || labels.length === 0) {
        return <p className="text-center text-muted">Δεν υπάρχουν δεδομένα status για εμφάνιση.</p>;
    }


    return (
        // Container για το γράφημα με ένα λογικό ύψος
        <div style={{ position: 'relative', height: '350px' }}>
             <Doughnut data={chartData} options={chartOptions} />
        </div>
    );
}

export default PieChart;