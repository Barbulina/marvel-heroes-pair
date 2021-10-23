
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './redux/actions';

function App() {
  const characters = useSelector( (store: any )=> store.characters);
  const dispatch = useDispatch();
  return (

    <div>
      <h1>{characters.length}</h1>
      <button onClick={() => dispatch(actions.getCharacters(5))}>GET CHARACTERS</button>


        { characters.map((char: any) => {  
          console.log('--->',char.name);    
         return <div key={char.name}>{char.name}</div>
        })}
  
    </div>

   
  );
}

export default App;
