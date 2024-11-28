import { useUserContext } from "../../context/StagiaireContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function EncadrantDashboard() {
  const { user } = useUserContext();

  if (!user) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="container mx-auto py-10">

      <Card className="mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center">

            <Avatar className="w-16 h-16 mr-4">
            <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user.name ? user.name.charAt(0) : "E"}</AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Bienvenue, {user.name} !
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Encadrant
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Gérer vos stagiaires assignés et leurs projets , l'evaluation de rapport associé à chacun !
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Date de création du compte : {new Date(user.created_at).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      
      {/* Additional Information (Optional) */}
      <div className="mt-6">
        <Badge variant="outline" className="text-sm px-3 py-1">
          Rôle : Encadrant
        </Badge>
      </div>
    </div>
  );
}
