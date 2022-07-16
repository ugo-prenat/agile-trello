import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Board, Card, Column } from '../../model'

export interface BoardState {
  boards: Board[]
}

const initialState: BoardState = {
  boards: [
    { id: 1657812243952, title: 'Premier tableau', columns: [
      {
        id: 1657812243953,
        title: 'colonne 1',
        board: 1657812243952,
        cards: [
          {
            id: new Date().valueOf(),
            title: 'Card 01',
            board: 1657812243952,
            column: 1657812243953
          },
          {
            id: new Date().valueOf()+3,
            title: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos`,
            board: 1657812243952,
            column: 1657812243953
          }
        ]
      },
      {
        id: new Date().valueOf()+12,
        title: 'colonne 2',
        board: 1657812243952,
        cards: []
      }
    ] },
    { id: 1657812243932, title: 'Un autre', columns: [] }
  ]
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state: any, action: PayloadAction<Board>) => {
      state.boards = [ ...state.boards, action.payload ]
    },
    removeBoard: (state: any, action: PayloadAction<number>) => {
      state.boards = state.boards.filter((board:Board) => board.id !== action.payload)
    },
    addColumn: (state: any, action: PayloadAction<Column>) => {
      state.boards.map((board:Board) => {
        if (board.id === action.payload.board) {
          board.columns.push(action.payload)
        }
      })
    },
    removeColumn: (state: any, action: PayloadAction<{boardId: number, columnId: number}>) => {
      state.boards.map((board:Board) => {
        if (board.id === action.payload.boardId) {
          board.columns = board.columns.filter((column:Column) => column.id !== action.payload.columnId)
        }
      })
    },
    addCard: (state: any, action: PayloadAction<Card>) => {
      state.boards.map((board:Board) => {
        if (board.id === action.payload.board) {
          board.columns.map((column:Column) => {
            if (column.id === action.payload.column) {
              column.cards.push(action.payload)
            }
          })
        }
      })
    },
    removeCard: (state: any, action: PayloadAction<Card>) => {
      state.boards.map((board:Board) => {
        board.columns.map((column:Column) => {
          if (column.id === action.payload.column) {
            const newColumn:Column = { ...column, cards: [...column.cards, action.payload] }
            board.columns = [...board.columns, newColumn]
          }
        })
      })
    },
  },
})

export const {
  addBoard, removeBoard,
  addColumn, removeColumn,
  addCard, removeCard
} = boardSlice.actions

export default boardSlice.reducer