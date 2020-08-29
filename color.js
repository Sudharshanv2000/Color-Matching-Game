//Start
	//generate n*2 random colors
	//Assign each square a random color and shuffle
	//Make Score as Zero
//Match the Colors and Update Score

//Gather Variables###################################
var squares=document.querySelectorAll('.square');
var secondsValue=document.querySelector('#seconds');
var minutesValue=document.querySelector('#minutes');
var anyColorSelected=false;
var selectedSquare;
var colorsGenerated;
var minutes=0,seconds=0;
var isPlaying=false;
var noOfSquaresLeft=28;
var noOfMoves=0;
var movesCounter=document.querySelector('#scorevalue');
var gameOver=document.querySelector('#gameover');
var gameOverContent=document.querySelector('#gameoverContent');
var closeBtn=document.querySelector('#close');
var refresh=document.querySelector('#reset');
var no;	
var container=document.querySelector('#container');

var hit;
var stars=document.querySelectorAll('.fa');
var isEmpty=true;

window.onload=start();

///functions########################################

function start()
{	hit=0;
	
	if(isPlaying==false)
	{
		no=prompt("Enter No Of Colors");
		addSquares(no*2);
		
	}
	
	anyColorSelected=false;
	isPlaying=false;
	 squares=document.querySelectorAll('.square');
	assigncolors(no);
	noOfSquaresLeft=no*2;
	noOfMoves=0;
	timeValue=0;
	movesCounter.textContent=noOfMoves;
	setTime(timeValue);
	displayAllSquares(no);
	document.body.style.background="black";
	gameOver.style.display="none";
	
		//displayGameOver();
	// startTimer();
	
}
function refresh()
{

}
function addSquares(no)
{
	for(let i=0;i<no;++i)
	{
		addSquare();
	}
}
function addSquare()
{
	let newSquare=document.createElement("div");
	newSquare.classList.add('square');
	newSquare.style.display="block"
	container.appendChild(newSquare);
}
function displayAllSquares(no)
{
	for(var i=0;i<no*2;++i)
	{
		squares[i].style.display="block";
		squares[i].classList.remove('selected');
	}
}


//shuffle colors usimg fisher yates algorithm
function shuffle(colors)
{
	for(let i=colors.length-1;i>=0;--i)
	{
		let rand=Math.floor(Math.random()*Math.random()*i);
		let temp;
		temp=colors[i];
		colors[i]=colors[rand];
		colors[rand]=temp;
	}
	return colors;
}
function setTime(time)
{
	minutes=Math.floor(time/60);
		seconds=time%60;
		if(minutes<10)
			minutes='0'+minutes;
		if(seconds<10)
			seconds='0'+seconds;
		//console.log(time);
		minutesValue.textContent=minutes;
		secondsValue.textContent=seconds;
}
function startTimer()
{	var timeValue=0;
	timer=setInterval(function()
	{
		timeValue++;
		 // console.log(timeValue);
		setTime(timeValue);
		
	},1000);
}
function stopTimer()
{
clearInterval(timer);
}



function assigncolors(no)
{
	 colorsGenerated=generateRandomColors(no);
	colorsGenerated.push(...colorsGenerated);
	console.log(colorsGenerated);
	colorsGenerated=shuffle(colorsGenerated);
	// colorsGenerated=shuffle(colorsGenerated);
	// colorsGenerated=shuffle(colorsGenerated);
	// colorsGenerated=shuffle(colorsGenerated);

	
	for(var i=0;i<no*2;++i)
	{
		squares[i].style.background=colorsGenerated[i];
	}
}

function generateRandomColors(no)
{ var arr=[];
	for(let i=0;i<no;++i)
	{
		arr.push(randomcolor());
	}
	return arr;
}
function randomcolor()
{
	let r=Math.floor(Math.random()*256);
	let g=Math.floor(Math.random()*256);
	let b=Math.floor(Math.random()*256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function select()
{	console.log(this.style.background);
	if(isPlaying==false)
	{
		startTimer();
		isPlaying=true;
	}
	if(anyColorSelected===false)
	{
		selectedSquare=this;
		anyColorSelected=true;	
		selectedSquare.classList.add('selected');

	}
	else
	{
		if((selectedSquare.style.background===this.style.backgroundColor)&&(selectedSquare!==this))//correct selection
		{	noOfMoves+=1;
			// console.log(noOfMoves);
			movesCounter.textContent=noOfMoves;
			selectedSquare.style.display="none";
			this.style.display="none";
			noOfSquaresLeft-=2;
			hit++;
			if(noOfSquaresLeft==0)
				{
					stopTimer();
					displayGameOver();
				}

		}
		else
		{	noOfMoves+=1;
			movesCounter.textContent=noOfMoves;
			// console.log(noOfMoves);
			selectedSquare.classList.remove('selected');
			;
			
		}
		anyColorSelected=false;
	}
	

}
function displayGameOver()
{	let hitRatio=hit/noOfMoves*100;
	// 
	let noOfStars=Math.ceil(Math.floor(hitRatio)/20);
	hitRatio=hitRatio.toFixed(2);
	gameOverContent.innerHTML="<p>You Won!!!!</p>"+"<p>No of moves :"+noOfMoves+"</p>"+"<p>Time Taken :</p>"+"<p>"+minutes+" : "+seconds+"</p> <p> Hit-Rate : "+hitRatio+"%</p>";
	gameOver.style.display="block";
	for(let i=0;i<noOfStars;++i)
	{
		stars[i].classList.add('checked');
	}
	document.body.style.background="#eddbbb";

}
function hideGameOver()
{
	gameOver.style.display="none";
}

//	Add Event Listeners#############################
for(var i=0;i<squares.length;++i)
	{
		squares[i].addEventListener("click",select);
	}
refresh.addEventListener("click",start);
refresh.addEventListener("click",stopTimer);
// closeBtn.addEventListener("click",function()
// {
// 	gameOver.style.display="none;"
// });
closeBtn.addEventListener("click",hideGameOver);