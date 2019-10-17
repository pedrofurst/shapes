const color = 'red'; // default color
const diameter = 11; // static diameter 11
const radius = diameter / 2; // calculate radius based on diameter

export default class Point {
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.context = context;
  }

  // function to identify if the user clicks on this point
  isClickedAbove = (x, y) => x < this.x + diameter && x > this.x - diameter && y < this.y + diameter && y > this.y - diameter;

  // function to draw the point
  draw() {
    // draw center dot
    this.drawCircle(0.4);

    // draw target circle
    this.drawCircle(radius);

    // draw caption to the point
    this.drawCaption();
  }

  // function to draw a circle
  drawCircle(radius) {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    this.context.stroke();
  }

  // function to draw labels under the selected points
  drawCaption() {
    this.context.font = "10px Verdana";
    this.context.textAlign = "center";
    this.context.fillText(`x: ${this.x}`, this.x, this.y + 20);
    this.context.fillText(`y: ${this.y}`, this.x, this.y + 35);
  }

}
