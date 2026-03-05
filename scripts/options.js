import { addStat, printStats, food, day, money, happiness, hasBandage } from "stats";
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

async function applyEffects(effects) {
    // Go through every stat and update it
    if (effects.days !== undefined) addStat("day", effects.days);
    if (effects.food !== undefined) addStat("food", effects.food);
    if (effects.money !== undefined) addStat("money", effects.money);
    if (effects.happiness !== undefined) addStat("happiness", effects.happiness);
    if (effects.openShop !== undefined) { await openShop(); return "openShop" };
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

            if (await applyEffects(selectedOption.effects) === "openShop") {
                handleEvent();
                return;
            }
            

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

async function checkForBandage() {
    if (hasBandage) {
        let healablePlayer = null;
        for (let i = 0; i < 3; i++) {
            if (getPlayer(i).health === "Injured") {
                healablePlayer = i;
                break;
            }
        }

        if (healablePlayer !== null) {
            const player = getPlayer(healablePlayer);

            setPlayer(healablePlayer,  player.name, "Well", player.timeInjured);
            await print(`You use your bandage and heal ${player.name}`);
            addStat("hasBandageFalse");
        }
    }
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

        // Check if to print hungry or starved
        if (getPlayer(randIndex).health === "Injured") {
            await print(`${getPlayer(randIndex).name} has starved`);
        } else {
            await print(`${getPlayer(randIndex).name} is hungry`);
        }

        injurePlayer(randIndex);
    }

    await checkForBandage();

    await delay(1500);
}

let eventsRun = 0;

export async function handleEvent() {
    if (eventsRun > 10) {
        handleEnd();
        return;
    }

    eventsRun++;
    
    if (getAllPlayersDead()) {
        handleDeath();
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

    await print(`Day ${day}`);

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

export async function takeNames() {
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

        doneButton.addEventListener("click", async () => {
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

            await openShop();

            gameState = "event";

            resolve();
        });
    });
}

async function openShop() {
    return new Promise ( async (resolve) => {
        gameState = "shop";
        const shopItems = {
            food: { cost: 40, stat: "food", amount: 90, label: "food" },
            clothes: { cost: 15, stat: "happiness", amount: 10, label: "clothes" },
            bandage: { cost: 80, stat: "hasBandage", amount: 1, label: "bandage" }
        };

        buttonElements[0].style.display = "none";
        buttonElements[1].style.display = "none";
        buttonElements[2].style.display = "none";
        
        const container = document.getElementById("game-options-container");

        // Add the input box
        const inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.classList.add("game-shop-input");

        container.appendChild(inputBox);
        inputBox.disabled = true;

        // Add the buy button
        const buyButton = document.createElement("button");
        buyButton.classList.add("game-shop-buy-button");
        buyButton.textContent = "buy";
        container.appendChild(buyButton);
        buyButton.disabled = true;

        // Add the continue button
        const continueButton = document.createElement("button");
        continueButton.classList.add("game-shop-continue-button");
        continueButton.textContent = "Continue";
        container.appendChild(continueButton);
        continueButton.disabled = true;

        clear();
        await print("Welcome to the shop.\n");

        await print("You can buy as many items as you want as long as you have enough money.\n");

        await print(`You have $${money}`)

        await print("Enter the words in brackets to choose what you want to buy.\n");

        await print("The following items are in stock:")
        await print("[food] ($40, +90 food)");
        await print("[clothes] ($15, +10% happiness)");
        await print("[bandage] ($80, +bandage)");

        inputBox.disabled = false;
        buyButton.disabled = false;
        continueButton.disabled = false;
        
        buyButton.addEventListener("click", async () => {
            const item = inputBox.value.trim();
            if (item === "") {
                alert("You must input an item to buy!");
                return;
            }
            
            const normalizedItem = item.toLowerCase();
            const selectedItem = shopItems[normalizedItem];

            if (!selectedItem) {
                await print(`"${item}" is not sold here.`);
                inputBox.value = "";
                return;
            }

            if (money < selectedItem.cost) {
                await print(`Not enough money for ${selectedItem.label}.`);
                inputBox.value = "";
                return;
            }

            if (selectedItem.stat === "hasBandage" && hasBandage) {
                await print("You already have a bandage.");
                inputBox.value = "";
                return;
            }

            if (selectedItem.stat === "happiness" && happiness > 100) {
                await print("You already have full happiness");
                inputBox.value = "";
                return;
            }

            inputBox.disabled = true;
            buyButton.disabled = true;
            continueButton.disabled = true;

            addStat("money", -selectedItem.cost);
            addStat(selectedItem.stat, selectedItem.amount);
            await print(`Bought ${selectedItem.label} (-$${selectedItem.cost}).`);
            inputBox.value = "";

            inputBox.disabled = false;
            buyButton.disabled = false;
            continueButton.disabled = false;
        });

        continueButton.addEventListener("click", () => {
            // Clean up
            inputBox.style.display = "none";
            buyButton.style.display = "none";
            continueButton.style.display = "none";

            buttonElements[0].style.display = "inline-block";
            buttonElements[1].style.display = "inline-block";
            buttonElements[2].style.display = "inline-block";

            gameState = "event";
            resolve();
        })
    });
}
