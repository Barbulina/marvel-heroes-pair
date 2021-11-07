import { useDispatch, useSelector } from "react-redux";
import { CharacterModel } from "../../components/Character/character.model";
import CharacterDetails from "../../components/CharacterDetail/CharacterDetails";
import { StateModel } from "../../state/configureStore";
import * as actions from "../../state/actions";
import { useEffect } from "react";
export default function Detail({ params }: any): JSX.Element {
  const characterId: number = +params.characterId;
  const album = useSelector((state: StateModel) => state.album || []);
  const characters = useSelector((state: any) => state.characters || []);
  const allCharacters = [...album, ...characters];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getCharacterById(characterId, allCharacters));
  }, []);
  const character: CharacterModel | undefined = useSelector(
    (store: StateModel) => store.detail
  );

  if (character) {
    return <CharacterDetails character={character}></CharacterDetails>;
  } else {
    return <div>Character not found</div>;
  }
}
