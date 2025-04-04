import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StudyListView from './components/StudyListView';
import AddPaperForm from './components/AddPaperForm';
import StatsView from './components/StatsView';
import LoginModal from './components/LoginModal';
import StudyDetailsModal from './components/StudyDetailsModal';
import AdvancedSearchModal from './components/AdvancedSearchModal';
import { mockStudies, totalStudiesCount, availableDataCount } from './data/mockStudies'; // Import mock data
import './App.css'; // Για custom styles αν χρειάζονται

// Ορισμός των πιθανών "views"
const VIEWS = {
    STUDY_LIST: 'STUDY_LIST',
    ADD_PAPER: 'ADD_PAPER',
    STATS: 'STATS', // Γενικό view για στατιστικά
};

function App() {
    const [studies, setStudies] = useState([]);
    const [filteredStudies, setFilteredStudies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentView, setCurrentView] = useState(VIEWS.STUDY_LIST);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // π.χ., 'admin'

    // Modal states
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [showAdvancedSearchModal, setShowAdvancedSearchModal] = useState(false);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        projects: '',
        criteria: '',
        goals: '',
    });
    const [statsType, setStatsType] = useState(''); // e.g., 'projects', 'goals', 'criteria', 'dataAvailability'

    // --- Data Fetching (Mock) ---
    useEffect(() => {
        // Προσομοίωση φόρτωσης δεδομένων
        setIsLoading(true);
        setTimeout(() => {
            setStudies(mockStudies);
            setFilteredStudies(mockStudies); // Αρχικά δείχνουμε όλα
            setIsLoading(false);
        }, 500); // Μικρή καθυστέρηση για εμφάνιση loading
    }, []);

    // --- Filtering Logic ---
    useEffect(() => {
        let result = studies;

        // Απλή αναζήτηση τίτλου
        if (searchTerm) {
            result = result.filter(study =>
                study.paper_title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Σύνθετη αναζήτηση
        if (activeFilters.projects) {
            result = result.filter(study =>
                study.paper_project?.toLowerCase().includes(activeFilters.projects.toLowerCase())
            );
        }
        if (activeFilters.criteria) {
             result = result.filter(study =>
                study.paper_criteria?.toLowerCase().includes(activeFilters.criteria.toLowerCase())
            );
        }
        if (activeFilters.goals) {
             result = result.filter(study =>
                study.paper_goals?.toLowerCase().includes(activeFilters.goals.toLowerCase())
            );
        }

        setFilteredStudies(result);
    }, [searchTerm, activeFilters, studies]);

    // --- Handlers ---
    const handleLogin = (username, password) => {
        // Απλή προσομοίωση login
        if (username === 'admin' && password === 'password') {
            setIsLoggedIn(true);
            setCurrentUser('admin');
            setShowLoginModal(false);
            console.log('Επιτυχής Σύνδεση');
        } else {
            alert('Λάθος όνομα χρήστη ή κωδικός');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        // Αν ο χρήστης ήταν στο "Add Paper", τον γυρνάμε στη λίστα
        if (currentView === VIEWS.ADD_PAPER) {
            setCurrentView(VIEWS.STUDY_LIST);
        }
        console.log('Αποσύνδεση');
    };

    const handleShowAddPaper = () => {
        setCurrentView(VIEWS.ADD_PAPER);
    };

    const handleAddPaperSubmit = (newPaperData) => {
        // Προσομοίωση προσθήκης (σε πραγματική εφαρμογή θα έκανε API call)
        const newId = studies.length > 0 ? Math.max(...studies.map(s => s.id)) + 1 : 1;
        const paperToAdd = { ...newPaperData, id: newId, data_available: newPaperData.paper_link ? true : false }; // Υποθέτουμε διαθεσιμότητα αν υπάρχει link
        setStudies(prevStudies => [...prevStudies, paperToAdd]);
        alert('Η μελέτη προστέθηκε!');
        setCurrentView(VIEWS.STUDY_LIST); // Επιστροφή στη λίστα
    };

    const handleViewDetails = (study) => {
        setSelectedStudy(study);
        setShowDetailsModal(true);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleAdvancedSearch = (filters) => {
        setActiveFilters(filters);
        setShowAdvancedSearchModal(false); // Κλείσιμο modal
        console.log('Εφαρμογή φίλτρων:', filters);
    };

     const handleClearFilters = () => {
        setSearchTerm('');
        setActiveFilters({ projects: '', criteria: '', goals: '' });
        // Κλείσε και το modal αν είναι ανοιχτό (προληπτικά)
        setShowAdvancedSearchModal(false);
        console.log('Καθαρισμός φίλτρων');
    };

    const handleShowStats = (type) => {
        setStatsType(type);
        setCurrentView(VIEWS.STATS);
    };

     const handleBackToList = () => {
        setCurrentView(VIEWS.STUDY_LIST);
        setStatsType(''); // Καθαρίζουμε τον τύπο στατιστικών
    };

    // --- Render Logic ---
    const renderCurrentView = () => {
        switch (currentView) {
            case VIEWS.ADD_PAPER:
                return <AddPaperForm onSubmit={handleAddPaperSubmit} onBack={handleBackToList} />;
            case VIEWS.STATS:
                return <StatsView
                           statsType={statsType}
                           studies={studies} // Περνάμε όλα τα δεδομένα για ανάλυση
                           totalStudiesCount={totalStudiesCount}
                           availableDataCount={availableDataCount}
                           onBack={handleBackToList}
                       />;
            case VIEWS.STUDY_LIST:
            default:
                return (
                    <StudyListView
                        studies={filteredStudies}
                        isLoading={isLoading}
                        onViewDetails={handleViewDetails}
                        onSearch={handleSearch}
                        onAdvancedSearchClick={() => setShowAdvancedSearchModal(true)}
                        onClearFilters={handleClearFilters}
                        showClearFilters={searchTerm !== '' || activeFilters.projects !== '' || activeFilters.criteria !== '' || activeFilters.goals !== ''}
                        onShowStats={handleShowStats}
                    />
                );
        }
    };

    return (
        <div className="container mt-3 mb-5">
            <Header
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onLoginClick={() => setShowLoginModal(true)}
                onLogoutClick={handleLogout}
                onAddPaperClick={handleShowAddPaper}
            />

            <main id="app-content" className="mt-4">
                {renderCurrentView()}
            </main>

            {/* Modals */}
            {showLoginModal && (
                <LoginModal
                    show={showLoginModal}
                    onHide={() => setShowLoginModal(false)}
                    onLogin={handleLogin}
                />
            )}
            {showDetailsModal && selectedStudy && (
                <StudyDetailsModal
                    show={showDetailsModal}
                    onHide={() => setShowDetailsModal(false)}
                    study={selectedStudy}
                />
            )}
             {showAdvancedSearchModal && (
                <AdvancedSearchModal
                    show={showAdvancedSearchModal}
                    onHide={() => setShowAdvancedSearchModal(false)}
                    onApplyFilters={handleAdvancedSearch}
                    initialFilters={activeFilters}
                />
            )}

            <footer className="text-center text-muted mt-5">
                Κεφάλαιο 4 - Εργαλείο Επισκόπησης
            </footer>
        </div>
    );
}

export default App;