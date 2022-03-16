import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import reducers from './redux'
import { Provider } from 'react-redux'

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)




//ACTION -> ADD_ROBOT
// const addRobot = () => {
//   return {
//     name: 'ADD_ROBOT'
//   }
// }

// store.subscribe(() => console.log(store.getState()));

// var robot = {
//   'TET': 14,
//   'deux': 14,
// }

// //DISPATCH
// store.dispatch({
//   type: 'ADD_ROBOT',
//   payload: {
//     robot
//   }
// })





ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
