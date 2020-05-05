// Copyright (c) 2017 Pierre Garreau
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var grid;
var playb = false;
var background;

var YELLOW = [255, 237, 31, 1];
var PINK = [245, 30, 91, 1];
var BLACK = [0, 0, 0, 1];

var fft;
var soundStream;

function preload() {
    soundFormats('ogg', 'mp3');
    soundStream = loadSound('/js/p5/assets/club3.mp3');
    background = loadImage("/js/p5/assets/FLY00.gif");
}

function setup(){
    const canvas_width = 763;
    const canvas_height = 511;
    var canvas = createCanvas(canvas_width, canvas_height);
    canvas.parent('sketch-holder');

    fft = new p5.FFT();
    fft.setInput(soundStream);

    var cols = 12;
    var rows = 8;
    grid = new Grid(rows, cols);
    grid.initialize(canvas_width, canvas_height);

    stroke(255);
    noFill();
    // frameRate(35);
}

function draw() {
    image(background, 0, 0)
    if (playb) {
      grid.equalize();
    }
    else {
      grid.oscillate();
    }
}

function Grid(num_rows, num_cols){
  this.cols = num_cols;
  this.rows = num_rows;
  this.grid = []; this.grid.length = this.rows;
  this.num_tiles = this.cols * this.rows;
  this.equalizer = []; this.equalizer.length = this.rows;

  this.initialize = function(canvas_width, canvas_height){
    this.compute_edge_and_spacing(canvas_width, canvas_height);
    for (i = 0; i < this.rows; i++) {
        this.grid[i] = []; this.grid[i].length = this.cols;
        for (j = 0; j < this.cols; j++) {
            this.grid[i][j] = new Cell(this.edge,
                                       this.edge,
                                       this.spacing * (j + 1) + j * this.edge,
                                       this.spacing * (i + 1) + i * this.edge,
                                       i + j);
        }
    }

    var mapping = new ZigZag();
    // var mapping = new Spiral();
    this.equalizer = mapping.getmap(this.rows, this.cols);
  };

  this.compute_edge_and_spacing = function(canvas_width, canvas_height){
    // Note that:
    // width = col (e + s) + s
    // height = row (e + s) + s
    // does not always have e > 0 and s > 0 as solution !
    var delta = 0;
    if (canvas_width == canvas_height){
      delta = 1; this.cols = this.rows;
    }
    else {
      delta = (canvas_width - canvas_height) / (this.cols - this.rows);
    }
    this.spacing = canvas_height - this.rows * delta;
    this.edge = delta - this.spacing;
  }

  this.oscillate = function(){
    for (i = 0; i < this.rows; i++) {
        for (j = 0; j < this.cols; j++) {
            this.grid[i][j].oscillate();
            this.grid[i][j].display();
        }
    }
  }

  this.equalize = function(){
    var spectrum = fft.analyze();
    var averages = fft.linAverages(floor(1.2*this.num_tiles));
    for (i = 0; i < this.rows; i++) {
        for (j = 0; j < this.cols; j++) {
          if (this.equalizer[i][j] != null){
            this.grid[i][j].equalize(averages[this.equalizer[i][j]]);
            this.grid[i][j].display();
          }
        }
    }
  }
}

function Cell(width, height, pos_x, pos_y, transparency){
    this.width = width;
    this.height = height;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.transparency = transparency;
    this.color = BLACK;

    this.equalize = function(frequency){
        this.coin_toss([0.002, 0.005]);
        this.color[3] = 1.10 * frequency;
    }

    this.oscillate = function(){
        this.coin_toss([0.001, 0.003]);
        this.transparency += 0.02;
        this.color[3] = 100 + 100*sin(this.transparency);
    }

    this.coin_toss = function(probabilities) {
        coin_toss = random();
        if (coin_toss < probabilities[0]) {
            this.color = YELLOW;
        }
        else if (coin_toss < probabilities[1]) {
            this.color = PINK;
        }
        else {
            this.color = BLACK;
        }
    }

    this.display = function(){
        stroke(245, 30, 191, 100);
        // Color calculated using sine wave
        fill(this.color);
        rect(this.pos_x, this.pos_y, this.width, this.height);
    }
}

function Spiral(){
  // Spiral: the first row plus a smaller spiral rotated 90 degrees clockwise
  this.getmap = function (rows, cols) {
    var n_start = 0;
    return rows ? [this.range(n_start, (n_start + cols) - 1)].concat(
      this.transpose(
        this.getmap(cols, rows - 1, n_start + cols)
      ).map(this.reverse)
    ) : [
      []
    ];
  }

  // rows and columns transposed (for 90 degree rotation)
  this.transpose = function(array) {
    return array.length > 1 ? array[0].map(function (_, col) {
      return array.map(function (row) {
        return row[col];
      });
    }) : array;
  }

  // elements in reverse order (for 90 degree rotation)
  this.reverse = function reverse(array) {
    return array.length > 1 ? array.reduceRight(function (acc, x) {
      return acc.concat(x);
    }, []) : array;
  }

  // [m..n]
  this.range = function(m, n) {
    return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
      return m + i;
    });
  }
}

function ZigZag(){

  this.indexes = [];

  this.getmap = function(rows, cols) {
    this.initialize(rows, cols);
    return this.getElements(rows, cols);
  }

  this.initialize = function(rows, cols) {
    this.indexes.length = rows;
    for (i = 0; i < rows; i++) {
      this.indexes[i] = []; this.indexes[i].length = cols;
    }
  }

  this.getElements = function(rows, cols) {
    var i = rows - 1;
    var j = 0;
    var counter=0;
    var k;
    var l;
    while (j < cols){
        k = i; l = j;
        while (k < rows && l < cols){
            this.indexes[k][l] = counter;
            l++; k++; counter++;
        }
        if (i > 0) {
          i--;
        }
        else {
          j++;
        }
      }
    return this.indexes;
  }

}

function mousePressed(){
  if (playb) {
    soundStream.pause();
    playb = false;
  }
  else {
    soundStream.play();
    playb = true;
  }
}
