
export type MineBoardElement = {
  isBomb: boolean;
  isOpen: boolean;
  bombCount: number;
}

export enum gameStatus {
  ready,
  inGame,
  win,
  loss,
}
