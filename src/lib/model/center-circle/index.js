const color = 'yellow'; // default color

export default class CenterCircle {
  constructor(parallelogram, context) {
    this.parallelogram = parallelogram;
    this.context = context;
  }

  draw() {
    // use the same center of mass as the parallelogram
    const x = this.parallelogram.centerOfMass.x;
    const y = this.parallelogram.centerOfMass.y;
    // calculate the radius based on parallelogram area
    const radius = Math.round(Math.sqrt(this.parallelogram.area / Math.PI));

    // draw the circle
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = color;
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.context.stroke();
  }
}
