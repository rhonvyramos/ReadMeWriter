// necessary packages to execute program
const inquirer = require("inquirer");
const file_system = require("fs");

// array of question objects for inquirer
const questions = [
    {
        name: "title",
        message: "Title your project: ->",
    },
    {
        name: "description",
        message: "Describe your project: ->",
    },
    {
        name: "installation",
        message: "Describe the installation process: ->",
    },
    {
        name: "usage",
        message: "Describe your project: ->",
    },
    {
        name: "description",
        message: "Detail how your project is used: ->",
    },
    {
        name: "credits",
        message: "List who is to be credited for this project: ->",
    },
    {
        name: "features",
        message: "List what features does the project present: ->",
    },
    {
        name: "contribution",
        message: "Describe how other developers can contribute to this project: ->",
    },
    {
        name: "tests",
        message: "Detail how this project was tested: ->",
    },

    // licenses list taken from https://choosealicense.com/licenses/
    {
        type: "list",
        name: "license",
        message: "Under what license does this project fall under: ->",
        choices: [
            "MIT_License", "GNU_AGPLv3", "GNU_GPLv3", "GNU_LGPLv3", "Mozilla_Public_License 2.0", "Apache_License 2.0", "Boost_Software_License 1.0", "The_Unlicense"
        ]
    },
    {
        name: "github",
        message: "Enter your GitHub username: ->",
    },
    {
        name: "email",
        message: "Enter your email: ->",
    },
    {
        type: "confirm",
        name: "confirm",
        message: "Confirm README contents? ->",
        default: false
    }
];

// function to prompt user for data then writes user inputs into README.md file
function writeToFile(fileName, data) {

    /*
    readMe should have these sections:
    description
    installation
    usage
    credits
    license
    features
    contribution methods
    tests
    */

    inquirer.prompt(data)
    .then(answers => {
        // assigns string template into variable
        if(answers.confirm == false) {
            console.log("README.md not created.");
            return;
        } ;

        let written_readme = write_readme(answers);

        // writes string into README.md file
        file_system.writeFile("./written_files/" + fileName, written_readme, function(err) {
            if (err) throw err;

            // log to show that the file has been saved
            console.log("File saved.");
        });
    });
};

function write_readme(answers) {
    // destructuring answers object into individual variables
    const {title, description, installation, usage, credits, features, contribution, tests, license, github, email} = answers;

    // assigns string template using answers variables
    let readMe_text = 
    `# ${title}\n` + 
    `## Table of Contents\n- **[Description](#description)**\n\n- **[Installation](#installation)**` + 
    `\n\n- **[Usage](#usage)**\n\n- **[Credits](#credits)**\n\n- **[Features](#features)**\n\n- **[Contribution](#contribute)**\n\n- **[Tests](#tests)**\n` +
    `## Description\n${description}\n## Installation\n${installation}\n## Usage\n${usage}\n## Credits\n${credits}\n` +
    `## License\nThis project is licensed under the terms of the MIT license.\n` + 
    `\n![Static Badge](https://img.shields.io/badge/build-MIT-brightgreen?label=License)` +
    `\n## Features\n${features}\n## Contribution\n${contribution}\n## Tests\n${tests}`

    // assigns tring template using answers variables to create the full readme
    let readMe_text_complete = 
    // license badge
    `![License Badge](https://img.shields.io/badge/License-${license}-brightgreen)\n` +

    // title
    `# ${title}\n` +

    // table of contents
    `## Table of Contents\n- **[Description](#description)**\n\n- **[Installation](#installation)**` +
    `\n\n- **[Usage](#usage)**\n\n- **[Credits](#credits)**\n\n- **[Features](#features)**\n\n- ` +
    `**[Contribution](#contribute)**\n\n- **[Tests](#tests)**\n\n- **[License](#license)**\n\n- **[Questions](#questions)**\n` +

    // description, installation, usage, features, contribution, and credits sections
    `## Description\n${description}\n## Installation\n${installation}\n## Usage\n${usage}\n## Features\n${features}\n## Contribution\n${contribution}\n## Credits\n${credits}\n` +

    // license section
    `## License\nThis project falls under the ${license}.\n` +

    // questions section
    `## Questions\nThis project is available in the author's [GitHub](github.com/${github}). If any further questions are required, simply write an email to ${email}` 

    // returns new variable with full readMe string
    return readMe_text_complete;
};

// begins the function
function init() {
    writeToFile("README.md", questions);
};

// function call to initialize app
init();
