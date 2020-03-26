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

        var githubURL1 = `https://api.github.com/users/${dataSet.user}`;
        var githubURL2 = `https://api.github.com/users/${dataSet.user}/starred`

        axios.get(githubURL1).then(function(response){
            var followers = response.data.followers;
            var following = response.data.following;
            var imgURL = response.data.avatar_url;
            var repos = response.data.public_repos;
            console.log(response.data);

            // axios.get(githubURL2).then(function(resp){
            //     console.log(resp.data);
            // });

            //console.log(followers);
            //console.log(following);

            fs.writeFile(`${dataSet.user}.html`,genHTML(dataSet), function(err) {

                if (err) {
                  return console.log(err);
                }
            
                console.log("Success!");
            
            });

            pdf.create(genHTML(dataSet)).toFile(`./${dataSet.user}.pdf`, function(err, res) {
                if (err) return console.log(err);
                 console.log(res); 
            });
        })

        // fs.writeFile("aboutme.pdf", JSON.stringify(dataSet, null, '\t'), function(err) {

        //     if (err) {
        //       return console.log(err);
        //     }
        
        //     console.log("Success!");
        // });
    });
}

init();
