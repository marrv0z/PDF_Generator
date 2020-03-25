const fs = require("fs");
const inquirer = require("inquirer");
// const util = require("util");
const axios = require("axios");
const genHTML = require('./generateHTML.js')
const pdf = require("html-pdf");

//const appendTheFile = util.promisify(fs.appendFile);

// const api = {
//     async PDFcreate(html, options, fileNa){
//         await pdf.create(html, options).toFile(fileNa), function (err, res) {
//             if (err){
//                 console.log(err);
//             }
//             console.log(res);
//         }
//     }
// }

const questions = [
    {
        type: "input",
        message: "What's your github user?",
        name: "user"
    },
    {
        type: "list",
        message: "What's your favorite color?",
        choices: ['green', 'blue', 'pink', 'red'],
        name: "color"
    },
    {
        type: "input",
        message: "What's your location (city, state)?",
        name: "loc"
    },
    {
        type: "input",
        message: "What's your name?",
        name: "name"
    }
];



// function writeToFile(fileName, data) {
    
// }

function init() {
    inquirer.prompt(questions).then(function(dataSet){

        var githubURL = `https://api.github.com/users/${dataSet.user}`;

        axios.get(githubURL).then(function(response){
            var followers = response.data.followers;
            var following = response.data.following;
            console.log(response.data);

            console.log(followers);
            console.log(following);
        })

        fs.writeFile("aboutme.pdf", JSON.stringify(dataSet, null, '\t'), function(err) {

            if (err) {
              return console.log(err);
            }
        
            console.log("Success!");
        });
    });
}

init();
