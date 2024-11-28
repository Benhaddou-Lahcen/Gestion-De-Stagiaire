import axios from "axios";

const fetchAssignedStagiaires = async () => {
  try {
    const response = await axios.get('/encadrant/stagiaires-assigned', {
      headers: {
        Authorization: `Bearer ${token}`,  // Assurez-vous d'envoyer le token si nécessaire
      }
    });
    console.log('Assigned stagiaire IDs:', response.data);
  } catch (error) {
    console.error('Error fetching stagiaires:', error);
  }
};

fetchAssignedStagiaires();
