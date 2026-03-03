import { addStat, printStats } from "stats";
import { setPlayer, injurePlayer, killPlayer, getRandomAlivePlayerIndex, getAllPlayersDead } from "players"
import { print, clear } from "terminal"
import { events } from "events";

// Buttons
const buttonElements = [
    document.getElementById("option-button1"),
    document.getElementById("option-button2")
];

buttonElements[0].disabled = true;
buttonElements[1].disabled = true;

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

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Event and option handling
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
    if (effects.days !== undefined) addStat("day", effects.days);
    if (effects.food !== undefined) addStat("food", effects.food);
    if (effects.money !== undefined) addStat("money", effects.money);
    if (effects.happiness !== undefined) addStat("happiness", effects.happiness);
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

            const randomPlayer = getRandomAlivePlayerIndex();

            if (selectedOption.effects.injurePlayer && randomPlayer !== null)
                injurePlayer(randomPlayer);

            if (selectedOption.effects.killPlayer && randomPlayer !== null)
                killPlayer(randomPlayer);

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

async function handleEnd() {
    clear();
    await print("Congrats, You have reached Oregon!");

    gameState = "end";

    setButtonContent(0, "View Final Stats");
    setButtonContent(1, "");

    buttonElements[1].disabled = true;
}

async function handleDeath() {
    clear();
    await print("Your party has fallen.\n");
    await print("View stats?");

    gameState = "end";

    setButtonContent(0, "View Final Stats");
    setButtonContent(1, "");

    buttonElements[1].disabled = true;
}

export async function handleEvent() {
    if (getAllPlayersDead()) {
        await handleDeath();
        return;
    }

    clear();

    await delay(4500);

    // Choose a random event
    currentEvent = chooseEvent();

    // Check if there are no events left
    if (currentEvent === null) {
        await handleEnd();
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

export function takeNames() {
    return new Promise((resolve) => {
        gameState = "naming";

        // Hide option buttons
        buttonElements[0].style.display = "none";
        buttonElements[1].style.display = "none";

        const container = document.getElementById("game-name-entry-container");
        container.innerHTML = "";

        const inputs = [];

        for (let i = 0; i < 4; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Player ${i + 1} Name`;
            input.classList.add("game-name-input");

            container.appendChild(input);
            inputs.push(input);

            container.appendChild(document.createElement("br"));
        }

        const doneButton = document.createElement("button");
        doneButton.textContent = "Done";
        container.appendChild(doneButton);

        doneButton.addEventListener("click", () => {
            for (let i = 0; i < inputs.length; i++) {
                const name = inputs[i].value.trim();
                if (name === "") {
                    alert("All players must have names!");
                    return;
                }
                setPlayer(i, name);
            }

            container.innerHTML = "";

            buttonElements[0].style.display = "inline-block";
            buttonElements[1].style.display = "inline-block";

            gameState = "event";

            resolve();
        });
    });
}
