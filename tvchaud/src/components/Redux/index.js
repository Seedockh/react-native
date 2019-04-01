/*import { View, Text, Button } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

const initState = {
  showsList: []
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case 'SET_SHOWS': {
      return { ...state, showsList: action.showsList };
    }
    default:
      return state
  };
}

const store = createStore(reducer);

const Screen = ()=>(
  <Provider store={store}>
    <AppWithConnect foo="bar"/>
  </Provider>
);

const mapStateToProps = (state,props) => ({
  showsList: state.showsList
});

const mapDispatchToProps = (dispatch) => ({
  setShows: (showsList)=>{
    const action = {
      type: 'SET_SHOWS',
      showsList: showsList
    };
    return dispatch(action);
  }
});

const AppWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default Screen;*/
