import React, { useState } from 'react';
//import NumButton from '../buttons/NumButton';
// import FunButton from '../buttons/funButton';
// import OpButton from '../buttons/OpButton';
// import Display from '../display/Display';
// import NumButton from '../buttons/numButton';
import axios from 'axios';
import CalculatorComponent from '../model/CalculatorComponent';
import authHeader from '../../services/auth.header';


function Calculator() {

  const apiUrl = 'http://localhost:8080/SpringSecurityJwtFinal-master/calculation';

  const [displayValue, setDisplayValue] = useState('0');

  const [inputArray, setInputArray] = useState([]);
  const [previousResult, setPreviousResult] = useState('0');

  const handleNumberClick = (num) => {
  
    // let value = displayValue;
    // const newValue = value === '0' ? num.toString() : value + num;
    // setDisplayValue(newValue);

    let value = displayValue + "";
    // console.log("Number key " + displayValue);
    const newValue = value === '0' ? num.toString() : value + num;
    setDisplayValue(newValue);
    const updatedInputArray = [...inputArray];
    if (updatedInputArray.length > 0 &&
      updatedInputArray[updatedInputArray.length - 1].type === 'num') {
      updatedInputArray[updatedInputArray.length - 1].value += num;
    } else {
      updatedInputArray.push({ value: num, type: 'num' });
    }
    console.log(inputArray, 'after push');
    setInputArray(updatedInputArray)
  };

  const handleFunctionClick = (func) => {
    // if (func === 'C') {
    //   setDisplayValue('0');
    // } else if (func === '=') {
    //   try {
    //     calculator();
    //   } catch (error) {
    //     console.log('Error:', error);
    //   }
    // } else if (func === 'DEL') {
    //   setDisplayValue((prevValue) => prevValue.slice(0, -1));
    // }
    if (func === 'C') {
      setDisplayValue('0');
      setInputArray([]);
      setPreviousResult('0');
    } else if (func === '=') {
      try {
        calculate();
      } catch (error) {
        console.log('Error:', error);
      }
    } else if (func === 'DEL') {
      // setDisplayValue((prevValue) => prevValue.slice(0, -1));
      // setInputArray((prevArray) => prevArray.slice(0, -1));
      setInputArray((prevArray) => {
        const newArray = [...prevArray];
        newArray.pop();
        return newArray;
      });
      const value = displayValue + "";
      const newValue = value.length === 1 ? '0' : value.slice(0, -1);
      setDisplayValue(newValue);
    }
  };

  const handleOperationClick = (op) => {
    // const value = displayValue;
    // const lastChar = value.slice(-1);
    // let newValue = null;
    // if (lastChar === '+' || lastChar === '-' || lastChar === '*' ||lastChar === '/') {
    //   newValue = value.slice(0, -1) + op;
    // } else {
    //   newValue = value + op;
    // }
    // setDisplayValue(newValue);
    const value = displayValue + "";
    const lastChar = value.slice(-1);
    let newValue = null;
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' ||
      lastChar === '/') {
      newValue = value.slice(0, -1) + op;
    } else {
      newValue = value + op;
    }
    setDisplayValue(newValue);
    const updatedInputArray = [...inputArray];
    if (updatedInputArray.length > 0 &&
      updatedInputArray[updatedInputArray.length - 1].type === 'op') {
      updatedInputArray[updatedInputArray.length - 1].value = op;
    } else {
      updatedInputArray.push({ value: op, type: 'op' });
    }
    setInputArray(updatedInputArray);

  };

  // const calculator = () => {
  //   let value = displayValue;
  //   try {
  //     const result = eval(value);
  //     setDisplayValue(result.toString());
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };

  const calculate = () => {
    // const apiUrl = 'http://localhost:8080/SpringSecurity1111/calculation';
    let value = displayValue + "";
    const inputArrayToSend = [...inputArray];
    if (previousResult !== '0') {
      inputArrayToSend.push({ value: previousResult, type: 'num' });
    }
    axios.post(apiUrl, inputArrayToSend, { headers: authHeader() })
      .then((response) => {
        const result = response.data.result;
        setPreviousResult(result);
        setDisplayValue(result);
        setInputArray([{ value: result, type: 'num' }]);
      })
      
      .catch((error) => {
        console.log('Error:', error);
         let msg = alert("You are a user,only admin views the results.")
          
        
      });
      
  };


  return (
    <CalculatorComponent
      displayValue={displayValue}
      handleNumberClick={handleNumberClick}
      handleOperationClick={handleOperationClick}
      handleFunctionClick={handleFunctionClick}
    />
  );
}

export default Calculator;


