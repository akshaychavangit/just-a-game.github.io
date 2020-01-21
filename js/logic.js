$(document).ready(()=>{
    $('#play').click(()=>{
        $("#play").css({'display':'none'})
        $(".container").css({'display':'block'})
        play()
    })
   
function play()
{
    
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
                arrSample = arrSample.slice(0,5)
                arrSample = [ ...arrSample , ...arrSample ]
                time = 20
                stage = 'https://script.google.com/macros/s/AKfycbwIvQuzpF0n3yYTTEWNUbKAloKlAcsjio0BloOz4cF4Dw-rRrEm/exec'
                scoreboard = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQuBFde3CU--sQe0lOt6WTi-IaKU_GnzspIGreLAkYLoa1orzg-r5xgtrF49jgIdcX6MyGyteadPJxu/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false'
            break;
            case 2:
                
                arrSample = arrSample.slice(0,7)
                arrSample = [ ...arrSample , ...arrSample ]
                time = 30
                stage = 'https://script.google.com/macros/s/AKfycbyodb8KnN2bY9ZF13BTFaveI4ulzVIwvjaqNTfkrR0nyaybPJs/exec'
                scoreboard = '"https://docs.google.com/spreadsheets/d/e/2PACX-1vTBGev4O6yYLpIlp_jxImxxM0WENiN8x_Iki9EMKOWKvpujiICmT3Mm89V_9YvlhoPE_NgOZ1swui2s/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"'
            break;
            case 3:
                
                arrSample = arrSample.slice(0,11)
                arrSample = [ ...arrSample , ...arrSample ]
                time = 40
                stage = 'https://script.google.com/macros/s/AKfycbxaiU3-n5LSZpze6xxcZV36DYEAiyfR7NKPJK6RY1nVHBW958c/exec'
                scoreboard = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9ExUIR-XXBVCb7Wx6-yOu-cJi1tkGuth7Ya8pF0DvgWG-vr0K2zo5ERlzjJG1Lf4ib-mI2Z7bUI1U/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false'
            break;
            case 4:
                arrSample = [...arrSample,...arrSample]
                time = 60
                stage = 'https://script.google.com/macros/s/AKfycbwkA4GFM0m01SR0ZL_DGUyqc-4Q0-cGplZjwntkL8lNnJ_EPFmn/exec'
                scoreboard = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQk0B_jDS6igwRIpcbc9t0BJzlHHEwX3QwfP8hHLd04pj5-I3X82_uNz9weVdjCNLUl36YEUZO7__y6/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false'
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
            var timer = setInterval(()=>{
            time--
            $('#time').html(time)
            if(time==0)
            {
            alert("The End")
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


                    //  console.log(activatedCards,"avtiveCard")
                    //  console.log(activatedCardIndex,"Index")
                    //  console.log(matchedCards,"machedCards")
                    if(arrSample.length == matchedCards.length)
                    {
                    alert(`Winner !!!! \n Moves:${moves}`)
                    a = new Date()
                    id = a.getTime()
                    data = {ID:id , Name:name,Moves:moves,Time:time}


                        
                    //l1
                    // <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQuBFde3CU--sQe0lOt6WTi-IaKU_GnzspIGreLAkYLoa1orzg-r5xgtrF49jgIdcX6MyGyteadPJxu/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

                    // l2
                    // <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTBGev4O6yYLpIlp_jxImxxM0WENiN8x_Iki9EMKOWKvpujiICmT3Mm89V_9YvlhoPE_NgOZ1swui2s/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

                    // l3
                    // <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9ExUIR-XXBVCb7Wx6-yOu-cJi1tkGuth7Ya8pF0DvgWG-vr0K2zo5ERlzjJG1Lf4ib-mI2Z7bUI1U/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

                    //l4
                    // <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQk0B_jDS6igwRIpcbc9t0BJzlHHEwX3QwfP8hHLd04pj5-I3X82_uNz9weVdjCNLUl36YEUZO7__y6/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe>





                    $.ajax({
                        url: stage ,
                        type: "GET",
                        data: data,
                        contentType: "application/javascript",
                        dataType: 'jsonp'   

                    }).done(function(res) {console.log('success',res)})
                    .fail(function(e) {console.log("error",e)});
                    $('#Cards').css({'display':'none'})
                    $('#scoreboard').html(`<iframe style="width: 100%;height: 500px;" src="${scoreboard}"></iframe>`)
                    clearInterval(timer)

                    }


            })
            }

})

