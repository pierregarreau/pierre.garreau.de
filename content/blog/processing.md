---
title: "Why FFT matters to undergraduates?"
draft: false
hasLatex: true
date: 2017-11-14T20:42:14+01:00
isProcessing: true
description: "Build an equalizer with the Fourier transform and P5.js"
tags: [ "Tech", "Arts", "JS" ]
---

<div id="sketch-holder">
  <!-- p5 sketch goes here -->
</div>

**Above**: Live graphics created for a music set at *Pimp the Chateau*, France, December 2009. Click anywhere on the page to *pause / play*. Music [Maison Kitsune](https://shop.kitsune.fr/music/music/compilation.html?___store=kitsune_fr_fr).

## Introduction

In my third year of grad school, I decided to gather up all the good people I had met so far. A close group of friends and I brainstormed ideas about what would make an event special. We decided it needed *an identity*. This is how the *Pimp the Chateau* series was born, and the graphics above were created.

*These* are a typical application of what undergraduate applied mathematics can do, I thought it was worth sharing, for others to create their own, and for other applications than live audio stream processing. Perhaps can it stimulate interest in [Processing](https://processing.org/) - an amazing project and library for visual arts - and its recent port to javascript, named [P5.js](https://p5js.org/). If this blog post resonates with you in anyway, I warmly recommend the following documentary on the visual arts revolution that *Processing* started: [HELLO WORLD! Processing](https://vimeo.com/60735314).

So here we are, this blog post is about how to build a custom equalizer with P5.js. What we will do next is:

  - recall what the Fourier Transform is;
  - discuss how to implement a custom equalizer with P5.js;
  - in the process of doing so, gather up a couple of *interview questions* for quants or data engineers to be, and;
  - write some code;

You can also - just - jump to [code](#setting-up-a-p5.js-canvas).

## Some undergraduate mathematics

We first need to define what an equalizer is. And while the early XIX's century surely was not busy thinking about those things, we shall start with talking about Joseph Fourier. If you know what a Fast Fourier Transform is, or wish to skip our history bubble, scroll to the next section.

Joseph Fourier is the father of a method used to decompose square integrable functions into an infinite series of exponential functions: the Fourier transform. It was originally published in 1822 when J. Fourier was studying [heat transfers](https://www.worldcat.org/title/theorie-analytique-de-la-chaleur/oclc/2688081). Because it makes it easier to study phenomena involving [waves](https://en.wikipedia.org/wiki/Wave) - and with it signal processing, electro magnetism, mechanics, differential equations - the Fourier transform is undoubtedly one of the most important discoveries of the XIX's century.

In essence, one transforms a function $f: t \to f(t)$ of time to a function $\hat{f}: \omega \to \hat{f}(\omega)$ of frequencies. The animation below - credit [wikipedia](https://upload.wikimedia.org/wikipedia/commons/7/72/Fourier_transform_time_and_frequency_domains_%28small%29.gif) - shows that mapping for a function defined as the sum of six sinusoids.

<img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Fourier_transform_time_and_frequency_domains_%28small%29.gif" class='img-center'/>

Numerically, Fourier transforms are approximated with finite series, see for instance [these lecture notes](http://www.robots.ox.ac.uk/~sjrob/Teaching/SP/l7.pdf). Each coefficient of the approximated series corresponds to the amplitude of a given frequency. *That* is our equalizer. Numerically, one needs an efficient way to compute this approximated series, and while javascript may not be the best candidate for doing so, the [sound](https://p5js.org/reference/#/libraries/p5.sound) library of P5.js provides us with an implementation. To dig a bit deeper, here are two more references:

- [Lecture notes](https://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/www/notes/fourier/fourier.pdf) about the Fourier and the Fast Fourier Transform;
- A discussion of efficient computations of discrete Fourier series known as the [Fastest Fourier Transform of the West](http://fftw.org/) project.

## What *is* an equalizer ?

An equalizer can be defined as *a sequence of discrete Fourier transforms on an audio stream*. Rephrase: an equalizer is a list of amplitudes for specified frequencies - bass, treble - at different time steps. The following algorithm should therefore get us started:

```
- For each time step,
- - sampledAudio = Sample(audio stream)
- - amplitudes, frequencies = Fourier Transform [sampledAudio]
- - display(amplitude, frequencies)
```

In the algorithm above, the `display` function is where you can get creative. The Fourier transform will give us a list of amplitudes. This can be mapped to a color or transparency scheme, for example. For the frequencies, we are looking for a spatial map, from a list to another data structure.

Let's take the grid showed in the example at the top of this page. Frequencies are listed from the bottom left corner to the top right corner. We map indexed frequencies from $1, \ldots, N$ to a position $(i,j)$ on the grid which reflect this bottom-left-to-top-right logic.

So, given sampled amplitude and frequencies, what would an API for this Grid look like ? We need some sort of initialization to create the grid, first based on number of rows and columns, then optimized to fit our canvas size. Then we need an `equalize` routine, which will display the frequencies on the grid. In javascript, this would look something like this:

```javascript
function Grid(num_rows, num_cols){
  ...
  this.initialize = function(canva_width, canva_height){
    this.create_grid(canva_width, canva_height);
    this.mapping = new Mapping();
  };
  this.equalize = function(frequencies){
    ...
    this.grid[i][j].display(frequencies[this.mapping[i][j]]);
    ...
  }
}
```
There are many different mappings of array to matrix that one can build. And curiously enough, it seems that this `Grid` object naturally raises questions that beg to be asked in interviews, typically for quants or data engineering positions. Here are a few:

- *Write your own function to map an $N$ dimensional array to an $n \times m$ matrix*.
- *How does one efficiently traverse a matrix [in spiral](http://4.bp.blogspot.com/-AcneqVltY3g/Uiy0JMTXuiI/AAAAAAAAAfA/xN5k_GyRJYg/s1600/Spiral.jpg)*?
- *Can you write a piece of code that maps an array 1, 2, ..., N to a [zigzag matrix](https://www.pantechsolutions.net/blog/wp-content/uploads/2014/01/zig-zag-ordering.jpg)*?
- *Imagine we want to build an $n\times m$ grid of squares on a canvas of size $W \times H$. We want all squares of the same edge size and all equally separated by the same spacing. Can you write a piece of code to do that ? Is there always a solution to this problem ?*.

Ok, we have all the elements to start coding. Have a look at the [reference page](https://p5js.org/reference/) for P5.js if you need more verbose.

## <a name="setting-up-a-p5.js-canvas"></a> Equalize with P5.js

For your canvas to load in your html page, make sure you have the P5.js libraries locally, and that these are correctly included. These are needed to manipulate the DOM and process the sound stream. Your P5.js code goes in a `sketch.js` file. Your html should look like this:

```html
<div id="canvas-div-id">
  <!-- your sketch goes here -->
</div>

<script type="text/javascript" src="/static/p5.min.js"></script>
<script type="text/javascript" src="/static/p5.dom.js"></script>
<script type="text/javascript" src="/static/p5.sound.min.js"></script>
<script type="text/javascript" src="/assets/sketch.js"></script>
```

Processing sketches are organized in three main parts: `preload`, `setup` and `draw`. The two first routines are used to set up your canvas. The function `draw` is the one called at every frame processing. You can set a particular `frameRate` to draw a specific number of frames per seconds. So, the skeleton of your `sketch.js` should look like this:

```javascript
function preload() {
  ...
}
function setup(){
    const canva_width = ...;
    const canva_height = ...;
    var canvas = createCanvas(canva_width, canva_height);
    canvas.parent('canvas-div-id');
    ...
}
function draw() {
  ...
}
```

The `canvas.parent('canvas-div-id')` is used to inject your canvas to a particular div-id in your html. Because we are manipulating audio, the `preload` function will need to fetch your music and background files. Note that the audio stream can also be replaced with a microphone input, so the stream is actually *LIVE*.

```javascript
function preload() {
    soundFormats('ogg', 'mp3');
    soundStream = loadSound('/assets/club3.mp3');
    background = loadImage("/assets/FLY00.gif");
}
```

The `setup` routine specifies the FFT input and creates the grid.

```javascript
function setup(){
    ... // as above

    fft = new p5.FFT();
    fft.setInput(soundStream);

    var cols = 12;
    var rows = 8;
    grid = new Grid(rows, cols);
    grid.initialize(canvas_width, canvas_height);
}
```

The `draw` function calls our `grid.equalize` on top of the background image. For completeness:
```javascript
function draw() {
    image(background, 0, 0)
    grid.equalize();
}
```

That's it! Is only missing the implementation of the Grid object. I suggested an API above, feel free to write your own implementation, adapt, or copy [this sketch](/js/p5/sketch.js).

## Closing

Processing is an amazing framework for prototyping visual arts with code. The community around the project is vast, see for instance this online series of tutorials at [hello processing](http://hello.processing.org/) - and the creativity used in the [applications](https://www.processing.org/exhibition/) of the library is outstanding. We have seen in this post that 50 lines of code give you dynamic graphics generation based on an audio stream. Imagine what you can do with a 100 lines !!!



<script type="text/javascript" src="/js/p5/p5.min.js"></script>
<script type="text/javascript" src="/js/p5/p5.dom.js"></script>
<script type="text/javascript" src="/js/p5/p5.sound.min.js"></script>
<script type="text/javascript" src="/js/p5/sketch.js"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$'], ['\[','\]']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
  });
</script>

<script type="text/x-mathjax-config">
  MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
  });
</script>
