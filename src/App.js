import "./styles.css";
import CardComponent from "./CardComponent";
import Filter from "./Filter";
import CardsList from "./CardsList";

export default function App() {
  return (
    <div className="App">
      <h3>SpaceX Launch Program</h3>
      <CardsList />
    </div>
  );
}
