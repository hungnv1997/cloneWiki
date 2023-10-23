# vue-fabric-draw
> 一个基于 Vue3.x + TypeScript + fabric.js + pinia + element-plus 基于 canvas 的在线编辑应用，类似<b>[稿定设计](https://www.gaoding.com/)</b>，<b>[创客贴](https://www.chuangkit.com/)</b>在线编辑应用，支持 文字、图片、形状、线条、二维码 、条形码几种最常用的元素类型，每一种元素都拥有高度可编辑能力，缩略图显示，模板，支持导出json，svg, image文件。  
<b>在线体验：[http://draw.morestrive.com](http://draw.morestrive.com)</b>

## 项目运行
```
npm install
npm run dev
npm run build
```

### 页面功能
![avatar](doc/index.png)

### 渐变背景
![avatar](doc/gradient.png)

### 网格背景
![avatar](doc/grid.png)

### 形状背景
![avatar](doc/shape.png)


# 📚 功能列表
### 基础功能
- 历史记录（撤销、重做）
- 快捷键
- 右键菜单
- 导出本地文件（SVG、图片、PDF(TODO)）
### 页面编辑
- 页面添加、删除
- 页面顺序调整
- 页面复制粘贴(TODO)
- 背景设置（纯色、渐变、图片）
- 设置画布尺寸
- 网格线(TODO)
- 标尺(TODO)
- 画布缩放、移动
- 页面模板
- 选择面板（隐藏元素、层级排序、元素命名）(TODO)
### 页面元素编辑
- 元素添加、删除
- 元素复制粘贴
- 元素拖拽移动
- 元素旋转
- 元素缩放
- 元素多选（框选、点选）
- 多元素组合
- 多元素批量编辑(TODO)
- 元素锁定(TODO)
- 元素吸附对齐（移动和缩放）
- 元素层级调整
- 元素对齐到画布
- 元素坐标、尺寸和旋转角度设置
#### 文字
- 文本编辑（颜色、高亮、字体、字号、加粗、斜体、下划线、删除线、对齐方式、项目符号、缩进、清除格式）
- 行高
- 字间距
- 段间距
- 填充色
- 阴影
- 透明度
#### 图片
- 滤镜
- 着色（蒙版）
- 翻转
- 边框
- 阴影
#### 形状
- 填充色
- 边框
- 阴影
- 透明度
- 翻转
- 编辑文字
#### 线条
- 颜色
- 宽度
- 样式
