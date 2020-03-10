const navigationAppear = () => {
  const header = document.querySelector("header");
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
      header.classList.remove("active");
      header.classList.add("hidden");
    } else {
      // scroll up
      header.classList.remove("hidden");
      header.classList.add("active");
    }
    lastScrollPosition = currentPosition;
  });
};
const slider = () => {
  const leftArrow = document.querySelector(".projectsSection__leftArrow");
  const rightArrow = document.querySelector(".projectsSection__rightArrow");
  const slider = document.querySelector(".projectsSection__frame__slider");
  let sliderWidth = slider.getBoundingClientRect().width;
  const dots = document.querySelectorAll(".projectsSection__dots__singleDot");
  const images = slider.querySelectorAll("img");
  const name = document.querySelector(
    ".projectsSection__frame__projectInfo__name"
  );
  const description = document.querySelector(
    ".projectsSection__frame__projectInfo__description"
  );
  const projectsInfo = [
    {
      name: "Chess",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit corrupti consectetur ipsam praesentium Nobis reprehenderit, modi quas rem facilis vitae adipisci aliquid quo nemo?"
    },
    {
      name: "Hamburger landing page",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit corrupti consectetur ipsam praesentium Nobis reprehenderit, modi quas rem facilis vitae sit amet consectetur adipisicing elit. Dolor odit corrupti consectetur ipsam praesentium Nobis"
    },
    {
      name: "Snake",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit corrupti consectetur ipsam praesentium Nobis reprehenderit Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit corrupti consectetur ipsam praesentium Nobis reprehenderit"
    }
  ];
  let index = 1;
  const amountOfImages = images.length;

  const init = () => {
    slider.style.transform = `translateX(-${sliderWidth * index}px)`;
    dots[1].classList.add("active");
    name.textContent = projectsInfo[1].name;
    description.textContent = projectsInfo[1].description;
  };
  init();

  const disableClick = () => {
    leftArrow.style.pointerEvents = "none";
    rightArrow.style.pointerEvents = "none";
    setTimeout(() => {
      leftArrow.style.pointerEvents = "all";
      rightArrow.style.pointerEvents = "all";
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
    tl.to([name, description], { duration: 0.3, y: "30", opacity: 0 })
      .set(name, { textContent: projectsInfo[index % dots.length].name })
      .set(description, {
        textContent: projectsInfo[index % dots.length].description
      })
      .to([name, description], { duration: 0.3, y: "0", opacity: 1 });

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
  leftArrow.addEventListener("click", slideLeft);
  rightArrow.addEventListener("click", slideRight);
};

const init = () => {
  navigationAppear();
  slider();
};

init();
