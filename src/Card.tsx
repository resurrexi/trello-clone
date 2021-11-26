import { useRef } from "react"
import { useDrop } from "react-dnd"

import { CardContainer } from "./styles"
import { useItemDrag } from "./utils/useItemDrag"
import { useAppState } from "./state/AppStateContext"
import { isHidden } from "./utils/isHidden"
import { moveTask } from "./state/actions"

type CardProps = {
  text: string
  id: string
  columnId: string
  isPreview?: boolean
}

export const Card = ({
  text,
  id,
  columnId,
  isPreview
}: CardProps) => {
  const { draggedItem, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: "CARD",
    hover() {
      if (!draggedItem) {
        return
      }
      if (draggedItem.type !== "CARD") {
        return
      }
      if (draggedItem.id === id) {
        return
      }

      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId))
    }
  })
  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId
  })

  drag(drop(ref))

  return (
    <CardContainer
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  )
}
