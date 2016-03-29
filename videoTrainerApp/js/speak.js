var Speak = function () {
    this.voices = [];
    this.loadVoices = function () {
        // Fetch the available voices.
        voices = speechSynthesis.getVoices();
        console.log('--- available voices ---');
        console.log(voices);
    };
    // Chrome loads voices asynchronously.
    window.speechSynthesis.onvoiceschanged = function (e) {
      voices = speechSynthesis.getVoices();
        console.log(voices);
        
    };

    this.init = function () {
        if ('speechSynthesis' in window) {
            // Execute loadVoices.
            this.loadVoices();

            console.log('Your browser <strong>supports</strong> speech synthesis.');
        } else {
            console.log('Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="http://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.');
        }
    };

    this.speak = function (text, language) {
        // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();

        // Set the text.
        msg.text = text;

        // Set the attributes.
        msg.volume = 1;
        msg.rate = 0.9;
        msg.pitch = 1;

        // If a voice has been selected, find the voice and set the
        // utterance instance's voice attribute.
        setTimeout(function() {
            for (i = 0; i < voices.length; i++) {
            if (voices[i].lang == language) {
                msg.voice = voices[i];
                console.log('reading');
                console.log(msg.voice); 
            }
               
            }
            
             // Queue this utterance.
            window.speechSynthesis.speak(msg);
            
        },500);
                
    }
    
    this.speakWithDelay = function (text, language, delay) {
        // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();

        // Set the text.
        msg.text = text;

        // Set the attributes.
        msg.volume = 1;
        msg.rate = 0.9;
        msg.pitch = 1;

        // If a voice has been selected, find the voice and set the
        // utterance instance's voice attribute.
        setTimeout(function() {
            for (i = 0; i < voices.length; i++) {
            if (voices[i].lang == language) {
                msg.voice = voices[i];
                console.log('reading');
                console.log(msg.voice); 
            }
               
            }
            
             // Queue this utterance.
            window.speechSynthesis.speak(msg);
            
        }, delay);
                
    }
 
}

