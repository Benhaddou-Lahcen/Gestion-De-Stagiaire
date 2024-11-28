import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"

  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import StagiaireApi from "../../services/Api/StagiaireApi"
import { LOGIN_ROUTE } from "../../router"
import { useUserContext } from "../../context/StagiaireContext"



export default function DefaultDropDownMenu({children}){
    const navigate = useNavigate()

    const {logout: contextLogout , user} = useUserContext()

    const logout = async () => {
        StagiaireApi.logout().then( () => {
            contextLogout()
            navigate(LOGIN_ROUTE)
        })
    }
    return <>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button><User className="mr-2 h-4 w-4" />{user.firstname} </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            {children}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
}
