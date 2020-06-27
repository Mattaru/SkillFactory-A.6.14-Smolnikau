const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(divSelector).html(`${divSelector.slice(-2)}`);
  // FIXME: тут надо определять при первом клике firstHitTime
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {

  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    // Убераем текст с ячеек таргетов
    $(".target").html("");
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
  init();
});

