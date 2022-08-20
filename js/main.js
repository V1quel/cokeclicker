var hinnat =[10,100,500,2000,7000,50000,1000000]

var app = new Vue({
  el: '#app',
  data: {
    menu: false,
    guide: false,
    toggled: false,
    can: 0,
    sevenup: 0,
    upgrades: [
      {
        nimi: "Freezer",
        hinta: 10,
        tuottaa: 0.2,
        count: 0,
        image: "images/freezer.png",
      },
      {
        nimi: "Coke fountain",
        hinta: 100,
        tuottaa: 1.5,
        count: 0,
        image: "images/fountain.png",
      },
      {
        nimi: "Coke factory",
        hinta: 500,
        tuottaa: 10,
        count: 0,
        image: "images/factory.png",
      },
      {
        nimi: "Coke platform",
        hinta: 2000,
        tuottaa: 40,
        count: 0,
        image: "images/cokeplatform.png",

      },
      {
        nimi: "Deep space coke exploration",
        hinta: 7000,
        tuottaa: 100,
        count: 0,
        image: "images/rocket.png",
      },
      {
        nimi: "Planet colonization for alien coke",
        hinta: 50000,
        tuottaa: 500,
        count: 0,
        image: "images/planet.png",
      },
      {
        nimi: "Coke cloner",
        hinta: 1000000,
        tuottaa: 0,
        count: 0,
        image: "images/cokecloner.png"
      }
        
    ]        
  },
  methods: {
    canCount: function () {
      this.can+=1
    },
    changeNumber: function (method, number, ammount="") {
        if (number > 1000000000000000000000000000000000) {
          if (number > 1000000000000000000000000000000000) {
          if (method === "floor") return Math.floor(number/1000000000000000000000000000000000) + "d"
          else return Math.ceil(number/1000000000000000000000000000000000) + "d"
        } else if (number > 1000000000000000000000000000000) {
          if (method === "floor") return Math.floor(number/1000000000000000000000000000000) + "n"
          else return Math.ceil(number/1000000000000000000000000000000) + "n"
        } else if (number > 1000000000000000000000000000) {
          if (method === "floor") return Math.floor(number/1000000000000000000000000000) + "o"
          else return Math.ceil(number/1000000000000000000000000000) + "o"
        } else if (number > 1000000000000000000000000) {
          if (method === "floor") return Math.floor(number/1000000000000000000000000) + "S"
          else return Math.ceil(number/1000000000000000000000000) + "S"
        } else if (method === "floor") return Math.floor(number/1000000000000000000000) + "s"
          else return Math.ceil(number/1000000000000000000000) + "s"
        } else if (number > 1000000000000000000) {
          if (method === "floor") return Math.floor(number/1000000000000000000) + "Q"
          else return Math.ceil(number/1000000000000000000) + "Q"
        } else if (number > 1000000000000000) {
          if (method === "floor") return Math.floor(number/1000000000000000) + "q"
          else return Math.ceil(number/1000000000000000) + "q"
        } else if (number > 1000000000000) {
          if (method === "floor") return Math.floor(number/1000000000000) + "t"
          else return Math.ceil(number/1000000000000) + "t"
        } else if (number > 1000000000) {
          if (method === "floor") return Math.floor(number/1000000000) + "B"
          else return Math.ceil(number/1000000000) + "B"
        } else if (number > 1000000) {
          if (method === "floor") return Math.floor(number/1000000) + "M"
          else return Math.ceil(number/1000000) + "M"
        } else {
          if (ammount === "ammount") return Math.floor(number)
          else return Math.round(number * 10) /10
        }
    },
    ostettavissa: function (upgrade) {
      return this.can >= upgrade.hinta
    },
    osta: function (upgrade) {
      this.can -= upgrade.hinta
      var idx = -1;
      for (let i = 0; i < this.upgrades.length; i++) {
        let existingUpgrade = this.upgrades[i];
        if (existingUpgrade.nimi === upgrade.nimi) idx = i;
      }
      this.upgrades[idx].count = this.upgrades[idx].count + 1;
      if (this.upgrades[idx].nimi === "Coke cloner") {
        this.upgrades[idx].hinta = this.upgrades[idx].hinta * 4;
      } else {
        this.upgrades[idx].hinta = Math.ceil(this.upgrades[idx].hinta * 1.1);
      }
    },
    valikko() {
      this.toggled = !this.toggled;
      if (this.menu === false) {
        this.menu =!this.menu;
      }else{
        this.menu = false;
      }
    },
    prestige: function () {
      if (this.sevenupit < 1 && this.data.sevenup < 1) return;
      for (let i = 0; i < this.upgrades.length; i++) {
        let existingUpgrade = this.upgrades[i];
        existingUpgrade.count = 0;
        existingUpgrade.hinta = hinnat[i]
      }
      this.sevenup += this.sevenupit
      this.can = 0
      this.menu = false;
      this.toggled = false;
    },
    save: function save() {
      localStorage.setItem('app', JSON.stringify({can: this.can, upgrades: this.upgrades}));
      this.menu = false;
      this.toggled = false;
    },
    load: function load() {
      const data = JSON.parse(localStorage.getItem('app'));
      if (!data) return;
      this.can = data.can;
      this.upgrades = data.upgrades;
      this.menu = false;
      this.toggled = false;
    },
    prestigeSave: function  prestigeSave() {
      localStorage.setItem('prestige', JSON.stringify({sevenup: this.sevenup}));
      this.menu = false;
      this.toggled = false;
    },
    prestigeLoad: function prestigeLoad() {
      const data = JSON.parse(localStorage.getItem('prestige'));
      if (!data) return;
      this.sevenup = data.sevenup;
      this.menu = false;
      this.toggled = false;
    },
    guideButton: function() {
      if (this.guide === false) {
        this.guide = true;
        return this.guide;
      } else {
        this.guide = false;
      } 
    },
    reportSize: function reportSize() {
      if(window.innerHeight > window.innerWidth) {
        alert("Please use landscape")
      }
    }
  },
  computed: {
    produced() {
      let current = 0;
        for (let i = 0; i < this.upgrades.length; i++) {
          let upgrade = this.upgrades[i]
          current += upgrade.tuottaa * 
            upgrade.count * 
            Math.pow(2,Math.floor(upgrade.count / 25)) * 
            this.kerroin *
            (1 + this.sevenup * 0.02);
      }
      return current
    },
    kerroin() {
      return Math.pow(2,this.upgrades[6].count)
    },
    sevenupit() {
      return Math.pow(this.can / 1000000 , 0.33)
    }
  },
  mounted() {
    setInterval(() => {
        this.can += this.produced
      }, 1000)
      window.addEventListener('resize', this.reportSize)
  }
})