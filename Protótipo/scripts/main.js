const btnAbout = document.getElementsByClassName("nav-item")[2];
const aboutUs = document.querySelector("section.about");
const containerAbout = aboutUs.getElementsByClassName("container-about")[0];

//About Us button, makes it popup
btnAbout.onclick = () => {
  containerAbout.classList.add("about-active");
};

//Everywhere makes it hidden
containerAbout.onclick = () => {
  containerAbout.classList.remove("about-active");
};

//Go Explore button
const btnGE = document.getElementById("ba-link");

btnGE.onclick = () => {
  window.open("#");
};

//Github repository link
const gitLink = document.querySelector(
  "div.ba-container .ba-social .fa-github"
);

gitLink.onclick = () => {
  window.open(
    "https://github.com/SeijiNoda/Projeto_de_Pratica_Profissional_II"
  );
};

//disables window's scrolling
function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
    // if any scroll is attempted, set this to the previous value
    (window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    });
}
disableScroll();
