// import classes
import CenterCircle from './model/center-circle';
import Point from './model/point';
import Parallelogram from './model/parallelogram';


export default class Shapes {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    // geometry attributes
    this.points = [];
    this.parallelogram = null;
    this.centerCircle = null;
    this.selectedPoint = null;

    // initialize the events
    this.initializeListeners();

    // bind function to expose to html
    this.reset = this.reset.bind(this);
  }

  initializeListeners() {
    // start mouse events
    this.canvas.addEventListener('mouseup', this.clearSelectedPoint.bind(this), false);
    this.canvas.addEventListener('mousedown', this.handleClick.bind(this), false);
    this.canvas.addEventListener('mousemove', this.movePoint.bind(this), false);

    // start responsible event
    window.addEventListener('resize', this.resize.bind(this), false);
  }

  // function to resize the canvas when change the window size
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.draw();
  }

  // function to clear selectedPoint when the user stops to move
  clearSelectedPoint() {
    this.selectedPoint = null;
    this.draw();
  }

  // function to move the selected point
  movePoint(e) {
    if (!this.selectedPoint) return;
    // get click position from event
    const {clientX: x, clientY: y} = e;

    // set next movement
    this.selectedPoint.x = x;
    this.selectedPoint.y = y;

    this.points = this.points.slice(0,3);
    this.drawShapes();
    // call to draw every movement
    this.draw();
  }

  handleClick(e) {
    const {clientX: x, clientY: y} = e;

    if (this.points.length > 3) { // only set selected point when has more than 3 points
      this.selectedPoint = this.points.find(point => point.isClickedAbove(x, y));
      return;
    }
    // push a new point
    this.points.push(new Point(x, y, this.context));
    if (this.points.length === 3) { // trigger to draw the shapes when user selects 3 points
      this.drawShapes();
    }

    // call draw function to draw on every click
    this.draw();
  }

  drawShapes() {
    this.parallelogram = new Parallelogram(this.points, this.context); // instancing a parallelogram
    this.points = this.parallelogram.points; // update points after the parallelogram calculate the last point
    this.centerCircle = new CenterCircle(this.parallelogram, this.context); // create a new center circle instance using parallelogram reference
  }

  draw() {
    // set fillStyle white to fill all the texts
    this.context.fillStyle = 'white';
    // clear canvas before drawing again
    this.clear();
    // drawing all points
    this.points.forEach(point => point.draw());

    // drawing shapes
    if (this.parallelogram) {
      this.parallelogram.draw();
      this.centerCircle.draw();
    }
  }

  // function to clear the context
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // function to reset the values to default
  reset() {
    this.points = [];
    this.parallelogram = null;
    this.centerCircle = null;
    this.selectedPoint = null;
    this.clear();
  }

}
