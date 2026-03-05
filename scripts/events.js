export const events = [
    // Sickness
    // 1
    {
        text: "{name} got dysentery",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    days: 4,
                    food: -30
                },
                resultText: "{name} made it out alive (+4 days, -30 food)"
            },
            {
                text: "Keep going without treating {name}",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} did not make it"
            }
        ]
    },
    {
        text: "{name} got cholera",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    days: 4,
                    food: -30
                },
                resultText: "{name} made it out alive (+4 days, -30 food)"
            },
            {
                text: "Keep going without treating {name}",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} did not make it"
            }
        ]
    },
    {
        text: "{name} got measles",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    days: 4,
                    food: -30
                },
                resultText: "{name} made it out alive (+4 days, -30 food)"
            },
            {
                text: "Keep going without treating {name}",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} did not make it"
            }
        ]
    },
    {
        text: "{name} got smallpox",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    days: 4,
                    food: -30
                },
                resultText: "{name} made it out alive (+4 days, -30 food)"
            },
            {
                text: "Keep going without treating {name}",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} did not make it"
            }
        ]
    },
    // 5
    {
        text: "{name} got scurvy",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    days: 4,
                    food: -30
                },
                resultText: "{name} made it out alive (+4 days, -30 food)"
            },
            {
                text: "Keep going without treating {name}",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} did not make it"
            }
        ]
    },
    // Injuries
    {
        text: "{name} broke their leg",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    days: 4,
                    food: -30
                },
                resultText: "{name} made it out alive (+4 days, -30 food)"
            },
            {
                text: "Keep going without treating {name}",
                effects: {
                    injurePlayer: true
                },
                resultText: "{name} is really injured"
            }
        ]
    },
    {
        text: "{name} got hit by a wagon",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    days: 4,
                    food: -30
                },
                resultText: "{name} made it out alive (+4 days, -30 food)"
            },
            {
                text: "Keep going without treating {name}",
                effects: {
                    injurePlayer: true
                },
                resultText: "{name} is really injured"
            }
        ]
    },
    {
        text: "{name} got bitten by a rattlesnake",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    days: 4,
                    food: -30
                },
                resultText: "{name} made it out alive (+4 days, -30 food)"
            },
            {
                text: "Keep going without treating {name}",
                effects: {
                    injurePlayer: true
                },
                resultText: "{name} is really injured"
            }
        ]
    },
    {
        text: "{name} fell off of a wagon",
        options: [
            {
                text: "Stay and treat {name}",
                effects: {
                    days: 4,
                    food: -30
                },
                resultText: "{name} made it out alive (+4 days, -30 food)"
            },
            {
                text: "Keep going without treating {name}",
                effects: {
                    injurePlayer: true
                },
                resultText: "{name} is really injured"
            }
        ]
    },
    // Other
    // 10
    {
        text: "You find a merchant",
        options: [
            {
                text: "Open the shop",
                effects: {
                    openShop: true
                },
                resultText: "You look at what the merchant has to offer"
            },
            {
                text: "Leave it",
                effects: {
                },
                resultText: "You leave the merchant without looking at his goods"
            }
        ]
    },
    {
        text: "The group in front of you says they found a shortcut",
        options: [
            {
                text: "Take it",
                effects: {
                    days: 4,
                    happiness: -10
                },
                resultText: "The shortcut was fake and a longer path (+4 days, -10 happiness)"
            },
            {
                text: "Leave it",
                effects: {
                },
                resultText: "I wonder if it was real..."
            }
        ]
    },
    // Fatal
    {
        text: "You must cross a river",
        options: [
            {
                text: "Float the wagon across",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "You made it across but {name} drowned"
            },
            {
                text: "Ride the ferry (15 dollars)",
                effects: {
                    money: -15,
                    days: 5
                },
                resultText: "You wait 5 days but it was safe (+5 days, -15 dollars)"
            }
        ]
    },
    {
        text: "Your oxen are on the loose",
        options: [
            {
                text: "Try to control them",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} was crushed by an ox"
            },
            {
                text: "Stay back and wait for them to calm down",
                effects: {
                    days: 2
                },
                resultText: "You wait 2 days and get the oxen under control (+2 days)"
            }
        ]
    },
    {
        text: "There was a gunpowder explosion",
        options: [
            {
                text: "Spend a week treating everyone involved",
                effects: {
                    days: 7,
                    food: -20
                },
                resultText: "After a while everyone is okay (+7 days, -20 food)"
            },
            {
                text: "Quickly help everyone up and keep going",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} was hurt the most and died"
            }
        ]
    },
    // 15
    {
        text: "There was an accidental shooting and {name} was shot",
        options: [
            {
                text: "Spend 2 days treating them",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "You try to save them but in the end they do not make it"
            },
            {
                text: "Quickly help them and keep going",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} has died"
            }
        ]
    },
    // Weather
    {
        text: "A violent thunderstorm is overhead",
        options: [
            {
                text: "Go off the trail to avoid it",
                effects: {
                    days: 5
                },
                resultText: "You take the longer path and avoid the thunderstorm (+5 days)"
            },
            {
                text: "Stay on the trail and endure it",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} was struck by lightning and died"
            }
        ]
    },
    {
        text: "A tornado is overhead",
        options: [
            {
                text: "Go off the trail to avoid it",
                effects: {
                    days: 5
                },
                resultText: "You take the longer path and avoid the tornado (+5 days)"
            },
            {
                text: "Stay on the trail and endure it",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} was hit by debris and died"
            }
        ]
    },
    {
        text: "A violent hailstorm is overhead",
        options: [
            {
                text: "Go off the trail to avoid it",
                effects: {
                    days: 5
                },
                resultText: "You take the longer path and avoid the hailstorm (+5 days)"
            },
            {
                text: "Stay on the trail and endure it",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} was hit in the head by hail and died"
            }
        ]
    },
    {
        text: "You are on a mountain and it is freezing",
        options: [
            {
                text: "Set up camp and stay near the fire",
                effects: {
                    days: 2
                },
                resultText: "You play it safe and stay by the fire (+2 days)"
            },
            {
                text: "Keep moving",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} got frostbite and died"
            }
        ]
    },
    // 20
    {
        text: "You are in a desert and it is very hot",
        options: [
            {
                text: "Set up camp and travel at night",
                effects: {
                    days: 2,
                    food: -15
                },
                resultText: "You avoid the heat but use more supplies (+2 days, -15 food)"
            },
            {
                text: "Keep moving",
                effects: {
                    killPlayer: true,
                    happiness: -10
                },
                resultText: "{name} suffered heatstroke and died"
            }
        ]
    }
];

export let usedEvents = [];
