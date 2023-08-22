import React from 'react';
import BaseButton from './Button';
class OpButton extends BaseButton {

  onClickHandler =() =>{
    const {label,OpButtonClick}=this.props;
    console.log("operation button handler from op button")
    OpButtonClick(label);
  }
  
  render() {
    return<BaseButton {...this.props} onClick={this.onClickHandler}/>
    
  }
}
export default OpButton;




// import React from 'react';

// const OpButton = ({ operator, handleClick }) => {
//     //const operationButtonArray = ['/', '*', '+', '-'];
//   return (
//     <button className="op-button" onClick={() => handleClick(operator)}>
//       {operator}
//     </button>
//   );
// };

// export default OpButton;
