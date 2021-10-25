import React from "react";
import { Character } from "../Character/Character";
import { CharacterModel } from "../Character/character.model";

export default function CharacterList({ characters }: { characters: CharacterModel[] } ){
  return(
    <React.Fragment>
      { 
        characters.map((char: any) => {  
          return <Character key={char.name} character={char}></Character>
        })
      }
    </React.Fragment>
  );
}