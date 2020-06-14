import React from 'react';
import App from './App';
import NavBar from './NavBar';

interface RootPropsInterface {

}

interface RootStateInterface {

}

export default class Root extends React.Component<RootPropsInterface, RootStateInterface> {
  constructor(props: RootPropsInterface){
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <App />
      </div>
    );
  }
}
