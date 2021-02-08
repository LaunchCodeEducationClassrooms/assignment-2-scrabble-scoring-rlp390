// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();

	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   const input = require('readline-sync');
   let word = input.question("Let's play some scrabble!  Enter a word:  ");
   return word;
};

function simpleScorer(word) {
  return word.length;
}

function vowelBonusScorer(word) {
  let score = 0;
  let lowerWord = word.toLowerCase();
  let vowels = ["a", "e", "i","o","u"];

  for (let i = 0; i < word.length; i++) {
    if (vowels.indexOf(lowerWord[i]) >= 0) {
      score += 3;
    } else {
      score +=1;
    }
  }
  return score
}


let simpleScore;

let vowelBonusScore;

let scrabbleScore;

const scoringAlgorithms = [
  { name: "Simple Score",
    description: "Each letter is worth 1 point",
    scoreFunction: simpleScorer
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoreFunction: vowelBonusScorer
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoreFunction: scrabbleScorer
  }
];

function scorerPrompt() {
  const input = require('readline-sync');
  console.log("Which scoring algorithm would you like to use?\n\n");

  for (let i=0; i< scoringAlgorithms.length; i++) {
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
  }

  let answer = input.question("Enter 0, 1, or 2: ");

  while (isNaN(Number(answer)) || answer < 0 || answer > 2) {
    answer = input.question("Invalid choice, enter 0, 1, or 2: ");
  }
  
  return answer;
}

function transform(object) {
  const newStructure = {" ": 0};

  for (let i=0; i<11; i++) {
    if(i in object) {
      for(let j=0; j<object[i].length;j++) {
        newStructure[object[i][j].toLowerCase()]=i;
      }
    }
  }
  return newStructure
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
  let score = 0;
  word = word.toLowerCase();

  for (let i = 0; i < word.length; i++) {

    score += newPointStructure[word[i]];
  }
  return score;
}

function runProgram() {
 let word = initialPrompt();
 let algorithmChoice = scorerPrompt();

 console.log(`Score for '${word}': ${scoringAlgorithms[algorithmChoice].scoreFunction(word)}`);   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

