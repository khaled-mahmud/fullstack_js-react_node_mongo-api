import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    if (prevProps.counter.value != this.props.counter.value) {
      //Ajax call and get new data from the server
    }
  }

  componentWillUnmount() {
    console.log("Counter - Unmount");
  }
  /*state = {
    value: this.props.counter.value
    //tags: ["tag1", "tag2", "tag3"]
  };*/

  /*constructor(){
    super();
    this.handleIncrement = this.handleIncrement.bind(this);
  }*/

  /*handleIncrement = product => {
    //console.log(product);
    this.setState({ value: this.state.value + 1 });
  };*/

  /*doHandleIncrement = () => {
    this.handleIncrement({ id: 1 });
  }*/

  render() {
    //console.log("props", this.props);
    console.log("Counter - Rendered");

    return (
      <div className="row">
        <div className="col-1 m-2">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
