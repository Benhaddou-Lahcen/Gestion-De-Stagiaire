import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";  // Importing toast from sonner
import { useEffect, useState } from "react";
import EncadrantApi from "../../services/Api/EncadrantApi";
import StagiaireAdminApi from "../../services/Api/StagiaireAdminApi";

const formSchema = z.object({
  user_id: z.string().nonempty(),
  encadrant_id: z.string().nonempty(),
});

export default function AssignCreateForm({ handleSubmit, values }) {
  const [encadrants, setEncadrants] = useState([]);
  const [users, setUsers] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: values || {},
  });

  const { setError, formState: { isSubmitting }, reset } = form;

  const isUpdate = values !== undefined;

  useEffect(() => {
    EncadrantApi.all().then(({ data }) => setEncadrants(data.data));
    StagiaireAdminApi.all().then(({ data }) => setUsers(data.data));
  }, []);

  const onSubmit = async (values) => {
    const loaderMsg = isUpdate ? "Mise à jour de l'affectation..." : 'Affectation des encadrants en cours...';
    const loader = toast.loading(loaderMsg);  // Show loading toast

    await handleSubmit(values)
      .then(({ status, data }) => {
        if (status === 200) {
          toast.success(data.message);  // Show success toast
          reset();
        }
      })
      .catch((error) => {
        Object.entries(error.response.data.errors).forEach(([fieldName, errorMessages]) => {
          setError(fieldName, { message: errorMessages.join() });
        });
        toast.error("Failed to submit the form.");  // Show error toast
      })
      .finally(() => {
        toast.dismiss(loader);  // Dismiss the loading toast
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stagiaire</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner stagiaire" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user, key) => (
                    <SelectItem key={key} value={user.id.toString()}>{user.firstname} {user.lastname}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="encadrant_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Encadrant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner encadrant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {encadrants.map((encadrant, key) => (
                    <SelectItem key={key} value={encadrant.id.toString()}>{encadrant.firstname} {encadrant.lastname}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" type="submit">
          {isSubmitting && <Loader className="mx-2 my-2 animate-spin" />} {' '}
          {isUpdate ? 'Modifier' : 'Creer'}
        </Button>
      </form>
    </Form>
  );
}
