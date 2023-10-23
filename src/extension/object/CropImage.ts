import * as fabric from 'fabric'
import { config } from 'fabric'
import { TClassProperties } from '@/types/typedefs'


type ImageSource = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;

export class CropImage extends fabric.Image {
  isCropping?: boolean;

  constructor(element: ImageSource, options: any = {}) {
    super(element, { filters: [], ...options });
    this.initEvent();
  }

  initEvent() {
    this.on('mousedblclick', () => {
      if (!this.canvas) return;
      this.isCropping = true;
      this.canvas.setActiveObject(<fabric.Object>this);
      this.canvas.renderAll();
    });
  }

  getOriginalElementWidth() {
    // @ts-ignore
    return this._originalElement ? this._originalElement.naturalWidth || this._originalElement.width : 0;
  }

  getOriginalElementHeight() {
    // @ts-ignore
    return this._originalElement ? this._originalElement.naturalHeight || this._originalElement.height : 0;
  }

  getElementWidth() {
    // @ts-ignore
    return this._element ? this._element.naturalWidth || this._element.width : 0;
  }

  getElementHeight() {
    // @ts-ignore
    return this._element ? this._element.naturalHeight || this._element.height : 0;
  }

  _getOriginalTransformedDimensions(options: any = {}): fabric.Point {
    const dimOptions = {
      scaleX: this.scaleX,
      scaleY: this.scaleY,
      skewX: this.skewX,
      skewY: this.skewY,
      width: this.getOriginalElementWidth(),
      height: this.getOriginalElementHeight(),
      strokeWidth: this.strokeWidth,
      ...options,
    };
    // stroke is applied before/after transformations are applied according to `strokeUniform`
    const strokeWidth = dimOptions.strokeWidth;
    let preScalingStrokeValue = strokeWidth, postScalingStrokeValue = 0;

    if (this.strokeUniform) {
      preScalingStrokeValue = 0;
      postScalingStrokeValue = strokeWidth;
    }
    const dimX = dimOptions.width + preScalingStrokeValue,
      dimY = dimOptions.height + preScalingStrokeValue,
      noSkew = dimOptions.skewX === 0 && dimOptions.skewY === 0;
    let finalDimensions;
    if (noSkew) {
      finalDimensions = new fabric.Point(
        dimX * dimOptions.scaleX,
        dimY * dimOptions.scaleY
      );
    } else {
      finalDimensions = fabric.util.sizeAfterTransform(dimX, dimY, dimOptions);
    }

    return finalDimensions.scalarAdd(postScalingStrokeValue);
  }

  _render(ctx: CanvasRenderingContext2D) {
    // ctx can be either the cacheCtx or the main ctx.
    // we want to disable shadow on the main one since on the cache the shadow is never set.
    // this._setCStroke(ctx);
    // const originalstrokeWidth = this.strokeWidth;
    const width = this.width || 0;
    const height = this.height || 0;
    const elementToDraw = this._element;
    ctx.save();
    if (this.isCropping) {
      // this.strokeWidth = 0;
      // @ts-ignore
      this._removeShadow(ctx); // main context
      ctx.globalAlpha = 0.5;
      const elWidth = this.getElementWidth();
      const elHeight = this.getElementHeight();
      const imageCopyX = -(this.cropX || 0) - width / 2;
      const imageCopyY = -(this.cropY || 0) - height / 2;
      ctx.drawImage(
        elementToDraw,
        imageCopyX,
        imageCopyY,
        elWidth,
        elHeight,
      );
      ctx.globalAlpha = 1;
    }
    super._render(ctx);
    // @ts-ignore
    this._drawCroppingLines(ctx);
    ctx.restore();
    // this.strokeWidth = originalstrokeWidth;

  }

  _drawCroppingLines(ctx: CanvasRenderingContext2D) {
    // @ts-ignore
    if (!this.isCropping || (this.canvas && (this.canvas.isCropping))) {
      return;
    }
    const w = this.width;
    const h = this.height;
    // @ts-ignore
    const zoom = this.canvas.getZoom() * config.devicePixelRatio;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
    // @ts-ignore
    ctx.strokeStyle = this.cropLinesColor;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + w / 3, -h / 2);
    ctx.lineTo(-w / 2 + w / 3, h / 2);
    ctx.moveTo(-w / 2 + 2 * w / 3, -h / 2);
    ctx.lineTo(-w / 2 + 2 * w / 3, h / 2);
    ctx.moveTo(-w / 2, -h / 2 + h / 3);
    ctx.lineTo(w / 2, -h / 2 + h / 3);
    ctx.moveTo(-w / 2, -h / 2 + 2 * h / 3);
    ctx.lineTo(w / 2, -h / 2 + 2 * h / 3);
    ctx.scale(1 / (this.scaleX * zoom), 1 / (this.scaleY * zoom));
    ctx.stroke();
    ctx.restore();
  }

  drawBorders(ctx:CanvasRenderingContext2D, options:any, styleOverride:any) {
    this._renderCroppingBorders(ctx);
    super.drawBorders(ctx, options, styleOverride);
  }

  _renderCroppingBorders(ctx: CanvasRenderingContext2D) {
    if (this.isCropping) {
      ctx.save();
      const multX = this.canvas?.viewportTransform[0] || 1;
      const multY = this.canvas?.viewportTransform[3] || 1;
      const scaling = this.getObjectScaling();
      if (this.flipX) {
        scaling.x *= -1;
      }
      if (this.flipY) {
        scaling.y *= -1;
      }
      const elWidth = (this.getElementWidth()) * multX * scaling.x;
      const elHeight = (this.getElementHeight()) * multY * scaling.y;
      const { width, height } = this;
      const imageCopyX = (-this.cropX - width / 2) * multX * scaling.x;
      const imageCopyY = (-this.cropY - height / 2) * multY * scaling.y;
      ctx.strokeStyle = fabric.Object.prototype.borderColor;
      ctx.strokeRect(imageCopyX, imageCopyY, elWidth, elHeight);
      ctx.restore();
    }
  }
  
  static fromURL(url: string, options: any = {}): Promise<CropImage> {
    return fabric.util.loadImage(url, options).then((img) => new this(img, options));
  }

  static fromObject(
    { filters: f, resizeFilter: rf, src, crossOrigin, ...object }: any,
    options: { signal: AbortSignal }
  ): Promise<CropImage> {
    return Promise.all([
      fabric.util.loadImage(src, { ...options, crossOrigin }),
      f && fabric.util.enlivenObjects(f, options),
      rf && fabric.util.enlivenObjects([rf], options),
      fabric.util.enlivenObjectEnlivables(object, options),
    ]).then(([el, filters = [], [resizeFilter] = [], hydratedProps = {}]) => {
      return new this(el, {
        ...object,
        src,
        crossOrigin,
        filters,
        resizeFilter,
        ...hydratedProps,
      });
    });
  }
}

const imageDefaultValues: Partial<TClassProperties<CropImage>> = {
  type: 'image',
  strokeWidth: 0,
  srcFromAttribute: false,
  minimumScaleTrigger: 0.5,
  cropX: 0,
  cropY: 0,
  imageSmoothing: true,
};

Object.assign(CropImage.prototype, {
  ...imageDefaultValues,
  cacheProperties: [...fabric.Object.prototype.cacheProperties, 'cropX', 'cropY'],
});

fabric.util.classRegistry.setClass(CropImage, 'cropimage');
fabric.util.classRegistry.setSVGClass(CropImage, 'cropimage');

// if (typeof CropImage.prototype.isCropping === 'undefined') {
//   extendWithCropping(CropImage);
// }