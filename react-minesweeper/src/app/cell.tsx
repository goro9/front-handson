import React from 'react';
import '../index.css';
import { MineBoardElement, cellStatus } from './common'
import assert from 'assert';

interface CellPropsIf {
  cell: MineBoardElement;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Cell(props: CellPropsIf) {
  // const cellStr = props.cell.isOpen ? ((props.cell.isBomb) ? 'B' : String(props.cell.bombCount)) : "";
  const cellStr = (props.cell.isBomb) ? 'B' : String(props.cell.bombCount);
  // const color = (props.cell.status === cellStatus.open) ? 'white' : ((props.cell.status === cellStatus.flag) ? 'green' : 'gray');
  let color = 'gray';
  switch (props.cell.status) {
    case cellStatus.close:
      color = 'gray';
      break;
    case cellStatus.open:
      color = 'white';
      break;
    case cellStatus.flag:
      color = 'green';
      break;
    default:
      assert(false);
  }

  return (
    <button className="square" onClick={props.onClick} onContextMenu={props.onRightClick} style={{ backgroundColor: color }}>
      {cellStr}
    </button>
  );
}
