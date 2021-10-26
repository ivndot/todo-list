import React from "react";
import ButtonTodo from "./ButtonTodo";
import "../css/InputTodo.css";

export default class InputTodo extends React.Component {
  render() {
    return (
      <form className="inputTodo flex flex--center flex--rowWrap" onSubmit={this.props.onSubmitHandler} autoComplete="off">
        <input
          className="inputTodo__inputText"
          type="text"
          name="inputValue"
          onChange={this.props.onChangeHandler}
          value={this.props.inputValue}
          placeholder="Item..."
          autoComplete="off"
        />
        <ButtonTodo className="inputTodo__btn" name="Add" type="submit" />
      </form>
    );
  }
}
