import { Button, Card } from "antd";
import { CharacterModel } from "./character.model";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../state/actions";
import useLocation from "wouter/use-location";
import { StateModel } from "state/configureStore";
import { useEffect, useState } from "react";
import { aspectRatio } from "helpers/imagesSizes/imageSizes";

const { Meta } = Card;

export function Character({
  character,
}: {
  character: CharacterModel;
}): JSX.Element {
  const infoButton = (
    <>
      <Button
        size="small"
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
        size="small"
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
        size="small"
        danger
        type="primary"
        icon={<MinusCircleOutlined />}
        onClick={() => handlerRemoveCharacter(character)}
      >
        Remove
      </Button>
    </>
  );

  const defaultActionsInCard: JSX.Element[] = [infoButton];
  const currentAlbum: any = useSelector((store: StateModel) => store.album);
  const [actionsInCard, setActionsInCard] = useState(defaultActionsInCard);
  // TODO move to custom hook
  useEffect(() => {
    if (currentAlbum && currentAlbum?.length > 0) {
      const isCharacterInAlbum = currentAlbum.some(
        (char: CharacterModel) => char.id === character.id
      );
      if (isCharacterInAlbum) {
        setActionsInCard([...defaultActionsInCard, removeBotton]);
      } else {
        setActionsInCard([...defaultActionsInCard, addButton]);
      }
    }
  }, [currentAlbum, character]);
  const dispatch = useDispatch();
  const aspecRatio = aspectRatio.standard_large;
  const image: string = `${character.thumbnail.path}/${aspecRatio}.${character.thumbnail.extension}`;
  const cover = <img alt="character " src={image} />;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useLocation();

  const handlerGoToInfoCharacter = (character: CharacterModel): void => {
    setLocation(`/character/${character.id}`);
  };
  const handlerAddCharacter = (character: CharacterModel): void => {
    dispatch(actions.addCharacterToAlbum(character));
  };
  const handlerRemoveCharacter = (character: CharacterModel): void => {
    dispatch(actions.removeCharacterToAlbum(character));
  };

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
