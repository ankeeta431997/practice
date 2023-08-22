import React from 'react';
import BaseButton from './Button';
class NumButton extends BaseButton {

  onClickHandler =() =>{
    const {label,NumButtonClick}=this.props;
    console.log("number button handler from num button")
    NumButtonClick(label);
  }
  
  render() {
    return<BaseButton {...this.props} onClick={this.onClickHandler}/>
    
  }
}
export default NumButton;



// const numButton = ({ number, handleClick }) => {
//     //const numButtonArray = ['9', '8', '7', '6', '5', '4', '1', '2', '3', '0'];
//   return (
//     <button className="num-button" onClick={() => handleClick(number)}>
//       {number}
//     </button>
//   );
// };

// export default numButton;

