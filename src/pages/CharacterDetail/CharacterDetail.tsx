import { useDispatch, useSelector, useStore } from "react-redux";
import { CharacterModel } from "../../components/Character/character.model";
import * as actions from "../../state/actions";

export default function CharacterDetail({ params }: any): JSX.Element {
  let characterId = params?.characterId || "";
  console.log("--> params", params);

  // TODO get character from API
  const dispatch = useDispatch();
  console.log("----");

  dispatch(actions.getCharacterById(characterId));

  const character: CharacterModel = useSelector((store: any) => store.detail);

  return (
    <>
      <h3>{character?.name}</h3>
      <p>{character?.description}</p>
    </>
  );
}
