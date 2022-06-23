const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

//* To keep track of what the character has on them after clicking an option
let state = {}

function startGame() {
    state = {}
    showTextNode(1)

}

function showTextNode(textNodeIndex) {
    //implements the text node/sentence to appear 
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    //removes all the options
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    //gives options you need
    textNode.options.forEach(option => {
        //first check to see if you can actually show that node
        if (showOption(option)) {
            //this creates the option
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)

        }
    })

}

//function that shows state of the option you're in 
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)

}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a strange place and see a key on your nightstand. You don't recognize it.",
        options: [
            {
                text: "Take the key",
                setState: { newKey: true},
                nextText: 2
            },
            {
                text: "Leave the key",
                nextText: 2
            }
        ]
    },
    {
        //reveals answer/second node when button is clicked
        id: 2,
        text: "You venture off to try and see if the key fits in any of the locks at home. When you get to the basement, there's a new door you've never seen before. On the door it states: 'Insert key, turn clockwise, you get a sword. Insert key, turn counter-clockwise, you get a shield.",
        options: [
            {
        text: "Insert the key and turn clockwise.",
        //checks if you have the option of friendFaye(chose It's Faye)
        requiredState: (currentState) => currentState.newKey,
        setState: {newKey: false, sword: true},
        nextText: 3
            },    
    {
        text: "Insert the key and turn counter-clockwise.",
        requiredState: (currentState) => currentState.newKey,
        setState: {newKey: false, shield: true},
        nextText: 3
    },
    {
        text: "Ignore the door",
        nextText: 3
    }
]
    },
    {
        id: 3, 
        text: "After leaving the door you start to feel tired and stumble before fainting. You wake up and find yourself in front of a foreign town next to a dangerous looking skyscraper.",
        options: [
            {
                text: "Explore the skyscraper",
                nextText: 4
            },
            {
                text: "Find a room to sleep at in the town",
                nextText: 5
            },
            {
                text: "Find some hay in a stable to sleep in for the night",
                nextText: 6
            }

        ]
    },
    {
        id: 4,
        text: "You are so tired that you fell asleep while exploring the skyscraper and are killed by a monster in your sleep.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: "Without any money to buy a room you break into the nearest inn and fall asleep in the storage room. The Innkeeper finds you after trying to lockup the room for the night and calls the town guard. They lock you in a cell.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: "You wake up rested and energized, ready to explore the tall looming skyscraper.",
        options: [
            {
                text: "Explore the skyscraper",
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: "While exploring the skyscraper you come across a giant monster.",
        options: [
            {
                text: "Try to run",
                nextText: 8
            },
            {
                text: "Attack it with your sword",
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: "Defend with your shield",
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: "Throw the key at it",
                requiredState: (currentState) => currentState.newKey,
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: "You try to run but it's futile. The monster catches up easily and lunges.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: "You naively thought this monster could be slain with a single sword.", 
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: "The monster's attack was too strong that it broke through both the shield and you.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: "You threw the key at the monster and it made it stop, as if the monster recognized it. Somehow the key held importance to the monster because the next thing you knew, it bowed before you. Then, it spoke: 'Welcome home, Master'.",
        options: [
            {
                text: "Congratulations! Play Again.",
                nextText: -1
            }
        ]
    }

]

startGame()