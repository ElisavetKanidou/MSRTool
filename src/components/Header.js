import React from 'react';

function Header({ isLoggedIn, currentUser, onLoginClick, onLogoutClick, onAddPaperClick }) {
    return (
        <header className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
            <div id="auth-controls">
                {!isLoggedIn ? (
                    <button id="login-btn" className="btn btn-outline-primary" onClick={onLoginClick}>
                       <i className="fas fa-sign-in-alt me-1"></i> Σύνδεση
                    </button>
                ) : (
                    <span id="user-info">
                        <button id="logout-btn" className="btn btn-outline-secondary me-2" onClick={onLogoutClick}>
                            <i className="fas fa-sign-out-alt me-1"></i> Logout - {currentUser}
                        </button>
                        <button id="add-paper-btn" className="btn btn-success" onClick={onAddPaperClick}>
                           <i className="fas fa-plus-circle me-1"></i> Προσθήκη Νέας Μελέτης
                        </button>
                     </span>
                )}
            </div>
             {/* Μπορούμε να βάλουμε τον τίτλο εδώ αν θέλουμε να μην είναι στο App.js */}
            {/* <h2 className="text-center flex-grow-1">Εργαλείο Επισκόπησης Μελετών</h2> */}
            <div>{/* Placeholder */}</div>
        </header>
    );
}

export default Header;