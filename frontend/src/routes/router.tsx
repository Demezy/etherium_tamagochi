import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../routes/error_page.tsx";
import PetStats from "../pet_stats/pet_stats.tsx";
import HomePage from "../home_page/home_page.tsx";
import Profile from "../profile/profile.tsx";
import BreedPets from "../breed_pets/breed_pets.tsx";
import PetSelector from "../pet_stats/pet_selector.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "pet_selector",
    element: <PetSelector />,
  },
  {
    path: "pet_stats/:petId",
    element: <PetStats />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "breed",
    element: <BreedPets />,
  },
]);

export default router;
