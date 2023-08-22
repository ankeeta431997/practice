import React from 'react';
import BaseButton from './Button';
class FunButton extends BaseButton {

  onClickHandler =() =>{
    const {label,FunButtonClick}=this.props;
    console.log("function button handler from fun button")
    FunButtonClick(label);
  }
  
  render() {
    return<BaseButton {...this.props} onClick={this.onClickHandler}/>
    
  }
}
export default FunButton;