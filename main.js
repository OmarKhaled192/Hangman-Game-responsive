// getting data from ap 
async function getData() {
  const url = "api.json",
    response = await fetch(url);
  return await response.json();
}

// old code
// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let LettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
LettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // append the Letter to Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append span to the letters-container
  lettersContainer.appendChild(span);
});

// object of words + categories
const smallData = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "forten",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestigi",
    "Inception",
    "Parasite",
    "Intersteller",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qater",
    "Florida",
    "New York",
    "California",
  ],
};

async function renderPage() {
  const words = await getData() || smallData;

  // Get Random Keys
  let allKeys = Object.keys(words);

  // Random number depends on key length
  let randomPropNumber = Math.floor(Math.random() * allKeys.length);

  // Category
  let randomPropName = allKeys[randomPropNumber];

  // Category Words
  let randomPropValue = words[randomPropName];

  // getting random word from words
  let randWordNumber = Math.floor(Math.random() * randomPropValue.length);

  // the chosen word
  let randWordName = randomPropValue[randWordNumber];

  // print for test chosen Word 
  console.log(randWordName)
  // Set Category info
  document.querySelector(".game-info .category span").innerHTML =
    randomPropName;

  // Select Letters Guess Element
  let lettersGuessContainer = document.querySelector(".letters-guess");

  // Convert Chosen word to array
  let lettersAndSpaces = Array.from(randWordName);
  // console.log(lettersAndSpaces)

  // create span depends on words
  lettersAndSpaces.forEach((letter) => {
    // create empty Span
    let emptySpan = document.createElement("span");
    // if letters is space
    if (letter === " ") {
      // add class to the span
      emptySpan.className = "with-space";
    }
    // append span to letter Guess Container
    lettersGuessContainer.appendChild(emptySpan);
  });

  // Select Guesses Spans
  let guessSpans = document.querySelectorAll(".letters-guess span");

  // set Wrong Attempts
  let wrongAttempts = 0;

  // select the draw Element
  let theDraw = document.querySelector(".hangman-draw");

  // count letters
  let countLetters = 0;
  // Handle clicking on letters
  document.addEventListener("click", (e) => {
    // set the chosen status
    let theStatus = false;

    if (e.target.className === "letter-box") {
      e.target.classList.add("clicked");
      // Get the clicked letter
      let theClickedLetter = e.target.innerHTML.toLowerCase();
      // the chosen word
      let theChosenWord = Array.from(randWordName.toLowerCase());

      // console.log(lettersAndSpaces); // the chosen word
      theChosenWord.forEach((wordLetter, letterIndex) => {
        // the clicked letter is Equal to one of the chosen word letter
        if (theClickedLetter == wordLetter) {
          // convert the succuss state
          theStatus = true;
          // loop on all guess spans
          guessSpans.forEach((span, spanIndex) => {
            if (letterIndex == spanIndex) {
              span.innerHTML = theClickedLetter;
              countLetters++;
            }
          });
        }
      });
      console.log(theStatus);

      // if the letter is wrong
      if (theStatus !== true) {
        // increase the wrongAttempts
        wrongAttempts++;

        // Add Class Wrong on the draw Element
        theDraw.classList.add(`wrong-${wrongAttempts}`);

        // play fail sound
        document.getElementById("fail").play();

        if (wrongAttempts == 8) {
          endGameOver();
          lettersContainer.classList.add("finished");
        }
      } else {
        if (countLetters == randWordName.length) {
          endGameSuccess(wrongAttempts);
          lettersContainer.classList.add("finished");
        } else {
          document.getElementById("success").play();
        }
      }
    }
  });


  // >> create End Game with Fail Function
  function endGameOver() {
    // create a popup div
    let div = document.createElement("div");

    // create text
    let divText = document.createTextNode(
      `Game over, The ${randomPropName} is ${randWordName}`
    );

    // append text to div
    div.appendChild(divText);

    // Add Class on div
    div.classList.add("popup", "popup-fail");

    // append div to body
    document.body.appendChild(div);

    // append btn to div
    div.appendChild(createTryAgainBtn());

    // playing last fail sounnd
    document.getElementById("lastFail").play();
  }

  // >> create End Game with Success Function
  function endGameSuccess(wrongAttempts) {
    // create a popup div
    let div = document.createElement("div");

    // create text
    let divText = document.createTextNode(
      `You Win, Your level is ${SuccessLevel(wrongAttempts)}`
    );

    // append text to div
    div.appendChild(divText);

    // append btn to div
    div.appendChild(createTryAgainBtn());

    // Add Class on div
    div.classList.add("popup", "popup-success");

    // append div to body
    document.body.appendChild(div);

    // End game with success
    document.getElementById("lastSuccess").play();
  }

  // determining the success level
  function SuccessLevel(wrongAttempts) {
    if (wrongAttempts <= 2) return "Hero";
    else if (wrongAttempts <= 4) return "Strong";
    else if (wrongAttempts <= 6) return "Good";
    else return "Weak";
  }

  function createTryAgainBtn() {
    let Btn = document.createElement("button");

    Btn.appendChild(document.createTextNode("Try Again"));

    Btn.id = "again";

    //reload the page
    Btn.addEventListener("click", () => location.reload());

    return Btn;
  }
  function showCategoryValues() {
      let cat_values = words[randomPropName];
      console.log(cat_values);
      let Cat_Container = document.querySelector(".prop-values");
      cat_values.forEach(cat_value => {
      let myWord = document.createElement("div");
      myWord.className = "value";
      myWord.innerHTML = cat_value;
      Cat_Container.appendChild(myWord);
    })
  }
  function gameHint(){
    let hintBtn = document.getElementById("btnHint");
    let textHint = document.getElementById("textHint");
    hintBtn.addEventListener("click", () => {
      textHint.innerHTML = `the first char of ${randomPropName} is '${randWordName[0]}' `
      hintBtn.remove();
      setTimeout(() => {
        textHint.parentElement.remove();
      }, 5000);
    })

  }
  gameHint()
  showCategoryValues();
}
renderPage();