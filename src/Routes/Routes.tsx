import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/homePage";
import { AnimalForm } from "../pages/AnimalFormPage";
import { Animals } from "../pages/AnimalsPage";
import { OngForm } from "../pages/OngFormPage";
import { Ongs } from "../pages/OngsPage";
import { Schedule } from "../pages/SchedulePage";
import { Profile } from "../pages/ProfilePage";
import { SignUp } from "../pages/SignUpPage";
import { Login } from "../pages/LoginPage";

export const router = createBrowserRouter([
    { path: "/", element: <Home />},
    { path: "animal-form", element: <AnimalForm /> },
    { path: "animal/:id", element: <Animals /> },
    { path: "ong-form", element: <OngForm /> },
    { path: "ong/:id", element: <Ongs /> },
    { path: "schedule", element: <Schedule /> },
    { path: "profile", element: <Profile /> },
    { path: "sign-up", element: <SignUp /> },
    { path: "login", element: <Login /> },
]);