export const events = [
    {
        text: "One of your wagon wheels broke",
        options: [
            {
                text: "Fix it yourself",
                effects: {
                    days: 2
                },
                resultText: "You take 2 days to fix it (+2 days)"
            },
            {
                text: "Quickly put it back on",
                effects: {
                    days: 5
                },
                resultText: "Your wagon breaks down further down the trail and needs to be fixed (+5 days)"
            }
        ]
    },
    {
        text: "Someone get bit by a rattlesnake",
        options: [
            {
                text: "Treat it",
                effects: {
                    injurePlayer: true,
                    days: 2
                },
                resultText: "The treatment worked, they will be sick (+2 days)"
            },
            {
                text: "Leave it be",
                effects: {
                    killPlayer: true
                },
                resultText: "They did not make it."
            }
        ]
    },
    {
        text: "One of your oxen ran away",
        options: [
            {
                text: "Keep moving with the remaining oxen",
                effects: {
                    days: 3
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
                    happiness: -20
                },
                resultText: "You spend days hunting them down but fail (+4 days, -10 happiness)"
            }
        ]
    },
    {
        text: "There was a rife accident",
        options: [
            {
                text: "Stay and treat the person involved",
                effects: {
                    injurePlayer: true,
                    days: 2
                },
                resultText: "You stay a few more days and treat the person, they are injured (+2 days)"
            },
            {
                text: "Throw a bandage on them",
                effects: {
                    killPlayer: true
                },
                resultText: "They don't make it"
            }
        ]
    }
];