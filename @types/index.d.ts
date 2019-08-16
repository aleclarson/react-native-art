import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native-macos';

export type StrokeJoin = 'miter' | 'bevel' | 'round';
export type StrokeCap = 'butt' | 'square' | 'round';

export interface ARTNodeMixin {
  opacity?: number;
  originX?: number;
  originY?: number;
  scaleX?: number;
  scaleY?: number;
  scale?: number;
  title?: string;
  x?: number;
  y?: number;
  visible?: boolean;
}

export interface ARTGroupProps extends ARTNodeMixin {
  width?: number;
  height?: number;
}

export interface ARTClippingRectangleProps extends ARTNodeMixin {
  width?: number;
  height?: number;
}

export interface ARTRenderableMixin extends ARTNodeMixin {
  fill?: string;
  stroke?: string;
  strokeCap?: StrokeCap;
  strokeDash?: number[];
  strokeJoin?: StrokeJoin;
  strokeWidth?: number;
}

export interface ARTShapeProps extends ARTRenderableMixin {
  d: string | Path;
  width?: number;
  height?: number;
}

export interface ARTTextProps extends ARTRenderableMixin {
  font?: string;
  alignment?: string;
}

export interface ARTSurfaceProps {
  style?: StyleProp<ViewStyle>;
  width: number;
  height: number;
}

export class ClippingRectangle extends React.Component<
  ARTClippingRectangleProps
> {}

export class Group extends React.Component<ARTGroupProps> {}

export class Shape extends React.Component<ARTShapeProps> {}

export class Surface extends React.Component<ARTSurfaceProps> {}

export class Text extends React.Component<ARTTextProps> {}

export class Path {
  /** Parse one or more SVG paths */
  push(...paths: string[]): this;

  /** Clear the path */
  reset(): this;

  /** Move to a relative point without drawing */
  move(x: number, y: number): this;

  /** Move to an absolute point without drawing */
  moveTo(x: number, y: number): this;

  /** Draw a line to a relative point */
  line(x: number, y: number): this;

  /** Draw a line to an absolute point */
  lineTo(x: number, y: number): this;

  /** Draw a line to the first point in the current sub-path and begins a new sub-path */
  close(): this;

  curve(
    c1x: number,
    c1y: number,
    c2x?: number,
    c2y?: number,
    ex?: number,
    ey?: number,
  ): this;

  curveTo(
    c1x: number,
    c1y: number,
    c2x?: number,
    c2y?: number,
    ex?: number,
    ey?: number,
  ): this;

  arc(
    x: number,
    y: number,
    rx: number,
    ry?: number,
    outer?: boolean,
    counterClockwise?: boolean,
    rotation?: number,
  ): this;

  arcTo(
    x: number,
    y: number,
    rx: number,
    ry?: number,
    outer?: boolean,
    counterClockwise?: boolean,
    rotation?: number,
  ): this;

  counterArc(x: number, y: number, rx: number, ry?: number): this;

  counterArcTo(x: number, y: number, rx: number, ry?: number): this;

  toJSON(): string;
}
