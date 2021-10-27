import React from "react";
import { Card } from "antd";
import { CharacterModel } from "./character.model";
const { Meta } = Card;

export function Character({ character }: {character: CharacterModel}) {
  const aspecRatio = 'portrait_xlarge';
  const image: string = `${character.thumbnail.path}/${aspecRatio}.${character.thumbnail.extension}`;
  const cover = <img alt="example" src={image} />;
  return (
    <React.Fragment>
      <Card hoverable style={{ width: '100%' }} cover={cover}>
        <Meta title={character.name}/>
      </Card>
    </React.Fragment>
  );
}