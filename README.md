<h1 align="center">Shapes</h1>

<div align="center">

A canvas plugin to draw geometrical shapes

**live preview:** https://canvas-shapes.herokuapp.com/

[![Build Status](https://travis-ci.org/pedrofurst/shapes.svg?branch=master)](https://travis-ci.org/pedrofurst/shapes)
[![codecov](https://codecov.io/gh/pedrofurst/shapes/branch/master/graph/badge.svg)](https://codecov.io/gh/pedrofurst/shapes)
![Heroku](https://heroku-badge.herokuapp.com/?app=canvas-shapes)
![David (path)](https://img.shields.io/david/pedrofurst/shapes)
</div>

## Requirements
  * node > 10 (only for dev environment)

## Integrations 
  * [Travis ci](https://travis-ci.org/)
  * [codecov](https://codecov.io/)
  * [heroku](https://dashboard.heroku.com/)

## How to run
  * **Production**: just open `dist/index.html`
  * **Development**:
```sh
// install dependencies
$ yarn

// start develop server
$ yarn start:dev
```
## Goal
Based on 3 random user points:
  * Calculate the missing parallelogram point
  * Calculate the parallelogram area
  * Calculate the parallelogram center of mass
  * Draw the parallelogram
  * Draw a circle using the same parallelogram area and center of mass position

The user can put three random points on the screen.
When the user adds a third point the app will calculate the fourth parallelogram point based on the inputted points.
After that, the app will draw the parallelogram, the circle and show the calculated area.

![image](https://user-images.githubusercontent.com/4452152/67042309-fd629800-f0fd-11e9-9bb0-8007a1e8d322.png)

## Usage
### User actions:
  * Mouse click to put a point
  * Mouse click and move when the draw is finished
  * `RESET` button: reset the screen
  * `ABOUT` button: informations

![test](https://user-images.githubusercontent.com/4452152/67043241-0fddd100-f100-11e9-8ae6-5ccd53e09e7b.gif)

