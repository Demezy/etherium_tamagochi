import { Link } from "react-router-dom";
// import viteLogo from '/vite.svg'
import "./home_page.css";
import { Stack } from "@mui/material";

function HomePage() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1>Etherium tamagochi home page</h1>
      <div>
        <Stack>
          <Link to="/pet_selector">pet page</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/breed">Breed pets</Link>
        </Stack>
      </div>
    </>
  );
}

export default HomePage;
