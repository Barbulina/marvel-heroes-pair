import React from "react";
import { Empty } from "antd";
import { Row, Col } from "antd";
import { Character } from "../Character/Character";
import { CharacterModel } from "../Character/character.model";
import "./CharacterList.scss";

enum COL_SIZES {
  xs = 16,
  sm = 8,
  md = 4,
  lg = 4,
}

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
        return (
          <Col
            key={char.id}
            className="character"
            xs={COL_SIZES.xs}
            sm={COL_SIZES.sm}
            md={COL_SIZES.md}
            lg={COL_SIZES.lg}
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
    } else if (characters?.length === 0) {
      return <Empty />;
    } else {
      return <p>Start search</p>;
    }
  };
  return <>{renderCharacters()}</>;
}
