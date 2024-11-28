import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import StagiaireApi from "../services/Api/StagiaireApi";
import { useUserContext } from "../context/StagiaireContext";
import { ENCADRANT_DASHBOARD_ROUTE, LOGIN_ROUTE, redirectToDashboard} from "../router";
import Logo from "../components/Logo";
import { ModeToggle } from "../components/mode-toggle";

import EncadrantDropDownMenu from "./drop-down-menu/EncadrantDropDownMenu";
import { EncadrantAdministrationSideBar } from "./Administration/EncadrantAdministrationSideBar";
import { House } from "lucide-react";

export default function EncadrantDashboardLayout() {
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = useState(true)
    const { authenticated , setUser , setAuthenticated ,  logout: contextLogout} = useUserContext()
    useEffect( () => {
        if(authenticated === true){
            setIsLoading(false)
            StagiaireApi.getUser().then( ({data}) => {
                /*const {role} = data.user
                if(role !== 'stagiaire'){
                    navigate(redirectToDashboard(role))
                }*/
                setUser(data)
                setAuthenticated(true)
            }).catch((reason) => {//reason
                contextLogout()
            })
        }else{
            navigate(LOGIN_ROUTE)
        }

    }, [authenticated]);
    if(isLoading){
        return <></>
    }
    return <>
    <header>
      <div
        className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
          <Logo/>
          <strong className="ml-5 px-2 py-1">RADEEF</strong>
        </div>
        <div>
          <ul className="flex text-white place-items-center">
            <li className="ml-5 px-2 py-1">
              <Link to={ENCADRANT_DASHBOARD_ROUTE}> <House/></Link>
            </li>
            <li className="ml-5 px-2 py-1">
                <EncadrantDropDownMenu/>
            </li>
            <li className="ml-5 px-2 py-1">
                <ModeToggle/>
            </li>

          </ul>
        </div>
      </div>
    </header>
    <main className={'mx-auto px-10 space-y-4 py-4'}>
        <div className="flex">
            <div className="w-100 md:w-2/12 border mr-2 rounded-l">
                <EncadrantAdministrationSideBar/>
            </div>
            <div className="w-100 md:w-10/12 border rounded-l">
                <Outlet/>
            </div>
        </div>
    </main>
  </>
  }


