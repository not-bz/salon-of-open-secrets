/* Variables -----------------------------------------*/

$ExitButton = $("#ExitButton");
$Buttons = $("button:not(.link)");
$Videos = $("video");
viewsHistory = [];

/* Start ---------------------------------------------*/

$(function() {
    checkInitialView();
});

// loader
$(window).on('load', function () {
    setTimeout(() => {
        $('#loader').fadeOut(500).addClass("hide").removeClass("active");
        $("section[data-view='0']").fadeIn(1000).css("display", "flex").removeClass("hide").addClass("active");
    },500);
}); 

/* Interaction ---------------------------------------*/

$Buttons.on("click", function(){
    view = $(this).data("view");
    showView(view, false);
    checkInitialView();
    checkTypeView(view);
});

$ExitButton.on("click", function(){
    showView(0,true);
    checkInitialView();
    stopAllVideos();
});



/* Custom -------------------------------------------*/

function showView(view, backward){
    if(!backward) {
        viewsHistory.push($("section.active").data("view"));
    }
    if(view==0) {
        viewsHistory.length=0;
    }
    console.log(viewsHistory);
    console.log("previous view - "+viewsHistory[viewsHistory.length-1]);
    
    $("section").hide().removeClass("active");
    
    // reset contents of view and display
    thisView=$("section[data-view='"+view+"']");
    thisView.find('.video-div').removeClass("hide");
    thisView.find('.question-container').addClass("hide").fadeOut();
    thisView.fadeIn(1000).css("display", "flex").addClass("active");
    resetPlayPauseButtons(thisView.find('i.play'));

    checkCharacterView();
}

function checkInitialView(){
    currentView = $("section.active").data("view");
    if(currentView!=0) {
        $ExitButton.removeClass("hide");
    } else {
        $ExitButton.addClass("hide");
    }
}


function checkTypeView(view) {
    console.log("start view - "+view);
    thisView=$("section[data-view='"+view+"']");
    typeView = thisView.data("type");
    if(typeView=="video") {
        thisView.find("video").trigger('play');
    } 
}

function stopAllVideos(){
    $Videos.each(function(){
        $(this).trigger("pause");
        $(this).get(0).currentTime = 0;
    });
}


$Videos.bind("ended", function() {
    $(this).trigger("pause");
    auto = $(this).parent().data("auto");
    
    currentView = $(this).data("view");
    $("section[data-view='"+currentView+"']").find(".video-div").addClass("hide");
    
    if(auto) {
        autoforward = $(this).parent().data("autoforward");
        showView(autoforward, false);
        checkInitialView();
        checkTypeView(autoforward);
        
    } else {
        // display buttons after video
        $(this).parent().next().fadeIn(1000).css("display", "flex").removeClass("hide");
        thisView=$("section[data-view='"+currentView+"']");
    }
});



/* Video Controls ---------------------------------------*/

$PlayPauseButtons = $(".video-controls.play");
$RestartButtons = $(".video-controls.restart");
$ForwardButtons = $(".video-controls.forward");
$BackwardButtons = $(".video-controls.backward");

$PlayPauseButtons.on("click", function(){
    $this = $(this);
    index = $this.data("view");
    video = $('video#video-'+index);
    
    if($this.hasClass("fa-pause")){
        video.trigger("pause");
    } else {
        video.trigger("play");
    }
    
    $this.toggleClass('fa-pause');
    $this.toggleClass('fa-play');
});

$RestartButtons.on("click", function(){
    currentView=$(this).data("view");
    video = $('video#video-'+currentView);
    video.trigger("pause");
    video.get(0).currentTime = 0;
    video.trigger("play");
    
    //update play button
    playButton = $(this).next("i.play");
    resetPlayPauseButtons(playButton);
});

$ForwardButtons.on("click", function(){
    currentView=$(this).data("view");
    video = $('video#video-'+currentView);
    video.trigger("ended");
});

$BackwardButtons.on("click", function(){
    view = viewsHistory[viewsHistory.length-1];
    viewsHistory.splice(-1);
    
    stopAllVideos();
    showView(view, true);
    checkInitialView();
    checkTypeView(view);
});

function resetPlayPauseButtons(playButton){
    if (playButton.hasClass("fa-play")) {
        playButton.toggleClass('fa-pause');
        playButton.toggleClass('fa-play');
    }
}

/* Modal ---------------------------------------*/

$('a[data-modal]').on('click', function() {
    $(this).modal({
        fadeDuration: 350
    });
    return false;
});


/* Analytics -------------------------------------------*/

// Count how many times each character get selected over time
function updateCounter(character){
    console.log(character);
    $.post({
        url: 'https://salonofopensecrets.at/php/updateCounter.php',
        data: {name: character},
        success: function (msg) {
            console.log(msg);
        },
        failure: function() {
            console.log('Error!');
        }
    });
}

function checkCharacterView() {
    currentView = $("section.active");
    if(currentView.data("character")){
        character = currentView.data("character");
        updateCounter(character);
    }
}



/* Keyboard Media Controls ---------------------------------------*/

navigator.mediaSession.setActionHandler('play', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('pause', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('seekbackward', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('seekforward', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('previoustrack', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('nexttrack', function() { /* Code excerpted. */ });