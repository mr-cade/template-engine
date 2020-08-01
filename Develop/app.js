// QUESTIONS IN ORDER OF IMPORTANCE *************
// 1. get init to rerun on yes and push to array correctly
// 2. render html
// 3. get different questions to appear based on role
// 4. Data validation

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html"); // ./output/team.html

const render = require("./lib/htmlRenderer");

const employees = [];

// Data Validation Functions ====================================

// const stringValidate = function(input) {
//     if(typeof input !== "string") {
//         return "please enter valid name"
//     }
// }
// const stringPromise = 
//     (new Promise(stringValidate))
//         .then()
// ==============================================================

// inquirer to gather information about the development team members,
// and to create objects for each team member

function start() {
    inquirer.prompt({
        type: "list",
        message: "What Would You Like To do?",
        name: "option",
        choices: ["Add Employees", "EXIT"]
    }).then(function (res) {
        if (res.option === "Add Employees") {
            questions(employeeQuestions)
                .then(function (answers) {
                    // employees.push(answers)
                   // console.log(employees);

                    if (answers.role === "Intern") {
                        questions(internQuestions).then(internAns => {
                            const myIntern = new Intern(answers.name,answers.id,answers.email,internAns.school)
                            employees.push(myIntern)

                            start()
                        })
                    } else if (answers.role === "Engineer") {
                        questions(engineerQuestions).then(engineerAns => {

                            const myEngineer = new Engineer(answers.name,answers.id,answers.email,engineerAns.github)
                            employees.push(myEngineer)
                            start()
                        })
                    } else {
                        questions(managerQuestions).then(managerAns => {

                            const myManager = new Manager(answers.name,answers.id,answers.email,managerAns.office)
                            employees.push(myManager)
                            start()
                        })
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });

        }else{
           fs.writeFile(outputPath, render(employees), function(err){
               if (err) throw err
               console.log("Done!");
           } )
        }
    })
}



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

// Run inquirer!
function questions(options) {
    return inquirer.prompt(options);
}

// Do while loop????
start()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
//render(employees)
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
