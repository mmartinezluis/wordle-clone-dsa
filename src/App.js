import React, {useCallback, useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';

const queue = [0,1,2,3,4,5];
let counter = 0;
let alphabet = {A:'A',B:'B',C:'C',D:'D',E:'E',F:'F',G:'G',H:'H',I:'I',J:'J',K:'K',L:'L',M:'M',N:'N',O:'O',P:'P',Q:'Q',R:'R',S:'S',T:'T',U:'U',V:'V',W:'W',X:'X',Y:'Y',Z:'Z'};
const dictionary = {TARGET: "TARGET"};
const TARGET = "HELLO";
const TARGET_MAP = {};
for(let char of TARGET) {
  // '1' means the character is in the stricg; not the count of the character
  TARGET_MAP[char] = 1;
}
const attempts = {};
const BLANK = "";
const MISSED = "missed";
const CLOSE = "close";
const RIGHT = "right";

function App() {

  const [inputs, setInputs] = useState(new Array(6).fill(0).map(el => new Array(5).fill("")));
  const [assertion, setAssertion] = useState(new Array(6).fill(0).map(el => new Array(5).fill(BLANK)));

  const didWinGame = useCallback((row, word_array) => {
    return processWord(row, word_array);
  },[])

  function processWord(row, word_array) {
    let correct = 0;
    for(let i = 0; i < TARGET.length; i++) {
      setTimeout(() => {
        if(!TARGET_MAP[word_array[i]]){ 
          setAssertion([...assertion, assertion[row][i] = MISSED ]);
        } else if(word_array[i] === TARGET[i]) {
          setAssertion([...assertion, assertion[row][i] = RIGHT]);
          correct++;
        } else {
          setAssertion([...assertion, assertion[row][i] = CLOSE]);
        }
      },i*1000)
    }
    if(correct === TARGET.length) return 1;
    attempts[word_array.join("")] = 1;
    console.log(assertion)
    return 0;
  }

  function validWord(word) {
    // if(!dictionary[word]) return false;
    return true;
  }

  function display() {

  }

  function lostGame() {

  }

  const detectKeyDown = useCallback((e) => {
    const key = e.key.toUpperCase();
    const row = queue[0];
    console.log(key)
    if(key === 'ENTER') {
      if(counter < 5) {
        display("Not enough letters");
        console.log("Not enough letters")
        return;
      }
      if(!validWord(key)) {
        display("That's not in our dictionary");
        console.log("That's not in our dictionary");
        return;
      }
      if(attempts[inputs[row].join("")]) {
        display("You already used that word");
        console.log("You already used that word");
        return;
      }
      if(didWinGame(row, inputs[row])) {
        display("Congratulations!!!")
        return;
      };
      queue.shift();
      counter = 0;
      if(!queue.length) {
        lostGame();
        display("The word was", TARGET);
        console.log("The word was", TARGET);
        // @TODO remove keydown event listener
        document.removeEventListener('keydown', {}, undefined)
      }
    } else if(key === 'BACKSPACE') {
      if(counter > 0 && counter <= 5) {
        counter -= 1;
        setInputs([...inputs, inputs[row][counter] = ""]);
        return;
      }
    } else if(alphabet[key]) {
      if(counter > 4) return;
      setInputs([...inputs, inputs[row][counter] = key])
      counter += 1;
    }
  },[didWinGame, inputs])


  useEffect(() => {
    console.log("In use effect")
    document.addEventListener('keydown', detectKeyDown, true)
    return () => {
      document.removeEventListener('keydown', {}, undefined)
    };
  },[]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    <h1>Wordie Clone</h1>
    <Board 
      inputs={inputs}
      assertion={assertion}
    />
    </div>
  );
}

export default App;


console.log("APP rendered")
const Board = ({inputs, assertion}) => {
  console.log(inputs)
  return(
    <div className='board' style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      {new Array(6).fill(0).map((row_el, row_index) => {
        return (
          <div key={row_index} className='row' style={{display: 'flex'}}>
            {new Array(5).fill(0).map((col_el, col_index) => {
              return(
                <div key={row_index + col_index} className={`cell ${assertion[row_index][col_index]}`} style={{border: 'black solid 1.5px', width: '50px', height: '50px', display: 'flex', justifyContent:'center', alignItems:'center', margin: '5px'}}>
                  {inputs[row_index][col_index]}    
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
