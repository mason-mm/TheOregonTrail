import { print, clear } from "terminal";

export let happiness = 100, food = 0, money = 0, day = 1; 

export function addStat(stat, value) {
    switch (stat) {
        case "happiness":
            happiness += value;
            if (happiness <= 0) happiness = 0;
            break;
        case "food":
            food += value;
            if (food <= 0) food = 0;
            break;
        case "money":
            money += value;
            if (money <= 0) money = 0;
            break;
        case "day":
            day += value;
            if (day <= 0) day = 0;
            break;
        default:
            console.error("Stat not found");
            break;
    }

    updateStatsText();
}

// Updates the stats text
export function updateStatsText() {
    document.getElementById("happiness-text").textContent = `Happiness: ${happiness}%`;
    document.getElementById("food-text").textContent      = `Food: ${food}lb`;
    document.getElementById("money-text").textContent     = `Money: $${money}`;
    document.getElementById("days-text").textContent      = `Day: ${day}`;
}

export async function printStats() {
    await print(`Happiness: ${happiness}%`);
    await print(`Food: ${food}lb`);
    await print(`Money: $${money}`);
    await print(`Days: ${day}`);
}
