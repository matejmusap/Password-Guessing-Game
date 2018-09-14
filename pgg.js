document.addEventListener('DOMContentLoaded', () => {
  const wordCount = 10;
  let guessCount = 4;
  let password = '';

  let start = document.getElementById('start');
  start.addEventListener('click', () => {
    toggleClasses(document.getElementById('start-screen'), 'hide', 'show');
    toggleClasses(document.getElementById('game-screen'), 'hide', 'show');
    startGame();
  });
  function toggleClasses(element, ...classes) {
    for(let cls of classes) {
    element.classList.toggle(cls);
    }
  }
  function startGame() {
    let wordList = document.getElementById('word-list');
    let randomWords = getRandomValues(words); // eslint-disable-line no-undef
    randomWords.forEach(word => {
      let li = document.createElement('li');
      li.innerText = word;
      wordList.appendChild(li);
    });
    [password] = getRandomValues(randomWords, 1);
    setGuessCount(guessCount);
    wordList.addEventListener('click', updateGame);
  }
  let getRandomValues = (array, numVals = wordCount) => shuffle(array).slice(0, numVals);
  function shuffle(array) {
  var arrayCopy = [...array];
    for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
      var idx2 = Math.floor(Math.random() * (idx1 + 1));
      [arrayCopy[idx1], arrayCopy[idx2]] = [arrayCopy[idx2], arrayCopy[idx1]];
    }
    return arrayCopy;
  }
  function setGuessCount(newCount) {
    guessCount = newCount;
    document.getElementById("guesses-remaining").innerText = `Guesses remaining: ${guessCount}.`;
  }
  function updateGame(e) {
    if (e.target.tagName === "LI" && !e.target.classList.contains("disabled")) {
      var guess = e.target.innerText;
      var similarityScore = compareWords(guess, password);
      e.target.classList.add("disabled");
      e.target.innerText = `${e.target.innerText} --> Matching Letters: ${similarityScore}`;
      setGuessCount(guessCount - 1);
      if (similarityScore === password.length) {
        toggleClasses(document.getElementById("winner"), 'hide', 'show');
        toggleClasses(document.getElementById("restart"), 'hide', 'show');
        this.removeEventListener('click', updateGame);
      } else if (guessCount === 0) {
        toggleClasses(document.getElementById("loser"), 'hide', 'show');
        toggleClasses(document.getElementById("restart"), 'hide', 'show');
        this.removeEventListener('click', updateGame);
      }
    }
  }
  function compareWords(word1, word2) {
    if (word1.length !== word2.length) throw "Words must have the same length";
    var count = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] === word2[i]) count++;
    }
    return count;
  }
});