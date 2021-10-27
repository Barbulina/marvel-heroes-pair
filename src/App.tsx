import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CharacterModel } from './common/Character/character.model';
import CharacterList from './common/CharacterList/CharacterList';
import SearchForm from './common/SearchForm/SearchForm';
import * as actions from './state/actions';
import './App.scss';

export default function App() {
  const characters: CharacterModel[] = useSelector( (store: any )=> store.characters);
  const isLoading: boolean = useSelector((store: any) => store.loading);
  const searchPlaceholder:string = 'type to search'
  const dispatch = useDispatch();
  const search = (e: any) => dispatch(actions.getCharacters({limit: 100, nameStartsWith: e}));
  const loadSeries = () => {
    dispatch(actions.getSeries())
  };
  
  return (
    <div className="App">
      <button onClick={loadSeries}>LOAD SERIES</button>
      <SearchForm placeholder={searchPlaceholder} isLoading={isLoading} onSearch={search}></SearchForm>
      <CharacterList characters={characters}></CharacterList>
    </div>
  );
}

