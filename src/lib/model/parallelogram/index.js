import Point from '../point/index';

const color = 'blue'; // default color

export default class Parallelogram {
  constructor(points, context) {
    if(points.length <= 3){
      // calculate the last point when instance a Index
      const lastParallelogramPosition = Parallelogram.calculateLastParallelogramPosition(points);

      // create parallelogram using 4 points
      this.points = [...points, new Point(lastParallelogramPosition.x, lastParallelogramPosition.y, context)];
    }
    this.context = context;
  }

  // static function to calculate the fourth parallelogram point
  static calculateLastParallelogramPosition(points) {
    const A = points[0];
    const B = points[1];
    const C = points[2];
    const x = A.x - B.x + C.x;
    const y = A.y - B.y + C.y;
    return {x, y};
  }

  // define a prototype method to get center of mass
  get centerOfMass() {
    return {x: this.getCenter('x'), y: this.getCenter('y')};
  }

  // define a prototype method to get the area calculated
  get area() {
    return this.calculateArea();
  }

  // function to draw the complete parallelogram
  draw() {
    this.drawParallelogram();
    this.drawCaptions();
  }

  // function to draw the parallelogram
  drawParallelogram() {
    this.context.beginPath();
    this.context.moveTo(this.points[0].x, this.points[0].y);
    this.points.map(p => this.context.lineTo(p.x, p.y));
    this.context.closePath();
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  // function to draw area info at the upper left hand corner
  drawCaptions() {
    this.context.font = '24px Verdana';
    this.context.textAlign = 'start';
    this.context.fillText(`Area: ${this.area}`, 10, 30);
  }

  // function to calculate the center position
  // params: coordinate can be 'x' or 'y'
  // result: the number calculated based on the points
  getCenter(coordinate) {
    const points = this.points.map(point => point[coordinate]);
    return points.reduce((total, amount) => total + amount) / points.length;
  }

  // function to calculate the area
  calculateArea() {
    let area = 0;
    // looping to using 2 cursors to calculate the area
    // the first cursor will start at 0
    // the second cursor will start at last position
    // the loop will calculate the area based on the points
    for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i, i += 1) {
      const point1 = this.points[i];
      const point2 = this.points[j];
      area += point1.x * point2.y;
      area -= point1.y * point2.x;
    }
    return Math.abs(area / 2);
  }

}
