import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import word from 'word-list';
import fs from 'fs';
import inquirer from 'inquirer';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const playerName = 'Asdf';

const startGame = () => {
  const title = chalkAnimation.rainbow(`Let's Play Wordie!`);
  //await sleep();
  //title.stop();
};

const generateWord = (wordLength) => {
  const wordArray = fs.readFileSync(word, 'utf8').split('\n');
  let item = '';
  
  while(item.length !== wordLength) {
    item = wordArray[Math.floor(Math.random() * wordArray.length)];
  }
  console.log(item);
  return item;
}

async function handleAnswer(puzzleWord, userGuess) {
  //const spinner = createSpinner('Checking answer...').start();
  //await sleep();

  // console.log([...puzzleWord]);
  // console.log([...userGuess]);

  const puzzleWordArray = [...puzzleWord];
  const userGuessArray = [...userGuess];
  const resultsArray = [0, 0, 0, 0, 0];
  let isCorrect = false;

  if (puzzleWord === userGuess) {
    isCorrect = true;
  } else {
    userGuessArray.forEach((value, index) => {
      if(value === puzzleWord[index]) {
        resultsArray[index] = '1';
      } else if(puzzleWord.includes(value) ) {
        resultsArray[index] = '2';
      }
    });
  }

  if (isCorrect) {
    // spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    console.log("Correct!");
  } else {
    // spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    console.log("Wrong!");
    console.log(resultsArray);
    process.exit(1);
  }
}

async function getAnswer() {
  const answers = await inquirer.prompt({
    name: 'answer',
    type: 'input',
    message: 'Answer?',
    default() {
      return 'Player';
    },
  });

  return answers.answer;
}


startGame();
console.log('module: ', word);
const puzzleWord = generateWord(5);
const userGuess = await getAnswer();
handleAnswer(puzzleWord, userGuess);