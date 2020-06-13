// SUNBATHING STOPWATCH

$(".container1").show();
$(".container2").hide();

// START

$("#button-start").one("click", start);

function start (){
    secondsN = parseInt(seconds);
    minutesN = parseInt(minutes);
    totalSeconds = eval(minutesN*60+secondsN);
    paused = false; 
    mouseTimer = false; // "false" to check that the alarm will play only when time ends, and not when reset fires;
    interval = setInterval(timerDown, 1000);
    newTotalSeconds = totalSeconds;

    function timerDown (){
        if (paused === false) {
        minutesT = Math.floor(totalSeconds/60);
        secondsT = totalSeconds - minutesT*60;
        totalSeconds--;
        $("#textbox-seconds").val(secondsT);
        $("#textbox-minutes").val(minutesT);
            if (totalSeconds < 0) {
                clearInterval(interval);
                totalSeconds = "";
                $("#button-start").one("click", start);
                if (mouseTimer === false) {
                playSound(timerEndSound, 1.0);
                }
            }
            if (totalSeconds !== "") {
                $(".container1").hide();
                $(".container2").show();
                $("#button-start").text("Pause").append("<p>"+"Hold to Reset"+"</p>");
                $("#button-start p").fadeTo(1000, 0.3);
                $("#button-start").off("click", start); 
                $("#button-start").one("click", pause);
                $("#button-start").css("background", "#005210");
                $("#button-start").css("border", "1.5px solid #02ab24");
                $("#circle-loader").css("stroke", "#02ab24");
        
                function pause (e) {
                    if (totalSeconds !== "") {
                        $("#button-start").text("Resume").append("<p>"+"Hold to Reset"+"</p>");
                        $("#button-start p").fadeIn(333).fadeOut(333).fadeIn(333);
                        $("#button-start").css("background", "#b55909");
                        $("#button-start").css("border", "1.5px solid #ffb742");
                        $("#circle-loader").css("stroke", "#ffb742");
                        e.preventDefault();
                        paused = true;
                        $("#button-start").one("click", resume);
                    }
                };
        
                function resume (e) {
                    if (totalSeconds !== "") {
                        $("#button-start").text("Pause").append("<p>"+"Hold to Reset"+"</p>");
                        e.preventDefault();
                        paused = false;
                        $("#button-start").one("click", pause);
                    }
                };
            }
            else {
                $(".container1").show();
                $(".container2").hide();
                $("#button-start").text("Start");
                paused = false;
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
    
    
    // PROGRESS BAR
    
    // x = (totalSeconds / newTotalSeconds) * 100;
    // $(".progress-bar").css("width", x+"%");
    
    circle = document.getElementById("circle-loader");
    percentage = (totalSeconds / newTotalSeconds);
    radius = 150;
    dasharray = (percentage * 2 * Number((radius * Math.PI))) + ", " + ((1 - percentage) * 2 * Number((radius * Math.PI)));
    circle.style.strokeDasharray = dasharray; 

    };

    // RESET

    $("#button-start").on("touchstart", touchStart);
    
    function touchStart () {
        touchEnd();
        mouseTimer = setTimeout(reset, 1000);
    };
    
    $("#button-start").on("touchend", touchEnd);
    
    function touchEnd () {
            clearTimeout(mouseTimer);
    };
    
    function reset () {
        totalSeconds = "";
        $(".container1").show();
        $(".container2").hide();
        $("#button-start").text("Start");
        $("#button-start").css("background", "#005210");
        $("#button-start").css("border", "1.5px solid #02ab24");
        $("#circle-loader").css("stroke", "#02ab24");
        paused = false;
        $(".seconds").scrollTop(0);
        $(".minutes").scrollTop(0);
        $("#button-start").trigger("touchstart");
        playSound(clickResetSound, 0.1);
        mouseTimer = true;
    };
};
            
// SOUND

$("#button-start").on("click", function () {
    playSound(clickStartSound, 1.0);
});

clickStartSound = "clickStart.mp3";
clickResetSound = "clickReset.mp3";
timerEndSound = "clickAlarm.mp3";

function playSound (soundSource, soundVolume) {
    sound = document.createElement("audio");
    sound.src = soundSource;
    sound.volume = soundVolume;
    sound.preload = "auto";
    sound.play();
};
          
// SCROLL seconds

seconds = 0;
timerSeconds = null;
var gridTop = 0,
gridBottom = $('.seconds').outerHeight();

$(".seconds p")[0].style.fontWeight = "bolder"; //.css("font-weight", "bolder");
$(".seconds p")[0].style.fontSize = "50px"; //.css("font-size", "50px");
$(".seconds p")[1].style.marginLeft = "1.5rem"; //.css("margin-left", "1.5rem");
$(".seconds p")[1].style.opacity = "0.4";

$('.seconds').on('scroll', function() {
    $('.seconds p').each(function() {
        var thisTop = $(this).offset().top;
        
        if (thisTop >= gridTop && (thisTop + $(this).height()) <= gridBottom) {
            $(this).css("font-weight", "bolder");
            $(this).css("font-size", "50px");
            $(this).css("margin-left", "1rem");
            $(this).fadeTo(10, 1.0);    
            seconds = $(this).text();
            if (timerSeconds !== null) {
                clearTimeout(timerSeconds);
            }
            timerSeconds = setTimeout(function () {
            $(".seconds p")[seconds].scrollIntoView({behavior: "smooth", block: "center"});
            }, 50);
        } 
        else {
            $(this).css("font-weight", "normal");
            $(this).css("font-size", "30px");
            $(this).css("margin-left", "1.5rem");
            $(this).fadeTo(10, 0.4);
        }
    });
});

// SCROLL minutes

minutes = 0;
timerMinutes = null;
var gridTop = 0,
gridBottom = $('.minutes').outerHeight();

$(".minutes p")[0].style.fontWeight = "bolder"; //.css("font-weight", "bolder");
$(".minutes p")[0].style.fontSize = "50px"; //.css("font-size", "50px");
$(".minutes p")[1].style.marginLeft = "1.5rem"; //.css("margin-left", "1.5rem");
$(".minutes p")[1].style.opacity = "0.4";

$('.minutes').on('scroll', function() {
    $('.minutes p').each(function() {
        var thisTop = $(this).offset().top;
        
        if (thisTop >= gridTop && (thisTop + $(this).height()) <= gridBottom) {
            $(this).css("font-weight", "bolder");
            $(this).css("font-size", "50px");
            $(this).css("margin-left", "1rem");
            $(this).fadeTo(10, 1.0);    
            minutes = $(this).text();
            if (timerMinutes !== null) {
                clearTimeout(timerMinutes);
            }
            timerMinutes = setTimeout(function () {
            $(".minutes p")[minutes].scrollIntoView({behavior: "smooth", block: "center"});
            }, 50);
        } 
        else {
            $(this).css("font-weight", "normal");
            $(this).css("font-size", "30px");
            $(this).css("margin-left", "1.5rem");
            $(this).fadeTo(10, 0.4);
        }
    });
});