import React, { useState } from 'react';
import StudyItem from './StudyItem';
import { Spinner, Alert } from 'react-bootstrap'; // Για loading/error

function StudyListView({
    studies,
    isLoading,
    error,
    activeFilters,
    onViewDetails,
    onPerformSearch, // Callback για εκτέλεση απλής αναζήτησης
    onAdvancedSearchClick,
    onPerformClear, // Callback για εκτέλεση καθαρισμού
    onShowStats
}) {
    // Τοπικό state μόνο για το πεδίο αναζήτησης
    const [localSearchTerm, setLocalSearchTerm] = useState(activeFilters?.q || ''); // Αρχικοποίηση με το τρέχον q

    // Ενημέρωση τοπικού state όταν αλλάζει το κεντρικό q (π.χ. μετά από clear)
    React.useEffect(() => {
        setLocalSearchTerm(activeFilters?.q || '');
    }, [activeFilters?.q]);


    const handleInputChange = (event) => {
        setLocalSearchTerm(event.target.value);
    };

    // Καλεί το callback του App.js με τον όρο αναζήτησης
    const handleSearchClick = () => {
        if (onPerformSearch) {
            onPerformSearch(localSearchTerm);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    // Υπολογίζει αν πρέπει να εμφανιστεί το κουμπί καθαρισμού
    const showClearButton = Object.values(activeFilters).some(v => v != null && v !== '');

    return (
        <section id="studies-view">
            {/* Search and Filter Controls */}
            <div className="search-controls card p-3 mb-4 shadow-sm">
                {/* Simple Search Input */}
                <div className="input-group mb-3">
                    <input
                        type="text"
                        id="search-input"
                        className="form-control"
                        placeholder="Αναζήτηση (τίτλος, συγγραφείς, κλπ)..."
                        aria-label="Αναζήτηση άρθρου"
                        value={localSearchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                    <button id="search-button" className="btn btn-outline-secondary" type="button" onClick={handleSearchClick} disabled={isLoading}>
                        {/* Προσοχή: Το isLoading εδώ αναφέρεται στη φόρτωση της λίστας, όχι στην αναζήτηση αυτή καθεαυτή */}
                        {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <i className="fas fa-search"></i>}
                    </button>
                </div>
                {/* Other Buttons */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <div>
                        {/* Καλεί το callback του App.js */}
                        <button id="advanced-search-btn" className="btn btn-primary me-2" onClick={onAdvancedSearchClick} disabled={isLoading}>
                            Σύνθετη Αναζήτηση <i className="fas fa-filter"></i>
                        </button>
                        {/* Καλεί το callback του App.js */}
                        {showClearButton && (
                            <button id="clear-filter-btn" className="btn btn-warning" onClick={onPerformClear} disabled={isLoading}>
                                Καθαρισμός Φίλτρων <i className="fas fa-times-circle"></i>
                            </button>
                        )}
                    </div>
                    {/* Stats Buttons */}
                    <div className="btn-group" role="group" aria-label="Στατιστικά">
                         {/* Το isLoading εδώ θα μπορούσε να είναι το isStatsLoading από το App αν το περνούσαμε */}
                        <button type="button" className="btn btn-info" onClick={() => onShowStats('projects')} disabled={isLoading}>Top Έργα</button>
                        <button type="button" className="btn btn-info" onClick={() => onShowStats('goals')} disabled={isLoading}>Top Στόχοι</button>
                        <button type="button" className="btn btn-info" onClick={() => onShowStats('criteria')} disabled={isLoading}>Top Κριτήρια</button>
                        <button type="button" className="btn btn-secondary" onClick={() => onShowStats('dataAvailability')} disabled={isLoading}>Status</button>
                    </div>
                </div>
            </div>

            {/* Study List Container */}
            <div id="studies-list-container" className="list-group">
                {isLoading ? (
                    <div className="list-group-item text-center py-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">
                        Σφάλμα φόρτωσης δεδομένων: {error}
                    </Alert>
                ) : studies.length > 0 ? (
                    studies.map(study => (
                        <StudyItem key={study.id} study={study} onViewDetails={onViewDetails} />
                    ))
                ) : (
                    <div className="list-group-item text-center text-muted">Δεν βρέθηκαν μελέτες που να ταιριάζουν στα κριτήρια.</div>
                )}
            </div>
        </section>
    );
}

export default StudyListView;