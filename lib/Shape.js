/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import {NativeShape} from './nativeComponents';
import Path from './ARTSerializablePath';
import {
  extractTransform,
  extractOpacity,
  childrenAsString,
  extractStrokeJoin,
  extractStrokeCap,
  extractBrush,
} from './helpers';
import type {
  TransformProps,
  OpacityProps,
  StrokeJoin,
  StrokeCap,
  Brush,
} from './types';

export type ShapeProps = {
  ...$Exact<OpacityProps>,
  ...$Exact<TransformProps>,
  fill?: string | Brush,
  stroke?: string,
  strokeCap?: StrokeCap,
  strokeDash?: Array<number>,
  strokeJoin?: StrokeJoin,
  strokeWidth: number,
  children?: React.Node,
  d?: string | Path,
  children?: string | Array<string>,
  width: number,
  height: number,
};

const Shape = React.forwardRef<ShapeProps, any>(
  ({d, strokeWidth = 1, ...props}, ref) => {
    if (!d && props.children) {
      d = childrenAsString(props.children);
    }
    const path = d instanceof Path ? d : new Path(d);
    return (
      <NativeShape
        ref={ref}
        fill={extractBrush(props.fill, props)}
        opacity={extractOpacity(props)}
        stroke={props.stroke}
        strokeCap={extractStrokeCap(props.strokeCap)}
        strokeDash={props.strokeDash || null}
        strokeJoin={extractStrokeJoin(props.strokeJoin)}
        strokeWidth={strokeWidth}
        transform={extractTransform(props)}
        d={path.toJSON()}
      />
    );
  },
);

Shape.displayName = 'Shape';
export default Shape;
