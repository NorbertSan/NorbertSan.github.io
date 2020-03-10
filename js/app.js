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
const toggleColorMode = () => {};

const init = () => {
  navigationAppear();
};

init();
