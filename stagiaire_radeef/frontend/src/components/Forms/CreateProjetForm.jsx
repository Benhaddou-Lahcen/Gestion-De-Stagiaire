import  { useState } from 'react';
import { axiosClient } from '../../api/axios';

const CreateProjetForm = ({ stagiaireId, encadrantId }) => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Requête POST pour créer un projet
        axiosClient.post('/encadrant/projets', {
            titre,
            description,
            user_id: stagiaireId, // ID du stagiaire
            encadrant_id: encadrantId, // ID de l'encadrant
        })
        .then(response => {
            alert('Projet créé avec succès !');
            // Réinitialiser les champs du formulaire après création
            setTitre('');
            setDescription('');
        })
        .catch(error => {
            console.error('Erreur lors de la création du projet:', error);
            setError('Erreur lors de la création du projet');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Titre du projet</label>
                <input
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description du projet</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit">Créer le projet</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default CreateProjetForm;
