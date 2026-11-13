// Letters
const letters = "ابتثجحخدذرزسشصضطظعغفقكلمنهويةأإآؤئءة0123456789_";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories + Simple Hints (كلمات بسيطة مع تلميحات مباشرة)
const words = {
  برمجة: [
    { word: "جافاسكريبت", hint: "لغة الويب الشهيرة" },
    { word: "بايثون", hint: "لغة برمجة سهلة وقوية" },
    { word: "غو", hint: "لغة برمجة سريعة من تطوير جوجل" },
    { word: "سكالا", hint: "لغة تجمع بين البرمجة الكائنية والوظيفية" },
    { word: "فورتران", hint: "من أقدم لغات الحوسبة العلمية" },
    { word: "بايرون", hint: "اسم مرتبط بشهادات أو مكتبات برمجية" },
    { word: "مايسيكل", hint: "نظام إدارة قواعد بيانات شهير" },
  ],
  أفلام: [
    { word: "برستيج", hint: "فيلم عن التنافس بين ساحرين" },
    { word: "انسيشن", hint: "فيلم عن السرقة داخل الأحلام" },
    { word: "باراسيت", hint: "فيلم كوري فاز بالأوسكار (الطفيلي)" },
    { word: "انترستيلر", hint: "فيلم خيال علمي وفضاء شهير" },
    { word: "ويلاباش", hint: "فيلم دراما وموسيقى حول عازف طبول" },
    { word: "ميمينتو", hint: "فيلم عن شخص يعاني من فقدان الذاكرة قصيرة المدى" },
    { word: "كوكو", hint: "فيلم رسوم متحركة عن الموسيقى والموتى" },
    { word: "اب", hint: "فيلم ديزني عن منزل يطير بالبالونات" },
  ],
  أشخاص: [
    { word: "ألبرت أينشتاين", hint: "عالم فيزياء صاحب نظرية النسبية" },
    { word: "هيتشكوك", hint: "مخرج سينمائي شهير بلقب سيد الإثارة" },
    { word: "ألكسندر", hint: "قائد تاريخي عظيم (المقدوني)" },
    { word: "كليوباترا", hint: "ملكة مصرية تاريخية شهيرة" },
    { word: "مهاتما غاندي", hint: "زعيم هندي اشتهر بالمقاومة السلمية" },
  ],
  دول: [
    { word: "سوريا", hint: "دولة عربية عاصمتها دمشق" },
    { word: "فلسطين", hint: "دولة عربية عاصمتها القدس" },
    { word: "اليمن", hint: "دولة عربية تقع في جنوب شبه الجزيرة" },
    { word: "مصر", hint: "تقع في شمال شرق إفريقيا وعاصمتها القاهرة" },
    { word: "البحرين", hint: "دولة جزيرة عربية في الخليج" },
    { word: "قطر", hint: "دولة عربية خليجية استضافت كأس العالم" },
  ],
};

// Game Variables
let allKeys = Object.keys(words);
let randomPropName = allKeys[Math.floor(Math.random() * allKeys.length)];
let randomPropValue = words[randomPropName];

// اختيار كائن عشوائي يحتوي على الكلمة والتلميح
let randomWordObj =
  randomPropValue[Math.floor(Math.random() * randomPropValue.length)];
let randomValueValue = randomWordObj.word;
let randomWordHint = randomWordObj.hint;

// عرض القسم والتلميح في الواجهة
document.getElementById("category-name").innerHTML = randomPropName;
document.getElementById("hint-text").innerHTML = randomWordHint;

let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " " || letter === "ـ") {
    emptySpan.className = "with-space";
  }
  lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");
let wrongCountSpan = document.getElementById("wrong-count");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  let theStatus = false;

  if (e.target.className === "letter-box") {
    if (e.target.classList.contains("clicked")) return;

    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML;
    let theChosenWord = Array.from(randomValueValue);

    theChosenWord.forEach((wordLetter, WordIndex) => {
      if (theClickedLetter === wordLetter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // If Letter Is Wrong
    if (theStatus !== true) {
      wrongAttempts++;
      wrongCountSpan.innerHTML = wrongAttempts;
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      let failSound = document.getElementById("fail");
      if (failSound) failSound.play();

      if (wrongAttempts === 9) {
        endGame("خسرت! انتهت المحاولات", randomValueValue);
        lettersContainer.classList.add("finished");
      }
    } else {
      let successSound = document.getElementById("success");
      if (successSound) successSound.play();

      // Check if player won
      let currentWord = "";
      guessSpans.forEach((span) => {
        currentWord += span.innerHTML;
      });

      if (currentWord === randomValueValue) {
        endGame("مبروك! لقد فزت", randomValueValue);
        lettersContainer.classList.add("finished");
      }
    }
  }
});

// Hint Feature (زر مساعدة لكشف حرف)
document.getElementById("hint-btn").addEventListener("click", () => {
  let unrevealedIndexes = [];
  guessSpans.forEach((span, index) => {
    if (span.innerHTML === "" && !span.classList.contains("with-space")) {
      unrevealedIndexes.push(index);
    }
  });

  if (unrevealedIndexes.length > 0) {
    let randomIndex =
      unrevealedIndexes[Math.floor(Math.random() * unrevealedIndexes.length)];
    let correctLetter = randomValueValue[randomIndex];

    guessSpans[randomIndex].innerHTML = correctLetter;

    let letterBoxes = document.querySelectorAll(".letters .letter-box");
    letterBoxes.forEach((box) => {
      if (
        box.innerHTML === correctLetter &&
        !box.classList.contains("clicked")
      ) {
        box.classList.add("clicked");
      }
    });

    let currentWord = "";
    guessSpans.forEach((span) => {
      currentWord += span.innerHTML;
    });

    if (currentWord === randomValueValue) {
      endGame("مبروك! لقد فزت بفضل التلميح", randomValueValue);
      lettersContainer.classList.add("finished");
    }
  }
});

// End Game Function with Play Again Button
function endGame(statusText, word) {
  let div = document.createElement("div");
  div.className = "popup";

  let divText = document.createTextNode(`${statusText}، الكلمة هي: ${word}`);
  div.appendChild(divText);

  let restartButton = document.createElement("button");
  let buttonText = document.createTextNode("العب مرة أخرى");
  restartButton.appendChild(buttonText);

  restartButton.addEventListener("click", () => {
    window.location.reload();
  });

  div.appendChild(restartButton);
  document.body.appendChild(div);
}
