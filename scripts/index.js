import { App } from './components/App/App.js';


alert(`Доброго времени суток!!!
К сожалению не было времени реализовать ожидание загрузки картинок, 
поэтому при выборе пазл картинками идет не большая подгрузка картинки секунда и потом только
отображение.
также изначально localStorage пустой поэтому надо хоть 1 раз пройти игру и статистика выведется для текущей поля.
Сортировка  выполненна по шагам.

Спасибо за минутку внимания!
Приятной проверки!
`)
const app = document.createElement('div');

app.className = 'app';

document.body.append(app);

new App(document.querySelector('.app'));
