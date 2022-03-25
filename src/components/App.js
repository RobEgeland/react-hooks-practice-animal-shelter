import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState("all");

  useEffect(() => {
    const controller = new AbortController();
    fetch('http://localhost:3001/pets')
    .then(res => res.json())
    .then(petsArr => setPets(petsArr))
    return () => {
      controller.abort();
    }
  }, [])

  function onChangeType(event) {
    setFilters(event.target.value)
  }

  function onFindPetsClick() {
    if( filters === "all") {
      fetch('http://localhost:3001/pets')
      .then(res => res.json())
      .then(petsArr => setPets(petsArr))
    }else {
      fetch(`http://localhost:3001/pets?type=${filters}`)
      .then(res => res.json())
      .then(petsArr => setPets(petsArr))
    }
  }

  function onAdoptPet(id) {
    fetch(`http://localhost:3001/pets/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"isAdopted": true})
    })
    .then(res => res.json())
    .then(newPet => updatePets(newPet, id))
  }

  function updatePets(newPet, id) {
    const newPetArr = pets.map((pet) => {
      if(pet.id === id) {
        return newPet
      }else {
        return pet
      }
    })
    setPets(newPetArr)
  }

  

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onFindPetsClick={onFindPetsClick} onChangeType={onChangeType} />
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet={onAdoptPet} pets={pets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
