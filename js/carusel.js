// Based on Kevin Powells carusel tutorial
// https://youtu.be/gBzsE0oieio

// Grabing carusel and it's children
const carusel = document.getElementById("carusel-list");
const slides = Array.from(carusel.children);
// console.log(slides);

// Grabing left and right buttons
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

const leftSVGpath = document.getElementById("left-svgpath");
const rightSVGpath = document.getElementById("right-svgpath");
// console.log(rightButton);

// Grabing carusel navigator
const caruselNav = document.getElementById("carusel-nav");
const circles = Array.from(caruselNav.children);
// console.log(caruselNav);

// Grabing the width of the carusel
const caruselWidth = slides[0].getBoundingClientRect().width;
// console.log(caruselWidth);

// Set slider position
const setSlidePosition = (slide, index) => {
  slide.style.left = caruselWidth * index + "px";
};
slides.forEach(setSlidePosition);

//When I click left or right move slides ...
rightButton.addEventListener("click", (e) => {
  // Let's find out which slide is in front
  const currentSlide = carusel.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const previousSlide = currentSlide.previousElementSibling;
  //   console.log(nextSlide);

  if (nextSlide) {
    const amountToMove = nextSlide.style.left;

    currentSlide.style.transform = "translateX(-" + amountToMove + ")";
    nextSlide.style.transform = "translateX(-" + amountToMove + ")";

    currentSlide.classList.remove("current-slide");
    nextSlide.classList.add("current-slide");

    circle1.style.backgroundColor = "rgba(6, 43, 102,0.3)";
    circle2.style.backgroundColor = "rgba(6, 43, 102,0.7)";
  } else {
    const amountToMove = previousSlide.style.left;

    currentSlide.style.transform = "translateX(-" + amountToMove + ")";
    previousSlide.style.transform = "translateX(-" + amountToMove + ")";

    currentSlide.classList.remove("current-slide");
    previousSlide.classList.add("current-slide");

    circle1.style.backgroundColor = "rgba(6, 43, 102,0.7)";
    circle2.style.backgroundColor = "rgba(6, 43, 102,0.3)";
  }
});

leftButton.addEventListener("click", (e) => {
  // Let's find out which slide is in front
  const currentSlide = carusel.querySelector(".current-slide");
  const previousSlide = currentSlide.previousElementSibling;
  const nextSlide = currentSlide.nextElementSibling;

  // console.log(nextSlide);
  if (previousSlide) {
    // let's move the slide
    const amountToMove = previousSlide.style.left;
    //   console.log(amountToMove);

    currentSlide.style.transform = "translateX(-" + amountToMove + ")";
    previousSlide.style.transform = "translateX(-" + amountToMove + ")";

    currentSlide.classList.remove("current-slide");
    previousSlide.classList.add("current-slide");

    circle1.style.backgroundColor = "rgba(6, 43, 102,0.7)";
    circle2.style.backgroundColor = "rgba(6, 43, 102,0.3)";
  } else {
    const amountToMove = nextSlide.style.left;

    currentSlide.style.transform = "translateX(-" + amountToMove + ")";
    nextSlide.style.transform = "translateX(-" + amountToMove + ")";

    currentSlide.classList.remove("current-slide");
    nextSlide.classList.add("current-slide");

    circle1.style.backgroundColor = "rgba(6, 43, 102,0.3)";
    circle2.style.backgroundColor = "rgba(6, 43, 102,0.7)";
  }
});

//When I click nav indicators move to a specific clide

caruselNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("a");

  if (!targetDot) return;
  //   console.log(targetDot);

  const currentSlide = carusel.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const previousSlide = currentSlide.previousElementSibling;

  const currentDot = caruselNav.querySelector(".current-slide");
  const targetIndex = circles.findIndex((circle) => circle === targetDot);
  const targetSlide = slides[targetIndex];
  const circle1 = document.getElementById("circle1");
  const circle2 = document.getElementById("circle2");

  if (targetSlide !== currentSlide && targetIndex == 1) {
    if (!previousSlide) {
      // let's move the slide
      const amountToMove = nextSlide.style.left;
      //   console.log(amountToMove);

      currentSlide.style.transform = "translateX(-" + amountToMove + ")";
      nextSlide.style.transform = "translateX(-" + amountToMove + ")";

      currentSlide.classList.remove("current-slide");
      nextSlide.classList.add("current-slide");

      circle1.style.backgroundColor = "rgba(6, 43, 102,0.3)";
      circle2.style.backgroundColor = "rgba(6, 43, 102,0.7)";
    }
  }

  if (targetSlide !== currentSlide && targetIndex == 0) {
    if (!nextSlide) {
      // let's move the slide
      const amountToMove = previousSlide.style.left;
      //   console.log(amountToMove);

      currentSlide.style.transform = "translateX(+" + amountToMove + ")";
      previousSlide.style.transform = "translateX(+" + amountToMove + ")";

      currentSlide.classList.remove("current-slide");
      previousSlide.classList.add("current-slide");

      circle1.style.backgroundColor = "rgba(6, 43, 102,0.7)";
      circle2.style.backgroundColor = "rgba(6, 43, 102,0.3)";
    }
  }
});
