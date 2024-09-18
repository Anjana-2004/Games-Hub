var board;
var playerO="O";
var playerX="X";
var currPlayer=playerO;
var gameOver=false;

window.onload=function(){
    setGame();
}
function setGame(){
    board=[
        ['','',''],
        ['','',''],
        ['','','']
    ]
    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            let tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            tile.classList.add("tile");
            if(r==0||r==1){
                tile.classList.add("horizontal-line");
            }
            if(c==0||c==1){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click",setTile);
            document.getElementById("board").append(tile);
        }
    }
}
function setTile(){
    if(gameOver){
        return;
    }

    let coords=this.id.split("-")
    let r= parseInt(coords[0]);
    let c=parseInt(coords[1]);
    if(board[r][c]!=''){
        return;
    }

    board[r][c]=currPlayer;
    this.innerText=currPlayer;

    if(currPlayer==playerO){
        currPlayer=playerX;
    }
    else{
        currPlayer=playerO;
    }
 checkWinner();
}
 function checkWinner(){
    //horizontally
    for(let r=0;r<3;r++){
        if(board[r][0]==board[r][1] && board[r][1]==board[r][2]&& board[r][0]!=''){
            markWinner(r,0,r,1,r,2);
            gameOver=true;
            return;
        }
    }
    //vertically
    for(let c=0;c<3;c++){
        if(board[0][c]==board[1][c] && board[1][c]==board[2][c]&& board[0][c]!=''){
            markWinner(0,c,1,c,2,c);
            gameOver=true;
            return;
        }
    }
    //diagonally
    if(board[0][0]==board[1][1]&&board[1][1]==board[2][2]&&board[0][0]!=''){
        markWinner(0,0,1,1,2,2);
        gameOver=true;
        return;
    }
    //anti-diagonally
    if(board[0][2]==board[1][1]&&board[1][1]==board[2][0]&&board[0][2]!=''){
        markWinner(0,2,1,1,2,0);
        gameOver=true;
        return;
    }
    //Check for tie
    if(checkTie()){
        alert("It's a tie!");
        gameOver=true;
    }
 } 
 
 function markWinner(r1,c1,r2,c2,r3,c3){
    let tile=document.getElementById(r1.toString()+"-"+c1.toString());
    tile.classList.add("winner");

    tile=document.getElementById(r2.toString()+"-"+c2.toString());
    tile.classList.add("winner");

    tile=document.getElementById(r3.toString()+"-"+c3.toString());
    tile.classList.add("winner");
 }

 function checkTie(){
     for(let r=0;r<3;r++){
         for(let c=0;c<3;c++){
             if(board[r][c]==''){
                 return false;
             }
         }
     }
     return true;
 }