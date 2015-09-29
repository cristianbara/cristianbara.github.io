function sayIt(text) {
    var voices = window.speechSynthesis.getVoices();
    var worte = new SpeechSynthesisUtterance(text);
    worte.lang = "it-IT";
    window.speechSynthesis.speak(worte);
    console.log(text);
}