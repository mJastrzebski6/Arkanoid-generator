"use strict";

import Objects from "./Objects.js";

class ContextMenu {
  overlay = document.getElementById("overlay");

  constructor() {
    this.overlay.addEventListener("click", () => {
      this.overlay.style.visibility = "hidden";
    });
    document.getElementById("undo-button").addEventListener("click", () => {
      Objects.history.undo();
    });
    document.getElementById("redo-button").addEventListener("click", () => {
      Objects.history.redo();
    });
    document.getElementById("delete-button").addEventListener("click", () => {
      Objects.board.deleteBlocks();
    });
    document.getElementById("save-button").addEventListener("click", () => {
      Objects.fileHandler.saveToFile(Objects.board.boardArray);
    });
    document.getElementById("load-button").addEventListener("click", () => {
      Objects.fileHandler.loadFromFile();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key == "z" && Objects.board.keyPressed == true) {
        event.preventDefault();
        Objects.history.undo();
      } else if (event.key == "y" && Objects.board.keyPressed == true) {
        event.preventDefault();
        Objects.history.redo();
      } else if (event.key == "Delete") {
        event.preventDefault();
        Objects.history.deletion();
      } else if (event.key == "s" && Objects.board.keyPressed == true) {
        event.preventDefault();
        Objects.fileHandler.saveToFile(Objects.board.boardArray);
      } else if (event.key == "l" && Objects.board.keyPressed == true) {
        event.preventDefault();
        Objects.fileHandler.loadFromFile();
      }
    });
  }
}

export default ContextMenu;
