import "./App.scss";
import { Route, useLocation } from "wouter";
import Characters from "./pages/Charaters";

const BASE_PATH = "/characters";

export default function App() {
  const [location, setLocation] = useLocation();
  if (location === "/") setLocation(BASE_PATH);
  return (
    <div className="App">
      <Route path="/characters" component={Characters} />
    </div>
  );
}
