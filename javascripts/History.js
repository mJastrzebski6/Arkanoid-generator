"use strict";

import Objects from "./Objects.js";

class History {
  historyArray = [];
  active = 1;
  constructor() {
    let tmp = new Array(30);
    for (let i = 0; i < 30; i++) {
      tmp[i] = new Array(14);
      for (let j = 0; j < 14; j++) {
        tmp[i][j] = [-1, -1];
      }
    }
    this.historyArray.push(tmp);
  }

  undo() {
    if (this.historyArray.length != 0 && this.active != 1) {
      Objects.board.boardArray = JSON.parse(
        JSON.stringify(this.historyArray[this.active - 2])
      );
      this.active--;
    }
  }
  redo() {
    if (this.active < this.historyArray.length) {
      Objects.board.boardArray = JSON.parse(
        JSON.stringify(this.historyArray[this.active])
      );
      this.active++;
    }
  }
  deletion() {
    Objects.board.deleteBlocks();
    this.historyArray = this.historyArray.slice(0, this.active);
    this.historyArray.push(
      JSON.parse(JSON.stringify(Objects.board.boardArray))
    );
    this.active++;
  }
}
export default History;
