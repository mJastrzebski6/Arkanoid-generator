"use strict";

import Patterns from "./Patterns.js";
import Board from "./Board.js";
import FileHandler from "./FileHandler.js";
import ContextMenu from "./ContextMenu.js";
import History from "./History.js";

class Objects {
  static patterns = new Patterns();
  static board = new Board();
  static contextMenu = new ContextMenu();
  static fileHandler = new FileHandler();
  static history = new History();
}

export default Objects;

//page
// 14 x 30   board dimensions
// 5 x 4     patterns dimensions
// 8 X 4     block size in pixels
//+10 +5     offset when cutting from spritesheet
