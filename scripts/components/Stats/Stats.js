export class Stats {
   constructor () {
      this.stats = localStorage.getItem('stateResult');

      this.render();
      this.sortStats();
   }

   getStats() {
      const gameCells =  document.querySelector('.boxCells').value;
      const result = JSON.parse(localStorage.getItem('stateResult'))

      let list =0;
      let resultInGameCells = [];

      result.map(item => {
         if (+gameCells === +item.gameCells) {
            resultInGameCells.push(item)
         }
      })

      return resultInGameCells.slice(0,10).sort((a, b) => a.move > b.move ? 1 : -1)
                              .map(item =>  { list += 1;
                                 return   `<tr>
                                             <td>${list}) User</td>
                                             <td>${item.move}</td>
                                             <td>${item.time}</td>
                                          </tr>
                                 `})

   }

   sortStats() {
     document.querySelector('.tdMove').addEventListener('click', () => this.render('move'));
     document.querySelector('.tdTime').addEventListener('click', () => this.render('time'))
   }

   render(sort) {

      document.querySelector('.show-stats').innerHTML = `
         <table>
            <tr>
               <td>Place</td>
               <td class='tdMove'>Moves</td>
               <td class='tdTime'>Time</td>
            </tr>
            ${
               this.getStats(sort)
            }
         </table>

      `
   }
}