import { CharacterModel } from "../Character/character.model";

export default function CharacterDetails({
  character,
}: {
  character: CharacterModel;
}) {
  return (
    <>
      <h2>{character.name}</h2>
      <p>{character.description}</p>
    </>
  );
}
