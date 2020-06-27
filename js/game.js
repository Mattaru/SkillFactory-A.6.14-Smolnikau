const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() { 
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // Помечание таргета текущим номером
  $(divSelector).html(`${divSelector.slice(-2)}`);
  // После первого клика на .таргет - переменная записывает значение таймера
  $(divSelector).one("click", function() {
    firstHitTime = getTimestamp();
  });
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // Прячем игровое поле, оставляя результат игры и кнопку "Играть заново"
  $(".score").removeClass("visible");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
}

// Событие клика по ячейке
function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    // Убераем текст с ячеек таргетов
    $(".target").html("");
    // Убераем .таргет с ячеек
    $(event.target).removeClass("target");
    round();
  } else {
    // Отмечаем промахи красным фоном на 0.5с.
    $(event.target).addClass("miss");
    setTimeout(function() {
      $(event.target).removeClass("miss");
    }, 500);
  }
}

// Механизм запуска
function init() {
  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

// Отдельная кнопка для запуска игры
$(".start-btn").click(function() {
  $(".start-btn").removeClass("visible");
  $(".game-board").addClass("visible");
  $(".score").addClass("visible");
  init();
});

