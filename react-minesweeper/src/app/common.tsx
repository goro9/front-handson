
export type MineBoardElement = {
  isBomb: boolean;
  status: cellStatus;
  bombCount: number;
}

export enum gameStatus {
  ready,
  inGame,
  win,
  loss,
}

export enum cellStatus {
  close,
  open,
  flag,
}
