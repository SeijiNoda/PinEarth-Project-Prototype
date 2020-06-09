<template>
  <main>
    <section class="home">
      <div class="home-content">
        <div class="slidershow middle">
          <div class="slides">
            <input type="radio" name="r" id="r1" checked />
            <input type="radio" name="r" id="r2" />
            <input type="radio" name="r" id="r3" />
            <input type="radio" name="r" id="r4" />
            <input type="radio" name="r" id="r5" />
            <div class="slide s1">
              <div class="title-location">New York</div>
              <p class="description-fill">Come explore the world with us</p>
              <div class="explore-container">
                <a href="#/map" class="explore-link">Explore</a>
              </div>
              <img src="../../assets/locations/ny.jpg" alt="New York" />
            </div>
            <div class="slide">
              <div class="title-location">Tokyo</div>
              <p class="description-fill">Come explore the world with us</p>
              <div class="explore-container">
                <a href="#/map" class="explore-link">Explore</a>
              </div>
              <img src="../../assets/locations/tk.jpg" alt="Tokyo" />
            </div>
            <div class="slide">
              <div class="title-location">São Paulo</div>
              <p class="description-fill">Come explore the world with us</p>
              <div class="explore-container">
                <a href="#/map" class="explore-link">Explore</a>
              </div>
              <img src="../../assets/locations/sp.jpg" alt="São Paulo" />
            </div>
          </div>

          <div class="navigation">
            <label for="r1" class="bar"></label>
            <label for="r2" class="bar"></label>
            <label for="r3" class="bar"></label>
          </div>
        </div>
      </div>
    </section>
    <section class="about">
      <div class="container-about about-inactive">
        <div class="info-about">
          <div class="bgimg-about">
            <img src="../../assets/map.svg" alt="map" />
          </div>
          <div class="body-about">
            <div class="ba-container">
              <div class="ba-title">PinEarth</div>
              <div class="ba-text">
                PinEarth is a web-map that can take you to many interesting
                places all around the globe, from New York to Amsterdan, from
                Mount Fuji to the Eifell Tower. It was built in 2020 by three
                high school students, using, in special, Vue.js for the
                front-end, and Asp.NET C# for the back-end, along side with
                many other things.
                <br />
                <br />What are you waiting for?
                <br />
                <button id="ba-link">Go explore</button>
              </div>
              <div class="ba-social">
                <i id="gitLink">
                  <font-awesome-icon :icon="['fab', 'github']" />
                </i>
                <i id="usersLink">
                  <font-awesome-icon icon="users" />
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  mounted: function() {
    let gitLink = document.querySelector("#gitLink");
    gitLink.onclick = () => {
      window.open(
        "https://github.com/SeijiNoda/Projeto_de_Pratica_Profissional_II"
      );
    };

    const btnAbout = document.getElementsByClassName("nav-item")[2];
    const aboutUs = document.querySelector("section.about");
    const containerAbout = aboutUs.getElementsByClassName("container-about")[0];

    //About Us button, makes it popup
    btnAbout.onclick = () => {
      containerAbout.classList.remove("about-inactive");
      aboutUs.style["pointer-events"] = "all";
    };

    //Everywhere makes it hidden
    containerAbout.onclick = () => {
      containerAbout.classList.add("about-inactive");
      aboutUs.style["pointer-events"] = "none";
    };

    //Go Explore button
    const btnGE = document.getElementById("ba-link");

    btnGE.onclick = () => {
      window.location = "#/map";
    };
  }
};
</script>
