import { clear, } from 'terminal';
import { updateStatsText } from 'stats';
import { setPlayer, updatePlayerListText } from 'players';
import { handleEvent } from 'events';

window.onload = function() {
    init();
}

function init() {
    clear();
    updateStatsText();
    updatePlayerListText();

    // Add players
    setPlayer(0, "Player 1");
    setPlayer(1, "Player 2");
    setPlayer(2, "Player 3");
    setPlayer(3, "Player 4");

    // Start first event
    handleEvent();
}
