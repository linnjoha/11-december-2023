//blanda kort
//jämföra kort
//- if på klick1 och klick2 !är data-card===data-card
//else gå vidare på nästa
// if alla cardel === flip = win. overlay =display
//X= location reload

const cardEl = document.querySelectorAll(".memory-card");
const cardElArray = Array.from(cardEl);
let [click1, click2] = [null, null];
//mixa korten
const mixCards = () => {
  for (let i = cardElArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = cardElArray[i];
    cardElArray[i] = cardElArray[j];
    cardElArray[j] = temp;
  }
  const memoryCards = document.querySelector(".memory-cards");
  for (let i = 0; i < cardElArray.length; i++) {
    memoryCards.appendChild(cardElArray[i]);
  }
};
mixCards();
cardEl.forEach((card) => {
  card.addEventListener("click", () => {
    compareCards(card);
  });
});
const compareCards = (card: Element) => {
  console.log(card);
  // currentData. datan på korten som ska jämföras
  let currentData: string = card.getAttribute("data-card");
  //booleans-variabler för jämförelse
  const noClickIsSet: Boolean = !click1 && !click2;
  const hasClick1ButNot2: Boolean = click1 && !click2;
  const cardIsSame: Boolean = card === click1?.card;

  //sätter click1
  if (noClickIsSet) {
    card.classList.add("flip");
    click1 = { data: currentData, card: card };
  }
  //sätter click2 ifall card inte är samma för att undvika dubbelklick
  else if (hasClick1ButNot2 && !cardIsSame) {
    card.classList.add("flip");
    click2 = { data: currentData, card: card };
  }

  const hasBothClickedCards: Boolean = click1 && click2;
  if (hasBothClickedCards) {
    const isNoMatch: Boolean = click1.data !== click2.data;
    if (isNoMatch) {
      [click1.card, click2.card].forEach((f) => {
        setTimeout(() => {
          f.classList.remove("flip");
        }, 2000);
      });
    }
    //nollställer variablerna för att kunna använda dom och jämföra igen.
    [click1, click2] = [null, null];
  }

  const allCardHasFlip = cardElArray.every((card) =>
    card.classList.contains("flip")
  );
  if (allCardHasFlip) {
    winTheGame();
  }
};

//add .show overlay om alla korten has .flip
const winTheGame = () => {
  const overlay = document.querySelector(".overlay");
  overlay.classList.add("show");
  const exitEl = document.querySelector(".close");
  exitEl.addEventListener("click", () => location.reload());
};
