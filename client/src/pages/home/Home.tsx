import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Board } from '../../model';
import { addBoard, removeBoard } from '../../state/slices/boardsSlice';
import { selectBoards } from '../../state/store';


type Props = {
};

export const Home:React.FC<Props> = () => {
  const [boardTitle, setBoardTitle] = useState<string>('')
  const boards = useSelector(selectBoards)
  const dispatch = useDispatch()
  
  const handleCreate = (e: FormEvent) => {
    e.preventDefault()
    
    const newBoard:Board = {
      id: new Date().valueOf(),
      title: boardTitle,
      columns: []
    }
    
    dispatch(addBoard(newBoard))
    setBoardTitle('')
  }

  
  return <div className='home-component'>
    <form onSubmit={e => handleCreate(e)}>
      <input
        type='text'
        value={boardTitle}
        onChange={e => setBoardTitle(e.target.value)}
        placeholder='Nom du nouveau tableau'
        required
      />
      <button>Créer un nouveau tableau</button>
    </form>
    <div className="board-list">
      { boards.map(board => (
        <div className="board-link" key={board.id}>
          <Link to={`/board/${board.id}`}
          >
            {board.title}
          </Link>
          <span onClick={() => dispatch(removeBoard(board.id))}>Supprimer</span>
        </div>
      ))}
    </div>
  </div>
}