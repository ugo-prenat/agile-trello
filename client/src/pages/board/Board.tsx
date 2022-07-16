import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Board as BoardModel} from '../../model'
import { selectBoards } from '../../state/store';
import { HiOutlineHome } from "react-icons/hi"
import { Column as ColumnModel } from '../../model'

import Column from './components/Column';
import CreateColumn from './components/CreateColumn';
import { addColumn, removeColumn } from '../../state/slices/boardsSlice';

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
  
  
  const createColumn = (title: string, board: number) => {
    const newColumn:ColumnModel = {
      id: new Date().valueOf(),
      title,
      board,
      cards: []
    }
    dispatch(addColumn(newColumn))
  }
  const deleteColumn = (boardId: number, columnId: number) => {
    dispatch(removeColumn({ boardId, columnId }))
  }
  
  useEffect(() => {
    if (!id) return navigate('/')
    
    const tempBoard = getBoardById(id)
    if (!tempBoard) return navigate('/')
    setBoard(tempBoard)
    // eslint-disable-next-line
  }, [createColumn, deleteColumn])
  
  
  
  return <div className='board-component'>
    <div className='top'>
      <Link to='/'><HiOutlineHome /></Link>
      <h2>{board?.title}</h2>
    </div>
    <div  className='column-wrapper'>
      <div className='column-list'>
        { board?.columns.map(column => (
          <Column
            column={column}
            deleteColumn={deleteColumn}
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
}