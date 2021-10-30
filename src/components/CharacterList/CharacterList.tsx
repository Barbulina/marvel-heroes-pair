import React from "react";
import { Empty } from "antd";
import { Row, Col } from "antd";
import { Character } from "../Character/Character";
import { CharacterModel } from "../Character/character.model";
import "./CharacterList.scss";

export default function CharacterList({
  characters,
}: {
  characters: CharacterModel[];
}) {
  const colsSpan: number = 4;
  const renderCharacters = () => {
    if (characters && characters.length > 0) {
      const cols = characters.map((char: any) => {
        return (
          <Col className="character" xs={24} sm={12} md={6} lg={colsSpan}>
            <Character key={char.id} character={char}></Character>
          </Col>
        );
      });
      return <Row>{cols}</Row>;
    } else {
      return <Empty />;
    }
  };
  return <div className="App__list">{renderCharacters()}</div>;
}
