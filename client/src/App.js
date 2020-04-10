import React, { Component, Fragment } from "react";
import Chat from './Chat';
import Room from './Room';


class App extends Component {
  render() {
    return(
      <Fragment>
      <Chat />
      <Room />
      </Fragment>
    );
  }
  
}

export default App;
