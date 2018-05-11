var codes = [
    {
        value: '754',
        hint: 'Haal iedereen weg die groen is',
        image: 'assets/pic2.jpg'
      },
    {
        value: '257',
        hint: 'Haal iedereen weg die 1 oog heeft',
        image: 'assets/pic4.jpg'
      },
    {
        value: '1784',
        hint: 'Haal iedereen weg die 3 ogen heeft',
        image: 'assets/pic5.jpg'
      },
    {
        value: '6743',
        hint: 'Haal iedereen weg die geel is',
        image: 'assets/pic6.jpg'
      },
    {
        value: '5837',
        hint: 'Haal iedereen weg die een hoedje/petje/muts op heeft',
        image: 'assets/pic1.jpg'
      }
    /*,
           {
               value: '11k12l',
               hint: 'I like my courner office.',
               image: 'assets/photo-6.jpg'
         },*/

  ];
var enteredCodes = [];
var achievement = new Audio('assets/achievement.mp3');
var wrong_answer = new Audio('assets/wrong-answer.mp3');

$(document).ready(function () {

    function startTimer() {
        // insert counter logic
        var timer = 45 * 60,
            minutes, seconds;

        var timeImterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            //display.text(minutes + ":" + seconds);
            $('#minutes').html(minutes);
            $('#seconds').html(seconds);

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    };


    function changeBackground(src) {
        //$('#background').attr("src", src);
        $('#background').fadeOut(200, function () {
                $("#background").attr('src', src);
            })
            .fadeIn(400);
    };


    $('#code-submit').on('click', function () {
        var inputValue = $('#input-field').val();
        var correct = 0;
        for (i = 0; i < codes.length; i++) {
            if (inputValue == codes[i].value) {
                for (j = 0; j < enteredCodes.length; j++) {
                    if (inputValue == enteredCodes[j]) {
                        correct = 2;
                         wrong_answer.play();
                    }
                }
                if (correct != 2) {
                    correct = 1;
                    enteredCodes.push(inputValue);
                    $('#question').append('<br>' + codes[i].hint);
                    changeBackground(codes[i].image);
                    $('#input-field').val('');
                    achievement.play();
                    var progressline_length =  enteredCodes.length * 20;
                    $('#progressline').css('width', progressline_length + 'vw');
                    var progressline_score = enteredCodes.length;
                    $('#progressline').html(progressline_score + '/5  &nbsp;')
                    
                }
                // $('#code-submit').html('Sturen');
                // speak(codes[i].hint);
            }
        };
        if (correct == 0) {
            // $('#code-submit').html('Probeer opnieuw');
            wrong_answer.play();
        }

    });

    startTimer();
});