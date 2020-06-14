import React from 'react';
import FormAuthInfo from './FormAuthInfo';
// import firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseApp } from '../base';

interface AppPropsInterface {

}

interface AppStateInterface {
  
}

export default class App extends React.Component<AppPropsInterface, AppStateInterface> {
  constructor(props: AppPropsInterface){
    super(props);
    this.state = {
      todo: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // データ保存
  handleClick(event: any, email: string, password: string, nickName: string){
    event.preventDefault();
    console.log("aaa");
    // firebase sdk
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        alert("register complete!");
        let db = firebase.firestore();
        db.collection("users")
          .doc(email)
          .set({
            nick_name: nickName,
            budget: 1000,
          })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        alert("firebase error :" + error);
      });
  }

  render() {
    return (
      <div className="border-box">
        <FormAuthInfo onClickHandler={this.handleClick}/>
      </div>
    );
  }
}
