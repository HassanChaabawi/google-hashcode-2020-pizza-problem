let fs = require("fs");
let readline = require("readline");

// Files Name
const fileNames = [
  "a_example",
  "b_small",
  "c_medium",
  "d_quite_big",
  "e_also_big",
];

// Reading file one by one
fileNames.forEach((filename) => {
  let lineReader = readline.createInterface({
    input: fs.createReadStream(`./Input/${filename}.in`),
  });

  let data = [];

  lineReader.on("line", function (line) {
    data.push(line.split(" "));
  });

  lineReader.on("close", function () {
    let max, n, inputs;

    [max, n] = data[0];
    inputs = data[1];
    Solve(max, n, inputs, filename);
  });
});

// max: maximum slices
// n: types of pizza
// inputs: array (the number of slices in each type of pizza)
const Solve = (max, n, inputs, filename) => {

  let pizzasAmount = n;

  let pizzas = inputs.reverse();

  let answers = [];

  let solved = false;

  max = parseInt(max);

  let pizzaIndex = 0

  let stoppingPoints = []

  for (let i = 0; i < pizzasAmount; i++) {
    let answer = 0;
    for (let j = i; j < pizzasAmount; j++) {
      let pizza = parseInt(pizzas[j]);
      if (answer + pizza <= max) {
        pizzaIndex = j
        answer += pizza;
        if (answer === max) {
          answers = [answer];
          solved = true;
          break;
        }
      } else {
        stoppingPoints.push({answer: answer - pizzas[pizzaIndex] + pizza, startFrom: j + 1})
      }
    }
    answers.push(answer);
    if (solved) {
      break;
    }
  }

  if (!solved) {
    for (let k = 0; k < stoppingPoints.length; k++) {
      for (l = stoppingPoints[k].startFrom;l < pizzasAmount; l++) {
        let answer2 = stoppingPoints[k].answer + parseInt(pizzas[l]);
        if (answer2 <= max) {
          answers.push(answer2);
          if (answer2 === max) {
            answers = [answer2];
            solved = true;
            break;
          }
        }
      }
      if (solved) {
        break;
      }
    }
  }
  console.log("Max Score: ", Math.max(...answers));
};
