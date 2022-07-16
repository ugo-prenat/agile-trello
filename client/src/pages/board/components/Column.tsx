import { Board, Column as ColumnModel } from '../../../model'
import { TbTrash } from "react-icons/tb"
import Card from './Card'
import CreateCard from './CreateCard'
import { Card as CardModel } from '../../../model'
import { useDispatch, useSelector } from 'react-redux'
import { addCard, removeCard } from '../../../state/slices/boardsSlice'
import { useEffect } from 'react'
import { selectBoards } from '../../../state/store'


type Props = {
  column: ColumnModel
  deleteColumn: (boardId: number, columnId: number) => void
}

export default function Column({ column, deleteColumn }: Props) {
  const boards:Board[] = useSelector(selectBoards)
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
  const deleteCard = (card:CardModel) => {
    dispatch(removeCard(card))
  }
  
  const getColumnById = (id:number) => {
    let searchColumn:ColumnModel = boards[0].columns[0]
    
    boards.map((board:Board) => {
      board.columns.map((column:ColumnModel) => {
        if (column.id === id) {
          searchColumn = column
        }
      })
    })
    return searchColumn
  }
  
  useEffect(() => {
    const tempColumn = getColumnById(column.id)
    console.log(tempColumn);
    
  }, [ createCard, deleteCard ]);
  
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