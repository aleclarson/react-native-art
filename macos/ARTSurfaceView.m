/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "ARTSurfaceView.h"

#import <React/UIImageUtils.h>

#import "ARTNode.h"

@implementation ARTSurfaceView

- (BOOL)isFlipped
{
  return YES;
}

- (BOOL)isOpaque
{
  return NO;
}

- (void)didUpdateReactSubviews
{
  [super didUpdateReactSubviews];
  [self invalidate];
}

- (void)invalidate
{
  [self setNeedsDisplay:YES];
}

- (void)drawRect:(CGRect)rect
{
  CGContextRef context = UIGraphicsGetCurrentContext();
  for (ARTNode *node in self.subviews) {
    [node renderTo:context];
  }
}

@end
