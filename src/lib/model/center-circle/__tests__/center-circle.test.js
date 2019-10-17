import CenterCircle from '../index';
import Parallelogram from '../../parallelogram';

const newPoint = (x, y) => ({x, y});

const POINT_A = newPoint(2, 4);
const POINT_B = newPoint(3, 3);
const POINT_C = newPoint(1, 2);
const DEFAULT_POINTS = [POINT_A, POINT_B, POINT_C];

describe('Center circle class', () => {
  it('Should draw the center circle', () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '200');
    canvas.setAttribute('height', '200');
    const ctx = canvas.getContext('2d');
    const parallelogram = new Parallelogram(DEFAULT_POINTS);
    const centerCircle = new CenterCircle(parallelogram, ctx);
    centerCircle.draw();
    expect(ctx.__getDrawCalls()).toMatchSnapshot();
  });
});

