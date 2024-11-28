
import {useUserContext } from "../context/StagiaireContext"

export default function Home(){
    const context = useUserContext()
    return <>
    <h1>hi from home page</h1>
    </>
}
