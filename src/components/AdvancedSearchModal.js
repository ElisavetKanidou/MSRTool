import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AdvancedSearchModal({ show, onHide, onApplyFilters, initialFilters }) {
    // Τοπικό state για τα πεδία της φόρμας
    const [filters, setFilters] = useState({ projects: '', criteria: '', goals: '' });

    // Αρχικοποίηση της φόρμας όταν ανοίγει το modal ή αλλάζουν τα αρχικά φίλτρα
    useEffect(() => {
        if (show) {
            setFilters({
                projects: initialFilters?.projects || '', // Χρήση optional chaining και fallback
                criteria: initialFilters?.criteria || '',
                goals: initialFilters?.goals || ''
            });
        }
        // Δεν χρειάζεται να καθαρίζουμε τη φόρμα όταν κλείνει,
        // αφού γεμίζει ξανά με τα initialFilters όταν ανοίγει.
    }, [show, initialFilters]);

    // Ενημέρωση του τοπικού state όταν αλλάζει ένα πεδίο
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Καλεί το callback του App.js με τα τρέχοντα φίλτρα της φόρμας
    const handleApply = () => {
        if (onApplyFilters) {
            onApplyFilters(filters);
        }
        // Το κλείσιμο του modal γίνεται στο App.js μετά την εφαρμογή των φίλτρων
        // onHide(); // Δεν χρειάζεται εδώ
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Σύνθετη Αναζήτηση - Φίλτρα</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { e.preventDefault(); handleApply(); }}> {/* Επιτρέπει Enter στο τελευταίο πεδίο */}
                    <Form.Group className="mb-3" controlId="filterProjects">
                        <Form.Label>Έργα/Πηγές (περιέχει)</Form.Label>
                        <Form.Control
                            type="text"
                            name="projects"
                            placeholder="π.χ. guava, android, scopus"
                            value={filters.projects}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="filterCriteria">
                        <Form.Label>Κριτήρια (περιέχει)</Form.Label>
                        <Form.Control
                            type="text"
                            name="criteria"
                            placeholder="π.χ. java, github, empirical"
                            value={filters.criteria}
                            onChange={handleChange}
                        />
                    </Form.Group>
                     <Form.Group className="mb-3" controlId="filterGoals">
                        <Form.Label>Abstract/Στόχοι (περιέχει)</Form.Label>
                        <Form.Control
                            type="text"
                            name="goals"
                            placeholder="π.χ. migration, testing, prediction"
                            value={filters.goals}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {/* Μπορείς να προσθέσεις κι άλλα πεδία φίλτρων εδώ (Year, Status) */}
                    {/* <Form.Group> ... </Form.Group> */}
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