import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CharacterModel } from "../../components/Character/character.model";
import CharacterList from "../../components/CharacterList/CharacterList";

export default function Album() {
  const characters: CharacterModel[] = useSelector((store: any) => store.album);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(characters?.length || 0);
  }, [characters]);

  return (
    <div className="App__list">
      <CharacterList characters={characters} total={total}></CharacterList>
    </div>
  );
}
