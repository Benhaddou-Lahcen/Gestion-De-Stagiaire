/*import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/StagiaireContext";
import StagiaireApi from "../services/Api/Stagiaire/StagiaireApi";
import { LOGIN_ROUTE, STAGIAIRE_DASHBOARD_ROUTE } from "../router";
import StagiaireDropDownMenu from "../StagiaireDropDownMenu";
import { StagiaireAdministrationSideBar } from "../Administration/StagiaireAdministrationSideBar";
import { ModeToggle } from "../components/mode-toggle";*/

import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import StagiaireApi from "../services/Api/StagiaireApi";
import { useUserContext } from "../context/StagiaireContext";
import { LOGIN_ROUTE, redirectToDashboard, STAGIAIRE_DASHBOARD_ROUTE } from "../router";
import Logo from "../components/Logo";
import StagiaireDropDownMenu from "./drop-down-menu/StagiaireDropDownMenu";
import { ModeToggle } from "../components/mode-toggle";
import { StagiaireAdministrationSideBar } from "./Administration/StagiaireAdministrationSideBar";
import { House } from "lucide-react";

export default function StagiaireDashboardLayout() {
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
              <Link to={STAGIAIRE_DASHBOARD_ROUTE}> <House /></Link>
            </li>
            <li className="ml-5 px-2 py-1">
                <StagiaireDropDownMenu/>
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
                <StagiaireAdministrationSideBar/>
            </div>
            <div className="w-100 md:w-10/12 border rounded-l">
                <Outlet/>
            </div>
        </div>
    </main>
  </>
  }


