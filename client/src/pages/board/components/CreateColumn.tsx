import React, { useState } from "react"
import { CgAdd } from "react-icons/cg"
import { IoClose } from "react-icons/io5"

type Props = {
  boardId: number
  createColumn: (title: string, board: number) => void
}

export default function CreateColumn({ boardId, createColumn }: Props) {
  const [showColumnCreate, setShowColumnCreate] = useState<boolean>(false)
  const [columnTitle, setColumnTitle] = useState<string>('')
  
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()

    createColumn(columnTitle, boardId)
    setColumnTitle('')
    setShowColumnCreate(false)
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