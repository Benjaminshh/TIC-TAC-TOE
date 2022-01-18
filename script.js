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
    let indexes = ""
    const getPiece = () => xOrO;
    const updateIndexes = (index) => indexes += index; 
    const getIndexes = () => indexes;
    const resetIndexes = () => indexes = "";
  
    return{
        getPiece,
        updateIndexes,
        getIndexes,
        resetIndexes
    }
}

gameBoard = (() =>{
    let gameArray = ["","","","","","","","",""];
    const p1 = Player("X");
    const p2 = Player("O");
    let board = document.querySelector(".board");
    let announcer = document.querySelector(".announcer");
    
    let p1Went = false;
    
    const update = () => { 
        let containers = document.querySelectorAll('.piece')
        containers = Array.from(containers)
        for(i = 0; i< gameArray.length; i++){
            containers[i].textContent = gameArray[i]
        }
    }

    const reset = () => {
        gameArray = ["","","","","","","","",""];
        update();
        announcer.textContent = "";
        p1.resetIndexes();
        p2.resetIndexes();
        p1Went = false;
        board.addEventListener("mousedown", addPieces)
    }

    const checkWinner =  function(player){
        gameOver = ["012","345","678","036","147","258","048","246"];
        let indexesOfPlayer = player.getIndexes();
        for(i = 0; i < gameOver.length; i++){
            let row = gameOver[i];
            let regex = new RegExp(`\\d*[${row}]\\d*[${row}]\\d*[${row}]`)
            if(regex.test(indexesOfPlayer)){
                board.removeEventListener("mousedown",addPieces)
                return(true);
            }
        }
        return false;
    }

    const addPieces = function(event){
        const position = event.target.dataset.id;
        if(gameArray[position] == ""){
            if(!p1Went){
                gameArray[position] = p1.getPiece();
                p1Went = true;
                update();
                p1.updateIndexes(position);
                const winner = checkWinner(p1)
                if(winner) announcer.textContent = "Player One Wins!";
                if(!winner && p1.getIndexes().length == 5){
                    announcer.textContent = "Tie!"
                }
            } else{
                gameArray[position] = p2.getPiece();
                p1Went = false;
                update();
                p2.updateIndexes(position);
                if(checkWinner(p2)) announcer.textContent = "Player Two Wins!";
            }
        }
    }
    
    board.addEventListener("mousedown", addPieces)

    return {
        reset
    }
})();






