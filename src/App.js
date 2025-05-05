// src/App.js
import React, { useState, useEffect } from 'react'; // <-- Ξαναπρόσθεσε το useEffect
import axios from 'axios';
// --- Component Imports ---
import Header from './components/Header';
import StudyListView from './components/StudyListView';
import StudyDetailsModal from './components/StudyDetailsModal';
import AdvancedSearchModal from './components/AdvancedSearchModal';
import StatsView from './components/StatsView';
import PieChart from './components/PieChart';
// --- ΔΙΟΡΘΩΣΕ ΑΥΤΗ ΤΗ ΓΡΑΜΜΗ ---
import { Modal, Button, Spinner, Alert } from 'react-bootstrap'; // <-- Προστέθηκαν Spinner, Alert
// --------------------------------
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
    // --- Κεντρικό State ---
    const [studies, setStudies] = useState([]); // Η λίστα με τις μελέτες
    const [isLoading, setIsLoading] = useState(true); // Φόρτωση λίστας μελετών
    const [error, setError] = useState(null);      // Σφάλμα λίστας μελετών
    const [activeFilters, setActiveFilters] = useState({}); // Τρέχοντα φίλτρα (απλά 'q' ή σύνθετα)

    // Modal State
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Stats State
    const [statsData, setStatsData] = useState(null); // Cached data από /api/stats
    const [isStatsLoading, setIsStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState(null);
    const [showStatsModal, setShowStatsModal] = useState(false); // Για Bar charts
    const [statsModalData, setStatsModalData] = useState({ title: '', data: [] }); // data για Bar charts
    const [showPieChartModal, setShowPieChartModal] = useState(false); // Για Pie chart
    // ------------------------------------

    // --- Συνάρτηση Φόρτωσης Μελετών (με φίλτρα) ---
    const fetchStudies = async (params = {}) => {
        setIsLoading(true);
        setError(null);
        // Καθαρισμός κενών παραμέτρων
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v != null && v !== '')
        );
        console.log("Fetching studies with params:", cleanParams);
        try {
            const response = await axios.get(`${API_BASE_URL}/studies`, { params: cleanParams });
            console.log("Studies received:", response.data);
            setStudies(response.data);
        } catch (err) {
            console.error("Failed to fetch studies:", err);
            const errorMsg = err.response?.data?.error || err.message || 'Failed to load studies.';
            setError(errorMsg);
            setStudies([]); // Άδειασμα λίστας σε σφάλμα
        } finally {
            setIsLoading(false);
        }
    };

    // --- Αρχική Φόρτωση ---
    useEffect(() => {
        fetchStudies(); // Φόρτωσε τα πάντα κατά την έναρξη
    }, []); // [] = Μόνο μία φορά
    // --------------------

    // --- Συνάρτηση Φόρτωσης Στατιστικών (On Demand) ---
    const fetchStatsData = async () => {
        if (isStatsLoading) return statsData; // Μην ξανακαλέσεις αν ήδη φορτώνει
        if (statsData && !statsError) return statsData; // Επίστρεψε cached data αν υπάρχουν και δεν υπάρχει σφάλμα

        setIsStatsLoading(true);
        setStatsError(null);
        try {
            console.log("Fetching stats from:", `${API_BASE_URL}/stats`);
            const response = await axios.get(`${API_BASE_URL}/stats`);
            console.log("Stats received:", response.data);
            setStatsData(response.data);
            return response.data;
        } catch (err) {
            console.error("Failed to fetch stats:", err);
            const errorMsg = err.response?.data?.error || err.message || 'Failed to load stats.';
            setStatsError(errorMsg);
            setStatsData(null); // Καθάρισε τα παλιά stats σε σφάλμα
            return null;
        } finally {
            setIsStatsLoading(false);
        }
    };

    // --- Handlers για Λεπτομέρειες Μελέτης ---
    const handleViewDetails = (study) => {
        setSelectedStudy(study);
        setShowDetailsModal(true);
    };
    const handleHideDetails = () => {
        setShowDetailsModal(false);
        setSelectedStudy(null);
    };
    // ---------------------------------------

    // --- Handler για Απλή Αναζήτηση ---
    const handleSimpleSearch = (term) => {
        console.log("Performing simple search for:", term);
        const apiParams = { q: term };
        setActiveFilters(apiParams); // Θέσε το 'q' ως ενεργό φίλτρο
        fetchStudies(apiParams);    // Κάλεσε το API με το 'q'
    };
    // --------------------------------

    // --- Handlers για Σύνθετη Αναζήτηση ---
    const handleAdvancedSearchClick = () => {
        setShowAdvancedSearch(true);
    };
    const handleHideAdvancedSearch = () => {
        setShowAdvancedSearch(false);
    };
    const handleApplyAdvancedSearch = (filtersFromModal) => {
        console.log("Applying advanced filters:", filtersFromModal);
        // Αντιστοίχιση frontend πεδίων σε backend query παραμέτρους
        const apiParams = {
            source_contains: filtersFromModal.projects,
            criteria_contains: filtersFromModal.criteria,
            abstract_contains: filtersFromModal.goals,
            q: '' // Καθάρισε την απλή αναζήτηση
        };
        // Αποθήκευσε τα API params ως ενεργά φίλτρα
        setActiveFilters(apiParams);
        // Κάλεσε το API για να φέρεις τα νέα δεδομένα
        fetchStudies(apiParams);
        setShowAdvancedSearch(false); // Κλείσε το modal
    };
    // --------------------------------------

    // --- Handler για Καθαρισμό Φίλτρων ---
    const handleClearFilters = () => {
        console.log("Clearing all filters");
        setActiveFilters({}); // Άδειασε τα φίλτρα
        fetchStudies();       // Φόρτωσε ξανά όλα τα studies
        setShowAdvancedSearch(false);
    };
    // -----------------------------------

    // --- Handler για Εμφάνιση Στατιστικών ---
    const handleShowStats = async (statsType) => {
        // Φέρε τα δεδομένα (ή πάρε τα από cache)
        const currentStatsData = await fetchStatsData();

        // Αν η φόρτωση είναι σε εξέλιξη ή απέτυχε, άνοιξε το modal για να φανεί
        if (isStatsLoading || !currentStatsData) {
            if(statsType === 'dataAvailability') { // Το pie chart τώρα λέγεται 'dataAvailability'
                setShowStatsModal(false);
                setShowPieChartModal(true); // Το modal του PieChart θα δείξει loading/error
            } else {
                setShowPieChartModal(false);
                setStatsModalData({ title: `Φόρτωση για ${statsType}...`, data: [] });
                setShowStatsModal(true); // Το StatsView modal θα δείξει loading/error
            }
            return;
        }

        // Έχουμε δεδομένα, προετοίμασε τα για το σωστό modal
        let modalTitle = '';
        let dataForModal = [];

        if (statsType === 'projects' && currentStatsData.top_projects) {
             modalTitle = 'Top Έργα/Πηγές';
             dataForModal = currentStatsData.top_projects;
        } else if (statsType === 'goals' && currentStatsData.top_goals) {
             modalTitle = 'Top Όροι από Abstract/Στόχους';
             dataForModal = currentStatsData.top_goals;
        } else if (statsType === 'criteria' && currentStatsData.top_criteria) {
             modalTitle = 'Top Κριτήρια';
             dataForModal = currentStatsData.top_criteria;
        }

        if (statsType === 'dataAvailability') {
             setStatsModalData({ title: '', data: [] }); // Άδειασε το άλλο modal
             setShowStatsModal(false);
             if (currentStatsData.status_distribution) {
                 setShowPieChartModal(true); // Άνοιξε το Pie Chart
             } else {
                 alert('Δεν βρέθηκαν δεδομένα κατανομής status.');
             }
        } else {
             if (dataForModal.length > 0 || modalTitle) {
                 setStatsModalData({ title: modalTitle || `Στατιστικά για ${statsType}`, data: dataForModal });
                 setShowPieChartModal(false);
                 setShowStatsModal(true); // Άνοιξε το Bar Chart
             } else {
                  alert(`Δεν βρέθηκαν υπολογισμένα στατιστικά για '${statsType}' στην απάντηση του API.`);
             }
        }
    };
    // ------------------------------------------

    // --- Handler για Κλείσιμο Στατιστικών ---
    const handleHideStats = () => {
        setShowStatsModal(false);
        setShowPieChartModal(false);
    };
    // ----------------------------------------

    // --- JSX ---
    return (
        <div className="App">
            <Header /> {/* Πρόσθεσε props στο Header αν χρειάζεται (π.χ., onLoginClick) */}
            <main className="container mt-4">
                {/* Πέρνα τα πάντα στο StudyListView */}
                <StudyListView
                    studies={studies}
                    isLoading={isLoading}
                    error={error}
                    activeFilters={activeFilters} // Για εμφάνιση κουμπιού Clear
                    onViewDetails={handleViewDetails}
                    onPerformSearch={handleSimpleSearch} // Για την απλή αναζήτηση
                    onAdvancedSearchClick={handleAdvancedSearchClick}
                    onPerformClear={handleClearFilters} // Για τον καθαρισμό
                    onShowStats={handleShowStats}
                />
            </main>

            {/* Modals */}
            {selectedStudy && (
                <StudyDetailsModal
                    show={showDetailsModal}
                    onHide={handleHideDetails}
                    study={selectedStudy}
                />
            )}
            <AdvancedSearchModal
                show={showAdvancedSearch}
                onHide={handleHideAdvancedSearch}
                onApplyFilters={handleApplyAdvancedSearch}
                // Πέρνα τα φίλτρα όπως τα θέλει το modal
                initialFilters={{
                    projects: activeFilters.source_contains || '',
                    criteria: activeFilters.criteria_contains || '',
                    goals: activeFilters.abstract_contains || ''
                 }}
            />
            {/* Modal για τα Bar Charts (Top Lists) */}
            <StatsView
                 show={showStatsModal}
                 onHide={handleHideStats}
                 title={statsModalData.title}
                 data={statsModalData.data}
                 isLoading={isStatsLoading} // Πέρνα το loading state
                 error={statsError}         // Πέρνα το error state
             />
             {/* Modal για το Pie Chart */}
             <Modal show={showPieChartModal} onHide={handleHideStats} centered>
                 <Modal.Header closeButton>
                     <Modal.Title>Κατανομή Status Μελετών</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     {isStatsLoading ? (
                         <p className="text-center"><Spinner animation="border" size="sm" /> Φόρτωση...</p>
                     ) : statsError ? (
                         <Alert variant="danger">Σφάλμα: {statsError}</Alert>
                     ) : statsData?.status_distribution ? (
                         <PieChart statusData={statsData.status_distribution} />
                     ) : (
                          <p>Δεν βρέθηκαν δεδομένα κατανομής status.</p>
                     )}
                 </Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={handleHideStats}>Κλείσιμο</Button>
                 </Modal.Footer>
             </Modal>

        </div>
    );
}

export default App;