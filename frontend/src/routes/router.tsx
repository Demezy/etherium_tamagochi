import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../routes/error_page.tsx";
import PetStats from "../pet_stats/pet_stats.tsx";
import HomePage from "../home_page/home_page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "pet_stats/:petId",
    element: <PetStats />
  },
]);

export default router;
