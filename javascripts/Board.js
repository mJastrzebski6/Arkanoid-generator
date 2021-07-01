"use strict";

import Objects from "./Objects.js";

class Board {
  canvas = null;
  ctx = null;
  spriteSheetImage = null;
  mouseX = null;
  mouseY = null;
  highlighted = [31, 31];
  boardArray = new Array(30);
  checked = new Array(30);
  keyPressed = false;
  selectionXY = [null, null, null, null];
  selectionBlocks = [null, null, null, null];
  checkedBySelection = new Array(30);

  constructor() {
    this.canvas = document.getElementById("board");
    this.canvas.width = 1120;
    this.canvas.height = 1200;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.spriteSheetImage = new Image();
    this.spriteSheetImage.src = "./images/spriteSheet.png";

    this.spriteSheetImage.onload = () => {
      window.requestAnimationFrame(() => this.createPatternsCanvas());
    };

    this.canvas.addEventListener("mousemove", (event) => {
      this.mouseX = event.pageX - 500;
      this.mouseY = event.pageY - 22;

      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 14; j++) {
          if (
            j * 80 + 80 - this.mouseX < 80 &&
            j * 80 + 80 - this.mouseX > 0 &&
            i * 40 + 40 - this.mouseY < 40 &&
            i * 40 + 40 - this.mouseY > 0
          ) {
            this.highlighted = [j, i];
            break;
          }
        }
      }

      if (this.selectionXY[0] != null) {
        for (let i = 0; i < 14; i++) {
          for (let j = 0; j < 30; j++) {
            if (this.checkedBySelection[i][j] == 1)
              this.checkedBySelection[i][j] = 0;
          }
        }
        this.selectionXY[2] = this.mouseX;
        this.selectionXY[3] = this.mouseY;

        for (let i = 0; i < 14; i++) {
          for (let j = 0; j < 30; j++) {
            if (
              i * 80 + 80 - this.selectionXY[0] < 80 &&
              i * 80 + 80 - this.selectionXY[0] > 0 &&
              j * 40 + 40 - this.selectionXY[1] < 40 &&
              j * 40 + 40 - this.selectionXY[1] > 0
            ) {
              this.selectionBlocks[0] = i;
              this.selectionBlocks[1] = j;
            }
            if (
              i * 80 + 80 - this.selectionXY[2] < 80 &&
              i * 80 + 80 - this.selectionXY[2] > 0 &&
              j * 40 + 40 - this.selectionXY[3] < 40 &&
              j * 40 + 40 - this.selectionXY[3] > 0
            ) {
              this.selectionBlocks[2] = i;
              this.selectionBlocks[3] = j;
            }
          }
        }
        for (let i = 0; i < 14; i++) {
          for (let j = 0; j < 30; j++) {
            if (
              (i <= this.selectionBlocks[0] && i >= this.selectionBlocks[2]) ||
              (i >= this.selectionBlocks[0] && i <= this.selectionBlocks[2])
            ) {
              if (
                (j <= this.selectionBlocks[1] &&
                  j >= this.selectionBlocks[3]) ||
                (j >= this.selectionBlocks[1] && j <= this.selectionBlocks[3])
              ) {
                if (this.checkedBySelection[i][j] != 1) {
                  this.checkedBySelection[i][j] = 1;
                }
              }
            }
          }
        }
      }
    });

    this.canvas.addEventListener("mouseout", (event) => {
      this.mouseX = 0;
      this.mouseY = 0;
      this.highlighted = [31, 31];
    });

    for (let i = 0; i < 30; i++) {
      this.boardArray[i] = new Array(14);
      this.checked[i] = new Array(14);
      this.checkedBySelection[i] = new Array(14);
      for (let j = 0; j < 14; j++) {
        this.boardArray[i][j] = [-1, -1];
        this.checked[i][j] = 0;
        this.checkedBySelection[i][j] = 0;
      }
    }

    this.canvas.addEventListener("click", (event) => {
      if (!this.keyPressed) {
        for (let i = 0; i < 14; i++) {
          for (let j = 0; j < 30; j++) {
            if (this.highlighted[0] != i || this.highlighted[1] != j)
              this.checked[i][j] = 0;
          }
        }
      }
      if (this.checked[this.highlighted[0]][this.highlighted[1]] == 1)
        this.checked[this.highlighted[0]][this.highlighted[1]] = 0;
      else this.checked[this.highlighted[0]][this.highlighted[1]] = 1;

      if (this.selectionXY[0] != null) {
        for (let i = 0; i < 14; i++) {
          for (let j = 0; j < 30; j++) {
            if (this.checkedBySelection[i][j] == 1) {
              this.checked[i][j] = 1;
              this.checkedBySelection[i][j] = 0;
            }
          }
        }

        this.selectionXY = [null, null, null, null];
        this.selectionBlocks = [null, null, null, null];
      }
    });

    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button == 0) {
        this.selectionXY[0] = this.mouseX;
        this.selectionXY[1] = this.mouseY;
        this.selectionXY[2] = this.mouseX;
        this.selectionXY[3] = this.mouseY;
      }
    });

    this.canvas.addEventListener("mouseup", (event) => {});

    document.addEventListener("keyup", (event) => {
      if (event.ctrlKey == false || event.metaKey == false) {
        this.keyPressed = false;
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey || event.metaKey) {
        this.keyPressed = true;
      }
    });
    this.canvas.oncontextmenu = () => {
      Objects.contextMenu.overlay.style.visibility = "visible";
      return false;
    };
  }

  createPatternsCanvas() {
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 14; j++) {
        if (this.boardArray[i][j][0] != -1) {
          this.ctx.drawImage(
            this.spriteSheetImage,
            5 + 10 * this.boardArray[i][j][0],
            216 + 5 * this.boardArray[i][j][1],
            8,
            4,
            80 * j,
            40 * i,
            80,
            40
          );
        } else {
          this.ctx.fillStyle = "rgba(200, 200, 200, 1)";
          this.ctx.fillRect(80 * j, 40 * i, 80, 40);
        }
        if (
          (this.highlighted[0] == j && this.highlighted[1] == i) ||
          this.checked[j][i] == 1 ||
          this.checkedBySelection[j][i] == 1
        ) {
          this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          this.ctx.fillRect(80 * j, 40 * i, 80, 40);
        }
      }
    }
    // this.ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
    // this.ctx.fillRect(
    //   this.selectionXY[0],
    //   this.selectionXY[1],
    //   this.selectionXY[2] - this.selectionXY[0],
    //   this.selectionXY[3] - this.selectionXY[1]
    // );

    window.requestAnimationFrame(() => this.createPatternsCanvas());
  }

  deleteBlocks() {
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 30; j++) {
        if (this.checked[i][j] == 1) {
          this.boardArray[j][i][0] = -1;
          this.boardArray[j][i][1] = -1;
          this.checked[i][j] = 0;
        }
      }
    }
  }
}

export default Board;
