import React from 'react';
import { Link } from "react-router-dom";
import * as firebase from 'firebase/app';
import { firebaseApp } from '../base';

interface NavBarPropsInterface {

}

interface NavBarStateInterface {
    currentUser: string;
}

export default class NavBar extends React.Component<NavBarPropsInterface, NavBarStateInterface> {
  constructor(props: NavBarPropsInterface){
    super(props);
    this.state = {
      currentUser: '',
    };
  }

  logedIn() {
    let email = 'init';
    let userData: firebase.firestore.DocumentData = {};
    let db = firebase.firestore();
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        email = user.email!;
        console.log(user);
        // db.collection("users").doc(email).get().then((doc) => {
        //   if (doc.exists) {
        //     userData = doc.data()!;
        //   } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        //   }
        // });
      } else {
        // No user is signed in.
      }
    });
    return email;
  }

  render() {
    const currentUser = this.logedIn();
    console.log(currentUser)

    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/#">
          Social Tipping
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              {/* {currentUser} */}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
