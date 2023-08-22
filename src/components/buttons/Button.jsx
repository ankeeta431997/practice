import React from "react";
class BaseButton extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
    return(
        <button className={this.props.className} onClick={this.onButtomClick} id={this.props.id}>{this.props.label}</button>
    );
    }
    onButtomClick =()=>{
        this.props.onClick();
        console.log("in button click");
    }
  }
  export default BaseButton;