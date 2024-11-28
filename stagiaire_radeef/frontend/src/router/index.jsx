import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
//import Register from "../pages/Register";
import Login from "../pages/Login";
//import Users from "../pages/Users";
import NotFound from "../pages/NotFound";
import Layout from "../layouts/Layout";
import GuestLayout from "../layouts/GuestLayout";
import StagiaireDashboardLayout from "../layouts/StagiaireDashboardLayout";
const ADMIN_BASE_ROUTE = '/admin'
const ENCADRANT_BASE_ROUTE = '/encadrant'
const STAGIAIRE_BASE_ROUTE = '/stagiaire'
import StagiaireDashboard from "../components/Stagiaire/StagiaireDashboard";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminDashboard from "../components/Admin/AdminDashboard";
import EncadrantDashboardLayout from "../layouts/EncadrantDashboardLayout";
import EncadrantDashboard from "../components/Encadrant/EncadrantDashboard";
import ManageEncadrants from "../components/Admin/ManageEncadrants";
import ManageAssign from "../components/Admin/ManageAssign";
import ManageStagiaires from "../components/Admin/ManageStagiaires";
import EncadrantManageStagiaires from "../components/Encadrant/EncadrantManageStagiaires";
import StagiaireDetails from "../components/Encadrant/StagiaireDetails";
import StagiaireHome from "../components/Stagiaire/StagiaireHome";
export const LOGIN_ROUTE ='/login'
export const STAGIAIRE_DASHBOARD_ROUTE =STAGIAIRE_BASE_ROUTE + '/dashboard'
export const STAGIAIRE_MANAGE_ROUTE =STAGIAIRE_BASE_ROUTE + '/manage'
export const ADMIN_DASHBOARD_ROUTE =ADMIN_BASE_ROUTE + '/dashboard'
export const ADMIN_MANAGE_ENCADRANTS_ROUTE =ADMIN_BASE_ROUTE + '/manage-encadrants'
export const ADMIN_MANAGE_STAGIAIRES_ROUTE =ADMIN_BASE_ROUTE + '/manage-stagiaires'
export const ENCADRANT_MANAGE_STAGIAIRES_ROUTE =ENCADRANT_BASE_ROUTE + '/manage-stagiaires'
export const ADMIN_MANAGE_STAGIAIRES_ASSIGN_ROUTE =ADMIN_BASE_ROUTE + '/manage-stage'
export const ENCADRANT_DASHBOARD_ROUTE ='/encadrant/dashboard'
export const redirectToDashboard = (roleType) => {
    switch (roleType) {
        case 'stagiaire':
            return(STAGIAIRE_DASHBOARD_ROUTE);
        case 'admin':
            return(ADMIN_DASHBOARD_ROUTE);
        case 'encadrant' :
            return(ENCADRANT_DASHBOARD_ROUTE);

    }
}

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            /*{
                path: '/register',
                element: <Register />
            },
            {
                path: '/users',
                element: <Users />
            },*/
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
    {
        element: <GuestLayout/>,
        children: [
            {
                path: LOGIN_ROUTE,
                element: <Login />
            },
        ]
    },
    {
        element: <StagiaireDashboardLayout/>,
        children: [
            {
                path: STAGIAIRE_DASHBOARD_ROUTE,
                element: <StagiaireDashboard/>
            },
            {
                path: STAGIAIRE_MANAGE_ROUTE,
                element: <StagiaireHome/>
            },
        ]
    },
    {
        element: <AdminDashboardLayout/>,
        children: [
            {
                path: ADMIN_DASHBOARD_ROUTE,
                element: <AdminDashboard/>
            },
            {
                path: ADMIN_MANAGE_ENCADRANTS_ROUTE,
                element: <ManageEncadrants/>
            },
            {
                path: ADMIN_MANAGE_STAGIAIRES_ROUTE,
                element: <ManageStagiaires/>
            },
            {
                path:  ADMIN_MANAGE_STAGIAIRES_ASSIGN_ROUTE,
                element: <ManageAssign/>
            },

        ]
    },
    {
      element: <EncadrantDashboardLayout/>,
      children: [
        {
          path: ENCADRANT_DASHBOARD_ROUTE,
          element: <EncadrantDashboard/>
        },
        {
            path: ENCADRANT_MANAGE_STAGIAIRES_ROUTE,
            element: <EncadrantManageStagiaires/>
        },
        {
            path: "/stagiaire/:id", // Route dynamique pour afficher les détails d'un stagiaire
            element: <StagiaireDetails/>
        },
      ]
    }

]);
