import { ContextmenuItem } from "@/components/Contextmenu/types";
import { CanvasElement } from "@/types/canvas";
import { ElementNames } from "@/types/elements";

import { storeToRefs } from "pinia";
import { useMainStore } from "@/store";
import useHandleElement from "@/hooks/useHandleElement";

export const contextmenusThumbnails = (): ContextmenuItem[] => {
  return [
    {
      text: "Paste slide",
      subText: "Ctrl + V",
      // handler: pasteSlide,
    },
    {
      text: "Select all",
      subText: "Ctrl + A",
      // handler: selectAllSlide,
    },
    {
      text: "Create",
      subText: "Enter",
      // handler: createSlide,
    },
    {
      text: "Enter",
      subText: "F5",
      // handler: enterScreeningFromStart,
    },
  ];
};

export const contextmenus = (): ContextmenuItem[] => {
  const { lockElement } = useHandleElement();
  const { canvasObject } = storeToRefs(useMainStore());
  const element = canvasObject.value as CanvasElement;
  if (!canvasObject.value) {
    return [
      {
        text: "Paste",
        subText: "Ctrl + V",
        // handler: pasteSlide,
      },
      {
        text: "Select all",
        subText: "Ctrl + A",
        // handler: selectAllSlide,
      },
      {
        text: "Create",
        // handler: createSlide,
      },
      {
        text: "Grid",
        // handler: enterScreeningFromStart,
      },
      {
        text: "Reset",
        // handler: enterScreeningFromStart,
      },
    ];
  }
  if (element.lockMovementX && element.lockMovementY) {
    return [
      {
        text: "unlock",
        handler: () => lockElement(element.id, false),
      },
    ];
  }

  return [
    {
      text: "Cut",
      subText: "Ctrl + X",
      // handler: cutElement,
    },
    {
      text: "Copy",
      subText: "Ctrl + C",
      // handler: copyElement,
    },
    {
      text: "Paste",
      subText: "Ctrl + V",
      // handler: pasteElement,
    },
    { divider: true },
    {
      text: "Horizontal Center",
      // handler: () => alignElementToCanvas(ElementAlignCommands.HORIZONTAL),
      children: [
        // { text: '垂直居中', handler: () => alignElementToCanvas(ElementAlignCommands.CENTER), },
        // { text: '水平居中', handler: () => alignElementToCanvas(ElementAlignCommands.HORIZONTAL) },
        // { text: '左对齐', handler: () => alignElementToCanvas(ElementAlignCommands.LEFT) },
        // { text: '右对齐', handler: () => alignElementToCanvas(ElementAlignCommands.RIGHT) },
      ],
    },
    {
      text: "Vertical center",
      // handler: () => alignElementToCanvas(ElementAlignCommands.VERTICAL),
      children: [
        // { text: '水平居中', handler: () => alignElementToCanvas(ElementAlignCommands.CENTER) },
        // { text: '垂直居中', handler: () => alignElementToCanvas(ElementAlignCommands.VERTICAL) },
        // { text: '顶部对齐', handler: () => alignElementToCanvas(ElementAlignCommands.TOP) },
        // { text: '底部对齐', handler: () => alignElementToCanvas(ElementAlignCommands.BOTTOM) },
      ],
    },
    { divider: true },
    {
      text: "Bring to Front",
      // disable: props.isMultiSelect && !props.elementInfo.groupId,
      // handler: () => orderElement(props.elementInfo, ElementOrderCommands.TOP),
      children: [
        // { text: '置于顶层', handler: () => orderElement(props.elementInfo, ElementOrderCommands.TOP) },
        // { text: '上移一层', handler: () => orderElement(props.elementInfo, ElementOrderCommands.UP) },
      ],
    },
    {
      text: "Put on Bottom",
      // disable: props.isMultiSelect && !props.elementInfo.groupId,
      // handler: () => orderElement(props.elementInfo, ElementOrderCommands.BOTTOM),
      // children: [
      //   { text: '置于底层', handler: () => orderElement(props.elementInfo, ElementOrderCommands.BOTTOM) },
      //   { text: '下移一层', handler: () => orderElement(props.elementInfo, ElementOrderCommands.DOWN) },
      // ],
    },
    { divider: true },
    {
      text: element.type === ElementNames.GROUP ? "Ungroup" : "Group",
      subText: "Ctrl + G",
      // handler: props.elementInfo.groupId ? uncombineElements : combineElements,
      // hide: !props.isMultiSelect,
    },
    {
      text: "Select all",
      subText: "Ctrl + A",
      // handler: selectAllElement,
    },
    {
      text: "Lock",
      subText: "Ctrl + L",
      handler: () => lockElement(element.id, true),
    },
    {
      text: "Delete",
      subText: "Delete",
      // handler: deleteElement,
    },
  ];
};

export const contextmenusThumbnailItem = (): ContextmenuItem[] => {
  return [
    {
      text: "Cut",
      subText: "Ctrl + X",
      // handler: cutSlide,
    },
    {
      text: "Copy",
      subText: "Ctrl + C",
      // handler: copySlide,
    },
    {
      text: "Paste",
      subText: "Ctrl + V",
      // handler: pasteSlide,
    },
    {
      text: "Select all",
      subText: "Ctrl + A",
      // handler: selectAllSlide,
    },
    { divider: true },
    {
      text: "Create",
      subText: "Enter",
      // handler: createSlide,
    },
    {
      text: "Copy & Paste",
      subText: "Ctrl + D",
      // handler: copyAndPasteSlide,
    },
    {
      text: "Delete",
      subText: "Delete",
      // handler: () => deleteSlide(),
    },
    { divider: true },
    {
      text: "Preview",
      subText: "Shift + F5",
      // handler: enterScreening,
    },
  ];
};
