import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CharacterModel } from './common/Character/character.model';
import CharacterList from './common/CharacterList/CharacterList';
import SearchForm from './common/SearchForm/SearchForm';
import * as actions from './state/actions';

function App() {
  const characters: CharacterModel[] = useSelector( (store: any )=> store.characters);
  const isLoadingCharacters: boolean = useSelector((store: any) => store.loading);
  const searchPlaceholder:string = 'type to search'
  const dispatch = useDispatch();
  const search = (e: any) => dispatch(actions.getCharacters({limit: 100, nameStartsWith: e}));
  return (
    <React.Fragment>
      <SearchForm placeholder={searchPlaceholder} isLoading={isLoadingCharacters} onSearch={search}></SearchForm>
      <CharacterList characters={characters}></CharacterList>
    </React.Fragment>
  );
}

export default App;
