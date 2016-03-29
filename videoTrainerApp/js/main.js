/*
                var videoSetNL = [
                    {
                        videoURL: "http://ewall.rrdweb.nl/videos/nl/video2.mp4",
                        setCount: 1,
                        repetitionCount: 2
                            },
                    {
                        videoURL: "http://ewall.rrdweb.nl/videos/nl/video2.mp4",
                        setCount: 1,
                        repetitionCount: 2
                            },
                    {
                        videoURL: "http://ewall.rrdweb.nl/videos/nl/video12.mp4",
                        setCount: 1,
                        repetitionCount: 3
                            },
                    {
                        videoURL: "http://ewall.rrdweb.nl/videos/nl/video2.mp4",
                        setCount: 1,
                        repetitionCount: 2
                            }
                        ];
                var videoSetDE = [
                    {
                        videoURL: "http://ewall.rrdweb.nl/videos/de/video2.mp4",
                        setCount: 1,
                        repetitionCount: 2
                            },
                    {
                        videoURL: "http://ewall.rrdweb.nl/videos/de/video2.mp4",
                        setCount: 1,
                        repetitionCount: 2
                            },
                    {
                        videoURL: "http://ewall.rrdweb.nl/videos/de/video12.mp4",
                        setCount: 1,
                        repetitionCount: 3
                            },
                    {
                        videoURL: "http://ewall.rrdweb.nl/videos/de/video2.mp4",
                        setCount: 1,
                        repetitionCount: 2
                            }
                        ];
                 */
var videoSet = [];
var videoIndex = -1;
var quitTraining;
var isRepeating = false;
var userVolume = 1;
//var timer;
var thisSessionID = "";
var enjoy_count = -1;
var dificulty_count = -1;
var enjoyment_rutine_count = -1;
var dificulty_rutine_count = -1;
var satisfaction_rutine_count = -1;
var personalized_rutine_count = -1;
// var ewallUserID = ewallApp.currentSession.user.username;
var showRegistrationForm = false;
var isUserRegistered = false;
var ewallUserID = '';
var wasRated = false;
var wasEnjoymentRating = false;
var wasDifficultyRating = false;

var interimTimerObj;
var interimTimerPaused = false;

// speech synthesys lib
var readAlowed = new Speak();

function InterimTimer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function () {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function () {
        start = new Date();
        if (timerId) {
            window.clearTimeout(timerId);
        }
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function startTimer(elementId, wasRated, time) {
    var currentTimeCount = time;
    $(elementId).html(currentTimeCount + " s");
    try {
        clearInterval(timer);
    } catch (err) {
        console.log("timer object not found");
    };
    timer = setInterval(function () {
        if (currentTimeCount > 0) {
            currentTimeCount--;
        }

        $(elementId).html(currentTimeCount + " s");
        console.log("timer - quitTraining:" + quitTraining);

        if (quitTraining == false) {
            if (currentTimeCount == 0) {
                //if(parseFloat(enjoy_count) > -1 && parseFloat(dificulty_count) > -1) {
                if (wasRated && wasDifficultyRating && wasEnjoymentRating) {
                    // save rastings to reasoner.
                    // send enjoyment feedback to PARS
                    $.ajax({
                        url: 'https://myhealthframe.nl/ParsWebService2/services/pars',
                        data: JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'saveRating',
                            params: [thisSessionID, ewallUserID, videoSet[videoIndex - 1].exerciseId, 2, parseFloat(enjoy_count), "ewallproject"],
                            id: "jsonrpc"
                        }), // id is needed !!
                        type: "POST",
                        dataType: "json",
                        success: function () {
                            // do nothing
                        },
                        error: function (err) {
                            alert("ERROR: The system is not functioning. Please try again later.");
                        }

                    });

                    // send dificulty feedback to PARS
                    $.ajax({
                        url: 'https://myhealthframe.nl/ParsWebService2/services/pars',
                        data: JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'saveRating',
                            params: [thisSessionID, ewallUserID, videoSet[videoIndex - 1].exerciseId, 1, parseFloat(dificulty_count), "ewallproject"],
                            id: "jsonrpc"
                        }), // id is needed !!
                        type: "POST",
                        dataType: "json",
                        success: function () {
                            // do nothing
                        },
                        error: function (err) {
                            alert("ERROR: The system is not functioning. Please try again later.");
                        }

                    });

                    // show next video [todo]
                    setVideo(videoIndex, videoSet.length);

                    console.log('videoIndex: ' + videoIndex);
                    // set source for the first video, only after a successful ajax response
                    setTimeout(function () {

                        clearRatings();

                    }, 100);

                    clearInterval(timer);

                } else {
                    if (wasRated) { // block the video until it gets rated
                    } else { // clear the interval
                        // show next video [todo]
                        setVideo(videoIndex, videoSet.length);

                        console.log('videoIndex: ' + videoIndex);
                        // set source for the first video, only after a successful ajax response
                        setTimeout(function () {

                            clearRatings();

                        }, 100);

                        clearInterval(timer);

                    }
                }

            } else {

            }
        } else {
            clearInterval(timer);
        }
    }, 1000);
};

