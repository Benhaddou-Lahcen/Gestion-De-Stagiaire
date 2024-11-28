import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from 'react';
import { axiosClient } from '../../api/axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { useUserContext } from "../../context/StagiaireContext";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const StagiaireDetails = () => {
    const { id } = useParams(); // ID du stagiaire
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const SoumissionLoader = toast.loading('Création en cours...');
        try {
            await axiosClient.post('/encadrant/projets', {
                titre,
                description,
                user_id: id, // ID du stagiaire
            });
            toast.success('Projet créé avec succès!'); // Show success toast
            setTitre(''); // Réinitialiser les champs du formulaire
            setDescription('');
        } catch (error) {
            toast.error('Erreur lors de la création du projet.'); // Show error toast
            console.error('Erreur lors de la création du projet', error);
        } finally {
            toast.dismiss(SoumissionLoader);
        }
    };

    return (
        <Card className="w-[1280px]">
            <CardHeader>
                <CardTitle>Ajouter un Projet</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="titre">Titre</label>
                            <Input
                                id="titre"
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                placeholder="Titre du projet"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="description">Description</label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description du projet"
                                required
                            />
                        </div>
                        <Button type="submit" className="mt-2">
                            {loading && <Loader className="mx-2 my-2 animate-spin" />}
                            Créer le Projet
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};


    const Stagiaire = () => {
        const { id } = useParams(); // ID du stagiaire
        const [projet, setProjet] = useState(null); // State to hold the project details
        const [rapport, setRapport] = useState(null); // State to hold the rapport details
        const [loading, setLoading] = useState(false); // State to manage loading
        const navigate = useNavigate();
        const { user } = useUserContext(); // Encadrant connecté
        const { id: stagiaireId } = useParams(); // ID du stagiaire
        const [rapportId, setRapportId] = useState(null);
        const [evaluation, setEvaluation] = useState(0);

        // Fonction pour récupérer l'ID du rapport
        const fetchRapportId = async () => {
            try {
                const response = await axiosClient.get(`/encadrant/rapports/${user.id}/${stagiaireId}/get-rapport-id`);
                setRapportId(response.data.rapport_id);
            } catch (error) {
                console.error("Erreur lors de la récupération du rapport : ", error);
            }
        };

        useEffect(() => {
            fetchRapportId(); // Récupérer l'ID du rapport dès que le composant se charge
        }, [stagiaireId, user]);

        const handleSubmit = async () => {
            const SoumissionLoader = toast.loading('Soumission en cours...');
            if (!rapportId) {
                console.error("ID du rapport non disponible");
                return;
            }
            try {
                await axiosClient.post(`/encadrant/rapports/${rapportId}/evaluate`, {
                    evaluation,
                });
                toast.success('Projet a été évalué avec succès!'); // Show success toast

            } catch (error) {
                toast.error("Erreur lors de l'envoi de l'évaluation");
                console.error("Erreur lors de l'envoi de l'évaluation", error);
            } finally {
                toast.dismiss(SoumissionLoader);
            }
        };



        useEffect(() => {
            // Fetch project details for the stagiaire
            const fetchProject = async () => {
                setLoading(true);
                try {
                    const response = await axiosClient.get(`/encadrant/projets/${id}`);
                    setProjet(response.data.data); // Assuming the response structure
                } catch (error) {
                    toast.error('Erreur lors de la récupération du projet.');
                    console.error('Erreur lors de la récupération du projet', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProject();
        }, [id]);

        useEffect(() => {
            // Fetch rapport for the project
            const fetchRapport = async () => {
                if (projet) {
                    const Loader = toast.loading('Récuperation en cours...');
                    try {
                        const response = await axiosClient.get(`/encadrant/rapports/projet/${projet.id}`);
                        setRapport(response.data.data); // Assuming the response structure
                    } catch (error) {
                        if (error.response && error.response.status === 404) {
                            toast.error('Aucun rapport soumis pour ce projet.');
                        } else {
                            toast.error('Erreur lors de la récupération du rapport.');
                        }
                        console.error('Erreur lors de la récupération du rapport', error);
                    } finally {
                        toast.dismiss(Loader);
                    }
                }
            };

            fetchRapport();
        }, [projet]);

        const handleUpdate = async () => {
            const majLoader = toast.loading('Mise à jour en cours...');
            try {
                await axiosClient.put(`/encadrant/projets/${id}`, {
                    titre: projet.titre,
                    description: projet.description,
                });
                toast.success('Projet mis à jour avec succès!'); // Show success toast
            } catch (error) {
                toast.error('Erreur lors de la mise à jour du projet.'); // Show error toast
                console.error('Erreur lors de la mise à jour du projet', error);
            } finally {
                toast.dismiss(majLoader);
            }
        };

        const handleDelete = async () => {
            const deletingLoader = toast.loading('Suppression en cours...');
            try {
                await axiosClient.delete(`/encadrant/projets/${id}`);
                toast.success('Projet supprimé avec succès!'); // Show success toast
            } catch (error) {
                toast.error('Erreur lors de la suppression du projet.'); // Show error toast
                console.error('Erreur lors de la suppression du projet', error);
            } finally {
                toast.dismiss(deletingLoader); // Dismiss the loading toast
            }
        };

        if (loading) return <Loader className="mx-auto my-4 animate-spin" />;

        return (
            <Card className="w-[500px] mx-auto">
                <CardHeader>
                    <CardTitle>Détails du Projet</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
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

                        {projet && (
                            <div className="flex gap-x-2 mt-2">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button size="sm">Update</Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Update Project</SheetTitle>
                                            <SheetDescription>
                                                Make changes to the project details here.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="flex flex-col space-y-4 p-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <label htmlFor="update-titre">Titre</label>
                                                <Input
                                                    id="update-titre"
                                                    value={projet.titre}
                                                    onChange={(e) =>
                                                        setProjet({
                                                            ...projet,
                                                            titre: e.target.value,
                                                        })
                                                    }
                                                    placeholder="Titre du projet"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <label htmlFor="update-description">Description</label>
                                                <Textarea
                                                    id="update-description"
                                                    value={projet.description}
                                                    onChange={(e) =>
                                                        setProjet({
                                                            ...projet,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                    placeholder="Description du projet"
                                                    required
                                                />
                                            </div>
                                            <Button onClick={handleUpdate} className="mt-2">
                                                {loading && (
                                                    <Loader className="mx-2 my-2 animate-spin" />
                                                )}
                                                Update
                                            </Button>
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="sm" variant="destructive">
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>
                                                Supprimer
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}

                        {projet && (
                            <div>
                                {rapport ? (
                                    <div>
                                        <h3>Rapport pour le projet ayant ID : {projet.id} et soumis le : {projet.date_soumission}</h3>
                                        <Button onClick={() => window.open(rapport.contenu, '_blank')}>
                                            Télécharger / Ouvrir le Rapport
                                        </Button>
                                        <div>
                            <h2>Évaluation du rapport</h2>

                            {/* Slider pour l'évaluation */}
                            <Slider
                                defaultValue={[evaluation]}
                                max={20} // Modifier selon l'échelle d'évaluation, ici 100
                                step={1}
                                className={cn("w-[50%]")}
                                onValueChange={(value) => setEvaluation(value[0])} // On met à jour la valeur d'évaluation
                            />

                            <p>Évaluation: {evaluation}</p>

                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Envoi...' : 'Soumettre'}
                            </Button>
                        </div>
                                    </div>
                                ) : (
                                    <p>Pas de rapport pour l'instant.</p>
                                )}
                            </div>
                        ) }
                    </div>
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
                                <Tabs defaultValue="add_item" className="h-full space-y-6">
                                    <div className="space-between flex items-center">
                                        <TabsList>
                                            <TabsTrigger value="list_items" className="relative">
                                                Stagiaire
                                            </TabsTrigger>
                                            <TabsTrigger value="add_item">Ajouter Projet</TabsTrigger>
                                            <TabsTrigger value="communiquer_item">Communiquer</TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent value="list_items" className="border-none p-0 outline-none">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">
                                                <Stagiaire />
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
                                        <StagiaireDetails />
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
