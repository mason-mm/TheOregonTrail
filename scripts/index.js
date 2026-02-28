import { clear, print } from 'terminal';

window.onload = function() {
    init();
}

function init() {
    clear();
    testConsole();
}

async function testConsole() {
    for (let i = 0; i < 100; i++) {
        if (i % 2 == 0) {
            await print("T");
        } else {
            await print("B");
        }
    }
}
