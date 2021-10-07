import './App.css';
import Shortner from "./components/layout";

function App() {
  
  return (
    
    <div className="App">
       <favicon url="./public/fav-icon.ico"/>
      <h1>
          URL Shortner 
      </h1>
      <header className="App-header">
        <Shortner></Shortner>
        
        
      </header>
    </div>
  );
}

export default App;
