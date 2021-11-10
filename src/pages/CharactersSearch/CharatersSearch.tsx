import { useSelector, useDispatch } from "react-redux";
import { CharacterModel } from "../../components/Character/character.model";
import CharacterList from "../../components/CharacterList/CharacterList";
import SearchForm from "../../components/SearchForm/SearchForm";
import { DEFAULT_LIMIT } from "../../services/marvalApiServices";
import * as actions from "../../state/actions";
import { StateModel } from "../../state/configureStore";
import { Button, Spin } from "antd";
import { useState } from "react";

export default function CharactersSearch() {
  const [textToFilter, setTextToFilter] = useState(undefined);
  const [filterToApply, setFilterToApply] = useState({});
  const characters: CharacterModel[] | undefined = useSelector(
    (store: any) => store.characters
  );
  const isLoading: boolean = useSelector((store: any) => store.loading);
  const totalCharacters: number = useSelector(
    (store: StateModel) => store.totalCharacters
  );
  const searchPlaceholder: string = "type to search";
  const dispatch = useDispatch();
  const search = (
    textToFilter: any,
    filter: any,
    offset: number | undefined
  ) => {
    setTextToFilter(textToFilter);
    setFilterToApply(filter);
    dispatch(
      actions.getCharacters({
        limit: DEFAULT_LIMIT,
        nameStartsWith: textToFilter,
        filter,
        offset,
      })
    );
  };
  const showLoadMoreButton = () => {
    if (characters && totalCharacters > characters.length)
      return (
        <Button type="primary" onClick={loadMore}>
          load more
        </Button>
      );
  };
  const loadMore = () => {
    search(textToFilter, filterToApply, characters?.length);
  };
  const renderList = function () {
    if (isLoading && (!characters || characters?.length < 1)) {
      return (
        <div className="App__loading">
          <Spin />;
        </div>
      );
    } else {
      return (
        <CharacterList
          characters={characters}
          total={totalCharacters}
        ></CharacterList>
      );
    }
  };
  return (
    <>
      <SearchForm
        placeholder={searchPlaceholder}
        isLoading={isLoading}
        onSearch={search}
      ></SearchForm>
      <div className="App__list">
        {renderList()}
        {showLoadMoreButton()}
      </div>
    </>
  );
}
