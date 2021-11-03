import { useState } from "react";
import CharacterList from "../../components/CharacterList/CharacterList";

export default function Album() {
  const [characters, setcharacters] = useState([]);
  const total = characters.length;
  return (
    <>
      <CharacterList characters={characters} total={total}></CharacterList>
    </>
  );
}
