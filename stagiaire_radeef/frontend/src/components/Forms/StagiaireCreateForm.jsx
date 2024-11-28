import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "sonner";

const formSchema = z.object({
  firstname: z.string().max(50),
  lastname: z.string().max(50),
  date_of_birth: z.string(),
  gender: z.string().max(1),
  address: z.string().max(255),
  email: z.string().email().min(2).max(30),
  password: z.string().min(8).max(30),
  ecole: z.string().max(255),
})
export default function StagiaireCreateForm({handleSubmit,values}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: values || {}
  })
  const {setError, formState: {isSubmitting}, reset} = form
  const isUpdate = values !== undefined
  const onSubmit = async values => {
    const loaderMsg = isUpdate? 'Mise à jour en cours.':'Ajout de stagiaire.'
    const loader = toast.loading(loaderMsg)

    await handleSubmit(values).then(
      ({status, data}) => {
        if (status === 200) {
          toast.success(data.message)
          reset()
        }
      }).catch((all) => {
      Object.entries(response.data.errors).forEach((error) => {
        const [fieldName, errorMessages] = error
        setError(fieldName, {
          message: errorMessages.join()
        })
      })
    }).finally(() => {
      toast.dismiss(loader)
    })
  }

  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Prenom</FormLabel>
              <FormControl>
                <Input placeholder="Prenom" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({field}) => (
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
                <Input type={'date'} placeholder="Date de naissance" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({field}) => (
            <FormItem className="space-y-3">
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="m"/>
                    </FormControl>
                    <FormLabel className="font-normal">
                      Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="f"/>
                    </FormControl>
                    <FormLabel className="font-normal">
                      Female
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="address"
          render={({field}) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Address"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={'password'} placeholder="Password" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ecole"
          render={({field}) => (
            <FormItem>
              <FormLabel>Ecole</FormLabel>
              <FormControl>
                <Input  placeholder="Ecole" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button className={'mt-2'} type="submit">
          {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '}
          {isUpdate ? 'Modifier': 'Creer'}
        </Button>
      </form>
    </Form>
  </>
}