function getVideoSet() {
    thisSessionID = generateUUID();

    $.ajax({
        url: 'https://myhealthframe.nl/ParsWebService2/services/pars',
        data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'getRecommendedExercises',
            params: {
                'activateAtRandom': true,
                'visitId': thisSessionID,
                'userId': ewallUserID,
                'ticketStr': 'ewallproject'
            },
            id: "jsonrpc"
        }), // id is needed !!
        type: "POST",
        dataType: "json",
        success: function (data) {
            // get the new rutine
            videoSet = data.result;
            console.log(videoSet);
            // point to correct video set base on prefered language
            var itServerURL = 'https://s3.eu-central-1.amazonaws.com/ewall-videos/it/nr';
            var nlServerURL = 'https://s3.eu-central-1.amazonaws.com/ewall-videos/nl/nr';
            var deServerURL = 'https://s3.eu-central-1.amazonaws.com/ewall-videos/de/nr';
            var daServerURL = 'https://s3.eu-central-1.amazonaws.com/ewall-videos/da/nr';

            var langPref = ewallApp.preferedLanguage;
            for (i = 0; i < videoSet.length; i++) {
                switch (langPref) {
                case 'it': // replace videoUL from each item with the itServerURL
                    videoSet[i].videoURL = itServerURL + videoSet[i].videoURL.split("videos/video")[1];

                    break;
                case 'nl': // replace videoUL from each item with the nlServerURL
                    videoSet[i].videoURL = nlServerURL + videoSet[i].videoURL.split("videos/video")[1];

                    break;
                case 'de': // replace videoUL from each item with the deServerURL
                    videoSet[i].videoURL = deServerURL + videoSet[i].videoURL.split("videos/video")[1];

                    break;
                case 'da': // replace videoUL from each item with the daServerURL
                    videoSet[i].videoURL = daServerURL + videoSet[i].videoURL.split("videos/video")[1];

                    break;
                default: // replace videoUL from each item with the nlServerURL
                    videoSet[i].videoURL = deServerURL + videoSet[i].videoURL.split("videos/video")[1];

                    break;
                }
            }
            // reset the video index
            videoIndex = 0;
            setVideo(videoIndex, videoSet.length);

            // start playout
            $('#routine').fadeIn();
            // set source for the first video, only after a successful ajax response
            setTimeout(function () {
                $('#video1').fadeIn(function () {
                    $(this).trigger("fadeInComplete");
                });
            }, 100);
        },
        error: function (err) {
            alert("ERROR: The system is not functioning. Please try again later.");
        }

    });
};

