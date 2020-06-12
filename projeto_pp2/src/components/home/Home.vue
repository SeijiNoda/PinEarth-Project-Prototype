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
    containerAbout.onclick = () => {
      containerAbout.classList.add("about-inactive");
      aboutUs.style["pointer-events"] = "none";
    };

    //RateUs' JavaScript
    const rateUs = document.getElementById("rtUs");
    const svgIconRtUs = rateUs.querySelector('div.open-icon svg');
    const rtUsButton = rateUs.querySelector("div.rtUs-body div.rtUs-submit div.rtUs-btn");
    const rtUsTitle = rateUs.querySelector("div.rtUs-body div.rtUs-title")
    const tks = document.querySelector("section#tks");

    document.querySelector('section#rtUs div.open-icon').onclick = () => {
      rateUs.classList.toggle('hideRateUs');
      svgIconRtUs.classList.toggle('rotate180');
    };
    
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

    rtUsButton.onclick = () => {
      let rating = {
        "nota": this.rating
      };
      
      let radios = document.getElementsByName("star");
        if(stars[0].classList.contains('on')) {
            for(var i = 0; i < radios.length; i++) {
                if(radios[i].checked) {
                    console.log(`Number of stars: ${radios[i].value}`)
                    break;
                }
            }
        } else {
            console.log("Stars not selected");
        }

      //this.$http.post("https://localhost:5001/avaliacao", rating)
      //.then(response => {
      //})
      //.catch(err => {
      //console.log(err.status);
      //})

      tks.classList.remove("hideThanks");
    };  

    tks.onclick = () => {
      tks.classList.add("hideThanks");
    }
  }
};
</script>

<style lang="scss">

//Actual 'Thanks' SCCS
  .thanks {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 20vw;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 20px;
    color: white;
    background: #3dc661;
    text-align: center;
    padding: 10px;
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    transition: 1.5s;

    &:hover {
      background: #3dc661a2;
    }

    .tks-body {
      display: inline-block;
      vertical-align: middle;
      line-height: 5.5vh;

      font-family: 'Roboto', 'HelveticaNeue', Arial, sans-serif;
    }
  }

//Actual 'RateUs' SCSS
  .rateUs {
    position: absolute;
    top: 80%;
    left: 90%;
    transform: translate(-50%, -50%);

    width: 20vw;
    height: 20vh;
    padding: 5px;
    background: white;
    border-radius: 10px 0px 0px 10px;
    user-select: none;
    transition: 0.8s;

    display: flex;
    
  
    .open-icon {
      flex: 1;

      display: inline-block;
      vertical-align: middle;
      line-height: 19vh;

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

      .container-stars {
        flex: 1;

        display: flex;
        flex-direction: row;

        height: 2.3vw;

        .circle {
          flex: 1;
          margin: 1px;
          width: 2.3vw;
          height: 2.3vw;
          cursor: pointer;
          transition: 0.25s;
          line-height: 2.3vw;
          text-align: center;
          font-size: 2.3vw;
          display: inline-block;
          vertical-align: middle;
          color: rgb(202, 199, 199);
        }

        //Activate star
        .on {
          color: rgb(255, 255, 50);
        }
        
        //Hide radio buttons
        .input {
            display: none;
        }
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
          text-transform: uppercase;
          text-align: center;
          background: #618685;
          cursor: pointer;
          transition: 0.3s;

          &:hover {
            letter-spacing: 2px;
          }
        }
      }
    }
  }
  
//Hiding classes
  .rotate180 {
    transform: rotate(180deg);
  }

  .hideRateUs {
    left: 108.5%;
  }

  .rtUs-item {
    flex: 1;
  }

  .hideThanks {
    top: -0%;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }
</style>
