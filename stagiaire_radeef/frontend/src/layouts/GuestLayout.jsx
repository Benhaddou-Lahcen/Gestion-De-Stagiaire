import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useEffect } from "react";
import {  STAGIAIRE_DASHBOARD_ROUTE } from "../router";
import { useUserContext } from "../context/StagiaireContext";
import { ModeToggle } from "../components/mode-toggle";
import { KeyRound, KeyRoundIcon } from "lucide-react";

export default function GuestLayout() {
    const navigate = useNavigate()
    const context = useUserContext()

    useEffect( () => {
        if (context.authenticated) {
            navigate(STAGIAIRE_DASHBOARD_ROUTE)
        }
    });
    return <>
    <header>
      <div
        className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
          <Logo/>
        </div>
        <div>
          <ul className="flex text-white">
            <li className="ml-5 px-2 py-1">
                <ModeToggle/>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main className={'container'}>
      <Outlet/>
    </main>
  </>
  }
