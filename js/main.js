const generateButton = document.querySelector("#gw-generate")
const baseURL = "http://localhost/Singer_D_FE_GuessWho/lumen/public/"
const boardPiece = document.querySelectorAll(".board-piece")
const loadButton = document.querySelector("#gw-submit")
const yourName = document.querySelector("#gw-character-name")
const selectImage = document.querySelector("#select-image")

function generateGame() {
    const selectHome = document.querySelector("#gw-game-select");
    const selectValue = selectHome.value;

    selectImage.src = ""

    fetch(`${baseURL}characters/${selectValue}`)
    .then(response => response.json())
    .then(function(response) {
        let n = Math.min(response.length, 25);
        let usedCharacters = new Set();
        const gwBoard = document.querySelector("#gw-board");

        gwBoard.innerHTML = ""

        for (let l = 0; l < n; l++) {
            const div = document.createElement("div");
            div.setAttribute("class", "board-piece");
            div.style.opacity = "1";
            gwBoard.appendChild(div);
        }

        const boardPieces = document.querySelectorAll(".board-piece");

        boardPieces.forEach(piece => {
            piece.innerHTML = "";
            piece.style.opacity = "1";

            let img = document.createElement("img");
            let name = document.createElement("p");
            let key = document.createElement("p");
            let number;

            do {
                number = Math.floor(Math.random() * response.length);
            } while (
                usedCharacters.has(number)
            );

            usedCharacters.add(number);

            img.setAttribute("class", "gw-image");
            name.setAttribute("class", "gw-name");
            key.setAttribute("class", "gw-key");

            img.src = `images/${response[number].id}.png`;
            name.textContent = response[number].name;
            key.textContent = response[number].id;

            piece.appendChild(img);
            piece.appendChild(name);
            piece.appendChild(key);

            piece.addEventListener("click", deselectPiece)
        });
        selectList()
        
        if (boardPieces.length === 25) {
            saveGame()
        } else {
            const token = document.querySelector("#gw-token")

            token.innerHTML = ""
        }
    })
    .catch(error => {
        const gameToken = document.querySelector("#gw-token")

        gameToken.innerHTML = ""

        let errortext = document.createElement("p")
        errortext.textContent = `Sorry, something went wrong. Please refresh the page or double check the content requested, then try again. ${error}`

        gameToken.appendChild(errortext)
    })
}

function selectList() {
    yourName.innerHTML = ""
    const piece = document.querySelectorAll(".board-piece")
    const defaultVar = document.createElement("option")

    defaultVar.textContent = "Please Select A Character"
    yourName.appendChild(defaultVar)

    piece.forEach(piece => {
        let name = piece.querySelector(".gw-name")
        let number = piece.querySelector(".gw-key")
        let option = document.createElement("option")
        option.textContent = name.textContent
        option.id = number.textContent
        option.value = number.textContent
        yourName.appendChild(option)
    })
}

function imageSelect() {
    const selectedValue = yourName.value
    
    selectImage.src = `images/${selectedValue}.png`
}

function deselectPiece() {
    if (this.style.opacity === "1") {
        this.style.opacity = "0.3"
    } else {
        this.style.opacity = "1"
    }
}

function saveGame() {
    const number = document.querySelectorAll(".gw-key")

    let gameData = {
        character1: number[0].innerHTML,
        character2: number[1].innerHTML,
        character3: number[2].innerHTML,
        character4: number[3].innerHTML,
        character5: number[4].innerHTML,
        character6: number[5].innerHTML,
        character7: number[6].innerHTML,
        character8: number[7].innerHTML,
        character9: number[8].innerHTML,
        character10: number[9].innerHTML,
        character11: number[10].innerHTML,
        character12: number[11].innerHTML,
        character13: number[12].innerHTML,
        character14: number[13].innerHTML,
        character15: number[14].innerHTML,
        character16: number[15].innerHTML,
        character17: number[16].innerHTML,
        character18: number[17].innerHTML,
        character19: number[18].innerHTML,
        character20: number[19].innerHTML,
        character21: number[20].innerHTML,
        character22: number[21].innerHTML,
        character23: number[22].innerHTML,
        character24: number[23].innerHTML,
        character25: number[24].innerHTML,
    }

    fetch (`${baseURL}guess-who/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(gameData) 
    })

    .then(response => response.json())
    .then(function(response) {
        const gameToken = document.querySelector("#gw-token")
        const p = document.createElement("p")

        gameToken.innerHTML = ""

        p.textContent = `Your game id is ${response.id}`

        gameToken.appendChild(p)
    })
    .catch(error => {
        const gameToken = document.querySelector("#gw-token")

        gameToken.innerHTML = ""

        let errortext = document.createElement("p")
        errortext.textContent = `Sorry, something went wrong. Please refresh the page or double check the content requested, then try again. ${error}`

        gameToken.appendChild(errortext)
    })
}

function loadGame(){
    const game = document.querySelector("#gw-input")
    const gameNumber = game.value

    fetch(`${baseURL}guess-who/${gameNumber}`)
    .then(response => response.json())
    .then(function(response) {
        let n = Math.min(response.length, 25);
        let usedCharacters = new Set();
        const gwBoard = document.querySelector("#gw-board");

        gwBoard.innerHTML = ""

        for (let l = 0; l < n; l++) {
            const div = document.createElement("div");
            div.setAttribute("class", "board-piece");
            div.style.opacity = "1";
            gwBoard.appendChild(div);
        }

        const boardPieces = document.querySelectorAll(".board-piece");
        let number = 0

        boardPieces.forEach(piece => {
            piece.innerHTML = "";
            piece.style.opacity = "1";

            let img = document.createElement("img");
            let name = document.createElement("p");
            let key = document.createElement("p");

            img.setAttribute("class", "gw-image");
            name.setAttribute("class", "gw-name");
            key.setAttribute("class", "gw-key");

            img.src = `images/${response[number].id}.png`;
            name.textContent = response[number].name;
            key.textContent = response[number].id;

            piece.appendChild(img);
            piece.appendChild(name);
            piece.appendChild(key);

            piece.addEventListener("click", deselectPiece)

            number++
        });
        selectList()
    })
    .catch(error => {
        const gameToken = document.querySelector("#gw-token")

        gameToken.innerHTML = ""

        let errortext = document.createElement("p")
        errortext.textContent = `Sorry, something went wrong. Please refresh the page or double check the content requested, then try again. ${error}`

        gameToken.appendChild(errortext)
    })
}


generateButton.addEventListener("click", generateGame)
yourName.addEventListener("change", imageSelect)
loadButton.addEventListener("click", loadGame)