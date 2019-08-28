/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import Class from 'art/core/class';
import Path from 'art/core/path';

const MOVE_TO = 0;
const CLOSE = 1;
const LINE_TO = 2;
const CURVE_TO = 3;
const ARC = 4;

// TODO: Refactor to class
const SerializablePath = Class(Path, {
  initialize: function(path: string | SerializablePath) {
    this.reset();
    if (path instanceof SerializablePath) {
      this.path = path.path.slice(0);
    } else if (Array.isArray(path)) {
      this.path = path;
    } else if (typeof path === 'string') {
      this.push(path);
    }
  },

  scale(x: number, y: number = x) {
    this.scaleX = x;
    this.scaleY = y;
    return this;
  },

  translate(x: number, y: number) {
    this.tx = x;
    this.ty = y;
    return this;
  },

  onReset: function() {
    this.path = [];
    this.tx = this.ty = 0;
    this.scaleX = this.scaleY = 1;
  },

  onMove: function(sx: number, sy: number, x: number, y: number) {
    this.path.push(
      MOVE_TO,
      this.scaleX * x + this.tx,
      this.scaleY * y + this.ty,
    );
  },

  onLine: function(sx: number, sy: number, x: number, y: number) {
    this.path.push(
      LINE_TO,
      this.scaleX * x + this.tx,
      this.scaleY * y + this.ty,
    );
  },

  onBezierCurve: function(
    sx: number,
    sy: number,
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    x: number,
    y: number,
  ) {
    this.path.push(
      CURVE_TO,
      this.scaleX * p1x + this.tx,
      this.scaleY * p1y + this.ty,
      this.scaleX * p2x + this.tx,
      this.scaleY * p2y + this.ty,
      this.scaleX * x + this.tx,
      this.scaleY * y + this.ty,
    );
  },

  _arcToBezier: Path.prototype.onArc,

  onArc: function(
    sx: number,
    sy: number,
    ex: number,
    ey: number,
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    sa: number,
    ea: number,
    ccw: boolean,
    rotation: number,
  ) {
    if (rx !== ry || rotation) {
      return this._arcToBezier(
        sx,
        sy,
        ex,
        ey,
        cx,
        cy,
        rx,
        ry,
        sa,
        ea,
        ccw,
        rotation,
      );
    }
    this.path.push(ARC, cx, cy, rx, sa, ea, ccw ? 0 : 1);
  },

  onClose: function() {
    this.path.push(CLOSE);
  },

  toJSON: function() {
    return this.path;
  },
});

export default SerializablePath;
