import { Button, Card } from "antd";
import { CharacterModel } from "./character.model";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import * as actions from "../../state/actions";
import useLocation from "wouter/use-location";

const { Meta } = Card;

export function Character({
  character,
}: {
  character: CharacterModel;
}): JSX.Element {
  const dispatch = useDispatch();
  const aspecRatio = "portrait_xlarge";
  const image: string = `${character.thumbnail.path}/${aspecRatio}.${character.thumbnail.extension}`;
  const cover = <img alt="character " src={image} />;
  const [location, setLocation] = useLocation();

  // TODO  move to click in card
  const infoButton = (
    <>
      <Button
        icon={<InfoCircleOutlined />}
        onClick={() => handlerGoToInfoCharacter(character)}
      >
        Info
      </Button>
    </>
  );
  const addButton = (
    <>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => handlerAddCharacter(character)}
      >
        Add
      </Button>
    </>
  );
  const removeBotton = (
    <>
      <Button
        danger
        type="primary"
        icon={<MinusCircleOutlined />}
        onClick={() => handlerRemoveCharacter(character)}
      >
        Remove
      </Button>
    </>
  );
  const handlerGoToInfoCharacter = (character: CharacterModel): void => {
    setLocation(`/character/${character.id}`);
  };
  const handlerAddCharacter = (character: CharacterModel): void => {
    dispatch(actions.addCharacterToAlbum(character));
  };
  const handlerRemoveCharacter = (character: CharacterModel): void => {
    dispatch(actions.removeCharacterToAlbum(character));
  };
  const actionsInCard: JSX.Element[] = [infoButton, addButton, removeBotton];

  return (
    <>
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={cover}
        actions={actionsInCard}
      >
        <Meta title={character.name} />
      </Card>
    </>
  );
}
