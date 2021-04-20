import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//   1  Отобразите позицию для каждого хода в формате (колонка, строка) в списке истории ходов.
//   2  Выделите выбранный элемент в списке ходов.
//   3  Перепишите Board, используя вложенные циклы для создания клеток, вместо их жёсткого кодирования.
//   4  Добавьте переключатель, который позволит вам сортировать ходы по возрастанию или по убыванию.
//   5  Когда кто-то выигрывает, подсветите три клетки, которые привели к победе.