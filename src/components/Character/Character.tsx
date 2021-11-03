import { Button, Card } from "antd";
import { CharacterModel } from "./character.model";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export function Character({
  character,
}: {
  character: CharacterModel;
}): JSX.Element {
  const aspecRatio = "portrait_xlarge";
  const image: string = `${character.thumbnail.path}/${aspecRatio}.${character.thumbnail.extension}`;
  const cover = <img alt="example" src={image} />;

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
    console.log("Character info of", character);
  };
  const handlerAddCharacter = (character: CharacterModel): void => {
    console.log("add ", character);
  };
  const handlerRemoveCharacter = (character: CharacterModel): void => {
    console.log("remove", character);
  };
  const actions: JSX.Element[] = [infoButton, addButton, removeBotton];

  return (
    <>
      <Card hoverable style={{ width: "100%" }} cover={cover} actions={actions}>
        <Meta title={character.name} />
      </Card>
    </>
  );
}
