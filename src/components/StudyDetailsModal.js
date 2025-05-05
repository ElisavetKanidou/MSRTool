import React from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap';

function StudyDetailsModal({ show, onHide, study }) {
    if (!study) return null;

    // Helper function για να σπάει κείμενο με '#' και να φτιάχνει λίστα
    const renderListItems = (itemsString, title) => {
        // Optional chaining για ασφάλεια αν το string είναι null/undefined
        const items = itemsString?.split('#').map(item => item.trim()).filter(Boolean);

        if (!items || items.length === 0) return null; // Έλεγχος αν η λίστα είναι κενή

        return (
            <>
                <strong>{title}:</strong>
                <ListGroup variant="flush" className="mb-2">
                    {items.map((item, index) => (
                        <ListGroup.Item key={index} className="py-1 px-0">{item}</ListGroup.Item>
                    ))}
                </ListGroup>
            </>
        );
    }

     // Helper function για να εμφανίζει απλό κείμενο (π.χ. Abstract)
     const renderTextField = (text, title) => {
        if (!text) return null;
        return (
            <>
                <strong>{title}:</strong>
                <p>{text}</p>
            </>
        );
     }


    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                {/* ===> ΑΛΛΑΓΗ ΕΔΩ <=== */}
                <Modal.Title>{study?.title || 'Λεπτομέρειες Μελέτης'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 {/* ===> ΑΛΛΑΓΗ ΕΔΩ <=== */}
                <p><strong>Συγγραφείς:</strong> {study?.authors || 'N/A'}</p>
                <p>
                    {/* ===> ΑΛΛΑΓΗ ΕΔΩ <=== */}
                    <strong>Έτος:</strong> {study?.year || 'N/A'} |
                    <strong>Τόπος:</strong> {study?.venue || 'N/A'}
                    {/* Το paper_type δεν υπάρχει πια ως ξεχωριστό πεδίο, περιέχεται στα notes */}
                </p>

                 {/* ===> ΑΛΛΑΓΗ ΕΔΩ ΚΑΙ ΧΡΗΣΗ ΝΕΩΝ ΠΕΔΙΩΝ <=== */}
                {/* Το paper_project έγινε source */}
                {renderListItems(study?.source, 'Πηγές/Έργα')}
                {/* Το paper_criteria έγινε inclusion_criteria */}
                {renderListItems(study?.inclusion_criteria, 'Κριτήρια Επιλογής')}
                {/* Το paper_goals έγινε abstract και δεν χρειάζεται split */}
                {renderTextField(study?.abstract, 'Περίληψη/Στόχοι')}

                 {/* ===> ΑΛΛΑΓΗ ΕΔΩ ΚΑΙ ΧΡΗΣΗ ΝΕΟΥ ΠΕΔΙΟΥ <=== */}
                 {/* Εμφάνιση του πεδίου Notes */}
                 {renderTextField(study?.notes, 'Σημειώσεις')}

                {/* Το paper_link έγινε url */}
                {/* Η λογική για το data_available αφαιρέθηκε, αφού δεν έρχεται ως boolean */}
                {study?.url ? (
                    <p>
                       <strong>Σύνδεσμος:</strong>{' '}
                       <a href={study.url} target="_blank" rel="noopener noreferrer">{study.url}</a>
                    </p>
                ) : (
                    <p><Badge bg="secondary">Σύνδεσμος μη διαθέσιμος</Badge></p>
                )}

                {/* Προαιρετικά: Εμφάνιση Keywords και DOI αν υπάρχουν */}
                 {study?.keywords && <p><strong>Λέξεις Κλειδιά:</strong> {study.keywords}</p> }
                 {study?.doi && <p><strong>DOI:</strong> {study.doi}</p> }
                 {/* Προαιρετικά: Εμφάνιση status, quality_score αν υπάρχουν */}
                 {study?.status && <p><strong>Status:</strong> <Badge bg="info">{study.status}</Badge></p> }
                 {study?.quality_score !== null && typeof study?.quality_score !== 'undefined' && <p><strong>Quality Score:</strong> {study.quality_score}</p> }


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Κλείσιμο
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StudyDetailsModal;