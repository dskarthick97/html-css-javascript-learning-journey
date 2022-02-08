/*
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.

Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure

Should produce this output (5 separate console.log outputs):
underscoreCase
firstName ✅✅✅
someVariable
calculateAge ✅✅✅
✅✅✅✅
delayedDeparture ✅✅✅✅✅

Hints:
Remember which character defines a new line in the textarea 😉
The solution only needs to work for a variable made out of 2 words, like a_b
Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
*/

const removeUnderscore = function (variableNames) {
  const results = [];

  for (const variableName of variableNames) {
    let [beforeUnderscore, afterUnderScore] = variableName
      .toLowerCase()
      .trim()
      .split("_");

    afterUnderScore = afterUnderScore.replace(
      afterUnderScore[0],
      afterUnderScore[0].toUpperCase()
    );
    results.push(`${beforeUnderscore}${afterUnderScore}`);
  }

  return results;
};

console.log(
  removeUnderscore([
    "underscore_case",
    "first_name",
    "Some_Variable",
    "calculate_AGE",
    "delayed_departure",
  ])
);
