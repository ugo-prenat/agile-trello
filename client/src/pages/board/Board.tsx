import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Board as BoardModel} from '../../model'
import { selectBoards } from '../../state/store';

import Column from './components/Column';


type Props = {

};

export const Board:React.FC<Props> = ({}: Props) => {
  let { id } = useParams()
  const boards:BoardModel[] = useSelector(selectBoards)
  console.log(boards);
  
  const getBoardById = (id: string) => {
    return boards.filter(board => board.id === +id)[0]
  }
  
  const [board, setBoard] = useState<BoardModel>()
  
  useEffect(() => {
    console.log(id);
    if (id) setBoard(getBoardById(id))
  }, [])
  
  console.log(board);
  
  
  
  return <div className='board-component'>
    <h2>{board?.title}</h2>
    { board?.columns.map(column => (
      <Column
        column={column}
        boardId={board.id}
        key={column.id}
      />
    )) }
  </div>
}