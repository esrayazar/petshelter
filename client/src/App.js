import './App.css';

import {Router} from "@reach/router";
import PetsList from './components/PetsList';
import EditPet from './components/EditPet';
import NewPet from './components/NewPet';
import OnePet from './components/OnePet';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [pet, setPet] = useState("");
  return (
    <div className="App">
      <Router>
        <PetsList path="/" />
        <NewPet path="/petshelter/new" />
        <OnePet path="/petshelter/:id" />
        <EditPet path="/petshelter/edit/:id"/>
      </Router>
      
    </div>
  );
}

export default App;