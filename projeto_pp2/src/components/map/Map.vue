<template>
  <main>
    <div class="mapa">
      <div id="mapid"></div>
    </div>
    <div id="information">
      <div class="panel">
        <div class="text-cont item-panel"></div>
        <div class="image-cont item-panel"></div>
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
    var pinEarth = L.map("mapid", {
      minZoom: 3,
      maxZoom: 6,
      zoomSnap: 0.5,
      zoomAnimation: true,
      worldCopyJump: true
    }).setView([0, -0], 3);
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

    const randomColor = () => {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    this.$http.get('https://localhost:5001/Pin').then(response => {
      this.info = response.body;
      console.log(this.info);

      for (var i = 0; i < this.info.length; i++) {
        let color = randomColor();
        let coords = this.info[i].coordenadas.split(',');
        console.log(coords[0] + ' ' + coords[1]);


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

        circle.bindPopup(`<div clas="pinpoint" id="pin${i}">${this.info[i].nomeLocal}</div>`);
        circle.addEventListener('click', function(e) {
          receiveData(e, this.options.data);
        });
      }
    }, response => {
      alert('API error');
      console.log('API error: ' + response.status);
    });

    const receiveData = (e, id) => {
      alert(this.info[id].nomeLocal);
      console.log(id);
    }
  }
};
</script>

<style lang="scss">
#information {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
  display: none;

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
    top: 50%;
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

    .item-panel {
      flex: 1;
      height: 100%;
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
