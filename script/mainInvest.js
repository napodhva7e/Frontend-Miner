// value counter

const valueController = ({ value, interval = 2000 }) => {
  let valueDisplay = document.querySelector(value);
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));

  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
};

const startValueController = () => {
  valueController({
    value: ".number-percentages",
  });
};

// line bar progress

const lineBarProgress = ({ name, box, interval = 2000 }) => {
  let lineBar = document.querySelector(name);
  let verticalBar = document.getElementById(box).clientWidth;
  let startWidth = 0;
  let endWidth = Math.floor(verticalBar / 5);

  let duration = Math.floor(interval / endWidth);
  let counter = setInterval(function () {
    startWidth += 1;
    lineBar.style.cssText = `
    width: ${startWidth}px`;
    if (startWidth == endWidth) {
      clearInterval(counter);
    }
  }, duration);
};
const startLineBarProgress = () => {
  lineBarProgress({
    name: ".line-bar",
    box: "verticalBar",
  });
};
// observe

// функция определяет нахождение элемента в области видимости
// если элемент видно - возвращает true
// если элемент невидно - возвращает false
function isOnVisibleSpace(element) {
  var bodyHeight = window.innerHeight;
  var elemRect = element.getBoundingClientRect();
  var offset = elemRect.top; // - bodyRect.top;
  if (offset < 0) return false;
  if (offset > bodyHeight) return false;
  return true;
}

// глобальный объект с элементами, для которых отслеживаем их положение в зоне видимости
var listenedElements = [];
// обработчик события прокрутки экрана. Проверяет все элементы добавленные в listenedElements
// на предмет попадания(выпадения) в зону видимости
window.onscroll = function () {
  listenedElements.forEach((item) => {
    // проверяем находится ли элемент в зоне видимости
    var result = isOnVisibleSpace(item.el);

    // если элемент находился в зоне видимости и вышел из нее
    // вызываем обработчик выпадения из зоны видимости
    if (item.el.isOnVisibleSpace && !result) {
      item.el.isOnVisibleSpace = false;
      item.outVisibleSpace(item.el);
      return;
    }
    // если элемент находился вне зоны видимости и вошел в нее
    // вызываем обработчик попадания в зону видимости
    if (!item.el.isOnVisibleSpace && result) {
      item.el.isOnVisibleSpace = true;
      item.inVisibleSpace(item.el);
      return;
    }
  });
};

// функция устанавливает обработчики событий
// появления элемента в зоне видимости и
// выхода из нее
function onVisibleSpaceListener(elementId, cbIn, cbOut) {
  // получаем ссылку на объект элемента
  var el = document.getElementById(elementId);
  // добавляем элемент и обработчики событий
  // в массив отслеживаемых элементов
  listenedElements.push({
    el: el,
    inVisibleSpace: cbIn,
    outVisibleSpace: cbOut,
  });
}
let valueControllerStoped = 0;
// устанавливаем обработчики для элемента "video"
onVisibleSpaceListener(
  "video",
  (el) => {
    // функция вызываемая при попадании элемента в зону видимости
    // тут вставляем код запуска анимации
    // затычка которая выполняет функцию лишь один раз
    while (valueControllerStoped < 1) {
      startValueController();
      startLineBarProgress();
      valueControllerStoped++;
    }
  },
  (el) => {}
);
