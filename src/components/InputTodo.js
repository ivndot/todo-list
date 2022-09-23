import React from "react";
import ButtonTodo from "./ButtonTodo";
import "../css/InputTodo.css";
import "../css/ErrorMessage.css";

export default class InputTodo extends React.Component {
  render() {
    return (
      <div>
        <form
          className="inputTodo flex flex--center flex--rowWrap"
          onSubmit={this.props.onSubmitHandler}
          autoComplete="off"
        >
          <input
            className={`inputTodo__inputText ${this.props.inputError ? "inputText--error" : null}`}
            type="text"
            name="inputValue"
            onChange={this.props.onChangeHandler}
            value={this.props.inputValue}
            placeholder="Item..."
            autoComplete="off"
          />
          <ButtonTodo className="inputTodo__btn" name="Add" type="submit" />
        </form>
        <p className="errorMessage">{this.props.inputError ? this.props.inputError : null}</p>
      </div>
    );
  }
}
