var codes = [
        {
            value: '1a2b',
            hint: 'I am tall.',
            image: 'assets/photo-1.jpg'
      },
        {
            value: '3c4d',
            hint: 'I am blond.',
            image: 'assets/photo-2.jpg'
      },
        {
            value: '5e6f',
            hint: 'I have blue eyes.',
            image: 'assets/photo-3.jpg'
      },
        {
            value: '7g8h',
            hint: 'I have long hair.',
            image: 'assets/photo-4.jpg'
      },
        {
            value: '9i10j',
            hint: 'I am a man.',
            image: 'assets/photo-5.jpg'
      },
        {
            value: '11k12l',
            hint: 'I like my courner office.',
            image: 'assets/photo-6.jpg'
      },

  ];
    $(document).ready(function () {
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
                    correct = 1;
                    $('#question').html(codes[i].hint);
                    changeBackground(codes[i].image);
                    $('#input-field').val('');
                    $('#code-submit').html('Send');
                    // speak(codes[i].hint);
                }
            };
            if (correct == 0) {
                $('#code-submit').html('Try again');
            }

        });
    });
