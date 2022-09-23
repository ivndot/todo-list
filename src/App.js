import React from "react";
import "./App.css";
import "./css/ControlPanel.css";
import "./css/InputTodo.css";
import ButtonTodo from "./components/ButtonTodo";
import CounterActiveTodos from "./components/CounterActiveTodos";
import ItemTodo from "./components/ItemTodo";
import { FilterTodos } from "./components/FilterTodos";
import InputTodo from "./components/InputTodo";
import { nanoid } from "nanoid";

export default class App extends React.Component {
  state = {
    inputValue: "",
    inputError: "",
    comboBoxFilter: "All",
    buttonToggleMood: "complete",
    items: [],
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addItem = (e) => {
    e.preventDefault();
    const todoItemContent = this.state.inputValue;
    if (this.validateInput(todoItemContent)) {
      const itemObject = {
        id: nanoid(),
        mood: "active",
        content: todoItemContent,
      };
      this.setState({ items: this.state.items.concat(itemObject), inputValue: "", inputError: "" });
    }
  };

  deleteItem = (e) => {
    const targetId = e.target.getAttribute("data-id");
    const items = this.state.items;
    //get the object
    const object = items.find((item) => item.id === targetId);
    //with the filter method we will keep only the items that are not the object
    const newItems = items.filter((item) => item !== object);
    //set the new array of items
    this.setState({ items: newItems });
  };

  deleteCompleteItems = () => {
    const items = this.state.items;
    //filter the items by its mood, only active mood is accepted
    const activeItems = items.filter((item) => item.mood === "active");

    //set the new array of items where the mood is 'active'
    this.setState({ items: activeItems });
  };

  validateInput = (value) => {
    let inputError = "";
    if (value === "" || value === null || value === " ") {
      inputError = "Please, enter some text";
    }

    this.setState({ inputError });

    if (inputError) return false;
    return true;
  };

  toggleMoodItem = (e) => {
    const targetId = e.target.getAttribute("data-id");
    const items = this.state.items;

    //get the item
    const item = items.find((item) => item.id === targetId);

    //the item is not undefined
    if (item !== undefined) {
      //copy the entire array
      let newItems = [...items];
      //toggle the mood of the object
      item.mood = item.mood === "active" ? "complete" : "active";
      //replace the item within the new array
      newItems[items.indexOf(item)] = item;
      //set the new array to the state
      this.setState({ items: newItems });
    } else {
      console.error("There is no object with the id specified");
    }
  };

  toggleMoodItems = () => {
    const items = this.state.items;
    let newItems = [];

    items.forEach((item) => {
      item.mood = this.state.buttonToggleMood === "complete" ? "complete" : "active";
      newItems.push(item);
    });
    const newMood = this.state.buttonToggleMood === "complete" ? "active" : "complete";
    this.setState({ buttonToggleMood: newMood });
  };

  render() {
    return (
      <div className="todoApp">
        <p className="title">Todo App</p>
        <InputTodo
          onChangeHandler={this.handleChange}
          inputValue={this.state.inputValue}
          inputError={this.state.inputError}
          onSubmitHandler={this.addItem}
        />
        <div className="controlPanel flex flex--center">
          <FilterTodos value={this.state.comboBox} onChangeHandler={this.handleChange} />
          <ButtonTodo
            name={(this.state.buttonToggleMood === "complete" ? "Complete" : "Active") + " All"}
            onClickHandler={this.toggleMoodItems}
            className="controlPanel__btnToggleMood"
          />
          {showDeleteCompleteButton(this.state.items, this.deleteCompleteItems)}
        </div>
        <div className="containerItems">
          {this.state.items.length > 0 ? (
            showItems(this.state.items, this.state.comboBoxFilter, this.toggleMoodItem, this.deleteItem)
          ) : (
            <p className="itemTodo__txtNoItems">There is no items here</p>
          )}
        </div>
        <CounterActiveTodos number={showActiveTodos(this.state.items)} />
      </div>
    );
  }
}

/**
 *
 * @param {*} items
 * @param {*} filter
 * @param {*} toggleMood
 * @returns result
 */
const showItems = (items, filter, toggleMood, deleteItem) => {
  let result = [];
  //show all
  if (filter === "All") {
    result = items.map((item) => {
      return (
        <ItemTodo
          key={item.id}
          id={item.id}
          content={item.content}
          mood={item.mood}
          onClickHandler={toggleMood}
          deleteItem={deleteItem}
        />
      );
    });
  }
  //show complete
  if (filter === "Complete") {
    result = items
      .filter((item) => {
        return item.mood === "complete";
      })
      .map((item) => {
        return (
          <ItemTodo
            key={item.id}
            id={item.id}
            content={item.content}
            mood={item.mood}
            onClickHandler={toggleMood}
            deleteItem={deleteItem}
          />
        );
      });
  }
  //show active
  if (filter === "Active") {
    result = items
      .filter((item) => {
        return item.mood === "active";
      })
      .map((item) => {
        return (
          <ItemTodo
            key={item.id}
            id={item.id}
            content={item.content}
            mood={item.mood}
            onClickHandler={toggleMood}
            deleteItem={deleteItem}
          />
        );
      });
  }

  return result.length === 0 ? <p className="itemTodo__txtNoItems">There is no items here</p> : result;
};

/**
 *
 * @param {*} items
 * @param {*} deleteCompleteItems
 * @returns JSX
 */
const showDeleteCompleteButton = (items, deleteCompleteItems) => {
  let isComplete = false;
  items.forEach((item) => {
    if (item.mood === "complete") isComplete = true;
  });
  return isComplete ? (
    <ButtonTodo
      name="Delete complete"
      onClickHandler={deleteCompleteItems}
      className="controlPanel__deleteComplete"
    />
  ) : null;
};

/**
 *
 * @param {*} items
 * @returns
 */
const showActiveTodos = (items) => {
  const activeItems = items.filter((item) => item.mood === "active");

  return activeItems.length;
};
