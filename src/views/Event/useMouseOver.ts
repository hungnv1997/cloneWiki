import { useFabricStore } from "@/store"
import { storeToRefs } from "pinia"
import useCanvas from "@/views/Canvas/useCanvas"


export const useMouseOver = (evt: any) => {
  const fabricStore = useFabricStore()
  const { elementCoords, elementHover } = storeToRefs(fabricStore)
  const [ canvas ] = useCanvas()
  if (!evt.target) return
  elementCoords.value.length = 0
  elementHover.value = ''
  canvas.renderAll()
}