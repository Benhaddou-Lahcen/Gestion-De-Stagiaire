import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import EncadrantApi from "../../services/Api/EncadrantApi";
import { Button } from "../ui/button"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../ui/alert-dialog"
  import { toast } from "sonner"
import { Trash2Icon } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"
import EncadrantCreateForm from "../Forms/EncadrantCreateForm";




export default function AdminEncadrantsList() {
    const [data, setData] = useState([]);
    const AdminEncadrantsColumns = [
        {
          accessorKey: "id",
          header: ({ column }) => {
              return <DataTableColumnHeader column={column} title="#Id" />
            },
        },
        {
          accessorKey: "firstname",
          header: ({ column }) => {
              return <DataTableColumnHeader column={column} title="Prenom" />
            },
        },
        {
          accessorKey: "lastname",
          header: ({ column }) => {
              return <DataTableColumnHeader column={column} title="Nom" />
            },
        },
        {
          accessorKey: "date_of_birth",
          header: ({ column }) => {
              return <DataTableColumnHeader column={column} title="Date de naissance" />
            },
        },
        {
          accessorKey: "gender",
          header: ({ column }) => {
              return <DataTableColumnHeader column={column} title="Genre" />
            },
          cell: ({ row }) => {
              const value = row.getValue("gender")
              const gender = value === 'm' ? 'Male':'Female'
              return <>{gender}</>
            },
        },
        {
          accessorKey: "address",
          header: ({ column }) => {
              return <DataTableColumnHeader column={column} title="Address" />
            },
        },
        {
          accessorKey: "phone",
          header: ({ column }) => {
              return <DataTableColumnHeader column={column} title="Telephone" />
            },
          cell: ({ row }) => {
              const phone = row.getValue("phone")
              return <div className="text-right font-medium">+212-{phone}</div>
            },
        },
        {
          accessorKey: "email",
          header: ({ column }) => {
              return <DataTableColumnHeader column={column} title="Email" />
            },
        },
        {
          accessorKey: "updated_at",
          header: ({ column }) => {
              return <DataTableColumnHeader column={column} title="Updated at" />
            },
          cell: ({ row }) => {
              const date = row.getValue("updated_at")
              const formatted = new Date(date).toString()

              return <div className="text-right font-medium">{formatted}</div>
            },
        },
            {
              id: "actions",
              cell: ({ row }) => {

            const {id, firstname, lastname} = row.original
            const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
                return (<div className={'flex gap-x-1'}>
                <Sheet>
                <SheetTrigger>
                    <Button size={'sm'}>Modifier</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Modifier Encadrant {firstname} {lastname} </SheetTitle>
                    <SheetDescription>
                     Modifiez votre profil ici. Cliquez sur "Enregistrer" lorsque vous avez terminé.
                        <EncadrantCreateForm values={row.original} handleSubmit={(values) => {
                      const promise = EncadrantApi.update(id, values)
                      promise.then((response) => {
                        const {encadrant} = response.data
                        const elements = data.map((item) => {
                          if(item.id === id) {
                            return encadrant
                          }
                          return item
                        })
                        setData(elements)
                        setOpenUpdateDialog(false);
                      });

                      return promise
                    }}/>
                    </SheetDescription>
                    </SheetHeader>
                </SheetContent>
                </Sheet>
                  <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={'sm'} variant={'destructive'}>Supprimer</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous absolument sûr de vouloir supprimer ?
                    <span className={'font-bold'}> {firstname} {lastname}</span> ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                  Cette action est irréversible. Cela supprimera définitivement votre compte et effacera vos données de nos serveurs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={async () => {
                    const deletingLoader = toast.loading('Suppression en cours.')
                    const {data: deletedEncadrant , status} = await EncadrantApi.delete(id)
                    toast.dismiss(deletingLoader)
                    if (status === 200) {
                      setData(data.filter((encadrant ) => encadrant .id !== id))
                      toast.success('Encadrant supprimé', {
                        description: `Encadrant supprimé avec succès. ${deletedEncadrant.data.firstname} ${deletedEncadrant.data.lastname}`,
                        icon: <Trash2Icon/>
                      })
                    }
                  }} >Supprimer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
                </div>

                )
              },
        },

      ]

    useEffect(() => {
        EncadrantApi.all().then(({ data }) => setData(data.data));
    }, []);

    return (
        <>
            <DataTable columns={AdminEncadrantsColumns} data={data} />
        </>
    );
}
