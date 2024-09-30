const translations = {
    en: {
        title: "Welcome to Gem-EI",
        musicButton: "Choose Your Mood Music",
        playMusicButton: "Play Music",
        changeLanguage: "Change Language",
        suggestExercise: "Suggest Exercise",
        tellJoke: "Tell a Joke",
        quote: "Quote of the Moment",
    },
    es: {
        title: "Bienvenido a Gem-EI",
        musicButton: "Elige Tu Música de Ánimo",
        playMusicButton: "Reproducir Música",
        changeLanguage: "Cambiar Idioma",
        suggestExercise: "Sugerir Ejercicio",
        tellJoke: "Contar un Chiste",
        quote: "Cita del Momento",
    },
    fr: {
        title: "Bienvenue chez Gem-EI",
        musicButton: "Choisissez Votre Musique d'Humeur",
        playMusicButton: "Jouer de la Musique",
        changeLanguage: "Changer de Langue",
        suggestExercise: "Suggérer un Exercice",
        tellJoke: "Raconter une Blague",
        quote: "Citation du Moment",
    },
};

const moodModal = document.getElementById('moodModal');
const span = document.getElementsByClassName('close')[0];
const playMusicButton = document.getElementById('playMusicButton');
const moodSelect = document.getElementById('moodSelect');

const moodMusic = {
    happy: "https://example.com/happy-song.mp3",
    sad: "https://example.com/sad-song.mp3",
    relaxed: "https://example.com/relaxed-song.mp3",
    angry: "https://example.com/angry-song.mp3",
    energetic: "https://example.com/energetic-song.mp3"
};

document.getElementById('musicButton').onclick = function() {
    moodModal.style.display = "block";
}

span.onclick = function() {
    moodModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == moodModal) {
        moodModal.style.display = "none";
    }
}

playMusicButton.onclick = function() {
    const mood = moodSelect.value;
    if (mood && moodMusic[mood]) {
        const audio = new Audio(moodMusic[mood]);
        audio.play();
        moodModal.style.display = "none";
    } else {
        alert("Please select your mood.");
    }
}

function changeLanguage() {
    const language = prompt("Choose language (e.g., en, es, fr): ");
    if (language && translations[language]) {
        document.title = translations[language].title;
        document.getElementById('musicButton').textContent = translations[language].musicButton;
        document.getElementById('playMusicButton').textContent = translations[language].playMusicButton;
        document.getElementById('changeLanguageButton').textContent = translations[language].changeLanguage;
        document.getElementById('suggestExerciseButton').textContent = translations[language].suggestExercise;
        document.getElementById('tellJokeButton').textContent = translations[language].tellJoke;
        document.getElementById('quoteHeader').textContent = translations[language].quote;
        alert("Language changed to " + language);
    } else {
        alert("Invalid language selected.");
    }
}

function updateQuote() {
    const quotes = [
        "Believe in yourself! You are capable of amazing things.",
        "Stay positive, work hard, make it happen.",
        "Difficult roads often lead to beautiful destinations.",
        "Keep going. You're getting there.",
        "Your only limit is your mind."
    ];
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote").textContent = '"' + randomQuote + '"';
}

setInterval(updateQuote, 60000);
window.onload = function() {
    updateQuote();
};
