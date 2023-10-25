import { MULTILANG } from "@/constants/multilang";

export const TransparentFill = "rgba(0,0,0,0)";
export const MinSize = 30;
export const MaxSize = 800;

export const DesignUnitMode = [
  { id: 0, name: "mm" },
  { id: 1, name: "px" },
];

export const DesignSizeMode = [
  {
    id: 0,
    name: MULTILANG.background.designMode.businessCard,
    disabled: false,
  },
  { id: 1, name: MULTILANG.background.designMode.singlePage, disabled: false },
  { id: 2, name: MULTILANG.background.designMode.customize, disabled: true },
];

export const BackgroundFillMode = [
  // { id: 0, name: "纯色填充" },
  // { id: 1, name: "图片填充" },
  // { id: 2, name: "渐变填充" },
  // { id: 3, name: "网格填充" },
  // { id: 4, name: "形状填充" },
  // { id: 5, name: "智能填充" },
  { id: 0, name: MULTILANG.background.color.solid },
  { id: 1, name: MULTILANG.background.color.picture },
  { id: 2, name: MULTILANG.background.color.gradient },
  { id: 3, name: MULTILANG.background.color.grid },
  { id: 4, name: MULTILANG.background.color.shape },
  { id: 5, name: MULTILANG.background.color.smart },
];

// 上传图片
export const BackgroundFillImageMode = [
  // { id: "contain", name: "缩放" },
  // { id: "repeat", name: "拼贴" },
  // { id: "cover", name: "铺满" },
  { id: "contain", name: "Contain" },
  { id: "repeat", name: "Repeat" },
  { id: "cover", name: "Cover" },
];

// 渐变色
export const BackgroundFillGradientMode = [
  { id: 0, name: "Linear", value: "linear" },
  { id: 1, name: "Radial", value: "radial" },
];

// 网格图片
export const BackgroundFillGridMode = [
  { id: 0, name: "Interpolate", value: "interpolateLinear" },
  { id: 1, name: "Sparkle", value: "sparkle" },
  { id: 2, name: "Shadows", value: "shadows" },
];
