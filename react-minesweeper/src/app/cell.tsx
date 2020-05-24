import React from 'react';
import '../index.css';
import { MineBoardElement } from './common'

interface CellPropsIf {
  cell: MineBoardElement;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Cell(props: CellPropsIf) {
  // const cellStr = props.cell.isOpen ? ((props.cell.isBomb) ? 'B' : String(props.cell.bombCount)) : "";
  const cellStr = (props.cell.isBomb) ? 'B' : String(props.cell.bombCount);
  const color = props.cell.isOpen ? 'white' : 'gray';

  return (
    <button className="square" onClick={props.onClick} onContextMenu={props.onRightClick} style={{ backgroundColor: color }}>
      {cellStr}
    </button>
  );
}
