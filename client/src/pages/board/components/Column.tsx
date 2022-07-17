import { Column as ColumnModel } from '../../../model'
import { TbTrash } from "react-icons/tb"
import Card from './Card'
import CreateCard from './CreateCard'
import { Card as CardModel } from '../../../model'
import { useDispatch } from 'react-redux'
import { addCard, editCard, removeCard } from '../../../state/slices/boardsSlice'


type Props = {
  column: ColumnModel
  deleteColumn: (boardId: number, columnId: number) => void
}

export default function Column({ column, deleteColumn }: Props) {
  //const boards:Board[] = useSelector(selectBoards)
  const dispatch = useDispatch()
  
  const createCard = (title: string) => {
    const newCard:CardModel = {
      id: new Date().valueOf(),
      title,
      board: column.board,
      column: column.id
    }
    dispatch(addCard(newCard))
  }
  const deleteCard = (card:CardModel) => dispatch(removeCard(card))
  const updateCard = (card:CardModel) => dispatch(editCard(card))
  
  
  return (
    <div className='column'>
      <p className='title'>
        {column.title}
        <span onClick={() => deleteColumn(column.board, column.id)}>
          <TbTrash />
        </span>
      </p>
      <div className="card-list">
        { column.cards.map(card => (
          <Card
            card={card}
            deleteCard={deleteCard}
            updateCard={updateCard}
            key={card.id}
          />
        ))}
      </div>
      <CreateCard
        createCard={createCard}
      />
    </div>
  )
}