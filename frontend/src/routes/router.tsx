import App from "../App.tsx";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../routes/error_page.tsx";
import PetStats from "../pet_stats/pet_stats.tsx";
import NotFoundPage from "./not_found.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "pet_stats/:petId",
    // loader: (data) => 
    //   return {petId: data!.petId};
    //   const id = data.params.petId;
    //   if (!id) return <NotFoundPage/>;
    //   return <PetStats petId={parseInt(id)}/>;
    // },
    element: <PetStats />
  },
]);

export default router;
