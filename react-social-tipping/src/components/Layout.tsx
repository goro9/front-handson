import React from "react";
// import { Link } from "react-router-dom";
import NavBar from './NavBar'

interface LayoutPropsInterface {

}

interface LayoutStateInterface {

}

export default class Layout extends React.Component<LayoutPropsInterface, LayoutStateInterface> {
  render() {
    return (
      <div>
        <NavBar/>
        {this.props.children}
      </div>
    );
  }
}
