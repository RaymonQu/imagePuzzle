function shuffleBoard() {
	hiddenWords = document.getElementById("winmessage");
	hiddenWords.hidden = true; 
	correctCards = [];
    boardImages = [];
	randomFlags = [];
	gameOver = false;
	sourceCardFlipped = false;
	score = 0;
	lastImageClicked = null;
	lastImageClickedId = null;
	if (document.images) {
		urlArray = ["images/image1.png", "images/image2.png", "images/image3.png", "images/image4.png",
					"images/image5.png", "images/image6.png", "images/image7.png", "images/image8.png",
                    "images/image9.png", "images/image10.png", "images/image11.png", "images/image12.png",
                    "images/image13.png", "images/image14.png", "images/image15.png", "images/image16.png"];
		images = [];
		for (let i = 0; i < 16; i++){
			images.push(new Image().src = urlArray[i]);
		}
	}
	for (let i = 0; i < 16; i++){
		randomFlags.push(false);
	}
	let imagesGenerated = 0;
	let a = 16
	while(imagesGenerated < 16){
		let randNum = generateRandomImageNum(a);
		if(!randomFlags[randNum] && typeof images[randNum] !== 'undefined'){
			randomFlags[randNum] = true;
			imagesGenerated++;
			boardImages.push(images[randNum]);
		}
		else if (randomFlags[randNum] && typeof images[randNum] !== 'undefined'){
			delete images[randNum];
		}
	}
    display();
}

function movePuzzle(imageMoved){
    if(!gameOver){
        if(!sourceCardFlipped){
            document.getElementById("piece" + imageMoved).style.filter = "brightness(200%)"
            lastImageClicked = imageMoved;
            lastImageClickedId = document.getElementById("piece" + imageMoved);
            sourceCardFlipped = true;
            score++;
        }
        else{
            let thisImage = document.getElementById("piece" + imageMoved);
            curImg = boardImages[imageMoved];
            lastImg = boardImages[lastImageClicked];
            boardImages[imageMoved] = boardImages[lastImageClicked];
            boardImages[lastImageClicked] = curImg;
            thisImage.src = lastImg;
            lastImageClickedId.src = curImg;

            lastImageClickedId.style.filter = null;

            lastImageClickedId = null;
            lastImageClicked = null;
            sourceCardFlipped = false;
            score++;
        }
        document.getElementById("score").innerHTML = "Score: " + score;
    }
    gameOver = isWin();
    console.log(gameOver);
}

function generateRandomImageNum(a){
	return Math.floor((Math.random() * a))
}

function display(){
    for(let i = 0; i < 16; i++){
        document.getElementById("piece" + i).src = boardImages[i];
    }
}

function isWin(){
    for(let i = 0; i < 16; i++){
        if(document.getElementById("piece" + i).src.indexOf("image" + (i + 1) + ".png") <= -1){
            console.log("image" + (i + 1) + ".png");
            return false;
        }
    }
    document.getElementById("winmessage").innerHTML = "Congrats you won";
    document.getElementById("winmessage").style.display = "block";
    return true;
}

console.log("vsvas".indexOf("a"));
