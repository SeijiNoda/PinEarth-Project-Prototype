<template>
  <main>
    <div class="mapa">
      <div id="mapid"></div>
    </div>
    <div id="information" class="visibility">
      <div class="panel top80">
        <font-awesome-icon icon="times" id="exit-panel"></font-awesome-icon>
        <div class="text-cont item-panel">
          <div class="item-title"></div>
          <div class="item-body"></div>
          <a id="item-wikipedia"><font-awesome-icon :icon="['fab', 'wikipedia-w']"></font-awesome-icon></a>
        </div>
        <div class="image-cont item-panel">
          <img class="item-img">
          <img class="item-img">
          <img class="item-img">
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  data() {
    return {
      info: null
    }
  },
  mounted() {
    //Static functions
    //Random color generator
    const randomColor = () => {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    //Switches classes based on a giving object(obj)
    const switching = (obj, c1, c2) => {
      obj.classList.add(c1);
      obj.classList.remove(c2);
    };

    //Setting PinEarth's map with Leaflet
    var pinEarth = L.map("mapid", {
      minZoom: 3,
      maxZoom: 6,
      zoomSnap: 0.5,
      zoomAnimation: true,
      worldCopyJump: true
    }).setView([0, -0], 3);

    //Getting our map from Mapbox API
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/swiji/ckawr57dh1yfq1ipntl41rbec/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3dpamkiLCJhIjoiY2thd29paXNyMDRzMTJxdG1ubGI2MWRrNSJ9.fKasE79jvgDXiHL8aN-0xg",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoic3dpamkiLCJhIjoiY2thd29tYjVrMDNybDJwbnFvZGN0NnVvaSJ9.TalUtyKzDmVHqrHFatHHyA"
      }
    ).addTo(pinEarth);

    //ASP.net C# API HTTP request for Pins' treatment
    this.$http.get('https://localhost:5001/Pin').then(response => {
      this.info = response.body;
      console.log(this.info);

      for (var i = 0; i < this.info.length; i++) {
        let color = randomColor();
        let coords = this.info[i].coordenadas.split(',');

        let circle = L.circle(
          [coords[0], coords[1]],
          {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: 50000,
            data: i
          }
        ).addTo(pinEarth);

        circle.addEventListener('click', function(e) {
          receiveData(e, this.options.data);
        });
      }
    }, response => {
      alert('API error');
      console.log('API error: ' + response.status);
    });

    //Function for receiving Pin ID and setting correct info on container
    const receiveData = (e, id) => {
      let title = document.querySelector('div.text-cont div.item-title');
      let body = document.querySelector('div.text-cont div.item-body');
      let wikipedia = document.querySelector('a#item-wikipedia');
      title.innerHTML = this.info[id].nomeLocal;
      body.innerHTML = this.info[id].descricao;
      wikipedia.setAttribute('href', this.info[id].wikipediaUrl);

      this.$http.get(`https://localhost:5001/ImagemPin/`).then(response => {
        let imgs = response.body;
        let imgCont = document.querySelector('div.image-cont');
        imgCont.innerHTML = "";

        for(let i = 0; i < imgs.length; i++) {
          if(imgs[i].idPin === this.info[id].idPin) {
            let imgX = document.createElement('img');
            imgX.setAttribute('src', imgs[i].url);
            imgX.setAttribute('class', 'item-img');
            
            imgCont.appendChild(imgX);
          }
        }
      })

      //Handling container's visibility (ON)
      let container = document.querySelector('div#information');
      container.classList.remove('visibility');

      let panel = container.querySelector('div.panel');
      switching(panel, 'top50', 'top80');
    };

    //Handling container's visibility (OFF)
    document.querySelector('#exit-panel').onclick = () => {
      let container = document.querySelector('div#information');
      container.classList.add('visibility');

      let panel = container.querySelector('div.panel');
      switching(panel, 'top80', 'top50');
    };
  }
};
</script>

<style lang="scss">
#exit-panel {
  position: absolute;
  left: 98.5%;
  top: .5%;
  color: rgb(207, 207, 207);
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: rgb(134, 134, 134);
  }
}

.visibility {
  visibility: hidden;
  opacity: 0;
}

.top80 {
  top: 80%;
}

.top50 {
  top: 50%;
}

#information {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
  transition: 0.6s;

  &:after {
    content: '';
    background: black;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 100001;
    opacity: 0.6;
  }

  .panel {
    z-index: 100002;
    position: absolute;
    //Removed for class management
    //top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    user-select: none;
    background: white;
    width: 75vw;
    height: 80vh;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    transition: 1s;

    .item-panel {
      flex: 1;
      height: 100%;

      .item-title {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 2em;
        color: black;
        text-align: center;
      }
    }

    .image-cont {
      display: flex;
      flex-direction: column;

      .item-img {
        flex: 1;
      }
    }
}
}

#mapid {
  height: 100%;
}

.mapa {
  color: red;
  height: 100vh;
}
</style>
