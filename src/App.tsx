
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './redux/actions';

function App() {
  const count = useSelector( (store: any )=> store.count);
  const dispatch = useDispatch();
  return (

    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(actions.increment())}>+</button>
      <button onClick={() => dispatch(actions.decrement())}>-</button>
       <button onClick={() => dispatch(actions.reset())}>RESET</button>
    </div>

   
  );
}

export default App;
