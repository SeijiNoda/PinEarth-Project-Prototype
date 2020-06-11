<template>
  <main>
    <!-- Home carrousel -->
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
    <!-- About Us modal -->
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Rate Us modal -->
    <section id="rtUs" class="rateUs hideRateUs">
      <div class="open-icon">
        <font-awesome-icon icon="chevron-left"></font-awesome-icon>
      </div>
      <div class="rtUs-body">
        <div class="rtUs-title">
          Rate us!
        </div>
        <div class="rtUs-stars">
          <star-rating v-model="rating" :show-rating="false" @rating-selected="createRating"></star-rating>
        </div>
        <div class="rtUs-submit">
          <div class="rtUs-btn">Send</div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  components: {
    'star-rating': StarRating
  },
  data() {
    return {
      rating: 0
    };
  },
  mounted: function() {
    //Setting GitHub link
    const gitLink = document.querySelector("#gitLink");

    gitLink.onclick = () => {
      window.open(
        "https://github.com/SeijiNoda/Projeto_de_Pratica_Profissional_II"
      );
    };

    //About Us button, makes it popup
    const btnAbout = document.getElementsByClassName("nav-item")[2];
    const aboutUs = document.querySelector("section.about");
    const containerAbout = aboutUs.getElementsByClassName("container-about")[0];

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

    //RateUs' JavaScript
    const rateUs = document.getElementById("rtUs");
    const svgIcon = document.querySelector('section#rtUs div.open-icon svg');

    document.querySelector('section#rtUs div.open-icon').onclick = () => {
      rateUs.classList.toggle('hideRateUs');
      svgIcon.classList.toggle('rotate180');
    };
  },
  methods: {
    createRating() {
      let rating = {
        "nota": this.rating
      };

      // this.$http.post("https://localhost:5001/avaliacao", rating)
      // .then(response => {
      //   alert("INSERIU!");
      // })
      // .catch(err => {
      //   console.log(err.status);
      // })
    }
  }
};
</script>

<style lang="scss">
//Actual RateUs SCSS
  .rateUs {
    //Positioning
    position: absolute;
    top: 80%;
    left: 90%;
    transform: translate(-50%, -50%);

    //Normal
    width: 20vw;
    height: 20vh;
    padding: 5px;
    background: white;
    border-radius: 10px 0px 0px 10px;
    user-select: none;
    transition: 0.8s;

    //Display
    display: flex;
    
  
    .open-icon {
      //Parent's flex
      flex: 1;

      //Align vertically
      display: inline-block;
      vertical-align: middle;
      line-height: 19vh;

      //Normal
      height: 100%;
      font-size: 2vh;
      color: grey;
      border-right: 2px solid rgb(180, 180, 180);
      cursor: pointer;

      //Rotate SVG icon
      svg {
        transition: 0.3s;
      }
    }

    .rtUs-body {
      flex: 15;
      display: flex;
      flex-direction: column;

      .rtUs-title {
        flex: 1;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        color: black;
        text-align: center;
        font-size: 1.5em;
      }

      .rtUs-stars {
        flex: 1;
        text-align: center;
      }

      .rtUs-submit {
        flex: 1;

        .rtUs-btn {
          color: white;
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
          border: none;
          border-radius: 5px;
          padding: 5px;
          width: 50%;
          font-weight: bold;
          margin: auto;
          text-align: center;
          background: green;
          text-transform: uppercase;
          cursor: pointer;
          transition: 0.3s;

          &:hover {
            letter-spacing: 2px;
          }
        }
      }
    }
  }
  
//Postiioning classes
  .rotate180 {
    transform: rotate(180deg);
  }

  .hideRateUs {
    left: 108.5%;
  }

  .rtUs-item {
    flex: 1;
  }
</style>
