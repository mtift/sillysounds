(function() {

  var keys = {
    65: {
      letter: "a",
      label: "a",
      wavFile: "a"
    },
    83: {
      letter: "s",
      label: "socks",
      wavFile: "socks"
    },
    68: {
      letter: "d",
      label: "Daddy",
      wavFile: "daddy"
    },
    69: {
      letter: "e",
      label: "Errrrr",
      wavFile: "err"
    },
    70: {
      letter: "f",
      label: "Fart",
      wavFile: "fart"
    },
    76: {
      letter:"l",
      label: "Laugh",
      wavFile: "laugh"
    },
    77: {
      letter:"m",
      label: "Ahem",
      wavFile: "ahem"
    },
    78: {
      letter: "n",
      label: "And",
      wavFile: "and"
    },
    80: {
      letter: "p",
      label: "Pee",
      wavFile: "pee"
    },
    66: {
      letter: "b",
      label: "Stinky",
      wavFile: "stinky"
    },
    81: {
      letter: "q",
      label: "Butt",
      wavFile: "butt"
    },
    79: {
      letter: "o",
      label: "Poop",
      wavFile: "poop"
    },
    73: {
      letter:"i",
      label: "Is",
      wavFile: "is"
    },
    84: {
      letter:"t",
      label: "Mommy",
      wavFile: "mommy"
    },
    72: {
      letter:"h",
      label: "Has",
      wavFile: "has"
    },
    88: {
      letter:"x",
      label: "So Silly",
      wavFile: "silly1"
    },
    89: {
      letter:"y",
      label: "Yeller",
      wavFile: "yeller"
    },
    67: {
      letter:"c",
      label: "Chicken",
      wavFile: "chicken"
    },
    87: {
      letter:"w",
      label: "Woohoo!",
      wavFile: "woohoo"
    },
    90: {
      letter:"z",
      label: "NO!",
      wavFile: "no"
    }
  };

  // Loop through the object and add drum html
  var drumsHTML = '';
  for (key in keys) {
    drumsHTML += '<div class="key key-' + keys[key]['letter'] + '">' +
        '<div class="key-letter">' + keys[key]['letter'] + '</div>' +
        '<label class="key-label">' + keys[key]['label'] + '</label>' +
        '</div>';
  }
  document.querySelector('.keys-wrapper').innerHTML = drumsHTML;

  // Sounds array to hold audio objects
  sounds = [];

  // Loop through again to create audio object and add click event listeners for each drum element
  for (key in keys) {
    var drumSelector = document.querySelector('.key-' + keys[key]['letter']);
    var drumSoundFile = 'sounds/' + keys[key]['wavFile'] + '.wav';
    var isAudioLoaded;

    // Create audio objects in sounds array
    soundKey = keys[key]['wavFile'];
    sounds[soundKey] = new Audio(drumSoundFile);
    sounds[soundKey].oncanplaythrough = isAudioLoaded; // Preload audio

    drumSelector.onclick = (function(drumSound, drumSelector) {
      return function() {
        playSound(drumSound, drumSelector);
      }
    })(sounds[soundKey], drumSelector);
  }

  // Handle keypress events
  document.onkeydown = function(e) {
    if (keys.hasOwnProperty(e.keyCode)) {
      var drumLetter = keys[e.keyCode]['letter'];
      var drumLabel = keys[e.keyCode]['label'];
      var wavFile = keys[e.keyCode]['wavFile'];
      var drumSound = sounds[wavFile];
      var drumSelector = document.querySelector('.key-' + drumLetter);
      playSound(drumSound, drumSelector);
    }

    keyLog = (typeof drumLetter !== 'undefined') ? drumLetter + ' ' + e.keyCode + ' ' + drumLabel : e.keyCode;
    console.log(keyLog);
  }

  // Play the sound and add CSS class to element
  function playSound(drumSound, drumSelector) {
    drumSound.currentTime = 0;
    drumSound.play();
    drumSelector.classList.add('js-active');

    window.setTimeout(function() {
      drumSelector.classList.remove('js-active');
    }, 100);
  }
})();
