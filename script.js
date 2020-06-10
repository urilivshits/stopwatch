// SUNBATHING STOPWATCH

$(".container1").show();
$(".container2").hide();



// start

$("#button-start").one("click", start);

function start (){
    
    
    secondsN = parseInt(seconds);
    minutesN = parseInt(minutes);
    totalSeconds = eval(minutesN*60+secondsN);
    interval = setInterval(timerDown, 1000);
    function timerDown (){
        minutesT = Math.floor(totalSeconds/60);
        secondsT = totalSeconds - minutesT*60;
        totalSeconds--;
        $("#textbox-seconds").val(secondsT);
        $("#textbox-minutes").val(minutesT);
        // secondsN--;
        // $(".seconds p")[secondsN].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        if (totalSeconds < 0) {
                clearInterval(interval);
                totalSeconds = "";
                $("#button-start").one("click", start); 
        }
        if (totalSeconds !== "") {
            // $("#button-start").hide();
            // $("#button-reset").show();
            $(".container1").hide();
            $(".container2").show();
            $("#button-start").text("Pause");
            $("#button-start").off("click", start);    
        }
        else {
            // $("#button-start").show();
            // $("#button-reset").hide();
            $(".container1").show();
            $(".container2").hide();
            $("#button-start").text("Start");
        }
        if (totalSeconds >= 0) {
        //     // document.querySelector(".seconds").scrollTo(0, 0);
        //     // document.querySelector(".minutes").scrollTo(0, 0);
            $(".seconds").scrollTop(0);
            $(".minutes").scrollTop(0);
        }
        if (secondsT < 10) {
            $("#textbox-seconds").val("0" + secondsT);
        }
        if (minutesT < 10) {
            $("#textbox-minutes").val("0" + minutesT);
        }
    };

touchStartSelect = document.querySelector("#button-start");
touchStartSelect.addEventListener("touchstart", touchStart);

var mouseTimer;

function touchStart () {
    
    touchEnd();
    mouseTimer = setTimeout(reset, 1000);
}

touchEndSelect = document.querySelector("#button-start");
touchEndSelect.addEventListener("touchend", touchEnd);

function touchEnd () {
    // console.log("touchEnd");
    // if (mouseTimer) 
        clearTimeout(mouseTimer);
    // }
}

function reset (){
    console.log("reset event");
    totalSeconds = "";
}
    
};


            
// reset
// $("#button-reset").click(reset).hide();

// function reset (){
//     totalSeconds = "";
//     $("#textbox").val(totalSeconds);
// };
            
            
// play audio
// $("#button-play").click(playSound);

function playSound () {
    sound = document.createElement("audio");
    //sound.src = "http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3";
    sound.src = "click.mp3"
    sound.play();
};

            
// scrolling seconds

// Get viewport height, gridTop and gridBottom
seconds = 0;
var gridTop = 0,
gridBottom = $('.seconds').outerHeight();

$(".seconds p")[0].style.fontWeight = "bolder"; //.css("font-weight", "bolder");
$(".seconds p")[0].style.fontSize = "50px"; //.css("font-size", "50px");
$(".seconds p")[1].style.marginLeft = "1.5rem"; //.css("margin-left", "1.5rem");
$(".seconds p")[1].style.opacity = "0.4";

$('.seconds').on('scroll', function() {
    // On each scroll check if `p` is in interested viewport
    $('.seconds p').each(function() {
        var thisTop = $(this).offset().top;
        // Check if this element is in the interested viewport
        if (thisTop >= gridTop && (thisTop + $(this).height()) <= gridBottom) {
            $(this).css("font-weight", "bolder");
            $(this).css("font-size", "50px");
            $(this).css("margin-left", "1rem");
            $(this).fadeTo(10, 1.0);
            $(this).on("focus", choose);
            $(this).trigger("focus");
            function choose () {
                seconds = $(this).text();
                setTimeout(delayF, 50);
                function delayF () {
                $(".seconds p")[seconds].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    if ($(this).text() === seconds) {
                        return true;
                    }
                    // $(this).off("focus", choose);
        }
    } 
}
        else {
        $(this).css("font-weight", "normal");
        $(this).css("font-size", "30px");
        $(this).css("margin-left", "1.5rem");
        $(this).fadeTo(10, 0.4);
    }
    });
});


// scrolling minutes

// Get viewport height, gridTop and gridBottom
minutes = 0;
var gridTop = 0,
gridBottom = $('.minutes').outerHeight();

$(".minutes p")[0].style.fontWeight = "bolder"; //.css("font-weight", "bolder");
$(".minutes p")[0].style.fontSize = "50px"; //.css("font-size", "50px");
$(".minutes p")[1].style.marginLeft = "1.5rem"; //.css("margin-left", "1.5rem");
$(".minutes p")[1].style.opacity = "0.4";

$('.minutes').on('scroll', function() {
    // On each scroll check if `p` is in interested viewport
    $('.minutes p').each(function() {
        var thisTop = $(this).offset().top;
        
        // Check if this element is in the interested viewport
        if (thisTop >= gridTop && (thisTop + $(this).height()) <= gridBottom) {
            $(this).css("font-weight", "bolder");
            $(this).css("font-size", "50px");
            $(this).css("margin-left", "1rem");
            $(this).fadeTo(10, 1.0);
            $(this).on("focus", choose);
            $(this).trigger("focus");
            function choose () {
                minutes = $(this).text();
                setTimeout(delayF, 50);
                function delayF () {
                $(".minutes p")[minutes].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    if ($(this).text() === minutes) {
                        return true;
                    }
                    // $(this).off("focus", choose);
        }
    } 
       
        } 
        else {
            $(this).css("font-weight", "normal");
            $(this).css("font-size", "30px");
            $(this).css("margin-left", "1.5rem");
            $(this).fadeTo(10, 0.4);
        }
    });
});