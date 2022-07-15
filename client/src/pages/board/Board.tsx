import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Board as BoardModel} from '../../model'
import { selectBoards } from '../../state/store';
import { HiOutlineHome } from "react-icons/hi"

import Column from './components/Column';
import CreateColumn from './components/CreateColumn';

type Props = {};

export const Board:React.FC<Props> = () => {
  let { id } = useParams()
  const navigate = useNavigate()
  const boards:BoardModel[] = useSelector(selectBoards)
  
  const getBoardById = (id: string) => {
    return boards.filter(board => board.id === +id)[0]
  }
  
  const [board, setBoard] = useState<BoardModel>()
  const [triggerUseEffect, setTriggerUseEffect] = useState<boolean>(false)
  
  useEffect(() => {
    if (!id) return navigate('/')
    
    const tempBoard = getBoardById(id)
    if (!tempBoard) return navigate('/')
    setBoard(tempBoard)
    console.log(tempBoard);
    // eslint-disable-next-line
  }, [triggerUseEffect])
  
  
  
  return <div className='board-component'>
    <div className='top'>
      <Link to='/'><HiOutlineHome /></Link>
      <h2>{board?.title}</h2>
    </div>
    <div className='column-list'>
      { board?.columns.map(column => (
        <Column
          column={column}
          triggerUseEffect={setTriggerUseEffect}
          key={column.id}
        />
      )) }
      
      <CreateColumn
        boardId={board?.id ? board.id : 0}
        triggerUseEffect={setTriggerUseEffect}
      />
    </div>
  </div>
}