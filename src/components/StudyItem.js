import React from 'react';

function StudyItem({ study, onViewDetails }) {
    return (
        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>
                {study.paper_title}
                <small className="text-muted d-block">({study.paper_year}) - {study.paper_venue || 'N/A'}</small>
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