import logo from './logo.svg';
import './App.css';
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from './Keycloak'
import {Routing} from "./Routing";

function App() {
  return (
      <ReactKeycloakProvider authClient={keycloak} >
        <div className="App">
          <header className="App-header">
            <Routing/>
          </header>
        </div>
      </ReactKeycloakProvider>
  );
}

export default App;
