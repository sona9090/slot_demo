import "./styles.css";

const fixAtDestination = (lastAnimFrame) => {
  Object.keys(lastAnimFrame).forEach((propty, index) => {
    slot.style[propty] = Object.values(lastAnimFrame)[index];
  });
};

let slot = document.getElementById("slot");

let urls = [
  "https://thecatsite.com/c/how-do-cats-choose-who-to-sleep-with/",
  "https://thecatsite.com/forums/cat-behavior.5/",
  "https://thecatsite.com/forums/grooming-general-cat-care.6/",
  "https://thecatsite.com/forums/describing-cats-what-does-my-cat-look-like.5809/",
  "https://thecatsite.com/threads/what-breed-is-he-possibly-bengal-or-egyptian-mau.454167/",
  "https://thecatsite.com/c/how-do-cats-choose-who-to-sleep-with/",
  "https://thecatsite.com/forums/cat-behavior.5/",
  "https://thecatsite.com/forums/grooming-general-cat-care.6/",
  "https://thecatsite.com/forums/describing-cats-what-does-my-cat-look-like.5809/",
  "https://thecatsite.com/threads/what-breed-is-he-possibly-bengal-or-egyptian-mau.454167/"
];

const max = urls.length - 1;

let slotCover = `<div class="slot_cover">
  <div id="spin-btn">SPIN</div>
</div>`;

let content =
  slotCover +
  urls
    .map((item, key) => {
      return `
    <div class="slot">
      <a href=${item} title=${item} target="_blank">
        <img src="slider/${key + 1}.jpg" />
        <span class="slot-btn">${key + 1}</span>
      </a>
    </div>
  `;
    })
    .join("\n");

slot.innerHTML = content;

const spinBtn = document.getElementById("spin-btn");

// animation configuration
let destinationFrame1 = { transform: `translateY(-${max * 100}%)` };
let animationFrames = [{ transform: `translateY(0)` }, destinationFrame1];

let animationTiming = { duration: 1000, iterations: 1 };

spinBtn.addEventListener("click", () => {
  slot.style.transition = "all 1.5s ease-in";
  spinBtn.parentNode.style.opacity = "0";

  // step 1 - going to the last slot
  slot.animate(animationFrames, animationTiming);
  fixAtDestination(destinationFrame1);

  let finalSlotNum = Math.floor(Math.random() * max);
  let standardTime = 100 * finalSlotNum;

  let notFirstSlot = finalSlotNum > 1;
  let notLastSlot = max - finalSlotNum - 1 > 1;

  let animStepDown = {
    transform: `translateY(${0 - finalSlotNum * 100 + 50}%)`
  };
  let animStepUp = { transform: `translateY(${0 - finalSlotNum * 100 - 50}%)` };
  let lastAnimFrame = { transform: `translateY(${0 - finalSlotNum * 100}%)` };

  let thirdDuration = notFirstSlot ? 300 : 0;
  let thirdTimeout = 1000 + (notLastSlot ? standardTime : 0);
  let fourthTimeout = thirdTimeout + thirdDuration;

  // step 2 - going Down, if these are not the last two slots
  if (notLastSlot) {
    setTimeout(() => {
      slot.animate([destinationFrame1, animStepDown], {
        duration: standardTime,
        iterations: 1
      });
      fixAtDestination(animStepDown);
    }, 1000);
  }

  // step 3 - going Up, if these are not the first two slots
  if (notFirstSlot) {
    setTimeout(() => {
      slot.animate([animStepDown, animStepUp], {
        duration: thirdDuration,
        iterations: 1
      });
      fixAtDestination(animStepUp);
    }, thirdTimeout);
  }

  // step 4 - going to the destionation slot
  setTimeout(() => {
    slot.animate([animStepUp, lastAnimFrame], {
      duration: 700,
      iterations: 1
    });

    fixAtDestination(lastAnimFrame);
  }, fourthTimeout);

  setTimeout(() => {
    document.querySelectorAll(".slot")[finalSlotNum].querySelector("a").click();
  }, 5700 + fourthTimeout);
});
