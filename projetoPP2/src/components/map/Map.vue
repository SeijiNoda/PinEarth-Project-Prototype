<template>
  <div class="mapa">
    <div id="mapid"></div>
  </div>
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
        let xablau = i
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
#mapid {
  height: 100%;
}

.mapa {
  color: red;
  height: 100vh;
}
</style>
