import React from "react";
import "../css/ControlPanel.css";

const FilterTodos = (props) => (
  <select name="comboBoxFilter" value={props.value} onChange={props.onChangeHandler} className="controlPanel__filter">
    <option>All</option>
    <option>Active</option>
    <option>Complete</option>
  </select>
);

export { FilterTodos };
