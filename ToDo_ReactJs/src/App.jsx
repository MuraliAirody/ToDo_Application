import { useState } from "react";
import "./App.css";
import ToDo from "./components/ToDo";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        <ToDo></ToDo>
      </Provider>
    </>
  );
}

export default App;
