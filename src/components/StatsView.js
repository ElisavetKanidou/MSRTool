import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import PieChart from './PieChart'; // Import the custom PieChart component

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Helper function to count frequencies of items separated by '#'
const countFrequencies = (studies, field) => {
    const counts = {};
    studies.forEach(study => {
        if (study[field]) {
            const items = study[field].split('#').map(item => item.trim().toLowerCase()).filter(Boolean);
            items.forEach(item => {
                counts[item] = (counts[item] || 0) + 1;
            });
        }
    });
    // Sort by frequency descending and take top N (e.g., top 10)
    return Object.entries(counts)
                 .sort(([,a], [,b]) => b - a)
                 .slice(0, 10); // Adjust N as needed
};


function StatsView({ statsType, studies, totalStudiesCount, availableDataCount, onBack }) {

    const chartData = useMemo(() => {
        if (!studies || studies.length === 0) return null;

        let labels = [];
        let dataPoints = [];
        let chartTitle = '';

        switch (statsType) {
            case 'projects':
            case 'goals':
            case 'criteria':
                const fieldMap = { projects: 'paper_project', goals: 'paper_goals', criteria: 'paper_criteria' };
                const titleMap = { projects: 'Top Έργα', goals: 'Top Στόχοι', criteria: 'Top Κριτήρια' };
                const frequencies = countFrequencies(studies, fieldMap[statsType]);
                labels = frequencies.map(entry => entry[0]);
                dataPoints = frequencies.map(entry => entry[1]);
                chartTitle = titleMap[statsType];
                return {
                    type: 'bar',
                    title: chartTitle,
                    data: {
                        labels,
                        datasets: [{
                            label: 'Αριθμός Μελετών',
                            data: dataPoints,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                         indexAxis: 'y', // Make it horizontal bar chart for better readability
                         responsive: true,
                         plugins: {
                            legend: { display: false },
                            title: { display: true, text: chartTitle }
                         },
                         scales: {
                            x: { beginAtZero: true }
                         }
                    }
                };

             case 'dataAvailability':
                // Use the custom PieChart component for this specific chart
                return { type: 'customPie' };


            default:
                return null;
        }
    }, [statsType, studies, totalStudiesCount, availableDataCount]);


     const renderChart = () => {
        if (!chartData) return <p>Δεν υπάρχουν δεδομένα για εμφάνιση στατιστικών.</p>;

        if (chartData.type === 'customPie') {
             return (
                 <>
                     <h5>Διαθεσιμότητα Δεδομένων (Βάσει {totalStudiesCount} Μελετών)</h5>
                     <PieChart
                         available={availableDataCount}
                         unavailable={totalStudiesCount - availableDataCount}
                     />
                 </>
             );
        } else if (chartData.type === 'bar') {
             return <Bar options={chartData.options} data={chartData.data} />;
        }
        // Add other chart types if needed
        return <p>Άγνωστος τύπος γραφήματος.</p>;
    };


    return (
        <section id="stats-view" className="card p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 id="stats-title">{chartData?.title || 'Στατιστικά Στοιχεία'}</h4>
                <button onClick={onBack} className="btn btn-secondary">
                    <i className="fas fa-arrow-left me-1"></i> Πίσω στη Λίστα
                </button>
            </div>
            <div id="stats-content" style={{ minHeight: '300px' }}>
               {renderChart()}
            </div>
        </section>
    );
}

export default StatsView;