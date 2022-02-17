import { Empty } from "antd";
import { Character } from "../Character/Character";
import { CharacterModel } from "../Character/character.model";

export default function CharacterList({
  characters,
  total,
}: {
  characters: CharacterModel[] | undefined;
  total: number;
}) {
  const renderCharacters = () => {
    if (characters && characters.length > 0) {
      const cols = characters.map((char: any) => {
        return <Character character={char}></Character>;
      });
      return (
        <>
          <h5>
            {characters.length} of {total}
          </h5>
          <div className="App__list-characters">{cols}</div>
        </>
      );
    } else if (characters?.length === 0) {
      return <Empty />;
    } else {
      return <h3>Start search to view characters</h3>;
    }
  };
  return <>{renderCharacters()}</>;
}
