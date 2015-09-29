function sayIt(text) {
    var voices = window.speechSynthesis.getVoices();
    var worte = new SpeechSynthesisUtterance(text);
    worte.lang = "nl-NL";
    window.speechSynthesis.speak(worte);
    console.log(text);
}