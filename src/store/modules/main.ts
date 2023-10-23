import fabric from 'fabric'
import { customAlphabet } from 'nanoid'
import { defineStore } from 'pinia'
import { RightStates, PointElement } from '@/types/elements'
import { SYS_FONTS } from '@/configs/fonts'
import { isSupportFont } from '@/utils/fonts'
import { ExportTypes, PoolType } from '@/types/common'
import { CanvasElement } from '@/types/canvas'

export interface MainState {
  canvasObject: CanvasElement | null
  clonedObject: CanvasElement | null
  currentPoint: PointElement | null
  rightState: RightStates
  activeElementIdList: string[]
  handleElementId: string
  sizeMode: number
  unitMode: number
  gridColorSelf: [string[]]
  databaseId: string
  selectedTemplatesIndex: number[]
  thumbnailsFocus: boolean
  drawAreaFocus: boolean
  availableFonts: typeof SYS_FONTS
  disableHotkeys: boolean
  exportType: ExportTypes
  poolType: PoolType
  poolShow: boolean
  
}

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
export const databaseId = nanoid(10)

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    canvasObject: null,
    clonedObject: null,
    currentPoint: null,
    rightState: RightStates.ELEMENT_WORKER,
    activeElementIdList: [], // 被选中的元素ID集合，包含 handleElementId
    handleElementId: '', // 正在操作的元素ID
    sizeMode: 0,  // 模板样式
    unitMode: 0,
    gridColorSelf: [[]], // 自定义颜色
    databaseId, // 标识当前应用的indexedDB数据库ID
    selectedTemplatesIndex: [],
    thumbnailsFocus: false, // 左侧导航缩略图区域聚焦
    drawAreaFocus: false, // 编辑区聚焦
    availableFonts: SYS_FONTS, // 系统字体
    disableHotkeys: false, // 禁用快捷键
    exportType: 'image', // 导出面板
    poolType: 'editor', // 左边栏
    poolShow: false, // 显示左边栏
  }),

  getters: {
    activeElementList() {
    //   const slidesStore = useSlidesStore()
    //   const currentSlide = slidesStore.currentSlide
    //   if (!currentSlide || !currentSlide.elements) return []
    //   return currentSlide.elements.filter(element => state.activeElementIdList.includes(element.id))
    },
  
    handleElement() {
    //   const slidesStore = useSlidesStore()
    //   const currentSlide = slidesStore.currentSlide
    //   if (!currentSlide || !currentSlide.elements) return null
    //   return currentSlide.elements.find(element => state.handleElementId === element.id) || null
    },
  },

  actions: {
    setActiveElementIdList(activeElementIdList: string[]) {
      if (activeElementIdList.length === 1) this.handleElementId = activeElementIdList[0]
      else this.handleElementId = ''
      
      this.activeElementIdList = activeElementIdList
    },
    
    async setCanvasObject(canvasObject: CanvasElement | null) {
      this.canvasObject = canvasObject
    },
    // setHandleElementId(handleElementId: string) {
    //   this.handleElementId = handleElementId
    // },
    
    // setActiveGroupElementId(activeGroupElementId: string) {
    //   this.activeGroupElementId = activeGroupElementId
    // },
    
    // setHiddenElementIdList(hiddenElementIdList: string[]) {
    //   this.hiddenElementIdList = hiddenElementIdList
    // },
  
    // setCanvasDragged(isDragged: boolean) {
    //   this.canvasDragged = isDragged
    // },
    setPoolType(poolType: PoolType) {
      this.poolType = poolType
    },

    setRightState(rightState: RightStates) {
      this.rightState = rightState
    },
  
    setThumbnailsFocus(isFocus: boolean) {
      this.thumbnailsFocus = isFocus
    },

    setAvailableFonts() {
      this.availableFonts = SYS_FONTS.filter(font => isSupportFont(font.value))
    },
    
    setExportType(type: ExportTypes) {
      this.exportType = type
    },

    setDrawAreaFocus(status: boolean) {
      this.drawAreaFocus = status
    },
  
    // setDisableHotkeysState(disable: boolean) {
    //   this.disableHotkeys = disable
    // },
  
    // setGridLineSize(size: number) {
    //   this.gridLineSize = size
    // },
  
    // setRulerState(show: boolean) {
    //   this.showRuler = show
    // },

    // setClipingImageElementId(elId: string) {
    //   this.clipingImageElementId = elId
    // },
  
    // setSelectedTableCells(cells: string[]) {
    //   this.selectedTableCells = cells
    // },
  
    // setScalingState(isScaling: boolean) {
    //   this.isScaling = isScaling
    // },
    
    updateSelectedTemplatesIndex(selectedTemplatesIndex: number[]) {
      this.selectedTemplatesIndex = selectedTemplatesIndex
    },

    // setDialogForColor(show: boolean) {
    //   this.dialogForColor = show
    // },

    // saveDialogForColor(colors: string[]) {
    //   this.dialogForColor = false
    //   this.colorSelfStore.push(colors)
    // },

    // setDialogForTemplate(show: boolean) {
    //   this.dialogForTemplate = show
    // },

    // setSelectPanelState(show: boolean) {
    //   this.showSelectPanel = show
    // },
  },
})