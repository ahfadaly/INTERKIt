// start navbar ----------------------

let links = document.querySelectorAll(".header .language a ");
links.forEach((li) => {
  li.addEventListener(`click`, function (e) {
    document
      .querySelector(".header .language .active ")
      .classList.remove("active");
    li.classList.add("active");
  });
});

// End navbar ------------------------

// Count --------------------
let nums = document.querySelectorAll(".nums .num");
let section = document.querySelector(".three");
let started = false;

window.onscroll = function () {
  if (window.scrollY >= section.offsetTop) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};
function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}
// Count --------------------

// change background --------------------
$(`document`).ready(() => {
  $(window).on("scroll", function () {
    if (window.matchMedia("(max-width: 991px)").matches) {
      if ($(document).scrollTop() >= $("#one").position().top) {
        $(".header").css("background", $("#one").attr("data-color"));
      }
      if ($(document).scrollTop() > $("#two").position().top) {
        $(".header").css("background", $("#two").attr("data-color"));
      }
      if ($(document).scrollTop() > $("#shake").position().top) {
        $(".header").css("background", $("#shake").attr("data-color"));
      }
      if ($(document).scrollTop() > $("#lingvalien").position().top) {
        $(".header").css("background", $("#lingvalien").attr("data-color"));
      }
      if ($(document).scrollTop() > $("#bindap").position().top) {
        $(".header").css("background", $("#bindap").attr("data-color"));
      }
      if ($(document).scrollTop() > $("#govoroon").position().top) {
        $(".header").css("background", $("#govoroon").attr("data-color"));
      }
    } else {
      $(".header").css("background", "none");
    }
  });
});
// change background --------------------

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?# ?___";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 300);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  "International development company with mobile expertise from A to Z",
];

const el = document.querySelector(".text_demo");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 5000);
  });
  counter = (counter + 1) % phrases.length;
};

next();
