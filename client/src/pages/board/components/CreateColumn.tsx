import { useState } from "react"
import { Column } from "../../../model"
import { CgAdd } from "react-icons/cg"
import { IoClose } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { addColumn } from "../../../state/slices/boardsSlice"

type Props = {
  boardId: number
  triggerUseEffect: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateColumn({ boardId, triggerUseEffect }: Props) {
  const [showColumnCreate, setShowColumnCreate] = useState<boolean>(false)
  const [columnTitle, setColumnTitle] = useState<string>('')
  
  const dispatch = useDispatch()
  
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newColumn:Column = {
      id: new Date().valueOf(),
      title: columnTitle,
      board: boardId,
      cards: []
    }
    setColumnTitle('')
    setShowColumnCreate(false)
    dispatch(addColumn(newColumn))
    // 
    triggerUseEffect(true)
  }
  
  return (
    <div className="column">
      <div className="add-btn">
        {
          showColumnCreate ?
            <form onSubmit={handleCreate}>
              <input
                type='text'
                placeholder='Nom de la colonne'
                value={columnTitle}
                onChange={e => setColumnTitle(e.target.value)}
                required
                autoFocus
              />
              <button type="button" onClick={() => {setShowColumnCreate(false);setColumnTitle('')}}><IoClose /></button>
            </form>
          :
            <span onClick={() => setShowColumnCreate(true)}>
              <CgAdd />
              Créer une colonne
            </span>
          }
        </div>
    </div>
  )
}