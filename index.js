import inquirer from "inquirer";

const questions = [
    {
        type: "input",
        name: "input",
        message: "Input: ",
    },
];

const symbols = {
    A: 1,
    B: 5,
    Z: 10,
    L: 50,
    C: 100,
    D: 500,
    R: 1000,
};
const alienNumber = (text) => {
    let output = 0,
        tempChar = "",
        tempValue = 0,
        index = 0,
        lastIndex = 0,
        explanations = [],
        subtraction = false;

    // get alient number
    for (let i = text.length - 1; i >= 0; i--) {
        const thisChar = text[i];
        const thisValue = symbols[thisChar];

        if (thisValue >= tempValue) {
            output += thisValue;
        } else {
            output -= thisValue;
        }

        tempChar = thisChar;
        tempValue = thisValue;
    }

    tempChar = "";
    tempValue = 2000;

    for (let i = 0; i < text.length; i++) {
        const thisChar = text[i];
        const thisValue = symbols[thisChar];

        index++;
        if (thisValue <= tempValue) {
            if (!subtraction) {
                // first charactor
                if (i === 0 && symbols[text[i + 1]] > thisValue) {
                    subtraction = true;
                } else {
                    if (thisValue === tempValue) {
                        if (explanations[lastIndex] === undefined)
                            explanations[lastIndex - 1] += thisChar;
                        else explanations[lastIndex] += thisChar;
                    } else {
                        explanations.push(thisChar);
                        lastIndex = index;
                    }
                }
            }
            subtraction = false;
        } else {
            explanations.push(`${tempChar + thisChar}`);
            subtraction = true;
        }
        // check next charactor
        if (!subtraction) {
            if (text[i + 1] !== undefined && text[i + 2] !== undefined) {
                if (symbols[text[i + 2]] > symbols[text[i + 1]]) {
                    subtraction = true;
                }
            }
        }

        tempChar = thisChar;
        tempValue = thisValue;
    }

    return { output, explanations };
};

const alientExplanation = (explanations) => {
    let results = [];

    for (let i = 0; i < explanations.length; i++) {
        const explanation = explanations[i];

        results.push(`${explanation} = ${alienNumber(explanation).output}`);
    }

    return results;
};

inquirer.prompt(questions).then((answers) => {
    const alient = alienNumber(answers.input);
    console.log(`Output: ${alient.output}`);
    console.log(
        `Explanation: `,
        alientExplanation(alient.explanations).join(", ")
    );
});
