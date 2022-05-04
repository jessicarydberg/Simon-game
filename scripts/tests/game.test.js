/**
 * @jest-environment jsdom
 */

const { playerTurn, game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("Game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true)
    })
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true)
    })
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true)
    })
    test("choices key exists", () => {
        expect("choices" in game).toBe(true)
    })
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true)
    })
    test("choices contains correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"])
    })
})

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = [1, 2, 4];
        game.playerMoves = [1, 2, 4];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to 0", () => {
        expect(game.score).toEqual(0);
    });
    test("should set game turnNumber to 0", () => {
        expect(game.turnNumber).toEqual(0);
    });
    test("should bo one move in the current game array", () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    test("should display 0 for the element with the id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("data-listener should be set to true.", () => {
        let circles = document.getElementsByClassName("circle");
        for (let circle of circles) {
            expect(circle.getAttribute("data-listener")).toBe("true");
        }
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2)
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light")
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42
        showTurns();
        expect(game.turnNumber).toBe(0)
    });
    test("Should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1)

    });
});
