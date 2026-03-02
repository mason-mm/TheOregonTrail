import { setStat, printStats } from "stats";
import { print, clear } from "terminal"

// Buttons
const buttonElements = [
    document.getElementById("option-button1"),
    document.getElementById("option-button2")
];

let buttonContents = [
    "",
    ""
];

function updateButtonText() {
    // Update the text content of every button
    for (let i = 0; i < buttonElements.length; i++) {
        buttonElements[i].textContent = buttonContents[i];
    }
}

function setButtonContent(index, text) {
    // Set the button at the given index's content to the text and update the text
    buttonContents[index] = text;
    updateButtonText();
}

// Event and option handling
// List all of the possible events and their properties
const events = [
    {
        text: "First Event",
        options: [
            {
                text: "First Event Option",
                effects: {
                    days: -2,
                    health: 0,
                    food: 0,
                    player: "Dead"
                },
                resultText: "First Event Result Text"
            },
            {
                text: "First Event Option 2",
                effects: {
                    days: 0,
                    health: 0,
                    food: 0
                },
                resultText: "First Event Result Text 2"
            }
        ]
    },
    {
        text: "Second Event",
        options: [
            {
                text: "Second Event Option",
                effects: {
                    days: -2,
                    health: 0,
                    food: 0
                },
                resultText: "Second Event Result Text"
            },
            {
                text: "Second Event Option 2",
                effects: {
                    days: 0,
                    health: 0,
                    food: 0
                },
                resultText: "Second Event Result Text 2"
            }
        ]
    },
    {
        text: "Second Event",
        options: [
            {
                text: "Second Event Option",
                effects: {
                    days: -2,
                    health: 0,
                    food: 0
                },
                resultText: "Second Event Result Text"
            },
            {
                text: "Second Event Option 2",
                effects: {
                    days: 0,
                    health: 0,
                    food: 0
                },
                resultText: "Second Event Result Text 2"
            }
        ]
    },
    {
        text: "Second Event",
        options: [
            {
                text: "Second Event Option",
                effects: {
                    days: -2,
                    health: 0,
                    food: 0
                },
                resultText: "Second Event Result Text"
            },
            {
                text: "Second Event Option 2",
                effects: {
                    days: 0,
                    health: 0,
                    food: 0
                },
                resultText: "Second Event Result Text 2"
            }
        ]
    }
];

function chooseEvent() {
    // Check if there are no events left
    if (events.length === 0) {
        return null;
    }

    // Get a random index and return it while deleting it from the array to not reuse events
    const randNum = Math.floor(Math.random() * events.length);
    return events.splice(randNum, 1)[0];
}

let currentEvent = null;

// Add event listeners for each button
for (let i = 0; i < buttonElements.length; i++) {
    buttonElements[i].addEventListener("click", () => {
        handleOption(i);
    });
}

function applyEffects(effects) {
    // Go through every stat and update it
    if (effects.days !== undefined) setStat("day", effects.days);
    if (effects.food !== undefined) setStat("food", effects.food);
    if (effects.money !== undefined) setStat("money", effects.money);
    if (effects.happiness !== undefined) setStat("happiness", effects.happiness);
    if (effects.player !== undefined) {
        // TODO: Apply the effect to a random player
    }
}

let gameState = "event";

async function handleOption(index) {
    // Disable buttons
    buttonElements[0].disabled = true;
    buttonElements[1].disabled = true;

    switch (gameState) {
        case "event":
            gameState = "result";

            const selectedOption = currentEvent.options[index];

            applyEffects(selectedOption.effects);

            clear();
            await print(selectedOption.resultText);

            setButtonContent(0, "Continue");
            setButtonContent(1, "");

            buttonElements[1].disabled = true;
            break;
        case "result":
            gameState = "event";
            await handleEvent();
            break;
        case "end":
            gameState = "quit";

            clear();
            await print("Final Stats:\n");
            await printStats();

            setButtonContent(0, "Quit");
            setButtonContent(1, "");

            buttonElements[1].disabled = true;
            break;
        case "quit":
            window.location.href = "../index.html"
            break;
        default:
            console.error("Game state not found");
    }

    // Only Enable the continue button
    buttonElements[0].disabled = false;
}

export async function handleEvent() {
    // Choose a random event
    currentEvent = chooseEvent();

    // Check if there are no events left
    if (currentEvent === null) {
        // Setup the end screen text
        clear();
        await print("Congrats, You have reached Oregon!");

        gameState = "end";

        setButtonContent(0, "View Final Stats");
        setButtonContent(1, "");

        buttonElements[1].disabled = true;

        return;
    }

    // Disable all of the buttons
    buttonElements[0].disabled = true;
    buttonElements[1].disabled = true;

    // Update the buttons text
    setButtonContent(0, currentEvent.options[0].text);
    setButtonContent(1, currentEvent.options[1].text);

    // Print the events message
    clear();
    await print(currentEvent.text);

    // Enable all of the buttons
    buttonElements[0].disabled = false;
    buttonElements[1].disabled = false;
}
