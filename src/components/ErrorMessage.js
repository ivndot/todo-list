import React from "react";
import "../css/ErrorMessage.css";
import "../App.css";

const ErrorMessage = (props) => <div className="errorMessage flex flex--center">{props.error}</div>;

export default ErrorMessage;