function setVideo(index, length) {
    if (index >= length - 1) {
        $('#video1').hide();
        $('#rest1').hide();
        $('#end').fadeIn();
    } else {
        $('#gwd-video_1').removeClass('gwd-video-18oz-small').addClass('gwd-video-18oz-full');
        $('#video-source').attr('src', videoSet[index].videoURL);
        $('#video-description').hide();
        $('#video-description-title').html(videoSet[index].prescribedInstructionsNL);

        var videoDescription;
        videoDescription = videoSet[index].exerciseDesc.replace(/\\n/g, " ");
        $('#video-description-content').html(videoDescription);
        $('#gwd-video_1')[0].load();
        isRepeating = false;
        console.log('setting video: ' + videoSet[index].videoURL);
        $('#rest1').hide();

        //reset flags for rating
        wasDifficultyRating = false;
        wasEnjoymentRating = false;

        //reset the intermTimerobj
        interimTimerObj = null;
    };

    enjoy_count = -1;
    dificulty_count = -1;

    // -- remove this before deploy --
    /*if (videoIndex == 1) {
        videoIndex = 5
    }*/
    // ----

    videoIndex++;
    // force video trainer into last state
    //videoIndex = length - 1;
};

function clearRatings() {
    var clear = {
        color: '#a5a5a5'
    };
    // clear video ratings
    $('.enjoy-rating > span').css(clear);
    $('.enjoy-rating > span').html('<i class="material-icons">star_border</i>');

    $('.difficulty-rating > span').css(clear);
    $('.difficulty-rating > span').html(' <i class="material-icons">fitness_center</i> ');

    // clear routine ratigns 
    $('.enjoy-rutine-rating > span').css(clear);
    $('.enjoy-rutine-rating > span').html('<i class="material-icons">star_border</i>');

    $('.difficulty-rutine-rating > span').css(clear);
    $('.difficulty-rutine-rating > span').html(' <i class="material-icons">fitness_center</i> ');

    $('.satisfaction-rutine-rating > span').css(clear);
    $('.satisfaction-rutine-rating > span').html(' <i class="material-icons">tag_faces</i> ');

}

