import EncadrantApi from "../../services/Api/EncadrantApi"
import AdminEncadrantsList from "../data-table/AdminEncadrantsList"
import EncadrantCreateForm from "../Forms/EncadrantCreateForm"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs"

export default function ManageEncadrants() {
    return <>
    <div className="relative overflow-x-auto">
      <div className="hidden md:block">
        <div className="">
          <div className="bg-background">
            <div className="grid">
              <div className="col-span-3 lg:col-span-4 ">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="list_encadrants" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="list_encadrants" className="relative">
                          Encadrants
                        </TabsTrigger>
                        <TabsTrigger value="add_encadrants">Ajouter nouveau encadrants</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="list_encadrants"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Tous les encadrants
                          </h2>
                          <p className="text-sm text-muted-foreground">
                             <AdminEncadrantsList/>
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="add_encadrants"
                    >
                        <div className="space-y-1">
                            <EncadrantCreateForm handleSubmit={(values) => EncadrantApi.create(values)}/>
                        </div>

                      <Separator className="my-4" />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  }
