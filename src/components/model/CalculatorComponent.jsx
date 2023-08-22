import React from 'react';
import FunButton from '../buttons/FunButton';
import OpButton from '../buttons/OpButton';
import Display from '../display/Display';
import NumButton from '../buttons/NumButton';
import { numberButtons,operatorButtons,functionButtons } from './ButtonValues';

const CalculatorComponent = ({ displayValue, handleNumberClick, handleOperationClick, handleFunctionClick }) => {
  return (
    <div className="calculator">
      <Display value={displayValue} />

      {/* <div className="button-container">
        <div className="num-buttons">
          {numberButtons.map((number) => (
            <NumButton key={number} number={number} handleClick={handleNumberClick} />
          ))}
        </div> */}
        <div className="num-buttons">
          {numberButtons.map((number) =>(
            <NumButton key={number} className="num-button" label={number} NumButtonClick={()=> handleNumberClick(number)}/>
          ))}
          <div className="op-buttons">
          {operatorButtons.map((label) =>(
            <OpButton key={label} className="fun-button" label={label} OpButtonClick={()=> handleOperationClick(label)}/>
          ))}
          </div>
          <div className="fun-buttons">
          {functionButtons.map((label) =>(
            <FunButton key={label} className="fun-button" label={label} FunButtonClick={()=> handleFunctionClick(label)}/>
          ))}
          </div>
          
          

        {/* <div className="op-buttons">
          {operatorButtons.map((operator) => (
            <OpButton key={operator} operator={operator} handleClick={handleOperationClick} />
          ))}
        </div>

        <div className="fun-buttons">
          {functionButtons.map((label) => (
            <FunButton key={label} label={label} handleClick={handleFunctionClick} />
          ))}
        </div> */}
        
      </div>
    </div>
  );
};
export default CalculatorComponent;