function sayIt(text) {
    var voices = window.speechSynthesis.getVoices();
    var worte = new SpeechSynthesisUtterance(text);
    worte.lang = "en-US";
    window.speechSynthesis.speak(worte);
    console.log(text);
}