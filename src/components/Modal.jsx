import React from "react";
import ReactDOM from "react-dom";
export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.root = document.getElementById("root");
    this.el = document.createElement("div", {});
    this.el.classList.add("backdrop");
  }

  componentDidMount() {
    this.root.appendChild(this.el);
    document.body.style.overflowY = "hidden";
  }

  componentWillUnmount() {
    this.root.removeChild(this.el);
    document.body.style.overflowY = "auto";
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
