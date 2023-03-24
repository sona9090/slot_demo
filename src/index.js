import "./styles.css";

// fixing the last stage
// argument - the prev. animation last frame obj. ({transform: translateY(value)})
const fixAtDestination = (lastAnimFrame) => {
  Object.keys(lastAnimFrame).forEach((propty, index) => {
    slot.style[propty] = Object.values(lastAnimFrame)[index];
  });
};

const animateSlots = ([step1, step2], duration, timeout, condition = null) => {
  if (condition !== null) {
    if (!condition) {
      return;
    }
  }

  setTimeout(() => {
    slot.animate([step1, step2], {
      duration: duration,
      iterations: 1
    });

    fixAtDestination(step2);
  }, timeout);
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

// creating the slots content
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

// the first animation configuration -
// moving from the first slot to the last one
let destinationFrame1 = { transform: `translateY(${0 - max * 100}%)` };
let animationFrames = [{ transform: `translateY(0)` }, destinationFrame1];
let animationTiming = { duration: 1000, iterations: 1 };

spinBtn.addEventListener("click", () => {
  slot.style.transition = "all 1.5s ease-in";
  // the color cover disappears
  spinBtn.parentNode.style.opacity = "0";

  // step 1 - going to the last slot
  slot.animate(animationFrames, animationTiming);
  fixAtDestination(destinationFrame1);

  // giving an index of the random chosen slot
  let finalSlotNum = Math.floor(Math.random() * max);
  let standardTime = 100 * finalSlotNum;

  // cos the animation steps differ for the first and the last slots
  let notFirstSlot = finalSlotNum > 1;
  let notLastSlot = max - finalSlotNum - 1 > 1;

  let destinSlotPos = finalSlotNum * 100;

  let animStepDown = {
    transform: `translateY(${-50 - destinSlotPos}%)`
  };
  let animStepUp = { transform: `translateY(${50 - destinSlotPos}%)` };
  let lastAnimFrame = { transform: `translateY(${0 - destinSlotPos}%)` };

  let thirdDuration = notFirstSlot ? 300 : 0;
  let thirdTimeout = 1000 + (notLastSlot ? standardTime : 0);
  let fourthTimeout = thirdTimeout + thirdDuration;

  // animation steps data to use in animateSlots func.
  // args: [animation steps: {transform: 'translateY(value)'}],
  // duration: number, timeout: number, condition(if exists): boolean
  let dataStep2 = [
    [destinationFrame1, animStepDown],
    standardTime,
    1000,
    notLastSlot
  ];
  let dataStep3 = [
    [animStepDown, animStepUp],
    thirdDuration,
    thirdTimeout,
    notFirstSlot
  ];
  let dataStep4 = [[animStepUp, lastAnimFrame], 700, fourthTimeout];

  // step 2 - going Down, if these are not the last two slots
  animateSlots(...dataStep2);

  // step 3 - going Up, if these are not the first two slots
  animateSlots(...dataStep3);

  // step 4 - going to the destionation slot
  animateSlots(...dataStep4);

  // going to the chosen slot link in 5 seconds
  setTimeout(() => {
    document.querySelectorAll(".slot")[finalSlotNum].querySelector("a").click();
  }, 5700 + fourthTimeout);
});
