import { TbTrash } from "react-icons/tb"
import { FiEdit2 } from "react-icons/fi"
import { MdOutlineColorLens } from "react-icons/md"

import { BiDotsHorizontalRounded } from "react-icons/bi"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { removeColumn } from "../../../state/slices/boardsSlice"


type Props = {
  board: number;
  column: number;
  updateBoard: () => void
}

export default function ColumnOptions({board, column, updateBoard}: Props) {
  const [showDetail, setShowDetail] = useState<boolean>(false)
  
  const dispatch = useDispatch()
  
  const deleteColumn = (boardId: number, columnId: number) => dispatch(removeColumn({ boardId, columnId }))
  const renameColumn = () => console.log('rename column');
  const changeColumnColor = () => console.log('chnage column\'s color');
  
  useEffect(() => {
    updateBoard()
  }, [deleteColumn, renameColumn, changeColumnColor]);
  
  
  return (
    <div className="options">
      <span onClick={() => setShowDetail(!showDetail)}>
        <BiDotsHorizontalRounded />
      </span>
      { showDetail && 
        <>
          <div className="details-wrapper" onClick={() => setShowDetail(false)}></div>
          <div className="details">
            <span onClick={() => deleteColumn(board, column)}><TbTrash /> Supprimer</span>
            <span onClick={() => renameColumn()}><FiEdit2 /> Renommer</span>
            <span onClick={() => changeColumnColor()}><MdOutlineColorLens /> Couleur</span>
          </div>
        </>
      }
    </div>
  )
}