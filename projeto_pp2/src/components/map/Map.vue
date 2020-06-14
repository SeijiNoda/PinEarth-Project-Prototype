<template>
  <main>
    <!-- Map Container -->
    <div class="mapa">
      <div id="mapid"></div>
    </div>
    <!-- Information panel -->
    <div id="information" class="visibility">
      <div class="panel top80">
        <font-awesome-icon icon="times" id="exit-panel"></font-awesome-icon>
        <div class="text-cont item-panel">
          <div class="item-title"></div>
          <div class="item-body"></div>
          <a id="item-wikipedia"><font-awesome-icon :icon="['fab', 'wikipedia-w']"></font-awesome-icon></a>
        </div>
        <div class="image-cont item-panel">
          <!-- Images go here -->
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
    //Converts HSL color to HEX color
    function hslToHex(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
      let r, g, b;
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    //Random color generator with HSL determined Saturation and Lightness
    function generateHslaColors (saturation, lightness, alpha, amount) {
      let colors = [];
      let huedelta = Math.trunc(360 / amount);

      for(var i = 0; i < amount; i++) {
        let hue = i * huedelta;

        colors.push(hslToHex(hue, saturation, lightness));
      }

      return colors;
    };

    //Switches classes based on a giving object(obj)
    const switching = (obj, c1, c2) => {
      obj.classList.add(c1);
      obj.classList.remove(c2);
    };

    //btnAboutUs comes from component Nav.vue, since it has diferent uses in Home.vue and in here, it can't be padronized
    const btnAboutUs = document.getElementsByClassName("nav-item")[2];
    btnAboutUs.onclick = () => {
      window.location = "#/";
    };

    //Controlling Image focus on Information-Container
    const imgHeights = [];  
    const scrollImg = document.querySelector('div.image-cont').onscroll = () => {
      let imgCont = document.querySelector('div.image-cont');
      let y = imgCont.scrollTop + (imgCont.clientHeight) / 2;
      //Testing
      console.log(imgCont.scrollTop + ' + ' + imgCont.clientHeight + ' ' + imgHeights[0] + ' ' + imgHeights[1]);
      //
      if(y > imgHeights[0]) {
        if(y > (imgHeights[0] + imgHeights[1])) {
          let img3 = document.querySelector('[id="img3"]');
            img3.classList.remove('img-focus');
          let img1 = document.querySelector('[id="img1"]');
            img1.classList.add('img-focus');

          let img2 = document.querySelector('[id="img2"]');
            img2.classList.add('img-focus')
          console.log('imagem 3');
        } else {
          let img2 = document.querySelector('[id="img2"]');
            img2.classList.remove('img-focus');
          let img1 = document.querySelector('[id="img1"]');
            img1.classList.add('img-focus');
          
          let img3 = document.querySelector('[id="img3"]');
            img3.classList.add('img-focus')
          console.log('imagem 2');
        }
      } else {
        let img1 = document.querySelector('[id="img1"]');
          img1.classList.remove('img-focus');
        let img2 = document.querySelector('[id="img2"]');
          img2.classList.add('img-focus');
        
        let img3 = document.querySelector('[id="img3"]');
          img3.classList.add('img-focus')
        console.log('imagem 1');
      }
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

      let c = generateHslaColors(70, 50, 1.0, this.info.length)
      for (var i = 0; i < this.info.length; i++) {
        let coords = this.info[i].coordenadas.split(',');

        let circle = L.circle(
          [coords[0], coords[1]],
          {
            color: c[i],
            fillColor: c[i],
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
      title.innerHTML = this.info[id].nomeLocal + ` <span class="title-country">${this.info[id].pais}</span>`;
      body.innerHTML = this.info[id].descricao;
      wikipedia.setAttribute('href', this.info[id].wikipediaUrl);

      this.$http.get(`https://localhost:5001/ImagemPin/`).then(response => {
        let imgs = response.body;
        let imgCont = document.querySelector('div.image-cont');
        let indexCount = 0;
        imgCont.innerHTML = "";

        for(let i = 0; i < imgs.length; i++) {
          if(imgs[i].idPin === this.info[id].idPin) {
            let imgX = document.createElement('img');
            imgX.setAttribute('src', imgs[i].url);
            imgX.setAttribute('class', 'item-img');
            if(indexCount != 0)
              imgX.setAttribute('class', 'item-img img-focus')
            imgX.setAttribute('id', `img${indexCount + 1}`);
            
            imgCont.appendChild(imgX);

            imgHeights[indexCount] = imgX.offsetHeight;
            indexCount++;
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
  @import '../../styles/map';
</style>
