import React from "react";
import "../css/ControlPanel.css";

const FilterTodos = (props) => (
  <select name="comboBoxFilter" value={props.value} onChange={props.onChangeHandler} class="controlPanel__filter">
    <option>All</option>
    <option>Active</option>
    <option>Complete</option>
  </select>
);

export { FilterTodos };
