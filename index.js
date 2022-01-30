import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import word from 'word-list';
import fs from 'fs';
import inquirer from 'inquirer';
import figlet from 'figlet';

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const startGame = async () => {
  console.log(chalk.blue(`Let's Play `) + chalk.red(`Wordie!`));
  console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
  await sleep();
};

const generateWord = (wordLength) => {
  const wordArray = fs.readFileSync(word, 'utf8').split('\n');
  let item = '';
  
  while(item.length !== wordLength) {
    item = wordArray[Math.floor(Math.random() * wordArray.length)];
  }
  // console.log(item.toUpperCase());
  return item.toUpperCase();
}

const handleAnswer = async (puzzleWord, userGuess) => {
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
    console.log("You got the word!");
    process.exit(1);
  } else {
    console.log(resultsArray);
  }
}

const getAnswer = async (count) => {
  const answers = await inquirer.prompt({
    name: 'answer',
    type: 'input',
    message: `Guess ${count + 1}:`
  });

  return answers.answer.toUpperCase();
}

const playGame = async () => {
  let turns = 6;
  const puzzleWord = generateWord(5);

  for(let i = 0; i < turns; i++) {
    const userGuess = await getAnswer(i);
    handleAnswer(puzzleWord, userGuess);
  }
};

await startGame();
playGame();
