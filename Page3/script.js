window.ws = new WebSlides({ autoslide: false, loop: false });
let x = document.getElementById('float-button');
let y = new Audio(
  'https://raw.githubusercontent.com/the-g0dfather/the-g0dfather.github.io/main/HappyBirthday.mp3'
);
x.onclick = e => {
  console.log('clicked');
  if (y.paused) {
    console.log('play');
    y.play();
    y.loop = true;
    y.currentTime = 2;
    x.style.backgroundImage =
      'url(http://image.flaticon.com/icons/svg/10/10430.svg)';
  } else {
    console.log('gotta pause');
    y.pause();
    x.style.backgroundImage =
      'url(http://image.flaticon.com/icons/svg/10/10776.svg)';
  }
};
const YEARS = 20;
const PAPER_AMOUNT = 80;
const COLORS = [
  '#ab47bc',
  '#5c6bc0',
  '#29b6f6',
  '#66bb6a',
  '#ffee58',
  '#ffa726',
  '#ef5350'
];

function getOrdinalIndicator(num) {
  switch (num) {
    case 1:
    case 21:
      return 'st';
    case 2:
    case 22:
      return 'nd';
    case 3:
    case 23:
      return 'rd';
  }

  return 'th';
}

function generatePapers(container) {
  const maxPaperSize = container.offsetWidth / 40;
  const minPaperSize = maxPaperSize / 2;

  for (let i = 0; i < PAPER_AMOUNT; i++) {
    const p = document.createElement('div');

    p.style.position = 'absolute';
    p.style.top = `-${maxPaperSize}px`;
    p.style.left = `${anime.random(-5, container.offsetWidth + 5)}px`;
    p.style.width = `${anime.random(minPaperSize, maxPaperSize)}px`;
    p.style.height = `${anime.random(minPaperSize, maxPaperSize)}px`;
    p.style.backgroundColor = COLORS[i % COLORS.length];

    container.appendChild(p);
    animatePaper(p, container);
  }
}

function animatePaper(p, container) {
  anime({
    targets: p,
    delay: anime.random(0, 7000),
    duration: anime.random(5000, 7000),
    easing: 'linear',
    loop: true,
    translateX: `${anime.random(-20, 20)}px`,
    translateY: `${(container.offsetHeight * 2) / 3}px`,
    skewX: `${anime.random(-45, 45)}deg`,
    skewY: `${anime.random(-45, 45)}deg`,
    rotate: `${anime.random(-1.5, 1.5)}turn`,
    opacity: [0.8, 0]
  });
}

var app = new Vue({
  el: '#popup',
  data: {
    yearCounter: 0,
    ord: getOrdinalIndicator(YEARS)
  },
  mounted() {
    anime
      .timeline({
        loop: false
      })
      .add([
        {
          targets: '#popup',
          scale: [0, 1],
          duration: 1500,
          delay: 500
        },
        {
          targets: '#table',
          translateY: ['180px', 0],
          duration: 2000
        },
        {
          targets: '#dish',
          translateY: ['200px', 0],
          duration: 2000,
          offset: '-=1950'
        },
        {
          targets: '#cake',
          translateY: ['200px', 0],
          duration: 2000,
          offset: '-=1950'
        },
        {
          targets: '#text h1',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 2000,
          delay: (el, i) => i * 100,
          offset: '-=500'
        },
        {
          targets: this,
          yearCounter: [0, YEARS],
          duration: 1000,
          round: 1,
          offset: '-=2000',
          easing: 'easeInOutQuart',
          begin: () => generatePapers(document.getElementById('popup'))
        },
        {
          targets: '#ord',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 1000,
          offset: '-=500'
        }
      ]);
  }
});

//Heart
//---------- MAIN FUNCTION ----------
function init() {
  renderable = [];
  path = new Shape(
    new Heart(),
    new Point(cw / 2, ch / 2),
    new Color(45, 27, 85, 1), //rgba(45, 27, 85, 1)
    {
      scale: 10
    }
  );

  animate();
}

function animate() {
  addShape(angle);
  addShape(angle2);
  angle += 0.05;
  angle2 -= 0.05;

  ctx.clearRect(0, 0, cw, ch);

  for (var i = 0; i < renderable.length; i++) {
    renderable[i].draw(canvas);
    if (renderable[i].scale <= 0) renderable.splice(i, 1);
  }
  path.draw(canvas);
  requestAnimationFrame(animate);
}

