const Player = (xOrO) =>{
    // let board = document.querySelector(".board");
    // const placePiece = () =>{
    //     board.addEventListener("mousedown", event => {
    //         const position = event.target.dataset.id;
    //         if(gameBoard.gameArray[position] == "")
    //         gameBoard.gameArray[position] = xOrO;
    //         displayController.update()
    //     })
    // }
    const getPiece = () => xOrO;
    const placePiece = position =>{
        if(gameBoard.gameArray[position] == "")
        gameBoard.gameArray[position] = xOrO;
        displayController.update()
    }
    return{
        getPiece
    }
}

gameBoard = (() =>{
    let gameArray = ["","","","","","","","",""];
    const p1 = Player("X");
    const p2 = Player("O");
    let board = document.querySelector(".board");
    let p1Went = false;
    
    displayController = (() => {
        const update = () => { 
            const game = gameBoard.gameArray;
            let containers = document.querySelectorAll('.piece')
            containers = Array.from(containers)
            for(i = 0; i< game.length; i++){
                containers[i].textContent = game[i]
            }
        }
        return {
            update
        }
    
    })();

    const checkWinner =  function(){
        gameOver = ["012","345","678","036","147","258","048","246"];
        let indexesOfX = ""
        ,   indexesOfO = "";
        for(let i = 0; i< gameArray.length; i++){
            if(gameArray[i] == "X")
                indexesOfX += i
            if(gameArray[i] == "O")
                indexesOfO += i
        }
        return{
            indexesOfX,
            indexesOfO
        }
    }

    board.addEventListener("mousedown",event =>{
        const position = event.target.dataset.id;
        if(gameArray[position] == ""){
            if(!p1Went){
                gameArray[position] = p1.getPiece();
                p1Went = true;
                displayController.update();
            } else{
                gameArray[position] = p2.getPiece();
                p1Went = false;
                displayController.update();
            }
        }
    })
    return {
    }
})();






