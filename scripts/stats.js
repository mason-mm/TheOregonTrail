let happiness = 100, food = 0, money = 0, day = 1; 

export function setStat(stat, value) {
    switch (stat) {
        case "happiness":
            happiness = value;
            break;
        case "food":
            food = value;
            break;
        case "money":
            money = value;
            break;
        case "day":
            day = value;
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
    document.getElementById("money-text").textContent     = `Money: ${money}$`;
    document.getElementById("days-text").textContent      = `Day: ${day}`;
}
