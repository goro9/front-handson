import React from 'react';

let style = {
  maxWidth: '700px',
};

let btn = {
  cursor: 'pointer'
};

interface ListPropsInterface {
  todos: TodoInterface[];
  handleRemove: (i: number)=> void;
}

export interface TodoInterface {
  user_id: number;
  todo: string;
}

const List = (props: ListPropsInterface) => (
  <ul className="siimple-list">
    {props.todos.map((todo, i) => {
      return (
      <li key={i} className="siimple-list-item siimple--bg-white" style={style}>
        {todo.user_id} {todo.todo} <span className="siimple-tag siimple-tag--error siimple-hover" style={btn} onClick={() => props.handleRemove(i)}>Delete</span>
      </li>
      )
    })};
  </ul>
);

export default List;
