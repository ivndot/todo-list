import React from "react";
import ButtonTodo from "./ButtonTodo";
import "../css/ItemTodo.css";
import "../App.css";

export default class ItemTodo extends React.Component {
  render() {
    return (
      <div className="itemTodo flex flex--spaceBetween">
        <p
          className={`itemTodo__text ${this.props.mood === "complete" ? "itemTodo--lineThrough" : ""}`}
          onClick={this.props.onClickHandler}
          data-id={this.props.id}
        >
          {this.props.content}
        </p>
        <ButtonTodo className="itemTodo__button" name="Delete" onClickHandler={this.props.deleteItem} type="button" id={this.props.id}/>
      </div>
    );
  }
}
