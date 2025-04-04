import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AdvancedSearchModal({ show, onHide, onApplyFilters, initialFilters }) {
    const [filters, setFilters] = useState({ projects: '', criteria: '', goals: '' });

    // Initialize state when modal opens with current filters
    useEffect(() => {
        if (show) {
            setFilters(initialFilters);
        }
    }, [show, initialFilters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        onApplyFilters(filters);
        onHide(); // Close modal after applying
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Σύνθετη Αναζήτηση - Φίλτρα</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="filterProjects">
                        <Form.Label>Έργα (περιέχει λέξη-κλειδί)</Form.Label>
                        <Form.Control
                            type="text"
                            name="projects"
                            placeholder="π.χ. guava, android"
                            value={filters.projects}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="filterCriteria">
                        <Form.Label>Κριτήρια (περιέχει λέξη-κλειδί)</Form.Label>
                        <Form.Control
                            type="text"
                            name="criteria"
                            placeholder="π.χ. java, github"
                            value={filters.criteria}
                            onChange={handleChange}
                        />
                    </Form.Group>
                     <Form.Group className="mb-3" controlId="filterGoals">
                        <Form.Label>Στόχοι (περιέχει λέξη-κλειδί)</Form.Label>
                        <Form.Control
                            type="text"
                            name="goals"
                            placeholder="π.χ. migration, defect prediction"
                            value={filters.goals}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Ακύρωση
                </Button>
                <Button variant="primary" onClick={handleApply}>
                    Εφαρμογή Φίλτρων
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AdvancedSearchModal;