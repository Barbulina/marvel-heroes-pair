import { useSelector, useDispatch } from 'react-redux';
import { CharacterModel } from './components/Character/character.model';
import CharacterList from './components/CharacterList/CharacterList';
import SearchForm from './components/SearchForm/SearchForm';
import * as actions from './state/actions';
import './App.scss';

export default function App() {
  const characters: CharacterModel[] = useSelector( (store: any )=> store.characters);
  const isLoading: boolean = useSelector((store: any) => store.loading);
  const searchPlaceholder:string = 'type to search'
  const dispatch = useDispatch();
  const search = (textToFilter: any, filter = undefined) => dispatch(actions.getCharacters({limit: 100, nameStartsWith: textToFilter, filter}));

  return (
    <div className="App">
      <SearchForm placeholder={searchPlaceholder} isLoading={isLoading} onSearch={search}></SearchForm>
      <CharacterList characters={characters}></CharacterList>
    </div>
  );
}

