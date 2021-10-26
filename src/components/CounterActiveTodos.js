import React from "react";
import "../css/CounterActiveTodos.css";

export default class CounterActiveTodos extends React.Component {
  render() {
    return (
      <div className="counterActiveTodo flex flex--center">
        <p className="counterActiveTodo__message">Active items:&nbsp;{this.props.number}</p>
      </div>
    );
  }
}
