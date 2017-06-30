// Require local modules and npm packages
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");

// Arrays that hold new objects created by constructors
var basicArr = [];
var clozeArr = [];

// Function that takes in user input. Gets called recursively.
function makeCard(){
	console.log("==============================================");
	inquirer.prompt([
		{
			type: "confirm",
			name: "confirm",
			message: "Do you want to make a new flashcard?",
			default: false
		}
	]).then(function(confirm){
		if (confirm.confirm === false){
			// Check if there are any new cards made. If no, output default message. Else, print objects to the terminal.
			if (basicArr.length === 0 && clozeArr.length === 0){
				console.log("Ok, come back when you want to create a new flashcard!");
			}
			else{
				// Prints the cards made to the terminal
				console.log("Here are your cards!");
				console.log("Basic Cards: " + JSON.stringify(basicArr, null, 2));
				console.log("Cloze Cards: " + JSON.stringify(clozeArr, null, 2));
			}
		}
		else{
			console.log("Let's do this!");
			// Ask which flashcard to make
			inquirer.prompt([
				{
					type: "list",
					name: "selection",
					message: "Which flashcard do you want to make?",
					choices: ["Basic Card", "Cloze Card"]
				}
			]).then(function(select){
				// Conditions for Cloze or Basic card selection
				if (select.selection === "Cloze Card"){
					// Cloze Card - Creates new cloze card using constructor in ClozeCard.js
					inquirer.prompt([
						{
							type: "input",
							name: "text",
							message: "Enter the full text of the flashcard:"
						},
						{
							type: "input",
							name: "cloze",
							message: "Enter the cloze portion of the flashcard:"
						}
					]).then(function(cloze){
						var newCard = new ClozeCard(cloze.text, cloze.cloze);
						clozeArr.push(newCard);
						makeCard();
					});
				}
				else{
					// Basic Card - Creates new basic card using constructor in BasicCard.js
					inquirer.prompt([
						{
							type: "input",
							name: "front",
							message: "Enter the front part of the flashcard:"
						},
						{
							type: "input",
							name: "back",
							message: "Enter the back part of the flashcard:"
						}
					]).then(function(basic){
						var newCard = new BasicCard(basic.front, basic.back);
						basicArr.push(newCard);
						makeCard();
					});
				}
			});
		}
	});
}
// Initial function call to make new flashcards
makeCard();