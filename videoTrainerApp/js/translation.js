var ui = {
    'en': {
        header: {
            h1: "VIDEO GYMNASTICS",
            h2: "Welcome! Let's get moving!",
            we_recommend: "We Recommend",
            your_favorite: "Your Favorite",
            better_breathing: "Better Breathing",
            better_strength: "Better Strength",
            sensor_intruction: "Make sure you wear the FitBit bracelet.",
            chair_instruction: "You might need a chair for some exercises. Have one near by.",
            ready_text:"When you are ready press",
            start_routine: "START"
            
        },
        routine: {
            rest_time: "Rest Time",
            enjoy_rating: "How much did you enjoy this exercise?",
            difficult_rating: "How difficult was this exercise?",
            enjoy_rutine_rating: "How satisfied are you, with with this exercise session?",
            end_of_routine: "End of Routine",
            done: "Done",
            quit: "Quit"
        }
    },
    'nl': {
        header: {
            h1: "VIDEO GYMNASTIEK",
            h2: "Welkom! Laten we verhuizen!",
            we_recommend: "Wij raden",
            your_favorite: "Je favoriet",
            better_breathing: "Betere ademhaling",
            better_strength: "betere sterkte",
            sensor_intruction: "Zorg dat u de Fitbit armband om heeft.",
            chair_instruction: "U heeft misschien een stoel nodig bij sommige oefeningen. Zorg ervoor dat er een dichtbij staat.",
            ready_text:"Als u er klaar voor bent, druk op",
            start_routine: "START"
        },
        routine: {
            rest_time: "Rusttijd",
            enjoy_rating: "Hoeveel heeft u genoten van deze oefening?",
            difficult_rating: "Hoe moeilijk was deze oefening?",
            enjoy_rutine_rating: "Hoeveel heeft u genoten van deze trainingssessie? ",
            difficult_rutine_rating: "Hoe moeilijk was deze trainingssessie?",
            end_of_routine: "Einde van Routine",
            done: "Klaar",
            quit: "Stoppen"
        }
    },
    'it': {
        header: {
            h1: "GINNASTICA VIDEO",
            h2: "Benvenuto! Muoviamoci!",
            we_recommend: "Noi raccomandiamo",
            your_favorite: "Il tuo preferito",
            better_breathing: "Per respirare meglio",
            better_strength: "Per essere piu forte",
            sensor_intruction: "Assicuratevi di indossare il braccialetto FitBit.",
            chair_instruction: "Per alcuni esercizi potrebbe essere necessario una sedia. Avere uno accanto a te.",
            ready_text:"Quando sei pronto tocca",
            start_routine: "COMINCIARE"
        },
        routine: {
            rest_time: "Tempo di riposo",
            enjoy_rating: "Quanto ti è piaciuto questo esercizio?",
            difficult_rating: "Quanto è stato difficile questo esercizio?",
            enjoy_rutine_rating: "How satisfied are you, with with this exercise session?",
            end_of_routine: "Fine della rutina",
            done: "Fatto",
            quit: "Stop"
        }
    },
    'de': {
        header: {
            h1: "VIDEO GYMNASTIK",
            h2: "Herzlich Willkommen! Los geht’s!",
            we_recommend: "Wir empfehlen",
            your_favorite: "Deine Favoriten",
            better_breathing: "Besser atmen",
            better_strength: "Mehr Kraft",
            sensor_intruction: "Achten Sie darauf, die FitBit Armband zu tragen.",
            chair_instruction: "Möglicherweise müssen Sie einen Stuhl für einige Übungen. Haben Sie ein neben Ihnen.",
            ready_text:"Wenn bereit drücken Sie",
            start_routine: "Los geht's"
        },
        routine: {
            rest_time: "Pause",
            enjoy_rating: "Wie sehr hat dir diese Übung gefallen?",
            difficult_rating: "Wie schwierig war diese Übung?",
            enjoy_rutine_rating: "How satisfied are you, with with this exercise session?",
            end_of_routine: "Ende der Routine",
            done: "Fertig",
            quit: "Stop"
        }
    },
     'da': {
        header: {
            h1: "GYMNASTIK",
            h2: " ",
            we_recommend: "Vi anbefaler",
            your_favorite: "Din favorit",
            better_breathing: "bedre vejrtrækning",
            better_strength: "bedre styrke",
            sensor_intruction: "Sørg for at bære Fitbit armbånd.",
            chair_instruction: "Du har måske brug for en stol til nogle øvelser. Har en ved siden af dig.",
            ready_text:"Når du er klar røre",
            start_routine: "START"
        },
        routine: {
            rest_time: "Hviletid",
            enjoy_rating: "Hvor godt kunne du lide denne øvelse?",
            difficult_rating: "Hvor svær var denne øvelse?",
            enjoy_rutine_rating: "How satisfied are you, with with this exercise session?",
            end_of_routine: " ",
            done: "Færdig",
            quit: "Afslut"
        }
    },

};
var ewallApp= {
    preferedLanguage: "nl"
};
var language =  ewallApp.preferedLanguage;

$(document).ready(function () {
    
    // header title and subtitle
    $('.gwd-div-rdsn').html(ui[language].header.h1);
    $('.gwd-div-d8ml').html(ui[language].header.h2);
    // start page
    $('#sensor-instruction').html(ui[language].header.sensor_intruction);
    $('#chair-instruction').html(ui[language].header.chair_instruction);
    $('#ready-text').html(ui[language].header.ready_text);
    $('#start-routine').html(ui[language].header.start_routine);
    // hrader choice buttons
    $('#we-recommend').html(ui[language].header.we_recommend);
    $('#your-favorite').html(ui[language].header.your_favorite);
    $('#better-breathing').html(ui[language].header.better_breathing);
    $('#better_strength').html(ui[language].header.better_strength);
    
    // routine
    $('.rest-time-title').html(ui[language].routine.rest_time);
    $('.enjoy-rating-title').html(ui[language].routine.enjoy_rating);
    $('.difficulty-rating-title').html(ui[language].routine.difficult_rating);
    // end of rutine
    $('#end-routine-title').html(ui[language].routine.end_of_routine);
    $('#end-routine-quality').html(ui[language].routine.done);
    $('.enjoy-rutine-rating-title').html(ui[language].routine.enjoy_rutine_rating);
    $('.difficulty-rutine-rating-title').html(ui[language].routine.difficult_rutine_rating);
    $('#close').html(ui[language].routine.quit);
 
});