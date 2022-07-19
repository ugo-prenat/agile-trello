import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { Board as BoardModel, Card} from '../../model'
import { selectBoards } from '../../state/store';
import { IoArrowBack } from "react-icons/io5"
import { Column as ColumnModel } from '../../model'

import Column from './components/Column';
import CreateColumn from './components/CreateColumn';
import { addColumn, moveCard, removeColumn } from '../../state/slices/boardsSlice';

type Props = {};

export const Board:React.FC<Props> = () => {
  let { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const boards:BoardModel[] = useSelector(selectBoards)
  const [board, setBoard] = useState<BoardModel>()
  
  const getBoardById = (id: string) => {
    return boards.filter(board => board.id === +id)[0]
  }
  const getCardById = (id:number): Card | null => {
    let searchCard: Card | null = null
    
    board?.columns.map((column:ColumnModel) => {
      column.cards.map((card:Card) => {
        if (card.id === id) {
          searchCard = card
        }
        return searchCard
      })
      return searchCard
    })
    return searchCard
  }
  
  const createColumn = (title: string, board: number) => {
    const newColumn:ColumnModel = {
      id: new Date().valueOf(),
      title,
      board,
      color: '000000',
      cards: []
    }
    dispatch(addColumn(newColumn))
  }
  
  useEffect(() => {
    if (!id) return navigate('/')
    
    const tempBoard = getBoardById(id)
    if (!tempBoard) return navigate('/')
    setBoard(tempBoard)
    // eslint-disable-next-line
  }, [createColumn])
  
  const handleDragEnd = (result:DropResult) => {
    const { source, destination } = result
    if (!destination) return
    
    const card = getCardById(+result.draggableId)
    if (card) dispatch(moveCard({card, source, destination}))
  }
  const handleDragStart = () => {
    
  }
  const handleDragUpdate = (result:DropResult) => {
    const { source, destination } = result
    if (!destination) return
    //console.log(result);
    
    const overCardList:HTMLElement | null = document.querySelector(`.board-component .column-list .column[id="${destination.droppableId}"] .card-list`)
    if (overCardList) {
      //overCardList.style.height = overCardList.offsetHeight + 56 + 'px'
    }
    
    
  }
  
  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <div className='board-component'>
        <div className='top'>
          <Link to='/'><IoArrowBack /></Link>
          <h2>{board?.title}</h2>
        </div>
        <div  className='column-wrapper'>
          <div className='column-list'>
            { board?.columns.map(column => (
              <Column
                column={column}
                /* deleteColumn={deleteColumn} */
                key={column.id}
              />
            )) }
            
            <CreateColumn
              boardId={board?.id ? board.id : 0}
              createColumn={createColumn}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}