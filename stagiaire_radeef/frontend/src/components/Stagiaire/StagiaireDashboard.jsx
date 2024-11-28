import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/StagiaireContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'; // Shadcn UI Card components
import { Badge } from '@/components/ui/badge'; // Shadcn UI Badge component
import { axiosClient } from '../../api/axios';

export default function StagiaireDashboard() {
  const { user } = useUserContext();
  const [evaluation, setEvaluation] = useState(null);
  const [commentaire, setCommentaire] = useState('');

  // Fonction pour récupérer l'évaluation du stagiaire
  const fetchEvaluation = async () => {
    try {
      const response = await axiosClient.get(`/stagiaire/${user.id}/rapport/evaluation`);
      const evalScore = response.data.evaluation;

      setEvaluation(evalScore);

      // Définir le commentaire en fonction de la note
      if (evalScore >= 1 && evalScore <= 4) {
        setCommentaire('Faible');
      } else if (evalScore === 5 || evalScore === 10) {
        setCommentaire('Moyen');
      } else if (evalScore === 10 || evalScore === 14) {
        setCommentaire('Assez bien');
      } else if (evalScore === 14 || evalScore === 16) {
        setCommentaire('Bien');
      } else if (evalScore > 16) {
        setCommentaire('Excellent');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'évaluation :', error);
    }
  };

  useEffect(() => {
    fetchEvaluation(); // Récupérer l'évaluation dès que le composant se charge
  }, [user]);

  return (
    <div className="container mx-auto py-8">
      <Card className="w-[650px] mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Bienvenue dans votre plateforme, {user.firstname} !</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Vous avez eu une évaluation de <Badge variant="outline" className="ml-2">{evaluation}</Badge> .
          </p>
          <p className="text-lg">
            <strong>Commentaire:</strong> {commentaire ? commentaire : 'Aucune évaluation reçue pour le moment.'}
          </p>
        </CardContent>
        <CardFooter className="text-right">
          <p className="text-sm text-gray-500">
            Stagiaire ID: {user.id} | Email: {user.email}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
