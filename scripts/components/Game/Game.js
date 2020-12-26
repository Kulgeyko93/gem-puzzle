
export class Game {
   
   constructor({element, startGame, tickId}) {
      this.el = element;
      this.empty = null;
      this.imgPazzle = document.querySelector('.isBackground').value;
      this.cellSize = 70;
      this.cells= [];
      this.startGame = startGame;

      this.tickId = tickId;
      this.move = 0;
      
      this.isRender(this.startGame)
   }

   changePlaceBox(index, gameCells) {
      this.audio()
      const cell = this.cells[index];

      let leftDiff = Math.abs(this.empty.left - cell.left);
      let topDiff = Math.abs(this.empty.top - cell.top);
   
      if (leftDiff + topDiff >1 ) {
         cell.element.style.display = 'flex';
         return
      } 
   
      document.querySelector('.move').textContent = `Move: ${this.move += 1}`
   
      cell.element.style.left = `${this.empty.top * this.cellSize}px`
      cell.element.style.top = `${this.empty.left * this.cellSize}px`
   
      const emptyLeft = this.empty.left
      const emptyTop = this.empty.top

      this.empty.left = cell.left;
      this.empty.top = cell.top;
   
      cell.left = emptyLeft;
      cell.top = emptyTop;

      cell.element.style.display = 'flex';

      const isSolved = this.cells.every( cell => {
         return cell.value === cell.left * gameCells + cell.top +1;
      })
   
      if (isSolved) {
         clearInterval(this.tickId)

         // console.log(`Вы решили задачу за: ${this.move} ходов и ${document.querySelector('.time').textContent.match(/[0-9]/g)} сек `,this.tickId)
         let a = [{
            gameCells: gameCells,
            move: this.move,
            time: +document.querySelector('.time').textContent.match(/[0-9]/g)[0],
         }];
         if (localStorage.getItem('stateResult') === null ) {
            localStorage.setItem('stateResult',JSON.stringify(a));
         } else {
            localStorage.setItem('stateResult', JSON.stringify([...JSON.parse(localStorage.getItem('stateResult')), ...a]));
         }

         setTimeout( ()=> {
            document.querySelector('.popup__result').innerHTML = `
               <div>Congratulations</div>
               <div>Вы решили задачу за: ${this.move} ходов и 
               ${document.querySelector('.time').textContent.match(/[0-9]/g)} сек ${this.tickId}</div>
            `
            document.querySelector('.popup').style.visibility =  'visible';
            document.querySelector('.popup').style.opacity =  '1';
         }, 500) 

         setTimeout( () => {
            document.querySelector('.popup').style.visibility =  'hidden';
            document.querySelector('.popup').style.opacity =  '0';
            this.renderEndGame()
         },3000)

      }
   }

   dragStart(index) {
      setTimeout (() => this.cells[index].element.style.display = 'none', 0 )
   }

   createArrImg () {
      const result = [];
      const img = [
         `https://github.com/irinainina/image-data/blob/master/box/63.jpg?raw=true`,
         `https://github.com/irinainina/image-data/blob/master/box/64.jpg?raw=true`,
         `https://github.com/irinainina/image-data/blob/master/box/1.jpg?raw=true`,
         `https://github.com/irinainina/image-data/blob/master/box/2.jpg?raw=true`,
         `https://github.com/irinainina/image-data/blob/master/box/5.jpg?raw=true`

      ]
      const randomImg = Math.floor(Math.random() * img.length)
      // let randomImg = Math.floor(Math.random() * 9)


      const gameCells =  document.querySelector('.boxCells').value;

      for (let i = 0; i < gameCells; i++) {
            
         for (let j = 0; j < gameCells; j++) {
            const cellImg = document.createElement('div');
            cellImg.style.position = 'absolute';
            // cellImg.style.background = `url(./../../../assets/img/${randomImg}.jpg)`;
            cellImg.style.background = `url(${img[randomImg]})`;
            cellImg.style.width = `${this.cellSize}px`;
            cellImg.style.height = `${this.cellSize}px`;
            cellImg.style.backgroundSize= `${gameCells * this.cellSize}px auto`;
            cellImg.style.backgroundPosition = `${-this.cellSize*(j)}px ${-this.cellSize*(i)}px`;

            result.push(cellImg)
         }
     }
     return result;
   }
   isRender(render) {
      if (render) {
         document.querySelector('.move').textContent = `Move: ${this.move}`
         this.renderStartGame()
      }
      else {
         this.tickId = null
         this.renderEndGame()
      }
   }

   renderStartGame() {
      const gameCells =  document.querySelector('.boxCells').value;
      let img;
      const numbers = [...Array(Math.pow(gameCells,2)-1).keys()]
                        .sort(()=> Math.random() -0.5);
      
      if (this.imgPazzle === 'imageBox') {
         img = this.createArrImg();
      }

      const game = document.querySelector('.game');

      game.style.width = `${gameCells * this.cellSize}px`;
      game.style.height = `${gameCells * this.cellSize}px`;
      
      this.empty = {value: Math.pow(gameCells,2), top: gameCells - 1, left: gameCells - 1, };

      for ( let i = 0; i < Math.pow(gameCells,2) - 1; i++) {
         const cell = document.createElement('div');
         const value = numbers[i] + 1;

         cell.className = 'cell';
         cell.draggable = 'true';

         if (this.imgPazzle !== 'imageBox') {
            cell.innerHTML = value;
         }

         const top = i % gameCells;
         const left = (i-top) / gameCells;
       
         this.cells.push({
            value: value,
            left: left,
            top: top,
            element: cell
         });
      
         cell.style.left = `${top * this.cellSize}px`;
         cell.style.top = `${left * this.cellSize}px`;


         this.el.append(cell);

         if (this.imgPazzle === 'imageBox') {
            document.querySelectorAll('.cell')[i].append(img[value-1])
         }
      
         cell.addEventListener('click', () =>{
            this.changePlaceBox(i, gameCells);   

         })
         
         cell.addEventListener('dragstart', () => {
            this.dragStart(i)
         });
         cell.addEventListener('dragend', () => {
            this.changePlaceBox(i, gameCells); 
         });

         if (i === Math.pow(gameCells,2) - 2) {
            this.cells.push(this.empty);
         }
      }
   }

   renderEndGame() {
      document.querySelector('.game').innerHTML = ''
      document.querySelector('.start').textContent = 'Play';
      document.querySelector('.move').textContent = 'Move: 0';
      document.querySelector('.time').textContent = 'Time: 0';
   }

   audio() {
      new Audio('./assets/audio/click.mp3').play();
   }
}

