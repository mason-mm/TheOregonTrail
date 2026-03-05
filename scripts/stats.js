import { print, clear } from "terminal";

export let happiness = 100, food = 0, money = 200, day = 1, hasBandage = false;

export function addStat(stat, value) {
    switch (stat) {
        case "happiness":
            happiness += value;
            if (happiness <= 0) happiness = 0;
            if (happiness > 100) happiness = 100;
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
        case "hasBandage":
            if (hasBandage) return;
            hasBandage = true;
            break;
        case "hasBandageFalse":
            if (!hasBandage) return;
            hasBandage = false;
            break;
        default:
            console.error("Stat not found");
            return;
    }

    updateStatsText();
}

// Updates the stats text
export function updateStatsText() {
    document.getElementById("happiness-text").textContent = `Happiness: ${happiness}%`;
    document.getElementById("food-text").textContent      = `Food: ${food}lb`;
    document.getElementById("money-text").textContent     = `Money: $${money}`;
    document.getElementById("days-text").textContent      = `Day: ${day}`;
    document.getElementById("bandage-text").textContent   = `Bandage: ${hasBandage ? 1 : 0} (max 1)`;
}

export async function printStats() {
    await print(`Happiness: ${happiness}%`);
    await print(`Food: ${food}lb`);
    await print(`Money: $${money}`);
    await print(`Days: ${day}`);
    await print(`Bandage: ${hasBandage ? 1 : 0}`);
}
