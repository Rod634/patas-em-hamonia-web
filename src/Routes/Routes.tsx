import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/homePage";
import { AnimalForm } from "../pages/AnimalFormPage";
import { Animals } from "../pages/AnimalsPage";
import { Ongs } from "../pages/OngsPage";
import { Schedule } from "../pages/SchedulePage";
import { Profile } from "../pages/ProfilePage";
import { SignUp } from "../pages/SignUpPage";
import { Login } from "../pages/LoginPage";
import { Animal } from "../pages/animalPage";
import { Ong } from "../pages/ongPage";
import useAuth from "../hooks/useAuth";

const Private = ({ Item } : any) => {
    const { signed } : any = useAuth();
  
    return signed > 0 ? <Item /> : <Login />;
  };

export const router = createBrowserRouter([
    { path: "/", element: <Private Item={Home} />},
    { path: "animal-form", element: <Private Item={AnimalForm} /> },
    { path: "animais", element: <Private Item={Animals} /> },
    { path: "animal/:id", element: <Private Item={Animal} /> },
    { path: "ongs", element: <Private Item={Ongs} /> },
    { path: "ong/:id", element: <Private Item={Ong} /> },
    { path: "agendar", element: <Private Item={Schedule} /> },
    { path: "perfil", element: <Private Item={Profile} /> },
    { path: "cadastro", element: <SignUp /> },
    { path: "login", element: <Login /> },
]);