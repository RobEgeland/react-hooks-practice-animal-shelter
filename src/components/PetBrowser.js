import React from "react";

import Pet from "./Pet";

function PetBrowser({pets, onAdoptPet}) {
  return <div className="ui cards">{pets.map((pet) => <Pet key={pet.id} onAdoptPet={onAdoptPet} pet={pet} />)}</div>;
}

export default PetBrowser;
