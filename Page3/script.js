window.ws = new WebSlides({ autoslide: 20000, loop: false });
let x = document.getElementById('float-button');
let y = new Audio(
  'https://upload.wikimedia.org/wikipedia/commons/d/de/Happy_birthday.ogg'
);
x.onclick = e => {
  console.log('clicked');
  if (y.paused) {
    console.log('play');
    y.play();
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
