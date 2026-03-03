import { clear, print } from 'terminal';
import { updateStatsText } from 'stats';
import { updatePlayerListText } from 'players';
import { takeNames, handleEvent, delay } from 'options';

window.onload = function() {
    init();
}

async function takePlayerNames() {
    await print("Welcome.");
    await print("The trail west awaits.\n");

    await print("Before we depart, there is one last matter.");
    await print("Each traveling party consist of four people.");
    await print("You must choose wisely.\n");

    await print("Enter the names of your party members.");

    // Take names
    await takeNames();

    clear();

    await print("\nYour journey begins now.");
    await delay(1000);
    await print("Good luck.");
    await delay(1500);
}

async function init() {
    clear();
    updateStatsText();
    updatePlayerListText();

    await takePlayerNames();

    handleEvent();
}
