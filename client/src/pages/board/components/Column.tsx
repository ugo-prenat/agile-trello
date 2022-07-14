import { useState } from 'react'
import { Column as ColumnModel } from '../../../model'


type Props = {
  column: ColumnModel
  boardId: number
}

export default function Column({ column, boardId }: Props) {
  const [showColumnCreate, setShowColumnCreate] = useState<boolean>(false)
  const [columnTitle, setColumnTitle] = useState<string>('')
  
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newColumn:ColumnModel = {
      id: new Date().valueOf(),
      title: columnTitle,
      board: boardId,
      cards: []
    }
    
  }
  
  return (
    <div className='column'>
      <span onClick={() => setShowColumnCreate(true)}>+ Créer une colonne</span>
      <form onSubmit={handleCreate}>
        <input
          type='text'
          placeholder='Nom de la colonne'
          value={columnTitle}
          onChange={e => setColumnTitle(e.target.value)}
          required
        />
        <button>Créer</button>
      </form>
    </div>
  )
}