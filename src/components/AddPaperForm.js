import React, { useState } from 'react';

function AddPaperForm({ onSubmit, onBack }) {
    const [formData, setFormData] = useState({
        paper_title: '',
        paper_type: '',
        paper_venue: '',
        paper_authors: '',
        paper_year: new Date().getFullYear(),
        paper_link: '',
        paper_project: '',
        paper_criteria: '',
        paper_goals: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.paper_title || !formData.paper_year) {
            alert('Παρακαλώ συμπληρώστε τον Τίτλο και το Έτος.');
            return;
        }
        onSubmit(formData);
        // Optional: Clear form after submission if needed, but we navigate away
        // setFormData({ ...initial state... });
    };

    return (
         <section id="add-paper-view" className="card p-4 shadow-sm">
             <div className="d-flex justify-content-between align-items-center mb-3">
                 <h4>Προσθήκη Νέας Εμπειρικής Μελέτης</h4>
                <button onClick={onBack} className="btn btn-secondary">
                     <i className="fas fa-arrow-left me-1"></i> Πίσω στη Λίστα
                </button>
             </div>
            <form id="add-paper-form" onSubmit={handleSubmit}>
                {/* ... (Όλα τα input fields όπως στο HTML σου) ... */}
                 <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="paper_title" className="form-label">Τίτλος Μελέτης <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="paper_title" value={formData.paper_title} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="paper_type" className="form-label">Είδος Δημοσίευσης</label>
                        <input type="text" className="form-control" id="paper_type" value={formData.paper_type} onChange={handleChange} />
                    </div>
                </div>
                 <div className="row">
                     <div className="col-md-6 mb-3">
                        <label htmlFor="paper_venue" className="form-label">Τόπος Δημοσίευσης</label>
                        <input type="text" className="form-control" id="paper_venue" value={formData.paper_venue} onChange={handleChange} />
                    </div>
                     <div className="col-md-6 mb-3">
                        <label htmlFor="paper_year" className="form-label">Έτος <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" id="paper_year" value={formData.paper_year} onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="paper_authors" className="form-label">Συγγραφείς (χωρισμένοι με κόμμα)</label>
                    <input type="text" className="form-control" id="paper_authors" value={formData.paper_authors} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="paper_link" className="form-label">Σύνδεσμος Δεδομένων/Paper</label>
                    <input type="url" className="form-control" id="paper_link" value={formData.paper_link} onChange={handleChange} placeholder="https://..."/>
                </div>
                <div className="mb-3">
                    <label htmlFor="paper_project" className="form-label">Έργα (χωρισμένα με #)</label>
                    <textarea className="form-control" id="paper_project" rows="2" value={formData.paper_project} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="paper_criteria" className="form-label">Κριτήρια Επιλογής (χωρισμένα με #)</label>
                    <textarea className="form-control" id="paper_criteria" rows="3" value={formData.paper_criteria} onChange={handleChange}></textarea>
                </div>
                 <div className="mb-3">
                    <label htmlFor="paper_goals" className="form-label">Στόχοι Μελέτης (χωρισμένοι με #)</label>
                    <textarea className="form-control" id="paper_goals" rows="3" value={formData.paper_goals} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                   <i className="fas fa-check me-1"></i> Υποβολή
                </button>
                <p className="mt-2"><small><span className="text-danger">*</span> Υποχρεωτικά πεδία</small></p>
            </form>
        </section>
    );
}

export default AddPaperForm;