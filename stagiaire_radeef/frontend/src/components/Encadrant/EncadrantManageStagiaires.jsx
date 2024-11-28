import { useEffect, useState } from "react";
import { DataTable } from "../data-table/DataTable";
import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { axiosClient } from "../../api/axios";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function TableauStagiaires() {
  const [stagiaires, setStagiaires] = useState([]);

  const StagiairesColumns = [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="#ID" />,
    },
    {
      accessorKey: "firstname",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Firstname" />,
    },
    {
      accessorKey: "lastname",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Lastname" />,
    },
    {
      accessorKey: "date_of_birth",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date of birth" />,
    },
    {
      accessorKey: "gender",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
      cell: ({ row }) => {
        const value = row.getValue("gender");
        return <>{value === 'm' ? 'Male' : 'Female'}</>;
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },
    {
      accessorKey: "ecole",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ecole" />,
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Updated at" />,
      cell: ({ row }) => {
        const date = row.getValue("updated_at");
        return <div className="text-right font-medium">{new Date(date).toString()}</div>;
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const { id } = row.original;
          return (
            <div className="flex gap-x-1">
              {/* Bouton Details */}
              <Link to={`/stagiaire/${id}`}>
                <Button size="sm" variant="outline">Details</Button>
              </Link>
            </div>
          );
        },
      },
  ];

  useEffect(() => {
    axiosClient.get('/encadrant/stagiaires') // Utilisez axiosClient
      .then(response => {
        console.log('Response:', response);
        if (response.data && Array.isArray(response.data.data)) {
          setStagiaires(response.data.data);
        } else {
          console.error('Invalid response structure', response);
        }
      })
      .catch(error => {
        console.error('Il y a eu une erreur!', error);
      });
  }, []);

  return (
    <>
      <DataTable columns={StagiairesColumns} data={stagiaires} />
    </>
  );
}
