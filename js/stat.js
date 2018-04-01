'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_DEFLECTION = 10;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var HORIZONTAL_PADDING = 55;
var VERTICAL_PADDING = 25;
var SHADOW_OFFSET = 10;
var LINE_HEIGHT = 20;
var BAR_GAP = 50;
var LABEL_GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = CLOUD_HEIGHT - VERTICAL_PADDING * 2 - LINE_HEIGHT * 4 - LABEL_GAP - LINE_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_DEFLECTION);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_DEFLECTION, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - CLOUD_DEFLECTION);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_DEFLECTION, y + CLOUD_HEIGHT / 2);
  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomSaturate = function (color) {
  return 'hsl(' + color + ', ' + Math.floor(Math.random() * 101) + '%, 50%)';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = 'PT Mono 16px';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000000';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + VERTICAL_PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + VERTICAL_PADDING + LINE_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomSaturate(240);
    }

    ctx.fillRect(CLOUD_X + HORIZONTAL_PADDING + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - LABEL_GAP - LINE_HEIGHT - VERTICAL_PADDING,
        BAR_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = '#000000';

    ctx.fillText(players[i], CLOUD_X + HORIZONTAL_PADDING + BAR_GAP * i + BAR_WIDTH * (i + 0.5),
        CLOUD_Y + CLOUD_HEIGHT - LINE_HEIGHT - VERTICAL_PADDING);
    ctx.fillText(Math.round(times[i]), CLOUD_X + HORIZONTAL_PADDING + BAR_GAP * i + BAR_WIDTH * (i + 0.5),
        CLOUD_Y + CLOUD_HEIGHT - LINE_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - LABEL_GAP - LINE_HEIGHT - VERTICAL_PADDING);
  }
};
