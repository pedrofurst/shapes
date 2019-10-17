import Point from '../index';

const DEFAULT_X = 10;
const DEFAULT_Y = 10;

describe('Point class', () => {

  it('Should instance the class and set the values', () => {
    const mockContext = {someContext: 'example'};
    const point = new Point(DEFAULT_X, DEFAULT_Y, mockContext);
    expect(point.x).toEqual(DEFAULT_X);
    expect(point.y).toEqual(DEFAULT_Y);
    expect(point.context).toEqual(mockContext);
  });

  it('Should validate if the user clicks above the point', () => {
    const point = new Point(DEFAULT_X, DEFAULT_Y);
    expect(point.isClickedAbove(5,5)).toBeTruthy();
    expect(point.isClickedAbove(50,50)).toBeFalsy();
  });

  it('Should draw the point', () => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", "200");
    canvas.setAttribute("height", "200");
    const ctx = canvas.getContext('2d');
    const point = new Point(DEFAULT_X, DEFAULT_Y, canvas.getContext('2d'));
    point.draw();
    expect(ctx.__getDrawCalls()).toMatchSnapshot();
  });
});
