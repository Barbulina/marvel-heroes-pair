import React from "react";
import { Button, Card } from "antd";
import { CharacterModel } from "./character.model";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;

export function Character({ character }: { character: CharacterModel }) {
  const aspecRatio = "portrait_xlarge";
  const image: string = `${character.thumbnail.path}/${aspecRatio}.${character.thumbnail.extension}`;
  const cover = <img alt="example" src={image} />;
  const addButton = (
    <>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => handlerAddCharacter(character)}
      >
        Add user
      </Button>
    </>
  );
  const handlerAddCharacter = (character: CharacterModel) => {
    console.log("add ", character);
  };
  const actions = [addButton];

  return (
    <React.Fragment>
      <Card hoverable style={{ width: "100%" }} cover={cover} actions={actions}>
        <Meta title={character.name} />
      </Card>
    </React.Fragment>
  );
}
