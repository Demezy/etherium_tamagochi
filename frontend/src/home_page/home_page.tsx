import { Link } from "react-router-dom";
// import viteLogo from '/vite.svg'
import "./home_page.css";

function HomePage() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1> Etherium tamagochi home page</h1>
      <div>
        <Link to="/pet_stats"> to destination page</Link>
      </div>
    </>
  );
}

export default HomePage;
