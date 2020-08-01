const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// calls html rendering functon
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];

// Function to run inquirer
function questions(options) {
    return inquirer.prompt(options);
}

// Function that runs the application
function start() {
    // Prompt to continue adding employees or to terminate program and export HTML file
    inquirer.prompt({
        type: "list",
        message: "Would you like to add an employee?",
        name: "option",
        choices: ["Yes, the team is growing!", "No, that's everyone!"]
    }).then(function (res) {
        if (res.option === "Yes, the team is growing!") {
            // If the user inicates yes, parent class questions from inquirer are started
            questions(employeeQuestions)
                // then, follow up with subclass specific questions based on answer to the role question
                .then(function (answers) {
                    if (answers.role === "Intern") {
                        questions(internQuestions)
                            .then(internAns => {
                                // pushes parameters into the json object defined in lib folder
                                const myIntern = new Intern(answers.name, answers.id, answers.email, internAns.school)
                                employees.push(myIntern)
                                // restarts application
                                start()
                            })
                    } else if (answers.role === "Engineer") {
                        questions(engineerQuestions).then(engineerAns => {
                            const myEngineer = new Engineer(answers.name, answers.id, answers.email, engineerAns.github)
                            employees.push(myEngineer)
                            start()
                        })
                    } else {
                        questions(managerQuestions).then(managerAns => {
                            const myManager = new Manager(answers.name, answers.id, answers.email, managerAns.office)
                            employees.push(myManager)
                            start()
                        })
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        } else {
            // If the user indicates they are done adding employees, it creates an HTML file with all of the added data 
            fs.writeFile(outputPath, render(employees), function (err) {
                if (err) throw err
                console.log("Your team's .html file has been exported to the output folder.");
            })
        }
    })
};

// Initiate Program ==================================================
start()

// Question arrays used in inquirer ==================================
const employeeQuestions = [
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
        // validate: stringPromise
    },
    {
        type: "input",
        message: "What is the employee's ID number?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email?",
        name: "email"
    },
    {
        type: "list",
        message: "What is the role of this employee?",
        name: "role",
        choices: [
            "Intern",
            "Engineer",
            "Manager"
        ]
    }
]
const internQuestions = [
    {
        type: "input",
        message: "Where does the intern attend school?",
        name: "school"
    }
]
const engineerQuestions = [
    {
        type: "input",
        message: "What is the engineer's Github?",
        name: "github"
    }
]
const managerQuestions = [
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "office"
    }
]