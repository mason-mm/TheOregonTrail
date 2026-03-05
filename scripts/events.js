export const events = [
    {
        text: "One of your wagon wheels fell off",
        options: [
            {
                text: "Take time to fix it correctly",
                effects: {
                    days: 2,
                    food: -10
                },
                resultText: "You take 2 days to fix it (+2 days)"
            },
            {
                text: "Quickly rush and put it back on",
                effects: {
                    days: 5,
                    food: -25
                },
                resultText: "Your wagon breaks down further down the trail and needs to be fixed (+5 days)"
            }
        ]
    },
    {
        text: "{name} got bit by a rattlesnake",
        options: [
            {
                text: "Treat it correctly",
                effects: {
                    injurePlayer: true,
                    days: 2,
                    food: -10
                },
                resultText: "The treatment worked, {name} will be sick (+2 days)"
            },
            {
                text: "Leave it be",
                effects: {
                    killPlayer: true
                },
                resultText: "{name} did not make it."
            }
        ]
    },
    {
        text: "One of your oxen ran away",
        options: [
            {
                text: "Keep moving with the remaining oxen",
                effects: {
                    days: 3,
                    food: -15
                },
                resultText: "The oxen get tired and need a break (+3 days)"
            },
            {
                text: "Take an oxen from another group",
                effects: {
                    happiness: -20
                },
                resultText: "They did not like that (-20 happiness)"
            }
        ]
    },
    {
        text: "You were robbed while sleeping",
        options: [
            {
                text: "Keep going",
                effects: {
                    happiness: -10,
                    food: -10
                },
                resultText: "You keep going with less things (-10 food, -10 happiness)"
            },
            {
                text: "Hunt them down",
                effects: {
                    days: 4,
                    food: -20,
                    happiness: -20
                },
                resultText: "You spend days hunting them down but fail (+4 days, -10 happiness)"
            }
        ]
    },
    {
        text: "There was a rifle accident and {name} got hit",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    injurePlayer: true,
                    days: 2,
                    food: -10
                },
                resultText: "You stay a few more days and treat {name}, they are injured (+2 days)"
            },
            {
                text: "Give {name} a bandage and keep going",
                effects: {
                    killPlayer: true
                },
                resultText: "{name} did not make it"
            }
        ]
    },
    {
        text: "You find a merchent",
        options: [
            {
                text: "Open the shop",
                effects: {
                    openShop: true
                },
                resultText: "You open the shop"
            },
            {
                text: "Skip",
                effects: {
                },
                resultText: "You skip opening the shop"
            }
        ]
    }
];
