const generateButton = document.querySelector("#gw-generate")
const baseURL = "http://localhost/Singer_D_FE_GuessWho/lumen/public/"
const boardPiece = document.querySelectorAll(".board-piece")

function generateGame() {
    const selectHome = document.querySelector("#gw-game-select");
    const selectValue = selectHome.value;

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
                key.textContent = response[number].number;

                piece.appendChild(img);
                piece.appendChild(name);
                piece.appendChild(key);
            });
        });
}


generateButton.addEventListener("click", generateGame)