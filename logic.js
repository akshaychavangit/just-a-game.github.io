$(document).ready(()=>{
 var name = prompt('Enter Name:');
 var level = parseInt(prompt('select level \n 1.Easy \n 2.medium \n 3.Hard \n 4.Demon'))
 if(!name && !level)
 {
     window.location.reload()

 }

 var arrSample = ['&#x263a;','&#x265b;','&#x2791;','&#x2764;','&#x2708;','&#x25d1;','&#x2730;','&#x2709;','&#x263c;','&#x2295;','&#x2211;','&#x25b3;','&#x265a;','&#x2601;','&#x221e;','&#x2744;','&#x2640;','&#x2642;','&#x266a;','&#x266b;','&#x2297;','&#x2205;','&#x2658;'];
 var time
 var score = 0

 switch (level) {
     case 1:
         arrSample = arrSample.slice(0,1)
         arrSample = [ ...arrSample , ...arrSample ]
         time = 20
       break;
     case 2:
         arrSample = arrSample.slice(0,7)
         arrSample = [ ...arrSample , ...arrSample ]
         time = 30
       break;
     case 3:
         arrSample = arrSample.slice(0,10)
         arrSample = [ ...arrSample , ...arrSample ]
         time = 40
       break;
     case 4:
         arrSample = arrSample
         time = 60
       break;
       default:
         alert("Invalid")
       break;
 }
 
   
 var moves  = 0

 shuffle(arrSample)
 function shuffle(arr) {
     var i,
         j,
         temp;
     for (i = arr.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1));
         temp = arr[i];
         arr[i] = arr[j];
         arr[j] = temp;
     }
     return arr;    
 };
 
 var activatedCards = []
 
 var activatedCardIndex = []
 var matchedCards = []
 
     for(k=0;k < arrSample.length;k++)
     {
         $('#Cards').append(`<div id='card-id-${arrSample[k]}' class='cardIndex-${[k]} card-${arrSample[k]} cardDefaults back'>
             ${arrSample[k]}
         </div>`)
     }
     setInterval(()=>{
         time--
         $('#time').html(time)
         if(time==0)
         {
             alert("THE END")
             window.location.reload()
         }
     },1000)

     $('#Cards').click((e)=>{
         moves ++
         $('#count').html(moves)
         //cardIndex
         var clickedDiv = e.target.classList[0]
         
         activatedCardIndex.push(clickedDiv)
         if(activatedCardIndex.length == 1)
         {
             $(`.${clickedDiv}`).removeClass('back').addClass('front')
         }
         if(activatedCardIndex[0] !== activatedCardIndex[1])
         {
             activatedCards.push(e.target.classList[1])
             $(`.${clickedDiv}`).removeClass('back').addClass('front')
             if(activatedCards.length == 2)
             {
                 if(activatedCards[0] == activatedCards[1])
                 {   
                     score++
                     $('#Score').html(score)
                     $(`.${activatedCards[0]}`).addClass('matched').removeClass('front back')
                     $(`.${activatedCards[1]}`).addClass('matched').removeClass('front back')
                     matchedCards.push(activatedCardIndex[0])
                     matchedCards.push(activatedCardIndex[1])
                     activatedCards.length = 0
                     activatedCardIndex.length = 0
                 }
                 else
                 {
                     $(`.${activatedCards[0]}`).removeClass('front').addClass('back')
                     activatedCards.shift()
                     activatedCardIndex.shift()
                 }
             }

         }
         else
         {
             activatedCardIndex.shift()

         }
         
         
         console.log(activatedCards,"avtiveCard")
         console.log(activatedCardIndex,"Index")
         console.log(matchedCards,"machedCards")
         if(arrSample.length == matchedCards.length)
         {
             alert(`Winner !!!! \n Moves:${moves}`)
             data = {name:name,moves:moves,time:time}
             $.ajax({
                         url: "https://script.google.com/macros/s/AKfycbzvEgHcLbVM3_78YpwtDVx_hLuZaIJrlB1JByXi2erMES9LQ_E/exec",
                         type: "GET",
                         data: data,
                         contentType: "application/javascript",
                         dataType: 'jsonp'
                         
                     }).done(function(res) {console.log('success',res)})
                             .fail(function(e) {console.log("error",e)});
             window.location.reload()

                     
         }


     })
     
 })

