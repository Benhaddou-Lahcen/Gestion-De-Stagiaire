import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router'
import UserContext from './context/StagiaireContext'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from "@/components/ui/sonner"


function App() {

  return (
    <>
       <UserContext>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router}/>
            </ThemeProvider>
       </UserContext>
       <Toaster />
    </>
  )
}

export default App
