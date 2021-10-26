import React from "react";

export default class ButtonTodo extends React.Component {
  render() {
    return (
      <button className={this.props.className} type={this.props.type} onClick={this.props.onClickHandler} data-id={this.props.id}>
        {this.props.name}
      </button>
    );
  }
}
