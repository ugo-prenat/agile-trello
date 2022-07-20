import { Column as ColumnModel } from '../../../model'
import Card from './Card'
import CreateCard from './CreateCard'
import { Card as CardModel } from '../../../model'
import { useDispatch } from 'react-redux'
import { addCard, editCard, removeCard } from '../../../state/slices/boardsSlice'
import { Droppable } from 'react-beautiful-dnd'
import ColumnOptions from './ColumnOptions'
import { useEffect } from 'react'


type Props = {
  column: ColumnModel
  updateBoard: () => void
}

export default function Column({ column, updateBoard }: Props) {
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
    <Droppable droppableId={column.id.toString()}>
      { (provided, snapshot) => (
        <div className='column'>
          <div className='column-top'>
            <p className="title" style={{ color: `#${column.color}` }}>{column.title}</p>
            <div className='right-part'>
              <ColumnOptions
                board={column.board}
                column={column.id}
                updateBoard={updateBoard}
              />
              <p className="total-card" style={{ color: `#${column.color}` }}>{column.cards.length}</p>
            </div>
          </div>
          <span className={`top-border ${snapshot.isDraggingOver ? 'hover' : ''}`} style={{ background: `#${column.color}` }}></span>

          <div className="card-list" {...provided.droppableProps} ref={provided.innerRef}>
            { column.cards.map((card, index) => (
              <Card
                card={card}
                deleteCard={deleteCard}
                updateCard={updateCard}
                key={card.id}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
          
          <CreateCard createCard={createCard} />
        </div>
      )}
    </Droppable>
  )
}