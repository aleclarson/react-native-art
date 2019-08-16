/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "ARTNode.h"

#import "ARTContainer.h"

@implementation ARTNode

- (BOOL)isFlipped
{
  return YES;
}

- (void)didUpdateReactSubviews
{
  [super didUpdateReactSubviews];
  [self invalidate];
}

- (void)setOpacity:(CGFloat)opacity
{
  [self invalidate];
  _opacity = opacity;
}

- (void)setTransform:(CATransform3D)transform
{
  [self invalidate];
  _transform = transform;
}

- (void)invalidate
{
  id<ARTContainer> container = (id<ARTContainer>)self.superview;
  [container invalidate];
}

static inline CGAffineTransform create2DTransform(CATransform3D t) {
  return CGAffineTransformMake(t.m11, t.m12, t.m21, t.m22, t.m41, t.m42);
}

- (void)renderTo:(CGContextRef)context
{
  if (self.opacity <= 0) {
    // Nothing to paint
    return;
  }
  if (self.opacity >= 1) {
    // Just paint at full opacity
    CGContextSaveGState(context);
    CGContextConcatCTM(context, create2DTransform(self.transform));
    CGContextSetAlpha(context, 1);
    [self renderLayerTo:context];
    CGContextRestoreGState(context);
    return;
  }
  // This needs to be painted on a layer before being composited.
  CGContextSaveGState(context);
  CGContextConcatCTM(context, create2DTransform(self.transform));
  CGContextSetAlpha(context, self.opacity);
  CGContextBeginTransparencyLayer(context, NULL);
  [self renderLayerTo:context];
  CGContextEndTransparencyLayer(context);
  CGContextRestoreGState(context);
}

- (void)renderLayerTo:(CGContextRef)context
{
  // abstract
}

@end
