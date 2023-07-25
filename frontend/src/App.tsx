import { Link } from "react-router-dom";
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
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

export default App;
