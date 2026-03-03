import { addStat, printStats, food } from "stats";
import { setPlayer, getPlayer, injurePlayer, killPlayer,
         getRandomAlivePlayerIndex, getAllPlayersDead, getAlivePlayerListLength } from "players"
import { print, clear } from "terminal"
import { events } from "events";

// Buttons
const buttonElements = [
    document.getElementById("option-button1"),
    document.getElementById("option-button2"),
    document.getElementById("option-hunt-button")
];

buttonElements[0].disabled = true;
buttonElements[1].disabled = true;
buttonElements[2].disabled = true;

let buttonContents = [
    "",
    ""
];

function updateButtonText() {
    // Update the text content of every button
    for (let i = 0; i < 2; i++) {
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
let currentEventPlayerIndex = null;

async function hunt() {
    console.log("Hunting");
    buttonElements[0].disabled = true;
    buttonElements[1].disabled = true;
    buttonElements[2].disabled = true;

    clear();
    await print("You hunt for two days...");

    await delay(1500);

    const rand = Math.floor(Math.random() * 3);
    if (rand < 2) {
        addStat("food", 25);
        addStat("day", 2);
        await print("Success! (+25 food, +2 days)");
    } else {
        addStat("day", 2);
        await print("Failed! (+2 days)");
    }

    buttonElements[0].disabled = false;
    buttonElements[1].disabled = false;
}

// Add event listeners for each button
for (let i = 0; i < 2; i++) {
    buttonElements[i].addEventListener("click", () => {
        handleOption(i);
    });
}

// Hunt button
buttonElements[2].addEventListener("click", async () => {
    await hunt();
});

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
    buttonElements[2].disabled = true;

    switch (gameState) {
        case "event":
            gameState = "result";

            const selectedOption = currentEvent.options[index];

            applyEffects(selectedOption.effects);

            const targetPlayer = currentEventPlayerIndex;

            if (selectedOption.effects.injurePlayer && targetPlayer !== null)
                injurePlayer(targetPlayer);

            if (selectedOption.effects.killPlayer && targetPlayer !== null)
                killPlayer(targetPlayer);

            clear();
            
            const resultText = selectedOption.resultText.replaceAll(
                "{name}",
                currentEventPlayerIndex !== null
                    ? getPlayer(currentEventPlayerIndex).name
                    : "They"
            );

            await print(resultText);

            setButtonContent(0, "Continue");
            setButtonContent(1, "");

            buttonElements[1].disabled = true;
            buttonElements[2].disabled = true;
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
            buttonElements[2].disabled = true;
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
    buttonElements[2].disabled = true;
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

async function handleTraveling() {
    clear();

    await print("Traveling...");

    // Eat food
    addStat("food", -(10 * getAlivePlayerListLength()));

    // Add days
    addStat("day", 5);

    for (let i = 0; i < 4; i++) {
        const player = getPlayer[i];
        if (player && player.health !== "Dead") {
            // Check for players healed
            if (player.health === "Injured" && player.timeInjured >= 3) {
                setPlayer(i, player.name, "Well", 0);

                await print(`${player.name} is no longer injured`);
                continue;
            }

            setPlayer(i, player.name, player.health, player.timeInjured + 1);
        }
    }

    // Check for starvation
    if (food <= 5) {
        let randIndex = getRandomAlivePlayerIndex();

        await print(`${getPlayer(randIndex).name} has starved`);

        injurePlayer(randIndex);
    }

    await delay(1500);
}

export async function handleEvent() {
    if (getAllPlayersDead()) {
        await handleDeath();
        return;
    }

    await handleTraveling();

    // Choose a random event
    currentEvent = chooseEvent();
    currentEventPlayerIndex = getRandomAlivePlayerIndex();

    // Check if there are no events left
    if (currentEvent === null) {
        await handleEnd();
        return;
    }

    // Disable all of the buttons
    buttonElements[0].disabled = true;
    buttonElements[1].disabled = true;
    buttonElements[2].disabled = true;

    // Update the buttons text
    const playerName =
        currentEventPlayerIndex !== null
            ? getPlayer(currentEventPlayerIndex).name
            : "Someone"

    const option0Text = currentEvent.options[0].text.replaceAll("{name}", playerName);
    const option1Text = currentEvent.options[1].text.replaceAll("{name}", playerName);

    setButtonContent(0, option0Text);
    setButtonContent(1, option1Text);
        
    // Print the events message
    clear();

    const eventText = currentEvent.text.replaceAll(
        "{name}",
        currentEventPlayerIndex !== null
            ? getPlayer(currentEventPlayerIndex).name
            : "Someone"
    );

    await print(eventText);

    // Enable all of the buttons
    buttonElements[0].disabled = false;
    buttonElements[1].disabled = false;
    buttonElements[2].disabled = false;
}

export function takeNames() {
    return new Promise((resolve) => {
        gameState = "naming";

        // Hide option buttons
        buttonElements[0].style.display = "none";
        buttonElements[1].style.display = "none";
        buttonElements[2].style.display = "none";

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
            buttonElements[2].style.display = "inline-block";

            gameState = "event";

            resolve();
        });
    });
}
