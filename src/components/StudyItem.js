import React from 'react';

function StudyItem({ study, onViewDetails }) {
    // Έλεγχος για σιγουριά ότι το study υπάρχει
    if (!study) {
        return null; // ή εμφάνισε ένα placeholder/error
    }

    return (
        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>
                {study.title || 'Άγνωστος Τίτλος'} {/* Πρόσθεσε fallback αν θέλεις */}
                <small className="text-muted d-block">
                    ({study.year || 'N/A'}) - {study.venue || 'N/A'}
                </small>
             </span>
            <button
                className="btn btn-sm btn-outline-info"
                title="Προβολή Λεπτομερειών"
                onClick={() => onViewDetails(study)}
            >
                <i className="fas fa-eye"></i>
            </button>
        </div>
    );
}

export default StudyItem;