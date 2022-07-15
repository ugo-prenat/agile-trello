import { Column as ColumnModel } from '../../../model'
import { CgAdd } from "react-icons/cg"
import { TbTrash } from "react-icons/tb"
import Card from './Card'
import { useDispatch } from 'react-redux'
import { removeColumn } from '../../../state/slices/boardsSlice'


type Props = {
  column: ColumnModel
  triggerUseEffect: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Column({ column, triggerUseEffect }: Props) {
  const dispatch = useDispatch()
  
  const handleDelete = () => {
    dispatch(removeColumn({ boardId: column.board, columnId: column.id }))
    triggerUseEffect(true)
  }
  
  return (
    <div className='column'>
      <p className='title'>
        {column.title}
        <span onClick={handleDelete}>
          <TbTrash />
        </span>
      </p>
      <div className="card-list">
        { column.cards.map(card => (
          <Card card={card} key={card.id} />
        ))}
      </div>
      <p className="add-btn">
        <span>
          <CgAdd />
          Ajouter une carte
        </span>
      </p>
    </div>
  )
}