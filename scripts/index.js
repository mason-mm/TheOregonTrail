import { clear, print } from 'terminal';
import { setStat, updateStatsText } from 'stats';
import { setPlayer, getPlayer, updatePlayerListText } from 'players';
import { updateButtonText, setButtonContent } from 'options';

window.onload = function() {
    init();
}

function init() {
    clear();
    updateStatsText();
    updatePlayerListText();
    updateButtonText();

    // Add players
    setPlayer(0, "Player 1");
    setPlayer(1, "Player 2");
    setPlayer(2, "Player 3");
    setPlayer(3, "Player 4");
}
