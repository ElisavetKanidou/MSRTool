import React from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap';

function StudyDetailsModal({ show, onHide, study }) {
    if (!study) return null;

    const renderListItems = (itemsString, title) => {
        if (!itemsString) return null;
        const items = itemsString.split('#').map(item => item.trim()).filter(Boolean);
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

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{study.paper_title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Συγγραφείς:</strong> {study.paper_author || 'N/A'}</p>
                <p><strong>Έτος:</strong> {study.paper_year || 'N/A'} | <strong>Τόπος:</strong> {study.paper_venue || 'N/A'} | <strong>Τύπος:</strong> {study.paper_type || 'N/A'}</p>

                {renderListItems(study.paper_project, 'Έργα')}
                {renderListItems(study.paper_criteria, 'Κριτήρια Επιλογής')}
                {renderListItems(study.paper_goals, 'Στόχοι Μελέτης')}

                {study.paper_link ? (
                    <p>
                       <strong>Σύνδεσμος:</strong>{' '}
                       <a href={study.paper_link} target="_blank" rel="noopener noreferrer">{study.paper_link}</a>
                       {' '} <Badge bg={study.data_available ? "success" : "warning"}>{study.data_available ? "Δεδομένα Διαθέσιμα" : "Link Παρέχεται"}</Badge>
                    </p>
                ) : (
                     <p><Badge bg="danger">Δεδομένα Μη Διαθέσιμα</Badge></p>
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

export default StudyDetailsModal;