function addShape(angle) {
  renderable.push(
    new Shape(
      new Circle(5),
      new Point(cw / 2, ch / 2),
      new Color(253, 192, 192, 1),
      {
        position: path.geometry
          .getPositionByAngle(angle)
          .multiply(path.scale)
          .add(path.position.clone()),
        decay: 0.1,
        scale: 3
      }
    )
  );
}

//-----------------------------------
var canvas, ctx, cw, ch;
var FPS = 60;
var renderable = [],
  path,
  path2,
  angle = 0,
  angle2 = 0,
  color;

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    return setTimeout(callback, FPS);
  };

window.onload = function () {
  initCanvas();
  ctx.clearRect(0, 0, cw, ch);
  init();
};
window.onresize = function () {
  initCanvas();
  ctx.clearRect(0, 0, cw, ch);
};

function initCanvas() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  cw = window.innerWidth;
  ch = window.innerHeight;
  canvas.width = cw;
  canvas.height = ch;
}

//---------------- APP UTIL ------------------
function getRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

//---------- EXTRACT OF MY NEXT FRAMEWORK ------------
//----------- PROTOTYPES -------------
//===== GEOMETRY =====
//----- SHAPE -----
function Shape(geometry, position, color, properties) {
  this.position =
    position == null || position.classname != 'Point' ? new Point() : position;
  this.geometry =
    geometry == null || geometry.constructor.name != 'GenericObject'
      ? new Circle()
      : geometry;
  this.color = color == null || color.classname != 'Color' ? null : color;
  this.lineColor = null;
  this.lineWidth = 1;
  this.scale = 1;
  this.decay = 0;
  if (properties != null) this.setProperties(properties);
  GenericObject.call(this, 'Shape');
}
Shape.prototype = new GenericObject();
Shape.prototype.setProperties = function (properties) {
  for (var p in properties) {
    this[p] = properties[p];
  }
};
Shape.prototype.draw = function (canvas) {
  if (this.scale > 0) {
    var ctx = canvas.getContext('2d');
    var cw = canvas.width;
    var ch = canvas.height;

    ctx.beginPath();
    if (
      this.lineWidth > 0 &&
      this.lineColor != null &&
      this.lineColor.classname == 'Color'
    ) {
      ctx.strokeStyle = this.lineColor.getRGBA();
      ctx.lineWidth = this.lineWidth;
    }
    if (this.color != null && this.color.classname == 'Color') {
      ctx.fillStyle = this.color.getRGBA();
    }

    switch (this.geometry.classname) {
      case 'Circle':
        ctx.arc(
          this.position.x,
          this.position.y,
          this.geometry.radius * this.scale,
          0,
          Math.PI * 2
        );
        break;
      case 'Heart':
        for (var i = 0; i < Math.PI * 2; i += 0.05) {
          var p = this.geometry.getPositionByAngle(i);
          p.multiply(this.scale);
          p.add(this.position);
          if (i == 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        break;
    }

    if (this.lineColor != null && this.lineColor.classname == 'Color')
      ctx.stroke();
    if (this.color != null) ctx.fill();
    this.scale -= this.decay;
  }
};

//----- POINT -----
function Point(x, y) {
  this.x = x != null && !isNaN(x) ? x : 0;
  this.y = y != null && !isNaN(y) ? y : 0;
  GenericObject.call(this, 'Point');
}
Point.prototype = new GenericObject();
Point.prototype.add = function (p2) {
  if (p2.classname != this.classname) return null;
  this.x += p2.x;
  this.y += p2.y;
  return this;
};
Point.prototype.multiply = function (scale) {
  this.x *= scale;
  this.y *= scale;
  return this;
};

//----- CIRCLE -----
function Circle(radius) {
  this.center = new Point();
  this.radius = radius != null && !isNaN(radius) ? radius : 1;
  GenericObject.call(this, 'Circle');
}
Circle.prototype = new GenericObject();

//----- HEART -----
function Heart(scale) {
  this.scale = scale != null && !isNaN(scale) ? scale : 1;
  GenericObject.call(this, 'Heart');
}
Heart.prototype = new GenericObject();
Heart.prototype.getPositionByAngle = function (angle) {
  if (angle == null || isNaN(angle)) return null;
  var x = 16 * Math.pow(Math.sin(angle), 3);
  var y = -(
    13 * Math.cos(angle) -
    5 * Math.cos(2 * angle) -
    2 * Math.cos(3 * angle) -
    Math.cos(4 * angle)
  );
  return new Point(x * this.scale, y * this.scale);
};

//===== COLOR =====
function Color(r, g, b, a) {
  this.r = r != null || isNaN(r) ? r : 0;
  this.g = g != null || isNaN(g) ? g : 0;
  this.b = b != null || isNaN(b) ? b : 0;
  this.a = a != null || isNaN(a) ? a : 1;
  this.hex = this.toHex();
  GenericObject.call(this, 'Color');
}
Color.prototype = new GenericObject();
Color.prototype.toHex = function () {
  var bin = (this.r << 16) | (this.g << 8) | this.b;
  return (function (h) {
    return '#' + new Array(7 - h.length).join('0') + h;
  })(bin.toString(16).toUpperCase());
};
Color.prototype.getRGBA = function () {
  return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
};
Color.prototype.setHex = function (hex) {
  this.r = hex >> 16;
  this.g = (hex >> 8) & 0xff;
  this.b = hex & 0xff;
  this.hex = this.toHex();
};

//===== GENERICOBJECT =====
function GenericObject(name) {
  this.classname = name;
}
GenericObject.prototype.clone = function () {
  var copy = new GenericObject(this.classname);
  for (var attr in this) {
    if (this.hasOwnProperty(attr)) {
      if (this[attr].constructor.name == 'GenericObject')
        copy[attr] = this[attr].clone();
      else copy[attr] = this[attr];
    }
  }
  return copy;
};

//-------------Kiss-------------//
class Hearts extends mojs.CustomShape {
  getShape() {
    return '<path d="M73.6170213,0 C64.4680851,0 56.5957447,5.53191489 51.7021277,13.8297872 C50.8510638,15.3191489 48.9361702,15.3191489 48.0851064,13.8297872 C43.4042553,5.53191489 35.3191489,0 26.1702128,0 C11.9148936,0 0,14.0425532 0,31.2765957 C0,48.0851064 14.893617,77.8723404 47.6595745,99.3617021 C49.1489362,100.212766 50.8510638,100.212766 52.1276596,99.3617021 C83.8297872,78.5106383 99.787234,48.2978723 99.787234,31.2765957 C100,14.0425532 88.0851064,0 73.6170213,0 L73.6170213,0 Z"></path>';
  }
}

mojs.addShape('heart', Hearts);

const burst = new mojs.Burst({
  left: 0,
  top: 0,
  radius: { 4: 30 },
  angle: 45,
  count: 14,
  timeline: { delay: 300 },
  children: {
    radius: 2.5,
    fill: 'rgba(255, 55, 123, .75)',
    scale: { 1: 0, easing: 'quad.in' },
    pathScale: [0.8, null],
    degreeShift: [13, null],
    duration: [500, 700],
    easing: 'quint.out'
  }
});

const hearts = new mojs.Shape({
  shape: 'heart',
  fill: '#ff377b',
  scale: { 0: 1 },
  radius: 10,
  isShowStart: false,
  isShowEnd: false
});

const smooch = () => {
  let headCoordinates = document
    .getElementById('m-head')
    .getBoundingClientRect();
  const coords = {
    left: headCoordinates.left + 76,
    top: headCoordinates.top - 8
  };
  burst.tune(coords).replay();
  hearts.tune(coords).play();
};

const tl2 = new TimelineMax({ repeat: -1, repeatDelay: 1 });
tl2.add(TweenMax.to('#m-head', 0.5, { x: 15, onComplete: smooch }));
tl2.add(TweenMax.to('#m-head', 0.5, { x: 0, delay: 1 }));

setInterval(() => {
  document.getElementById('switch').checked = !document.getElementById('switch')
    .checked;
}, 5000);

function discord_message(Name, message) {
  var xhr = new XMLHttpRequest();
  const webHookURL =
    'https://discord.com/api/webhooks/782189497353895936/Rja9v6k0JhWdEQrTKJCho8R4skGZS1QDqRIicJU6nCJymAfJFCpNnpCkq3UBNROZcyOb';
  xhr.open('POST', webHookURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(
    JSON.stringify({
      content: message,
      username: Name
    })
  );
}

$('#post-btn2').click(function () {
  formName = $('#formName').val();
  formComment = $('#formComment').val();
  console.log(formName);
  discord_message(formName, formComment);
});
var css =
  'text-shadow: -1px -1px hsl(0,100%,50%), 1px 1px hsl(5.4, 100%, 50%), 3px 2px hsl(10.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(32.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px hsl(54, 100%, 50%), 20px 11px hsl(59.4, 100%, 50%), 22px 12px hsl(64.8, 100%, 50%), 23px 13px hsl(70.2, 100%, 50%), 25px 14px hsl(75.6, 100%, 50%), 27px 15px hsl(81, 100%, 50%), 28px 16px hsl(86.4, 100%, 50%), 30px 17px hsl(91.8, 100%, 50%), 32px 18px hsl(97.2, 100%, 50%), 33px 19px hsl(102.6, 100%, 50%), 35px 20px hsl(108, 100%, 50%), 36px 21px hsl(113.4, 100%, 50%), 38px 22px hsl(118.8, 100%, 50%), 39px 23px hsl(124.2, 100%, 50%), 41px 24px hsl(129.6, 100%, 50%), 42px 25px hsl(135, 100%, 50%), 43px 26px hsl(140.4, 100%, 50%), 45px 27px hsl(145.8, 100%, 50%), 46px 28px hsl(151.2, 100%, 50%), 47px 29px hsl(156.6, 100%, 50%), 48px 30px hsl(162, 100%, 50%), 49px 31px hsl(167.4, 100%, 50%), 50px 32px hsl(172.8, 100%, 50%), 51px 33px hsl(178.2, 100%, 50%), 52px 34px hsl(183.6, 100%, 50%), 53px 35px hsl(189, 100%, 50%), 54px 36px hsl(194.4, 100%, 50%), 55px 37px hsl(199.8, 100%, 50%), 55px 38px hsl(205.2, 100%, 50%), 56px 39px hsl(210.6, 100%, 50%), 57px 40px hsl(216, 100%, 50%), 57px 41px hsl(221.4, 100%, 50%), 58px 42px hsl(226.8, 100%, 50%), 58px 43px hsl(232.2, 100%, 50%), 58px 44px hsl(237.6, 100%, 50%), 59px 45px hsl(243, 100%, 50%), 59px 46px hsl(248.4, 100%, 50%), 59px 47px hsl(253.8, 100%, 50%), 59px 48px hsl(259.2, 100%, 50%), 59px 49px hsl(264.6, 100%, 50%), 60px 50px hsl(270, 100%, 50%), 59px 51px hsl(275.4, 100%, 50%), 59px 52px hsl(280.8, 100%, 50%), 59px 53px hsl(286.2, 100%, 50%), 59px 54px hsl(291.6, 100%, 50%), 59px 55px hsl(297, 100%, 50%), 58px 56px hsl(302.4, 100%, 50%), 58px 57px hsl(307.8, 100%, 50%), 58px 58px hsl(313.2, 100%, 50%), 57px 59px hsl(318.6, 100%, 50%), 57px 60px hsl(324, 100%, 50%), 56px 61px hsl(329.4, 100%, 50%), 55px 62px hsl(334.8, 100%, 50%), 55px 63px hsl(340.2, 100%, 50%), 54px 64px hsl(345.6, 100%, 50%), 53px 65px hsl(351, 100%, 50%), 52px 66px hsl(356.4, 100%, 50%), 51px 67px hsl(361.8, 100%, 50%), 50px 68px hsl(367.2, 100%, 50%), 49px 69px hsl(372.6, 100%, 50%), 48px 70px hsl(378, 100%, 50%), 47px 71px hsl(383.4, 100%, 50%), 46px 72px hsl(388.8, 100%, 50%), 45px 73px hsl(394.2, 100%, 50%), 43px 74px hsl(399.6, 100%, 50%), 42px 75px hsl(405, 100%, 50%), 41px 76px hsl(410.4, 100%, 50%), 39px 77px hsl(415.8, 100%, 50%), 38px 78px hsl(421.2, 100%, 50%), 36px 79px hsl(426.6, 100%, 50%), 35px 80px hsl(432, 100%, 50%), 33px 81px hsl(437.4, 100%, 50%), 32px 82px hsl(442.8, 100%, 50%), 30px 83px hsl(448.2, 100%, 50%), 28px 84px hsl(453.6, 100%, 50%), 27px 85px hsl(459, 100%, 50%), 25px 86px hsl(464.4, 100%, 50%), 23px 87px hsl(469.8, 100%, 50%), 22px 88px hsl(475.2, 100%, 50%), 20px 89px hsl(480.6, 100%, 50%), 18px 90px hsl(486, 100%, 50%), 16px 91px hsl(491.4, 100%, 50%), 14px 92px hsl(496.8, 100%, 50%), 13px 93px hsl(502.2, 100%, 50%), 11px 94px hsl(507.6, 100%, 50%), 9px 95px hsl(513, 100%, 50%), 7px 96px hsl(518.4, 100%, 50%), 5px 97px hsl(523.8, 100%, 50%), 3px 98px hsl(529.2, 100%, 50%), 1px 99px hsl(534.6, 100%, 50%), 7px 100px hsl(540, 100%, 50%), -1px 101px hsl(545.4, 100%, 50%), -3px 102px hsl(550.8, 100%, 50%), -5px 103px hsl(556.2, 100%, 50%), -7px 104px hsl(561.6, 100%, 50%), -9px 105px hsl(567, 100%, 50%), -11px 106px hsl(572.4, 100%, 50%), -13px 107px hsl(577.8, 100%, 50%), -14px 108px hsl(583.2, 100%, 50%), -16px 109px hsl(588.6, 100%, 50%), -18px 110px hsl(594, 100%, 50%), -20px 111px hsl(599.4, 100%, 50%), -22px 112px hsl(604.8, 100%, 50%), -23px 113px hsl(610.2, 100%, 50%), -25px 114px hsl(615.6, 100%, 50%), -27px 115px hsl(621, 100%, 50%), -28px 116px hsl(626.4, 100%, 50%), -30px 117px hsl(631.8, 100%, 50%), -32px 118px hsl(637.2, 100%, 50%), -33px 119px hsl(642.6, 100%, 50%), -35px 120px hsl(648, 100%, 50%), -36px 121px hsl(653.4, 100%, 50%), -38px 122px hsl(658.8, 100%, 50%), -39px 123px hsl(664.2, 100%, 50%), -41px 124px hsl(669.6, 100%, 50%), -42px 125px hsl(675, 100%, 50%), -43px 126px hsl(680.4, 100%, 50%), -45px 127px hsl(685.8, 100%, 50%), -46px 128px hsl(691.2, 100%, 50%), -47px 129px hsl(696.6, 100%, 50%), -48px 130px hsl(702, 100%, 50%), -49px 131px hsl(707.4, 100%, 50%), -50px 132px hsl(712.8, 100%, 50%), -51px 133px hsl(718.2, 100%, 50%), -52px 134px hsl(723.6, 100%, 50%), -53px 135px hsl(729, 100%, 50%), -54px 136px hsl(734.4, 100%, 50%), -55px 137px hsl(739.8, 100%, 50%), -55px 138px hsl(745.2, 100%, 50%), -56px 139px hsl(750.6, 100%, 50%), -57px 140px hsl(756, 100%, 50%), -57px 141px hsl(761.4, 100%, 50%), -58px 142px hsl(766.8, 100%, 50%), -58px 143px hsl(772.2, 100%, 50%), -58px 144px hsl(777.6, 100%, 50%), -59px 145px hsl(783, 100%, 50%), -59px 146px hsl(788.4, 100%, 50%), -59px 147px hsl(793.8, 100%, 50%), -59px 148px hsl(799.2, 100%, 50%), -59px 149px hsl(804.6, 100%, 50%), -60px 150px hsl(810, 100%, 50%), -59px 151px hsl(815.4, 100%, 50%), -59px 152px hsl(820.8, 100%, 50%), -59px 153px hsl(826.2, 100%, 50%), -59px 154px hsl(831.6, 100%, 50%), -59px 155px hsl(837, 100%, 50%), -58px 156px hsl(842.4, 100%, 50%), -58px 157px hsl(847.8, 100%, 50%), -58px 158px hsl(853.2, 100%, 50%), -57px 159px hsl(858.6, 100%, 50%), -57px 160px hsl(864, 100%, 50%), -56px 161px hsl(869.4, 100%, 50%), -55px 162px hsl(874.8, 100%, 50%), -55px 163px hsl(880.2, 100%, 50%), -54px 164px hsl(885.6, 100%, 50%), -53px 165px hsl(891, 100%, 50%), -52px 166px hsl(896.4, 100%, 50%), -51px 167px hsl(901.8, 100%, 50%), -50px 168px hsl(907.2, 100%, 50%), -49px 169px hsl(912.6, 100%, 50%), -48px 170px hsl(918, 100%, 50%), -47px 171px hsl(923.4, 100%, 50%), -46px 172px hsl(928.8, 100%, 50%), -45px 173px hsl(934.2, 100%, 50%), -43px 174px hsl(939.6, 100%, 50%), -42px 175px hsl(945, 100%, 50%), -41px 176px hsl(950.4, 100%, 50%), -39px 177px hsl(955.8, 100%, 50%), -38px 178px hsl(961.2, 100%, 50%), -36px 179px hsl(966.6, 100%, 50%), -35px 180px hsl(972, 100%, 50%), -33px 181px hsl(977.4, 100%, 50%), -32px 182px hsl(982.8, 100%, 50%), -30px 183px hsl(988.2, 100%, 50%), -28px 184px hsl(993.6, 100%, 50%), -27px 185px hsl(999, 100%, 50%), -25px 186px hsl(1004.4, 100%, 50%), -23px 187px hsl(1009.8, 100%, 50%), -22px 188px hsl(1015.2, 100%, 50%), -20px 189px hsl(1020.6, 100%, 50%), -18px 190px hsl(1026, 100%, 50%), -16px 191px hsl(1031.4, 100%, 50%), -14px 192px hsl(1036.8, 100%, 50%), -13px 193px hsl(1042.2, 100%, 50%), -11px 194px hsl(1047.6, 100%, 50%), -9px 195px hsl(1053, 100%, 50%), -7px 196px hsl(1058.4, 100%, 50%), -5px 197px hsl(1063.8, 100%, 50%), -3px 198px hsl(1069.2, 100%, 50%), -1px 199px hsl(1074.6, 100%, 50%), -1px 200px hsl(1080, 100%, 50%), 1px 201px hsl(1085.4, 100%, 50%), 3px 202px hsl(1090.8, 100%, 50%), 5px 203px hsl(1096.2, 100%, 50%), 7px 204px hsl(1101.6, 100%, 50%), 9px 205px hsl(1107, 100%, 50%), 11px 206px hsl(1112.4, 100%, 50%), 13px 207px hsl(1117.8, 100%, 50%), 14px 208px hsl(1123.2, 100%, 50%), 16px 209px hsl(1128.6, 100%, 50%), 18px 210px hsl(1134, 100%, 50%), 20px 211px hsl(1139.4, 100%, 50%), 22px 212px hsl(1144.8, 100%, 50%), 23px 213px hsl(1150.2, 100%, 50%), 25px 214px hsl(1155.6, 100%, 50%), 27px 215px hsl(1161, 100%, 50%), 28px 216px hsl(1166.4, 100%, 50%), 30px 217px hsl(1171.8, 100%, 50%), 32px 218px hsl(1177.2, 100%, 50%), 33px 219px hsl(1182.6, 100%, 50%), 35px 220px hsl(1188, 100%, 50%), 36px 221px hsl(1193.4, 100%, 50%), 38px 222px hsl(1198.8, 100%, 50%), 39px 223px hsl(1204.2, 100%, 50%), 41px 224px hsl(1209.6, 100%, 50%), 42px 225px hsl(1215, 100%, 50%), 43px 226px hsl(1220.4, 100%, 50%), 45px 227px hsl(1225.8, 100%, 50%), 46px 228px hsl(1231.2, 100%, 50%), 47px 229px hsl(1236.6, 100%, 50%), 48px 230px hsl(1242, 100%, 50%), 49px 231px hsl(1247.4, 100%, 50%), 50px 232px hsl(1252.8, 100%, 50%), 51px 233px hsl(1258.2, 100%, 50%), 52px 234px hsl(1263.6, 100%, 50%), 53px 235px hsl(1269, 100%, 50%), 54px 236px hsl(1274.4, 100%, 50%), 55px 237px hsl(1279.8, 100%, 50%), 55px 238px hsl(1285.2, 100%, 50%), 56px 239px hsl(1290.6, 100%, 50%), 57px 240px hsl(1296, 100%, 50%), 57px 241px hsl(1301.4, 100%, 50%), 58px 242px hsl(1306.8, 100%, 50%), 58px 243px hsl(1312.2, 100%, 50%), 58px 244px hsl(1317.6, 100%, 50%), 59px 245px hsl(1323, 100%, 50%), 59px 246px hsl(1328.4, 100%, 50%), 59px 247px hsl(1333.8, 100%, 50%), 59px 248px hsl(1339.2, 100%, 50%), 59px 249px hsl(1344.6, 100%, 50%), 60px 250px hsl(1350, 100%, 50%), 59px 251px hsl(1355.4, 100%, 50%), 59px 252px hsl(1360.8, 100%, 50%), 59px 253px hsl(1366.2, 100%, 50%), 59px 254px hsl(1371.6, 100%, 50%), 59px 255px hsl(1377, 100%, 50%), 58px 256px hsl(1382.4, 100%, 50%), 58px 257px hsl(1387.8, 100%, 50%), 58px 258px hsl(1393.2, 100%, 50%), 57px 259px hsl(1398.6, 100%, 50%), 57px 260px hsl(1404, 100%, 50%), 56px 261px hsl(1409.4, 100%, 50%), 55px 262px hsl(1414.8, 100%, 50%), 55px 263px hsl(1420.2, 100%, 50%), 54px 264px hsl(1425.6, 100%, 50%), 53px 265px hsl(1431, 100%, 50%), 52px 266px hsl(1436.4, 100%, 50%), 51px 267px hsl(1441.8, 100%, 50%), 50px 268px hsl(1447.2, 100%, 50%), 49px 269px hsl(1452.6, 100%, 50%), 48px 270px hsl(1458, 100%, 50%), 47px 271px hsl(1463.4, 100%, 50%), 46px 272px hsl(1468.8, 100%, 50%), 45px 273px hsl(1474.2, 100%, 50%), 43px 274px hsl(1479.6, 100%, 50%), 42px 275px hsl(1485, 100%, 50%), 41px 276px hsl(1490.4, 100%, 50%), 39px 277px hsl(1495.8, 100%, 50%), 38px 278px hsl(1501.2, 100%, 50%), 36px 279px hsl(1506.6, 100%, 50%), 35px 280px hsl(1512, 100%, 50%), 33px 281px hsl(1517.4, 100%, 50%), 32px 282px hsl(1522.8, 100%, 50%), 30px 283px hsl(1528.2, 100%, 50%), 28px 284px hsl(1533.6, 100%, 50%), 27px 285px hsl(1539, 100%, 50%), 25px 286px hsl(1544.4, 100%, 50%), 23px 287px hsl(1549.8, 100%, 50%), 22px 288px hsl(1555.2, 100%, 50%), 20px 289px hsl(1560.6, 100%, 50%), 18px 290px hsl(1566, 100%, 50%), 16px 291px hsl(1571.4, 100%, 50%), 14px 292px hsl(1576.8, 100%, 50%), 13px 293px hsl(1582.2, 100%, 50%), 11px 294px hsl(1587.6, 100%, 50%), 9px 295px hsl(1593, 100%, 50%), 7px 296px hsl(1598.4, 100%, 50%), 5px 297px hsl(1603.8, 100%, 50%), 3px 298px hsl(1609.2, 100%, 50%), 1px 299px hsl(1614.6, 100%, 50%), 2px 300px hsl(1620, 100%, 50%), -1px 301px hsl(1625.4, 100%, 50%), -3px 302px hsl(1630.8, 100%, 50%), -5px 303px hsl(1636.2, 100%, 50%), -7px 304px hsl(1641.6, 100%, 50%), -9px 305px hsl(1647, 100%, 50%), -11px 306px hsl(1652.4, 100%, 50%), -13px 307px hsl(1657.8, 100%, 50%), -14px 308px hsl(1663.2, 100%, 50%), -16px 309px hsl(1668.6, 100%, 50%), -18px 310px hsl(1674, 100%, 50%), -20px 311px hsl(1679.4, 100%, 50%), -22px 312px hsl(1684.8, 100%, 50%), -23px 313px hsl(1690.2, 100%, 50%), -25px 314px hsl(1695.6, 100%, 50%), -27px 315px hsl(1701, 100%, 50%), -28px 316px hsl(1706.4, 100%, 50%), -30px 317px hsl(1711.8, 100%, 50%), -32px 318px hsl(1717.2, 100%, 50%), -33px 319px hsl(1722.6, 100%, 50%), -35px 320px hsl(1728, 100%, 50%), -36px 321px hsl(1733.4, 100%, 50%), -38px 322px hsl(1738.8, 100%, 50%), -39px 323px hsl(1744.2, 100%, 50%), -41px 324px hsl(1749.6, 100%, 50%), -42px 325px hsl(1755, 100%, 50%), -43px 326px hsl(1760.4, 100%, 50%), -45px 327px hsl(1765.8, 100%, 50%), -46px 328px hsl(1771.2, 100%, 50%), -47px 329px hsl(1776.6, 100%, 50%), -48px 330px hsl(1782, 100%, 50%), -49px 331px hsl(1787.4, 100%, 50%), -50px 332px hsl(1792.8, 100%, 50%), -51px 333px hsl(1798.2, 100%, 50%), -52px 334px hsl(1803.6, 100%, 50%), -53px 335px hsl(1809, 100%, 50%), -54px 336px hsl(1814.4, 100%, 50%), -55px 337px hsl(1819.8, 100%, 50%), -55px 338px hsl(1825.2, 100%, 50%), -56px 339px hsl(1830.6, 100%, 50%), -57px 340px hsl(1836, 100%, 50%), -57px 341px hsl(1841.4, 100%, 50%), -58px 342px hsl(1846.8, 100%, 50%), -58px 343px hsl(1852.2, 100%, 50%), -58px 344px hsl(1857.6, 100%, 50%), -59px 345px hsl(1863, 100%, 50%), -59px 346px hsl(1868.4, 100%, 50%), -59px 347px hsl(1873.8, 100%, 50%), -59px 348px hsl(1879.2, 100%, 50%), -59px 349px hsl(1884.6, 100%, 50%), -60px 350px hsl(1890, 100%, 50%), -59px 351px hsl(1895.4, 100%, 50%), -59px 352px hsl(1900.8, 100%, 50%), -59px 353px hsl(1906.2, 100%, 50%), -59px 354px hsl(1911.6, 100%, 50%), -59px 355px hsl(1917, 100%, 50%), -58px 356px hsl(1922.4, 100%, 50%), -58px 357px hsl(1927.8, 100%, 50%), -58px 358px hsl(1933.2, 100%, 50%), -57px 359px hsl(1938.6, 100%, 50%), -57px 360px hsl(1944, 100%, 50%), -56px 361px hsl(1949.4, 100%, 50%), -55px 362px hsl(1954.8, 100%, 50%), -55px 363px hsl(1960.2, 100%, 50%), -54px 364px hsl(1965.6, 100%, 50%), -53px 365px hsl(1971, 100%, 50%), -52px 366px hsl(1976.4, 100%, 50%), -51px 367px hsl(1981.8, 100%, 50%), -50px 368px hsl(1987.2, 100%, 50%), -49px 369px hsl(1992.6, 100%, 50%), -48px 370px hsl(1998, 100%, 50%), -47px 371px hsl(2003.4, 100%, 50%), -46px 372px hsl(2008.8, 100%, 50%), -45px 373px hsl(2014.2, 100%, 50%), -43px 374px hsl(2019.6, 100%, 50%), -42px 375px hsl(2025, 100%, 50%), -41px 376px hsl(2030.4, 100%, 50%), -39px 377px hsl(2035.8, 100%, 50%), -38px 378px hsl(2041.2, 100%, 50%), -36px 379px hsl(2046.6, 100%, 50%), -35px 380px hsl(2052, 100%, 50%), -33px 381px hsl(2057.4, 100%, 50%), -32px 382px hsl(2062.8, 100%, 50%), -30px 383px hsl(2068.2, 100%, 50%), -28px 384px hsl(2073.6, 100%, 50%), -27px 385px hsl(2079, 100%, 50%), -25px 386px hsl(2084.4, 100%, 50%), -23px 387px hsl(2089.8, 100%, 50%), -22px 388px hsl(2095.2, 100%, 50%), -20px 389px hsl(2100.6, 100%, 50%), -18px 390px hsl(2106, 100%, 50%), -16px 391px hsl(2111.4, 100%, 50%), -14px 392px hsl(2116.8, 100%, 50%), -13px 393px hsl(2122.2, 100%, 50%), -11px 394px hsl(2127.6, 100%, 50%), -9px 395px hsl(2133, 100%, 50%), -7px 396px hsl(2138.4, 100%, 50%), -5px 397px hsl(2143.8, 100%, 50%), -3px 398px hsl(2149.2, 100%, 50%), -1px 399px hsl(2154.6, 100%, 50%); font-size: 40px;';

console.log('%cHey %s', css, 'Happy Birthday Again, Babe');
console.log(
  '%c Damn girl, you checking here? You really like playing detective, huh? ',
  'padding:2px; background: #111; color: #7cd'
);

console.log(
  "%c You see the error messages below? Shh, don't let them know your babe is bad at writing good code. ",
  'padding:2px; background: rgb(104, 175, 234); color: #000'
);
var os = window.navigator.userAgent;
var message = 'someone visited page3 from using ' + os;
console.log(message);
discord_message('Visitor log', message);
