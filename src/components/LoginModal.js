import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import from react-bootstrap

function LoginModal({ show, onHide, onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        onLogin(username, password);
        // Δεν κλείνουμε εδώ, το App component θα αποφασίσει αν θα κλείσει
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Σύνδεση Χρήστη</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="loginUsername">
                        <Form.Label>Όνομα χρήστη</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="π.χ. admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="loginPassword">
                        <Form.Label>Κωδικός</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="π.χ. password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Ακύρωση
                </Button>
                <Button variant="primary" onClick={handleLoginClick}>
                    Σύνδεση
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;