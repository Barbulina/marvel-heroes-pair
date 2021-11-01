import React from "react";
import { Empty } from "antd";
import { Row, Col } from "antd";
import { Character } from "../Character/Character";
import { CharacterModel } from "../Character/character.model";
import "./CharacterList.scss";

export default function CharacterList({
  characters,
  total,
}: {
  characters: CharacterModel[];
  total: number;
}) {
  const colsSpan: number = 4;
  const renderCharacters = () => {
    if (characters && characters.length > 0) {
      const cols = characters.map((char: any) => {
        return (
          <Col
            key={char.id}
            className="character"
            xs={24}
            sm={12}
            md={6}
            lg={colsSpan}
          >
            <Character character={char}></Character>
          </Col>
        );
      });
      return (
        <>
          <div className="App__list-counter">
            {characters.length} of {total}
          </div>
          <Row>{cols}</Row>
        </>
      );
    } else {
      return <Empty />;
    }
  };
  return <>{renderCharacters()}</>;
}
