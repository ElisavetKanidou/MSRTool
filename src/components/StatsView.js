// src/components/StatsView.js
import React from 'react';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'; // <-- Import Bar chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'; // <-- Import απαραίτητων modules του Chart.js

// --- ΕΓΓΡΑΦΗ ΤΩΝ MODULES (ΑΠΑΡΑΙΤΗΤΟ!) ---
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
// ----------------------------------------

function StatsView({ show, onHide, title, data, isLoading, error }) {

    // --- Προετοιμασία δεδομένων για το Chart.js ---
    const chartData = {
        labels: data?.map(item => item.name) || [], // Τα ονόματα στον άξονα Υ
        datasets: [
            {
                label: 'Πλήθος', // Ετικέτα για το dataset
                data: data?.map(item => item.count) || [], // Οι τιμές (counts)
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Χρώμα μπάρας (γαλάζιο με διαφάνεια)
                borderColor: 'rgba(54, 162, 235, 1)',     // Χρώμα περιγράμματος
                borderWidth: 1,
            },
        ],
    };

    // --- Ρυθμίσεις εμφάνισης του Chart.js ---
    const chartOptions = {
        indexAxis: 'y', // <-- Κάνει το διάγραμμα οριζόντιο (μπάρες αριστερά-δεξιά)
        elements: {
            bar: {
                borderWidth: 2, // Πάχος γραμμής περιγράμματος
            },
        },
        responsive: true, // Το διάγραμμα προσαρμόζεται στο μέγεθος του container
        maintainAspectRatio: false, // Επιτρέπει να ορίσουμε ύψος ανεξάρτητα
        plugins: {
            legend: {
                position: 'top', // Θέση του legend
                display: false, // Ας κρύψουμε το legend αφού έχουμε μία μπάρα
            },
            title: {
                display: false, // Ο τίτλος είναι ήδη στο Modal Header
                // text: title || 'Στατιστικά',
            },
            tooltip: { // Ρυθμίσεις για το τι φαίνεται στο hover
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.x !== null) {
                            label += context.parsed.x; // Δείξε την τιμή count
                        }
                        return label;
                    }
                }
            }
        },
        scales: { // Ρυθμίσεις για τους άξονες
            x: { // Ο οριζόντιος άξονας (με τις τιμές)
                beginAtZero: true, // Να ξεκινάει από το 0
                 title: {
                    display: true,
                    text: 'Πλήθος Εμφανίσεων'
                 }
            },
            y: { // Ο κάθετος άξονας (με τα labels)
                ticks: {
                     autoSkip: false // Να μην παραλείπει labels αν είναι πολλά
                 }
            }
        },
    };
    // --------------------------------------------

    return (
        // Κάνουμε το modal λίγο μεγαλύτερο για να χωράει το γράφημα
        <Modal show={show} onHide={onHide} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title || 'Στατιστικά'}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: '400px' }}> {/* Δίνουμε ένα ελάχιστο ύψος */}
                {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <Alert variant="danger">Σφάλμα: {error}</Alert>
                ) : data && data.length > 0 ? (
                    // Container για το γράφημα με καθορισμένο ύψος
                    <div style={{ position: 'relative', height: `${Math.max(300, data.length * 30)}px` }}> {/* Δυναμικό ύψος */}
                        <Bar options={chartOptions} data={chartData} />
                    </div>
                ) : (
                    <p>Δεν βρέθηκαν δεδομένα.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Κλείσιμο
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StatsView;