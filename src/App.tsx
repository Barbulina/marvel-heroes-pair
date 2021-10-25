
import { useSelector, useDispatch } from 'react-redux';
import { Character } from './common/Character';
import * as actions from './state/actions';

function App() {
  const characters = useSelector( (store: any )=> store.characters);
  const dispatch = useDispatch();
  return (

    <div>
      <h1>{characters.length}</h1>
      <button onClick={() => dispatch(actions.getCharacters(5))}>GET CHARACTERS</button>
        { characters.map((char: any) => {  
          console.log(char)
         return <Character key={char.name} character={char}></Character>
        })}
  
    </div>

   
  );
}

export default App;
