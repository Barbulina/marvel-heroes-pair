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
          <div className="App__list-counter">
            {characters.length} of {total}
          </div>
          <div className="App__list-characters">{cols}</div>
        </>
      );
    } else if (characters?.length === 0) {
      return <Empty />;
    } else {
      return <p>Start search</p>;
    }
  };
  return <>{renderCharacters()}</>;
}
