import { useState, useEffect } from 'react';
import { axiosClient } from '../../api/axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useUserContext } from '../../context/StagiaireContext';
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const StagiaireHome = () => {
    const { user } = useUserContext(); // Récupérer l'utilisateur connecté
    const [projet, setProjet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch project details for the connected stagiaire
        const fetchProject = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(`/encadrant/projets/${user.id}`); // Utiliser l'ID du stagiaire connecté
                setProjet(response.data.data); // Supposant que la structure de la réponse soit correcte
            } catch (error) {
                toast.error('Erreur lors de la récupération du projet.');
                console.error('Erreur lors de la récupération du projet', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchProject();
        }
    }, [user]);

    if (loading) return <Loader className="mx-auto my-4 animate-spin" />;

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Détails du Projet</CardTitle>
            </CardHeader>
            <CardContent>
                {projet ? (
                    <>
                        <CardDescription>
                            <div>
                                <strong>Titre:</strong> {projet.titre}
                            </div>
                            <div>
                                <strong>Description:</strong> {projet.description}
                            </div>
                        </CardDescription>
                    </>
                ) : (
                    <p>Aucun projet trouvé pour ce stagiaire.</p>
                )}
            </CardContent>
        </Card>
    );
};


    const SubmitRapport = () => {
        const { user } = useUserContext(); // Récupérer le stagiaire connecté
        const [projet, setProjet] = useState(null);
        const [loading, setLoading] = useState(true); // State pour gérer le chargement
        const [file, setFile] = useState(null); // State pour le fichier

        useEffect(() => {
            // Fetch project details for the connected stagiaire
            const fetchProject = async () => {
                setLoading(true);
                try {
                    const response = await axiosClient.get(`/encadrant/projets/${user.id}`); // Récupérer le projet du stagiaire
                    setProjet(response.data.data);
                } catch (error) {
                    toast.error('Erreur lors de la récupération du projet.');
                    console.error('Erreur lors de la récupération du projet', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProject();
        }, [user.id]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!file) {
                toast.error('Veuillez sélectionner un fichier.');
                return;
            }

            setLoading(true);

            const formData = new FormData();
            formData.append('contenu', file);  // Ajouter le fichier sélectionné
            formData.append('projet_id', projet.id);  // Utiliser l'ID du projet récupéré
            formData.append('user_id', user.id);  // Utiliser l'ID du stagiaire connecté
            formData.append('encadrant_id', projet.encadrant_id);  // Utiliser l'ID de l'encadrant associé au projet
            formData.append('date_soumission', new Date().toISOString().split('T')[0]); // Date de soumission automatique

            try {
                const response = await axiosClient.post('/stagiaire/rapports', formData);
                toast.success('Rapport soumis avec succès.');
                console.log(response.data);
            } catch (error) {
                toast.error("Erreur lors de la soumission du rapport.");
                console.error('Erreur de soumission', error);
            } finally {
                setLoading(false);
            }
        };

        if (loading) return <Loader className="mx-auto my-4 animate-spin" />;


        return (
            <Card className="w-[700px] mx-auto">
                <CardHeader>
                    <CardTitle>Soumettre le Rapport</CardTitle>
                </CardHeader>
                <CardContent>
                    {projet ? (
                        <form onSubmit={handleSubmit}>
                            <CardDescription>
                                <div className="mt-0">
                                    <label htmlFor="rapport-file"><strong>Veillez selectionnez un fichier de format pdf , doc ,docx</strong></label>
                                    <input
                                        type="file"
                                        id="rapport-file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        accept=".pdf,.doc,.docx"
                                        required
                                    />
                                </div>
                            </CardDescription>
                            <Button type="submit" className="mt-4">Soumettre</Button>
                        </form>
                    ) : (
                        <p>Aucun projet trouvé pour ce stagiaire.</p>
                    )}
                </CardContent>
            </Card>
        );
    };




export default function Manage() {
    return (
        <div className="relative overflow-x-auto">
            <div className="hidden md:block">
                <div className="bg-background">
                    <div className="grid">
                        <div className="col-span-3 lg:col-span-4">
                            <div className="h-full px-4 py-6 lg:px-8">
                                <Tabs defaultValue="list_items" className="h-full space-y-6">
                                    <div className="space-between flex items-center">
                                        <TabsList>
                                            <TabsTrigger value="list_items" className="relative">
                                            Tâche
                                            </TabsTrigger>
                                            <TabsTrigger value="add_item">Rapport</TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent value="list_items" className="border-none p-0 outline-none">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">
                                                <StagiaireHome />
                                                </p>
                                            </div>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="relative">
                                            <ScrollArea>
                                                <div className="flex space-x-4 pb-4">
                                                    {/* Stagiaire list items */}
                                                </div>
                                                <ScrollBar orientation="horizontal" />
                                            </ScrollArea>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="add_item">
                                        <SubmitRapport/>
                                        <Separator className="my-4" />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