$(document).ready(function () {
    /*setTimeout(function() {
        $('#splashscreen').hide();
    }, 1500);*/    

    // hide routine panel
    $('#routine').hide();

    $('#video1').on('fadeInComplete', function () {
        //alert("I should play");
        // setVideo(videoIndex);             

        $(this).children('video').get(0).currentTime = 0;
        $(this).children('video').get(0).play(0);
    })

    // add main vt buttons click events handlers
    $('#start-routine').on('click', function () {

        getVideoSet();

        $('#play-btn').click();

        quitTraining = false;
        console.log("start routine (recommended videos) - quitTraining:" + quitTraining);

        $('#video1').hide();
        $('#rest1').hide();
        $('#end').hide();

    });
    /*
    // uncomment this once the video recommender can suport categories of rutines
    // add main vt buttons click events handlers
    $('#vt-we-recommend-wrap').on('click', function () {

        getVideoSet();

        quitTraining = false;
        console.log("we recommend - quitTraining:" + quitTraining);

        $('#video1').hide();
        $('#rest1').hide();
        $('#end').hide();

    });

    // add main vt buttons click events handlers
    $('#vt-your-favorite-wrap').on('click', function () {

        getVideoSet();

        quitTraining = false;

        $('#video1').hide();
        $('#rest1').hide();
        $('#end').hide();

    });

    // add main vt buttons click events handlers
    $('#vt-better-breathing-wrap').on('click', function () {

        getVideoSet();

        quitTraining = false;

        $('#video1').hide();
        $('#rest1').hide();
        $('#end').hide();


    });

    // add main vt buttons click events handlers
    $('#vt-better-strength-wrap').on('click', function () {

        getVideoSet();

        quitTraining = false;

        $('#video1').hide();
        $('#rest1').hide();
        $('#end').hide();

    });
    */

    // ratings click/tap ui events handlers
    $('.enjoy-rating > span').on('click', function () {
        //alert('Zing!');
        var selected = {
            color: 'orange'
        };
        var not_selected = {
            color: '#a5a5a5'
        };

        enjoy_count = 0;
        enjoy_count = $(this).data('star-count');


        $(this).prevAll('span').css(selected).html('<i class="material-icons">star</i>');
        $(this).css(selected).html('<i class="material-icons">star</i>');
        $(this).nextAll('span').css(not_selected).html('<i class="material-icons">star_border</i>');

        wasEnjoymentRating = true;



    });

    $('.difficulty-rating > span').on('click', function () {

        var selected = {
            color: '#510088'
        };
        var not_selected = {
            color: '#a5a5a5'
        };

        dificulty_count = 0;
        dificulty_count = $(this).data('star-count');

        $(this).prevAll('span').css(selected).html('<i class="material-icons">fitness_center</i>');
        $(this).css(selected).html('<i class="material-icons">fitness_center</i>');
        $(this).nextAll('span').css(not_selected).html('<i class="material-icons">fitness_center</i>');

        wasDifficultyRating = true;

    });

    $('.satisfaction-rutine-rating > span').on('click', function () {

        var selected = {
            color: '#1b6beb'
        };
        var not_selected = {
            color: '#a5a5a5'
        };

        satisfaction_rutine_count = 0;
        satisfaction_rutine_count = $(this).data('star-count');

        $(this).prevAll('span').css(selected).html('<i class="material-icons">tag_faces</i>');
        $(this).css(selected).html('<i class="material-icons">tag_faces</i>');
        $(this).nextAll('span').css(not_selected).html('<i class="material-icons">tag_faces</i>');


    });

    $('.difficulty-rutine-rating > span').on('click', function () {

        var selected = {
            color: '#510088'
        };
        var not_selected = {
            color: '#a5a5a5'
        };

        dificulty_rutine_count = 0;
        dificulty_rutine_count = $(this).data('star-count');

        $(this).prevAll('span').css(selected).html('<i class="material-icons">fitness_center</i>');
        $(this).css(selected).html('<i class="material-icons">fitness_center</i>');
        $(this).nextAll('span').css(not_selected).html('<i class="material-icons">fitness_center</i>');


    });

    $('.enjoy-rutine-rating > span').on('click', function () {

        var selected = {
            color: 'orange'
        };
        var not_selected = {
            color: '#a5a5a5'
        };

        enjoy_rutine_count = 0;
        enjoy_rutine_count = $(this).data('star-count');

        $(this).prevAll('span').css(selected).html('<i class="material-icons">star</i>');
        $(this).css(selected).html('<i class="material-icons">star</i>');
        $(this).nextAll('span').css(not_selected).html('<i class="material-icons">star_border</i>');


    });

    $('#ease-of-use-rating-slider').on('input', function () {
        // get slider value
        var easeOfUseRatingNr = $('#ease-of-use-rating-slider').val();
        console.log("ease-of-use:" + easeOfUseRatingNr);
        // transform value        
        $('.range-slider__value').html(easeOfUseRatingNr);
        personalized_rutine_count = easeOfUseRatingNr;

        // send ajax with value
        // [to do]

    });

    $('.close').on('click', function () {
        // stop video play, if any
        // stopVideo();

        quitTraining = true;
        console.log("close btn - quitTraining:" + quitTraining);

        // pause all videos
        $('#routine').find('#gwd-video_1').get(0).pause();

        // hide routine panel
        $('#routine').hide();

        // send satisfaction rutine ratings
        try {

            $.ajax({
                url: 'https://myhealthframe.nl/ParsWebService2/services/pars',
                data: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'saveSessionRate',
                    params: [thisSessionID, ewallUserID, 3, parseFloat(satisfaction_rutine_count), "ewallproject"],
                    id: "jsonrpc"
                }), // id is needed !!
                type: "POST",
                dataType: "json",
                success: function () {
                    // do nothing
                },
                error: function (err) {
                    alert("ERROR: The system is not functioning. Please try again later.");
                }

            });

        } catch (err) {
            console.log('Error sending satisfaction count.');
            console.log(err);
        };

        // send enjoyment routine ratings                
        try {
            $.ajax({
                url: 'https://myhealthframe.nl/ParsWebService2/services/pars',
                data: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'saveSessionRate',
                    params: [thisSessionID, ewallUserID, 2, parseFloat(enjoy_rutine_count), "ewallproject"],
                    id: "jsonrpc"
                }), // id is needed !!
                type: "POST",
                dataType: "json",
                success: function () {
                    // do nothing
                },
                error: function (err) {
                    alert("ERROR: The system is not functioning. Please try again later.");
                }

            });

        } catch (err) {
            console.log('Error sending enjoyment count.');
            console.log(err);
        };

        // send difficulty routine ratings                
        try {

            $.ajax({
                url: 'https://myhealthframe.nl/ParsWebService2/services/pars',
                data: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'saveSessionRate',
                    params: [thisSessionID, ewallUserID, 1, parseFloat(dificulty_rutine_count), "ewallproject"],
                    id: "jsonrpc"
                }), // id is needed !!
                type: "POST",
                dataType: "json",
                success: function () {
                    // do nothing
                },
                error: function (err) {
                    alert("ERROR: The system is not functioning. Please try again later.");
                }

            });

        } catch (err) {
            console.log('Error sending difficulty count.');
            console.log(err);
        };

        // send peronalized routine rating                      
        try {

            $.ajax({
                url: 'https://myhealthframe.nl/ParsWebService2/services/pars',
                data: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'saveSessionRate',
                    params: [thisSessionID, ewallUserID, 4, parseFloat(personalized_rutine_count), "ewallproject"],
                    id: "jsonrpc"
                }), // id is needed !!
                type: "POST",
                dataType: "json",
                success: function () {
                    // do nothing
                },
                error: function (err) {
                    alert("ERROR: The system is not functioning. Please try again later.");
                }

            });

        } catch (err) {
            console.log('Error sending personalized count.');
            console.log(err);
        };


        // clear the video set and video element src
        videoSet = [];
        $('#video-source').attr('src', "");


    });

    $('video').on('play', function () {
        if (isRepeating) {
            // mute video during repetition screens
            $('#video1').children('video').get(0).volume = 0;
            $('#volume-btn').val(0);
        } else {
            // resume to lst user set volume when vieweing the video in full screen
            $('#video1').children('video').get(0).volume = userVolume;
            $('#volume-btn').val(userVolume * 100);
        }
    });

    // define repetition timer
    var repetitionTimer = setInterval(function () {
        if (isRepeating) {
            if ($('#video-description-timer').html() > 0) {
                if (interimTimerPaused == false) {
                    $('#video-description-timer').html($('#video-description-timer').html() - 1);
                }
            }
        }
    }, 1000);

    $('video').on('ended', function () {
        // when the video ends, show the rest screen
        $('#video1').children('video').get(0).pause();
        // before starting the repetition, set the counter value
        if (isRepeating == false) {
            $('#video-description-timer').html(videoSet[videoIndex - 1].defaultRequiredTime);

            if (videoSet[videoIndex - 1].defaultRequiredTime > 0) {
                // render the description screen
                isRepeating = true;
                $('#gwd-video_1').removeClass('gwd-video-18oz-full').addClass('gwd-video-18oz-small');
                $('#video-description').show();
                $('#video-description-timer').show();
                try {
                    readAlowed.speakWithDelay($('#video-description-title').html(), 'nl-NL', 3000);
                } catch (err) {
                    console.log("error in speech synth");
                    console.log(err);
                }

                // wait until animation ends, then replay the video.
                setTimeout(function () {
                    $('#video1').children('video').get(0).currentTime = '0';
                    $('#video1').children('video').get(0).play();
                }, 1000);

            };

            // render the rest screen after prescribed time
            interimTimerObj = new InterimTimer(function () {
                // stop the video
                $('#video1').children('video').get(0).pause();

                // show the rest screen
                /**/
                $('#video1').hide();

                $('#rest1').fadeIn();

                if (videoIndex < 5 || videoIndex > videoSet.length - 5) {
                    // hide ratings
                    wasRated = false;
                    $('.rate-message').hide();
                    $('.enjoy-rating').hide();
                    $('.difficulty-rating').hide();
                    startTimer('#timer1', wasRated, 5);

                    console.log("---- should NOT be rating because videoIndex = " + videoIndex);
                } else {
                    //show ratings
                    wasRated = true;
                    $('.rate-message').show();
                    $('.enjoy-rating').show();
                    $('.difficulty-rating').show();
                    startTimer('#timer1', wasRated, 20);

                    console.log("---- SHOULD be rating because videoIndex = " + videoIndex);
                }

            }, Math.abs(videoSet[videoIndex - 1].defaultRequiredTime) * 1000 + 2000);


        } else {
            // the video is small and repeating the second, third ... n-th time
            $('#video1').children('video').get(0).currentTime = '0';
            $('#video1').children('video').get(0).play();
        };
        // startTimer('#timer1', Math.abs(videoSet[videoIndex-1].setCount) * Math.abs(videoSet[videoIndex-1].repetitionCount) * 10);

    });

    var video = document.getElementById('gwd-video_1');
    video.addEventListener('loadeddata', function () {
        // Video is loaded and can be played
        // alert('Loaded video');
        setTimeout(function () {
            $('#video1').fadeIn(function () {
                $(this).trigger("fadeInComplete");
            });
        }, 100);
    }, false);

    /*   */
    /* $('#play-pause-btn').click(function () {
        var currentVideo = document.getElementById('gwd-video_1');
        if (currentVideo.paused || currentVideo.ended) {
            $(this).html('<img src="../PhysicalTrainer/assets/pause.png" style="height: 100%; margin-left: 0%;">'); // add propper icons for play and pause.

            currentVideo.play();
        } else {
            $(this).html('<img src="../PhysicalTrainer/assets/play.png" style="height: 100%; margin-left: 0%;">');

            currentVideo.pause();
        }
    });
   */
    $('#play-btn').click(function () {
        var currentVideo = document.getElementById('gwd-video_1');
        if (currentVideo.paused || currentVideo.ended) {
            currentVideo.play();
            if (interimTimerObj) {
                interimTimerObj.resume();
                interimTimerPaused = false;
            }
        }
    });

    $('#pause-btn').click(function () {
        var currentVideo = document.getElementById('gwd-video_1');
        if (currentVideo.paused || currentVideo.ended) {
            // do nothing
        } else {
            currentVideo.pause();
            if (interimTimerObj) {
                interimTimerObj.pause();
                interimTimerPaused = true;
            }
        }
    });

    /* Use for localhost only. Comment before deploy */
    /*              
        $('#play-pause-btn').click(function () {
            var currentVideo = document.getElementById('gwd-video_1');
            if (currentVideo.paused || currentVideo.ended) {
                $(this).html('<img src="../../../../PhysicalTrainer/src/main/webapp/assets/pause.png" style="width: 70%; height: 70%; margin-left: 0%; margin-top: 11%;">'); // add propper icons for play and pause.

                currentVideo.play();
            } else {
                $(this).html('<img src="../../../../PhysicalTrainer/src/main/webapp/assets/play.png" style="width: 70%; height: 70%; margin-left: 0%; margin-top: 11%;">');

                currentVideo.pause();
            }
        });
    */

    $('#volume-btn').change(function () {
        newvolume = $('#volume-btn').val() / 100;
        if (newvolume > 0) {
            userVolume = newvolume;
        };
        console.log("newVolume = " + newvolume);
        $('#gwd-video_1')[0].volume = newvolume;
        //console.log($('#video').attr("volume"));
    });

    $('#register-button').click(function () { //show the registration form
        $('#register-form').removeClass('register-form-hide').addClass('register-form-show');
    });

    $('#record-btn').click(function () { // records the username and hides the registration form
        console.log("before setting the username in local storage: " + localStorage.getItem("userName"));
        //to do - record user name in local storage, set isUserRegistered to true                
        localStorage.setItem("userName", $('#textfield').html());

        console.log("after setting the username in local storage: " + localStorage.getItem("userName"));

        //hide the panel
        $('#register-form').removeClass('register-form-show').addClass('register-form-hide');
    });

    /* set the user to the localstorage */
    if (localStorage.getItem('userName') !== null) {
        ewallUserID = localStorage.getItem('userName');
        console.log('starting video session for user: ' + ewallUserID);
    } else {
        $('#register-button').trigger('click');
    }
    
    // init speeck synthesys    
    readAlowed.init();
    readAlowed.speak('Welkom! Laten we bewegen!', 'nl-NL');
    readAlowed.speakWithDelay('Als u er klaar voor bent, druk op START!', 'nl-NL', 2000);

});