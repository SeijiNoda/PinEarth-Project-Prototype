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
                <button id="ba-link" @click="changeLocation('#/map')">Go explore</button>
              </div>
              <div class="ba-social">
                <i id="gitLink" @click="openLink('https://github.com/SeijiNoda/Projeto_de_Pratica_Profissional_II')">
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
        <div class="container-stars">
            <input class="input" type="radio" name="star" id="1" value="1">
            <input class="input" type="radio" name="star" id="2" value="2">
            <input class="input" type="radio" name="star" id="3" value="3">
            <input class="input" type="radio" name="star" id="4" value="4">
            <input class="input" type="radio" name="star" id="5" value="5">
            <label for="1" class="circle"><font-awesome-icon icon="star"></font-awesome-icon></label>
            <label for="2" class="circle"><font-awesome-icon icon="star"></font-awesome-icon></label>
            <label for="3" class="circle"><font-awesome-icon icon="star"></font-awesome-icon></label>
            <label for="4" class="circle"><font-awesome-icon icon="star"></font-awesome-icon></label>
            <label for="5" class="circle"><font-awesome-icon icon="star"></font-awesome-icon></label>
        </div>
        <div class="rtUs-submit">
          <div class="rtUs-btn">Send</div>
        </div>
      </div>
    </section>
    <!-- Thanks modal -->
    <section id="tks" class="thanks hideThanks">
        <div class="tks-body">
          <font-awesome-icon icon="check-circle"></font-awesome-icon>
          Thanks from the <i>PinEarth</i> team!
        </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      rating: 0
    };
  },
  methods: {
    openLink: function(link) {
      window.open(link);
    },
    changeLocation: function(url) {
      window.location = url;
    },
    postRating: function (rating) {
      this.$http.post("https://localhost:5001/avaliacao", rating)
      .then(response => { console.log('Rating posted') })
      .catch(err => { console.log(err.status) })
    }
  },
  mounted: function() {
    //About Us button, makes it popup
    const btnAbout = document.getElementsByClassName("nav-item")[2];
    const aboutUs = document.querySelector("section.about");
    const containerAbout = aboutUs.getElementsByClassName("container-about")[0];

    btnAbout.onclick = () => {
      containerAbout.classList.remove("about-inactive");
      aboutUs.style["pointer-events"] = "all";
    };

    //Everywhere makes it hidden
    //NOTE: decided for not using @click for better readablity of the code
    containerAbout.onclick = () => {
      containerAbout.classList.add("about-inactive");
      aboutUs.style["pointer-events"] = "none";
    };

    //RateUs' Script
    const rateUs = document.getElementById("rtUs");
    const svgIconRtUs = rateUs.querySelector('div.open-icon svg');
    const rtUsButton = rateUs.querySelector("div.rtUs-body div.rtUs-submit div.rtUs-btn");
    const rtUsTitle = rateUs.querySelector("div.rtUs-body div.rtUs-title")
    const tks = document.querySelector("section#tks");

    //Popup lateral modal
    rateUs.querySelector('div.open-icon').onclick = () => {
      rateUs.classList.toggle('hideRateUs');
      svgIconRtUs.classList.toggle('rotate180');
    };
   
    //Dealing with all Star cases
    const stars = document.getElementsByClassName('circle');
    stars[0].onclick = (e) => {
        if(stars[1].classList.contains('on')) {
            for(let i = 1; i < 5; i++)
                stars[i].classList.remove('on');
        } else if(stars[0].classList.contains('on')) {
            stars[0].classList.remove('on');
        } else {
            stars[0].classList.add('on');
        }
    };
    stars[1].onclick = (e) => {
        if(stars[2].classList.contains('on')) {
            for(let i = 2; i < 5; i++)
                stars[i].classList.remove('on');
        } else if(stars[1].classList.contains('on')) {
            stars[0].classList.remove('on');
            stars[1].classList.remove('on');
        } else {
            stars[0].classList.add('on');
            stars[1].classList.add('on');
        }
    };
    stars[2].onclick = (e) => {
        if(stars[3].classList.contains('on')) {
            for(let i = 3; i < 5; i++)
                stars[i].classList.remove('on');
        } else if(stars[2].classList.contains('on')) {
            stars[0].classList.remove('on');
            stars[1].classList.remove('on');
            stars[2].classList.remove('on');
        } else {
            stars[0].classList.add('on');
            stars[1].classList.add('on');
            stars[2].classList.add('on');
        }
    };
    stars[3].onclick = (e) => {
        if(stars[4].classList.contains('on')) {
            for(let i = 4; i < 5; i++)
                stars[i].classList.remove('on');
        } else if(stars[3].classList.contains('on')) {
            stars[0].classList.remove('on');
            stars[1].classList.remove('on');
            stars[2].classList.remove('on');
            stars[3].classList.remove('on');
        } else {
            stars[0].classList.add('on');
            stars[1].classList.add('on');
            stars[2].classList.add('on');
            stars[3].classList.add('on');
        }
    };
    stars[4].onclick = (e) => {
        if(stars[4].classList.contains('on')) {
            stars[0].classList.remove('on');
            stars[1].classList.remove('on');
            stars[2].classList.remove('on');
            stars[3].classList.remove('on');
            stars[4].classList.remove('on');
        } else {
            stars[0].classList.add('on');
            stars[1].classList.add('on');
            stars[2].classList.add('on');
            stars[3].classList.add('on');
            stars[4].classList.add('on');
        }
    };

    //Post user's rating
    rtUsButton.onclick = () => { 
      let rating;
      let radios = document.getElementsByName("star");

      if(stars[0].classList.contains('on')) {
        for(var i = 0; i < radios.length; i++) {
            if(radios[i].checked) {

              console.log(`Number of stars: ${radios[i].value}`)
              rating = {
                "nota": parseInt(radios[i].value)
              }

              break;
            }
        }
        this.postRating(rating);
      } 
      else {
        rating = {
          "nota": 0
        }
        this.postRating(rating);
      }

      rtUsTitle.innerHTML = "Average raiting at:";

      let summation = 0;
      let hmData = 0;
      var avg = 0;

      this.$http.get("https://localhost:5001/avaliacao").then(response => {
        for(let i = 0; i < response.body.length; i++) {
          summation += response.body[i].nota;
          hmData++;
        }

        avg = Math.floor(summation/hmData);
        rtUsButton.innerHTML = `${avg} stars (${response.body.length})`;

        for(let i = 0; i < avg; i++)
          stars[i].classList.add("on");

        for(let i = avg; i < 5; i++)
          stars[i].classList.remove("on");
      }).catch(err => {
        console.log(err.status);
      });

      tks.classList.remove("hideThanks");

      rtUsButton.onclick = false;
      rtUsButton.style.cursor = "default";
      rtUsButton.style.letterSpacing = "1px";

      for(let i = 0; i < stars.length; i++) {
        stars[i].onclick = false;
        stars[i].style.cursor = "default";
      }
    };  

    //Hide success notification  
    tks.onclick = () => {
      tks.classList.add("hideThanks");
    }
  }
};
</script>

<style lang="scss">
  @import '../../styles/rating';
</style>
