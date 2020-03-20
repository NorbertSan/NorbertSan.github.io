const navigationAppear = () => {
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".navLinks");
  const doubleArrows = document.querySelector(".aboutSection__doubleArrows");

  let lastScrollPosition = 0;
  document.addEventListener("scroll", e => {
    const currentPosition = window.pageYOffset;
    if (currentPosition < header.getBoundingClientRect().height + 100) {
      lastScrollPosition = currentPosition;
      header.classList.remove("hidden");
      header.classList.remove("active");
      return;
    }
    if (currentPosition > lastScrollPosition) {
      // scroll down
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      header.classList.remove("active");
      header.classList.add("hidden");
    } else {
      // scroll up
      header.classList.remove("hidden");
      header.classList.add("active");
    }
    lastScrollPosition = currentPosition;
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });
  doubleArrows.addEventListener(
    "click",
    () => (doubleArrows.style.display = "none")
  );
  navLinks.querySelectorAll(".navLinks__item").forEach(link =>
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    })
  );
};
const slider = () => {
  const leftArrow = document.querySelector(".projectsSection__leftArrow");
  const rightArrow = document.querySelector(".projectsSection__rightArrow");
  const slider = document.querySelector(".projectsSection__frame__slider");
  let sliderWidth = slider.getBoundingClientRect().width;
  const dots = document.querySelectorAll(".projectsSection__dots__singleDot");
  const images = slider.querySelectorAll("img");
  const liveLink = document.querySelector(".liveLink");
  const codeLink = document.querySelector(".codeLink");
  const buttons = document.querySelectorAll(
    ".projectsSection__frame__projectInfo__buttons"
  );
  const name = document.querySelector(
    ".projectsSection__frame__projectInfo__name"
  );
  const description = document.querySelector(
    ".projectsSection__frame__projectInfo__description"
  );
  const projectsInfo = [
    {
      name: "Tetris",
      description: "Popularna gra tetris napisana w React",
      liveLink: "https://affectionate-babbage-0e6846.netlify.com/",
      codeLink: "https://github.com/NorbertSan/tetris-game"
    },

    {
      name: "Chess",
      description:
        "W pełni skończona gra w szachy napisana w React, gra zawiera wszystkie możliwe ruchy. Projekt nauczył mnie sprawnego zarządzania stanami aplikacji, w trakcie implementacji napotkałem dużo problemów związanych z samą logiką gry.",
      liveLink: "https://eloquent-hugle-d6a9b6.netlify.com",
      codeLink: "https://github.com/NorbertSan/chess"
    },
    {
      name: "Snake",
      description:
        "Prosta gra 'snake'.Pierwszy samodzielny projekt w React. Projekt nauczył mnie podstawowych założeń tego frameworku, zagadnień związanych z komponentami i stanami aplikacji.",
      liveLink: "https://adoring-chandrasekhar-9707c3.netlify.com",
      codeLink: "https://github.com/NorbertSan/snakeReact"
    },
    {
      name: "Hamburger landing page",
      description:
        "Prosta statyczna responsywna strona główna. Jedna z moich pierwszych stron z użyciem media queries.Projekt nauczył mnie praktycznego stosowania media queries,budowania layoutu.Wykorzystane technologie JS / SCSS / HTML",
      liveLink: "https://wizardly-lumiere-8a0dcf.netlify.com",
      codeLink: "https://github.com/NorbertSan/Burger-Company-Page"
    }
  ];
  let index = 1;
  const amountOfImages = images.length;

  const init = () => {
    slider.style.transform = `translateX(-${sliderWidth * index}px)`;
    dots[1].classList.add("active");
    name.textContent = projectsInfo[1].name;
    description.textContent = projectsInfo[1].description;
    // codeLink;
    leftArrow.addEventListener("click", slideLeft);
    rightArrow.addEventListener("click", slideRight);

    document.body.addEventListener("keyup", e => {
      e.keyCode === 37 && slideLeft();
      e.keyCode === 39 && slideRight();
    });

    let lastPosition;
    let currentPosition;
    slider.addEventListener("touchstart", e => {
      lastPosition = e.touches[0].clientX;
    });
    slider.addEventListener("touchend", e => {
      currentPosition = e.changedTouches[0].clientX;
      if (Math.abs(currentPosition - lastPosition) < 25) return;
      if (currentPosition > lastPosition) {
        slideLeft();
      } else if (currentPosition < lastPosition) {
        slideRight();
      }
    });
  };
  const disableClick = () => {
    leftArrow.style.pointerEvents = "none";
    rightArrow.style.pointerEvents = "none";
    setTimeout(() => {
      leftArrow.style.pointerEvents = "all";
      rightArrow.style.pointerEvents = "all";
      document.body.style.pointerEvents = "all";
    }, 600);
  };
  const setActiveDot = () => {
    dots.forEach(dot => {
      dot.classList.remove("active");
    });
    dots[index % dots.length].classList.add("active");
  };
  const changeProjectInfo = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.to([name, description, ...buttons], {
      duration: 0.3,
      y: "20",
      opacity: 0
    })
      .set(name, { textContent: projectsInfo[index % dots.length].name })
      .set(description, {
        textContent: projectsInfo[index % dots.length].description
      })
      .set(codeLink, {
        href: projectsInfo[index % dots.length].codeLink
      })
      .set(liveLink, {
        href: projectsInfo[index % dots.length].liveLink
      })
      .to([name, description, ...buttons], {
        duration: 0.3,
        y: "0",
        opacity: 1
      });

    // name.textContent = projectsInfo[index % dots.length].name;
    // description.textContent = projectsInfo[index % dots.length].description;
  };
  const slideLeft = () => {
    disableClick();
    setTimeout(() => (sliderWidth = slider.getBoundingClientRect().width), 0);
    slider.style.transition = "transform 0.4s ease-in-out";
    index--;
    slider.style.transform = `translateX(-${sliderWidth * index}px)`;
  };
  const slideRight = () => {
    disableClick();
    setTimeout(() => (sliderWidth = slider.getBoundingClientRect().width), 0);
    slider.style.transition = "transform 0.4s ease-in-out";
    index++;
    slider.style.transform = `translateX(-${sliderWidth * index}px)`;
  };
  slider.addEventListener("transitionend", () => {
    setTimeout(() => (sliderWidth = slider.getBoundingClientRect().width), 0);
    // prevent multiclick keyboard arrows
    if (index > amountOfImages - 1) index = 0;
    if (index < 0) index = amountOfImages - 1;

    if (images[index].id === "lastClone") {
      slider.style.transition = "none";
      index = 1;
      slider.style.transform = `translateX(-${sliderWidth * index}px)`;
    }
    if (images[index].id === "firstClone") {
      slider.style.transition = "none";
      index = amountOfImages - 2;
      slider.style.transform = `translateX(-${sliderWidth * index}px)`;
    }
    setActiveDot();
    changeProjectInfo();
  });
  dots.forEach((dot, dotIndex) =>
    dot.addEventListener("click", () => {
      if (dot.classList.contains("active")) return;
      if (dotIndex > index) {
        for (let i = 0; i <= Math.abs(dotIndex - index); i++) {
          slideRight();
        }
      } else {
        for (let i = 0; i <= Math.abs(dotIndex - index); i++) {
          slideLeft();
        }
      }
    })
  );
  window.addEventListener("resize", () => {
    sliderWidth = slider.getBoundingClientRect().width;
    slider.style.transform = `translateX(-${sliderWidth * index}px)`;
  });

  init();
};
const colorMode = () => {
  const button = document.querySelector(".colorMode");
  const image = button.querySelector("img");
  button.addEventListener("click", () => {
    document.body.classList.toggle("darkMode");
    if (document.body.classList.contains("darkMode"))
      image.src = "./../assets/icons/moon.svg";
    else image.src = "./../assets/icons/sun.svg";
  });
};
const svgScene = () => {
  const scene = document.querySelector(".aboutSection__svgScene");
  const floor = document.querySelector("#floor");
  const stairsAndMan = document.querySelector("#stairsAndMan");
  const tree = document.querySelector("#tree");
  const tree2 = document.querySelector("#tree2");
  const trees = [tree, tree2];

  const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
  tl.set([scene, floor, ...trees, stairsAndMan], { autoAlpha: 0, y: 40 })
    .to(scene, { duration: 1.5, autoAlpha: 1, y: 0 }, "+=1")
    .to(floor, {
      duration: 1,
      y: 0,
      autoAlpha: 1
    })
    .to([trees], { duration: 3, autoAlpha: 1, y: 0 })
    .to(stairsAndMan, { duration: 2, autoAlpha: 1, y: 0 }, "-=2");
};
const autoColorMode = () => {
  const image = document.querySelector(".colorMode img");
  const hours = new Date().getHours();
  if (hours >= 21 || hours <= 6) {
    // dark mode
    document.body.classList.add("darkMode");
    image.src = "./../assets/icons/moon.svg";
  }
};

const init = () => {
  navigationAppear();
  slider();
  colorMode();
  svgScene();
  autoColorMode();
};

init();
