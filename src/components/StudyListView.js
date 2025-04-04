import React, { useState } from 'react';
import StudyItem from './StudyItem';

function StudyListView({ studies, isLoading, onViewDetails, onSearch, onAdvancedSearchClick, onClearFilters, showClearFilters, onShowStats }) {
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setLocalSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(localSearchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <section id="studies-view">
            {/* Search and Filter Controls */}
            <div className="search-controls card p-3 mb-4 shadow-sm">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        id="search-input"
                        className="form-control"
                        placeholder="Αναζήτηση για άρθρο..."
                        aria-label="Αναζήτηση άρθρου"
                        value={localSearchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button id="search-button" className="btn btn-outline-secondary" type="button" onClick={handleSearchClick}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <div>
                        <button id="advanced-search-btn" className="btn btn-primary me-2" onClick={onAdvancedSearchClick}>
                            Σύνθετη Αναζήτηση <i className="fas fa-filter"></i>
                        </button>
                        {showClearFilters && (
                            <button id="clear-filter-btn" className="btn btn-warning" onClick={onClearFilters}>
                                Καθαρισμός Φίλτρων <i className="fas fa-times-circle"></i>
                            </button>
                        )}
                    </div>
                    <div className="btn-group" role="group" aria-label="Στατιστικά">
                        <button type="button" className="btn btn-info" onClick={() => onShowStats('projects')}>Top Έργα</button>
                        <button type="button" className="btn btn-info" onClick={() => onShowStats('goals')}>Top Στόχοι</button>
                        <button type="button" className="btn btn-info" onClick={() => onShowStats('criteria')}>Top Κριτήρια</button>
                        <button type="button" className="btn btn-secondary" onClick={() => onShowStats('dataAvailability')}>Διαθ. Δεδομένων</button>
                     </div>
                </div>
            </div>

            {/* Study List */}
            <div id="studies-list-container" className="list-group">
                {isLoading ? (
                    <>
                        <div className="list-group-item placeholder-glow"><span className="placeholder col-12"></span></div>
                        <div className="list-group-item placeholder-glow"><span className="placeholder col-12"></span></div>
                        <div className="list-group-item placeholder-glow"><span className="placeholder col-12"></span></div>
                    </>
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