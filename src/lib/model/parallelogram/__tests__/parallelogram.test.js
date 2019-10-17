import Parallelogram from '../index';

const newPoint = (x, y) => ({x, y});

const POINT_A = newPoint(1, 5);
const POINT_B = newPoint(2, 3);
const POINT_C = newPoint(3, 6);

const DEFAULT_POINTS = [POINT_A, POINT_B, POINT_C];

const DEFAULT_CENTER_OF_MASS = newPoint(2, 5.5);

const DEFAULT_AREA = 5;

describe('Parallelogram class', () => {

  it('Should instance the class and calculate the last parallelogram point', () => {
    const mockContext = {someContext: 'example'};
    const parallelogram = new Parallelogram(DEFAULT_POINTS, mockContext);
    const lastPoint = parallelogram.points[parallelogram.points.length - 1];
    expect(parallelogram.points.length).toEqual(4);
    expect(parallelogram.points[0]).toEqual(POINT_A);
    expect(parallelogram.points[1]).toEqual(POINT_B);
    expect(parallelogram.points[2]).toEqual(POINT_C);
    expect(lastPoint.x).toEqual(2);
    expect(lastPoint.y).toEqual(8);
    expect(parallelogram.context).toEqual(mockContext);
  });

  it('Should calculate the center of mass', () => {
    const parallelogram = new Parallelogram(DEFAULT_POINTS);
    expect(parallelogram.centerOfMass).toEqual(DEFAULT_CENTER_OF_MASS);
  });

  it('Should calculate the area', () => {
    const parallelogram = new Parallelogram(DEFAULT_POINTS);
    expect(parallelogram.area).toEqual(DEFAULT_AREA);
  });

  it('Should draw the parallelogram', () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '200');
    canvas.setAttribute('height', '200');
    const ctx = canvas.getContext('2d');
    const parallelogram = new Parallelogram(DEFAULT_POINTS, ctx);
    parallelogram.draw();
    expect(ctx.__getDrawCalls()).toMatchSnapshot();
  });
});

