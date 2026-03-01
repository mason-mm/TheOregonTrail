let players = [
    { name: "None", health: "Well" },
    { name: "None", health: "Well" },
    { name: "None", health: "Well" },
    { name: "None", health: "Well" }
];

export function updatePlayerListText() {
    // Elements
    const playerElements = [
        document.getElementById('game-player-list-player-1'),
        document.getElementById('game-player-list-player-2'),
        document.getElementById('game-player-list-player-3'),
        document.getElementById('game-player-list-player-4')
    ];

    // Text
    playerElements[0].textContent = `${players[0].name}`
    playerElements[1].textContent = `${players[1].name}`
    playerElements[2].textContent = `${players[2].name}`
    playerElements[3].textContent = `${players[3].name}`

    // Color
    for (let i = 0; i < players.length; i++) {
        let po = players[i];

        switch (po.health) {
            case "Well":
                playerElements[i].style.color = '#11bb1fb0';
                break;
            case "Injured":
                playerElements[i].style.color = '#ffa805';
                break;
            case "Dead":
                playerElements[i].style.color = '#ff0000';
                break;
        }
    }
}

export function setPlayer(index, name, health = "Well") {
    if (index >= 0 && index < players.length) {
        players[index] = { "name": name, "health": health };
        updatePlayerListText();
    }
}

export function getPlayer(index) {
    return players[index];
}
