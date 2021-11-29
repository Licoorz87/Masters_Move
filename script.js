let PGNMasterMove = "";

console.log(sla);

function renderBoard() {
    let board = ''

    for (let i = 0; i < 8; i++) {
        board += '<div class="column">'
        if (i % 2 == 0) {
            for (let j = 0; j < 4; j++) {
                board += '<div class="white"></div>';
                board += '<div class="black"></div>';
            }
        } else {
            for (let k = 0; k < 4; k++) {
                board += '<div class="black"></div>';
                board += '<div class="white"></div>';
            }
        }
        board += '</div>';
    }

    document.querySelector('#board').innerHTML = board;
    newPosition();
}

function newPosition() {
    //[name x name (year), when plays, PGN, PGNMasterMove]
    let listOfGames = [["Kudischewitsch vs Ritsch (2008)", "White Play's", "6rk/p4Rbb/1p6/3P2NQ/1P6/3q3P/6P1/7K", "6rk/p5bb/1p6/3P1RNQ/1P6/3q3P/6P1/7K"],
            ["Nihal Sarin x Stude (2021)", "Black Play's", "4r1k1/p4ppp/2q5/2b5/PpQ2B2/3p2P1/1P1RbP1P/2R3K1", "4r1k1/p4ppp/2q5/2b5/PpQ2B2/3p2P1/1P1R1P1P/2R2bK1"],
            ["Nihal Sarin x Stude (2021)", "Black Play's", "4r1k1/p4ppp/2q5/2b5/PpQ2B2/3p2P1/1P1RbP1P/2R3K1", "4r1k1/p4ppp/2q5/2b5/PpQ2B2/3p2P1/1P1R1P1P/2R2bK1"],
            ["Pytel x Hausnet (1970)", "White Play's", "4k2r/4bp1p/p1qp1n2/3R4/1r3P1P/5Q1B/1PP5/2K5", "4k2r/4bp1p/p1qp1n2/2R5/1r3P1P/5Q1B/1PP5/2K5"],
            ["Kavalek x Khodos (1965)", "White Play's", "rnq3kr/1b4p1/p4bp1/1p4N1/4p3/2N1B2Q/PPP4P/2KR1R2", "rnqR2kr/1b4p1/p4bp1/1p4N1/4p3/2N1B2Q/PPP4P/2K2R2"],
            ["Minic x Honfi (1966)", "White Play's", "r2r2k1/2q2ppp/8/pp1RP3/8/1pP1Q3/1P3PPP/3R2K1", "r2r2k1/Q1q2ppp/8/pp1RP3/8/1pP5/1P3PPP/3R2K1"],
            ["Ahues x Schories (1907)", "White Play's", "8/1q1b2kp/4p1p1/3pPp2/3Pn3/B5P1/6KP/1rQ2B2", "8/1q1b2kp/4p1pQ/3pPp2/3Pn3/B5P1/6KP/1r3B2"],
            ["Beyen x Filip (1971)", "White Play's", "r1b5/p3k3/6pP/1ppR4/2P2p2/2P5/P6P/6K1", "r1bR4/p3k3/6pP/1pp5/2P2p2/2P5/P6P/6K1"]];
    let game = listOfGames[Math.round(Math.random() * 10000) % listOfGames.length];
    
    document.getElementById('namePlayers').innerHTML = game[0];
    document.getElementById('whenPlayed').innerHTML = game[1];
    PGN = game[2];
    PGNMasterMove = game[3];
    putPiecesOnBoard(PGN);
}

function showMastersMove() {
    putPiecesOnBoard(PGNMasterMove);
}

function putPiecesOnBoard(PGN) {
    let piecesGame = [];

    let pieces = ["pawnBlack1", "pawnBlack2", "pawnBlack3", "pawnBlack4", 
    "pawnBlack5", "pawnBlack6", "pawnBlack7", "pawnBlack8", "knightBlack1", 
    "knightBlack2", "bishopBlack1", "bishopBlack2", "rookBlack1", "rookBlack2",
    "queenBlack", "kingBlack", "pawnWhite1", "pawnWhite2", "pawnWhite3", "pawnWhite4", 
    "pawnWhite5", "pawnWhite6", "pawnWhite7", "pawnWhite8", "knightWhite1", 
    "knightWhite2", "bishopWhite1", "bishopWhite2", "rookWhite1", "rookWhite2",
    "queenWhite", "kingWhite"];

    let piecesBackup = ["pawnBlack1", "pawnBlack2", "pawnBlack3", "pawnBlack4", 
    "pawnBlack5", "pawnBlack6", "pawnBlack7", "pawnBlack8", "knightBlack1", 
    "knightBlack2", "bishopBlack1", "bishopBlack2", "rookBlack1", "rookBlack2",
    "queenBlack", "kingBlack", "pawnWhite1", "pawnWhite2", "pawnWhite3", "pawnWhite4", 
    "pawnWhite5", "pawnWhite6", "pawnWhite7", "pawnWhite8", "knightWhite1", 
    "knightWhite2", "bishopWhite1", "bishopWhite2", "rookWhite1", "rookWhite2",
    "queenWhite", "kingWhite"];

    let abrvPieces = ["p", "p", "p", "p", "p", "p", "p", "p", "n", "n", "b", 
    "b", "r", "r", "q", "k", "P", "P", "P", "P", "P", "P", "P", "P", "N", "N", 
    "B", "B", "R", "R", "Q", "K"];

    for (piece of pieces) {
        document.getElementById(piece).style.display = "none";
    }

    for (piece of PGN) {
        if (abrvPieces.indexOf(piece) >= 0) {
            let index = abrvPieces.indexOf(piece);

            piecesGame.push(pieces[index]);
            abrvPieces.splice(index, 1);
            pieces.splice(index, 1);
        } else if (piece == "/") {
            
        } else {
            for (let i = 0; i < parseInt(piece); i++) {
                piecesGame.push(0);
            }
        }
    }

    let squareX = 0;
    let squareY = 0;

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            squareNumber = x + (y * 8);

            if (x == 0) {
                squareX = 32;
                
            } else {
                squareX = 108 + (75 * (x-1));
            }

            if (y == 0) {
                squareY = 20;
            } else {
                squareY = 95 + (75 * (y-1));
            }

            if (piecesBackup.indexOf(piecesGame[squareNumber]) >= 0) {
                document.getElementById(piecesGame[squareNumber]).style.left = squareX + "px";
                document.getElementById(piecesGame[squareNumber]).style.top = squareY + "px";
                document.getElementById(piecesGame[squareNumber]).style.display = "block";
            }
        }
    }
}