import Shapes from '../shapes';
import Point from '../model/point';
import Parallelogram from '../model/parallelogram';
import CenterCircle from '../model/center-circle';

jest.mock('../model/parallelogram');
jest.mock('../model/center-circle');
jest.mock('../model/point');

const newPoint = (x, y) => ({x, y});

const POINT_A = newPoint(2, 2);
const POINT_B = newPoint(3, 5);
const POINT_C = newPoint(6, 2);

const DEFAULT_POINTS = [POINT_A, POINT_B, POINT_C];

describe('Shapes class', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.setAttribute('width', '200');
  canvas.setAttribute('height', '200');

  it('Should draw a point', () => {
    const shapes = new Shapes(canvas);
    const point = new Point();
    point.draw = jest.fn();
    shapes.points = [point];
    shapes.draw();
    expect(point.draw).toHaveBeenCalled();
  });

  it('Should draw a parallelogram and circle', () => {
    const shapes = new Shapes(canvas);
    const parallelogram = new Parallelogram(DEFAULT_POINTS, ctx);
    const centerCircle = new CenterCircle(parallelogram, ctx);
    parallelogram.draw = jest.fn();
    centerCircle.draw = jest.fn();
    shapes.parallelogram = parallelogram;
    shapes.centerCircle = centerCircle;
    shapes.draw();
    expect(parallelogram.draw).toHaveBeenCalled();
    expect(centerCircle.draw).toHaveBeenCalled();
  });

  it('Should reset the values to default', () => {
    ctx.clearRect = jest.fn();
    const shapes = new Shapes(canvas);
    shapes.points = 1;
    shapes.parallelogram = 1;
    shapes.centerCircle = 1;
    shapes.selectedPoint = 1;
    shapes.reset();
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 200, 200);
    expect(shapes.points).toEqual([]);
    expect(shapes.parallelogram).toBe(null);
    expect(shapes.centerCircle).toBe(null);
    expect(shapes.selectedPoint).toBe(null);
  });

  describe('Handle click', () => {
    const parallelogramConstructor = jest.fn();
    const circleCenterConstructor = jest.fn();
    const event = {clientX: 4, clientY: 4};
    beforeAll(() => {
      Parallelogram.mockImplementation(parallelogramConstructor);
      CenterCircle.mockImplementation(circleCenterConstructor);
      Point.mockImplementation((x, y) => ({x, y}));
    });

    it('Should only add the point when has less than 3 points', () => {
      const shapes = new Shapes(canvas);
      shapes.draw = jest.fn();
      expect(shapes.points.length).toBe(0);
      shapes.handleClick(event);
      expect(shapes.points.length).toBe(1);
      expect(shapes.points[0].x).toBe(4);
      expect(shapes.points[0].y).toBe(4);
      expect(shapes.draw).toBeCalled();
    });
    it('Should instance parallelogram, circle and update last point when use add the third point ', () => {
      const mockedContext = {context: 'test'};
      canvas.getContext = jest.fn().mockImplementation(() => (mockedContext));
      const shapes = new Shapes(canvas);
      const pointA = {x: 5, y: 2};
      const pointB = {x: 1, y: 3};
      const points = [pointA, pointB];
      shapes.points = points;
      shapes.draw = jest.fn();
      expect(shapes.points.length).toBe(2);
      expect(shapes.parallelogram).toBe(null);
      expect(shapes.centerCircle).toBe(null);
      shapes.handleClick(event);
      expect(parallelogramConstructor).toHaveBeenCalledWith(points, mockedContext);
      expect(circleCenterConstructor).toHaveBeenCalledWith(shapes.parallelogram, mockedContext);
      expect(shapes.draw).toHaveBeenCalled();
    });

    it('Should set selected point when has 4 points and click again', () => {
      Point.mockImplementation((x, y) => {
        return {
          x,
          y,
          isClickedAbove: (a, b) => a === 4 && b === 4
        };
      });
      const selected = new Point(4, 4);
      const points = [selected, new Point(1, 2), new Point(3, 2), new Point(4, 2)];
      const shapes = new Shapes(canvas);
      shapes.points = points;
      shapes.handleClick(event);
      expect(shapes.selectedPoint).toEqual(selected);
    });

    it('Should resize the canvas using window size', () => {
      window.innerWidth = 100;
      window.innerHeight= 100;
      const shapes = new Shapes(canvas);
      shapes.draw = jest.fn();
      expect(canvas.width).toBe(200);
      expect(canvas.height).toBe(200);
      shapes.resize();
      expect(canvas.width).toBe(100);
      expect(canvas.height).toBe(100);
    });

    it('Should clear selected point', () => {
      const shapes = new Shapes(canvas);
      shapes.draw = jest.fn();
      shapes.selectedPoint = 1;
      shapes.clearSelectedPoint();
      expect(shapes.selectedPoint).toBe(null);
      expect(shapes.draw).toBeCalled();
    });

    it('Should move the selected point', () => {
      const shapes = new Shapes(canvas);
      shapes.draw = jest.fn();
      shapes.movePoint();
      expect(shapes.selectedPoint).toBe(null);
      shapes.selectedPoint = new Point(1, 2);
      shapes.movePoint(event);
      expect(shapes.selectedPoint.x).toBe(4);
      expect(shapes.selectedPoint.y).toBe(4);
      expect(shapes.draw).toBeCalled();
    });
  });

});

