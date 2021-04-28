import "./App.css";
import Lanes from "./Components/Lanes";
import Header from "./Components/Header";
import { FirebaseInstance } from "./firebase";
import { FirebaseContext } from "./firebase-context";

function App() {
  return (
    <FirebaseContext.Provider value={FirebaseInstance}>
      <div className="h-full w-full overflow-x-auto overflow-y-hidden bg-purple-500">
        <Header />
        <div className="p-4">
          <Lanes />
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
