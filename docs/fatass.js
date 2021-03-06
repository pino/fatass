var voiceOn = false;
var voiceAvailable = false;
var voiceDone = false;

var recognition;
var audio;

var startVoice = function () {
    if (voiceDone)
        return;
    if (!('webkitSpeechRecognition' in window)) {
        alert("No speech recognition available on this browser. Please try using Chrome.");
    } else {
        voiceAvailable = true;
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.onstart = function () {
        };
        recognition.onerror = function (event) {
        };
        recognition.onend = function () {
            if (!voiceDone) {
                this.start();
            }
        };
        recognition.onresult = function (event) {
            var interim = "";
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    var result = event.results[i][0].transcript;
                    parseTranscript(result);
                } else {
                    interim += "(" + event.results[i][0].transcript + ")";
                }
            }
        };
    }
    recognition.start();
    voiceOn = true;
};

var voiceStop = function () {
    recognition.stop();
};

var playMusic = function () {
    audio = new Audio('happy-birthday.mp3');
    audio.volume = 0.4;
    audio.play();
    setTimeout(function () {
        audio.pause();
    }, 600000);
};

var correct = function () {
    playMusic();
    setTimeout(function () {
        document.getElementById('question').innerHTML = 'CORRECT';
        document.getElementById('answer').innerHTML = '';
        voiceDone = true;
        voiceStop();
        setTimeout(function () {
            document.getElementById('question').innerHTML = "HAPPY 22nd BIRTHDAY! <br>   I LOVE YOU!";
            document.getElementById('container').style.marginTop = "0vh";
            document.getElementById('body').style.backgroundImage = "url('fatass.jpg')";
        }, 1500);
    }, 1000);
};
var works = ["i'm satisfied", "i am satisfied", "unsatisfied", "ac rennes", "installation", "hamster fine", "hamster style", "salside", "mousse à la fraise", "adresse five", "aérosol cheval", "on se laisse faire", "on se serait", "installer smile", "OCS free", "hamster", "installer skype", "comme ça la soirée", "insérer sphère", "ACSI", "installation", "cérès farine", "enceinte ryght", "salut Fred", "hacer espagnol", "recette slide", "IMC", "i'm set aside", "en salade", "concert Espagne"];

var parseTranscript = function (transcript) {
    var input = transcript.toLowerCase();
    if (works.includes(input))
        correct();
    else
        document.getElementById('answer').innerHTML = transcript;
};


$(document).ready(function () {
    startVoice();
});
