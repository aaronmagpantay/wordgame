//Script for all of my game



let life = 5;
let score = 0;
let velMin = 20000; //in milliseconds
let velMax = 30000; //in milliseconds
let color = "blue";
let id = "thisid";

//set current life value
$('.life').text(life);

//word dictionary
let wordDictionary = ["apple", "banana", "mango","monitor", "program", "application", "keyboard", "javascript", "gaming", "network"];


const getRandomInt = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const random = (min,max) =>{
 	return Math.round(Math.random() * (max-min) + min);
}




const dropWords = (velmin,velmax) =>{
	let wordMinLength = 0;
	let wordMaxLength = wordDictionary.length;
	let ranDicLength = getRandomInt(0,wordMaxLength);
  let length = random(100, ($(".game").width() - 100));
  let velocity = random(velmin, velmax);
  // var size = random(50, 150);
  let size = 100;
  let thisWord = $("<div/>", {
  	text: wordDictionary[ranDicLength],
  	id: wordDictionary[ranDicLength],
    class: "word",
    style:  "width:" +size+ "px; height: 20px; left:" + length +  "px; transition: transform " +velocity+ "ms linear;"
  });
  
 
  // thisWord.data("test", Math.round(Math.random()));

  
  
  //insert element
  $(".game").append(thisWord);
  
  //random start for animation
  setTimeout(function(){
    thisWord.addClass("move");
  }, random(0, 5000) );
  
  //remove this object when animation is over
  thisWord.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
    $(this).remove();

    let remainingLife = Number($('.life').text());
    remainingLife -= 1;
    $('.life').text(remainingLife);
    if(remainingLife <= 0){
 	alert("Game over.");
 	window.location.replace("index.html");
 	// alert("Game over with " + totalScore + " pts.");
 	}
  });

} //end of dropWords


for (i = 0; i < 2; i++) { 
  dropWords(velMin,velMax);
}



$('#input').on('keypress', function (e) {

         if(e.which === 13){
        	let casted = $('#input').val();

          score += getRandomInt(0,casted.length) * 10;
            if($('#'+casted).attr("id") == casted){
            	 $('#'+casted).remove();
            	 $('#input').val('');
                velMin -= 500; //in milliseconds
                velMax -= 500;

                //sets velocity not less than 0(fixed)
                if(velMin < 500){
                  velMin = 200;
                }
                if(velMax < 500){
                  velMax = 500;
                }

                // console.log(velMin);
                // console.log(velMax);

                $('#score').html(score);
                


            }else{
            	 $('#input').val('');
            }          
           
           
         }
   });


let runGame = setInterval(function(){
                for (i = 0; i < 2; i++) { 
                  dropWords(velMin,velMax);
                }  
          }, 10000);



