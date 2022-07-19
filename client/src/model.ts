export interface Card {
  id: number
  title: string
  board: number
  column: number
}
export interface Column {
  id: number
  title: string
  board: number
  color: string,
  cards: Card[]
}
export interface Board {
  id: number
  title: string
  columns: Column[]
}