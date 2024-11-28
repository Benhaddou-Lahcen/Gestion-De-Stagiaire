import AssignCreateForm from "../Forms/AssignCreateForm";
import AssignApi from "../../services/Api/AssignApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";

export default function ManageAssign() {
  const handleSubmit = async (values) => {
    try {
      const response = await AssignApi.create(values);
      return response;
    } catch (error) {
      console.error("Error creating assignment:", error);
      throw error;
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="hidden md:block">
        <div className="bg-background">
          <div className="grid">
            <div className="col-span-3 lg:col-span-4">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="add_assignments" className="h-full space-y-6">
                  <div className="flex items-center space-between">
                    <TabsList>
                      <TabsTrigger value="add_assignments">Ajouter affectation</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="add_assignments">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Nouveau affectation
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Affecter un stagiaire à un ou deux encadrants.
                      </p>
                    </div>
                    <Separator className="my-4" />
                    <AssignCreateForm handleSubmit={handleSubmit} />
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
