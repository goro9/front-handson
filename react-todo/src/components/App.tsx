import React from 'react';
import axios from 'axios';
import Form from './Form';
import List from  './List';
import {TodoInterface} from  './List';

const host = 'http://localhost:8080';

interface AppPropsInterface {

}

interface AppStateInterface {
  todo: TodoInterface[];
}

export default class App extends React.Component<AppPropsInterface, AppStateInterface> {
  constructor(props: AppPropsInterface){
    super(props);
    this.state = {
      todo: []
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  // componentDidMount() {

  // }

  // データ保存
  handleAdd(e: any){
    console.log(e);
    // リダイレクト防止
    e.preventDefault();
    // フォームから受け取ったデータをオブジェクトに挿入して、stateのtodo配列に追加
    this.state.todo.push({user_id: 0, todo: e.target.title.value}); // まだ保存されていない
    // setStateを使ってstateを上書き
    this.setState({todo: this.state.todo}); // 保存完了
    // inputのvalueを空に
    e.target.title.value = '';
  }

  // データ削除
  handleRemove(i: number){
    // todo配列からi番目から1つ目のデータを除外
    this.state.todo.splice(i,1);
    // setStateでtodo配列を上書き
    this.setState({todo: this.state.todo});
  }

  render() {
    return (
      <div className="siimple-box siimple--bg-dark">
        <h1 className="siimple-box-title siimple--color-white">React Todo App</h1>
        <Form handleAdd={this.handleAdd}/>
        <div className="siimple-rule"></div>
        <List todos={this.state.todo} handleRemove={this.handleRemove}/>
      </div>
    );
  }
}
