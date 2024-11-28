import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { useUserContext } from "../../context/StagiaireContext"
import { useNavigate } from "react-router-dom"
import { ADMIN_DASHBOARD_ROUTE, ENCADRANT_DASHBOARD_ROUTE, redirectToDashboard, STAGIAIRE_DASHBOARD_ROUTE } from "../../router"
const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password :z.string().min(8).max(30)
})
export default function StagiaireLogin(){
    const {login,setAuthenticated,setToken} = useUserContext()
    const navigate =useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),

      })
      const {setError , formState:{isSubmitting} } = form
      // 2. Define a submit handler.
    const onSubmit = async values =>  {

        await login(values.email,values.password).then(
            ({status,data}) => {
                if(status === 200){
                    setToken(data.token.plainTextToken)
                    setAuthenticated(true)
                    const {role} = data.user
                    navigate(redirectToDashboard(role))
                }
            }
        ).catch(({response}) => {
            setError('email',{
                message: response.data.errors.email.join()
            })
            //isSubmitting
        })



  }
     // const { setError , formState:{isSubmitting} } = form
      // 2. Define a submit handler.
      /*const onSubmit = async values => {
        await axiosClient.get('/sanctum/csrf-cookie' , values//{
           // baseURL: import.meta.env.VITE_BACKEND_URL
       // }
    )
        const data = axiosClient.post('/api/login',values).then(
            (value) => {
                if(value.status === 204){
                    window.localStorage.setItem('ACCESS_TOKEN','test')
                    navigate(STAGIAIRE_DASHBOARD_ROUTE)
                }
            }
        ).catch(({response}) => {
            console.log(response.data.errors)
            setError('email',{
                message: response.data.errors.Email.join()
            })
            isSubmitting

        })



        console.log(data)
      }*/
        return (
            <div className="flex space-x-8">
              {/* Image */}
              <div className="w-1/2">
                <img src="/public/pic.jpg" className="w-[590px]" />
              </div>
              {/* Formulaire */}
              <div className="w-1/2">
              <br /><br /><br /><br /><br /><br />
              <h1 className="text-3xl">login</h1><br />

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type={'password'} placeholder="Password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button disabled={isSubmitting} type="submit">
                      {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'} />} Login
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          );
        }
/*
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={'password'} placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
        {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'} />} Login
        </Button>
      </form>
    </Form>*/
