import { Game } from './../Game/Game.js'
import { Stats } from './../Stats/Stats.js'

export class App {
   constructor(element) {
      this.el = element;
      this.time = 0;
      this.startGame = false;
      this.tickId = null;   
      this.showStatsFlag = false;   

      this.render();
      this.start();
      this.showStats();
   }

   _initGame(element) {
      this.game = new Game(element);
   }
   _initStats(element) {
      this.stats = new Stats(element);
   }

   start() {
      const button = document.querySelector('.start')

      button.addEventListener( 'click', () => {

         if(button.textContent === 'Play') {
            this.startGame = true;      
         } else {
            this.startGame = false;      
         }

         if (this.startGame && button.textContent === 'Play') {
      
            button.textContent = 'Reset';
            this.time = 0;
            this.tickId = setInterval(this.timer.bind(this), 1000);
            this._initGame({element:document.querySelector('.game'),startGame: this.startGame, tickId: this.tickId});

            return
         }

         if (!this.startGame && button.textContent === 'Reset') {

            clearInterval(this.tickId)
            document.querySelector('.time').textContent = ` Time: ${0}`
            document.querySelector('.move').textContent = ` Move: ${0}`
            this._initGame({element:document.querySelector('.game'),startGame: this.startGame, tickId: this.tickId}); 

            button.textContent = 'Play';

            return
         }
      })
   }

   timer () {
      return document.querySelector('.time').textContent = ` Time: ${this.time += 1}`
   }

   showStats() {
      const button = document.querySelector('.stats');

      button.addEventListener( 'click', () => {
         this.showStatsFlag = !this.showStatsFlag
         if(this.showStatsFlag) {
            this._initStats()
         } else {
            document.querySelector('.show-stats').innerHTML = ``;
         }

      })
   }

   render () {
      this.el.innerHTML = `
         <div class="menu">
            <button  class='start'>Play</button>
            <select class='isBackground'>
               <option selected value='numberBox'>Number</option>
               <option value='imageBox'>Image</option>
            </select>
            <select class='boxCells'>
               <option value='3'>3x3</option>
               <option selected value='4'>4x4</option>
               <option value='5'>5x5</option>
               <option value='6'>6x6</option>
               <option value='7'>7x7</option>
               <option value='8'>8x8</option>
            </select>
            <span class="move">Move: 0</span>
            <span class="time">Time: 0</span>
            <button  class='stats'>Statistics</button>
         </div>
         <div class='game'></div>
         <div class='show-stats'></div>
         <div class='finish-game'></div>

         <div id="popup" class="popup open">
            <div class="popup__body">
               <div class="popup__container">
                  <div class="popup__result">
                     
                  </div>
               </div>			
            </div>
         </div>
      `
   }
}