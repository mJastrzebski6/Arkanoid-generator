"use strict";

import Objects from "./Objects.js";

class Patterns {
  system = null;
  canvas = null;
  ctx = null;
  spriteSheetImage = null;
  mouseX = null;
  mouseY = null;
  highlighted = [6, 6];

  constructor() {
    this.system = navigator.platform;

    this.canvas = document.getElementById("patterns");
    this.canvas.width = 400;
    this.canvas.height = 120;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.filter = "brightness(0.5)";
    this.spriteSheetImage = new Image();
    this.spriteSheetImage.src = "./images/spriteSheet.png";

    this.spriteSheetImage.onload = () => {
      window.requestAnimationFrame(() => this.createPatternsCanvas());
    };

    this.canvas.addEventListener("mousemove", (event) => {
      var bounds = this.canvas.getBoundingClientRect();

      this.mouseX = event.pageX - bounds.left - scrollX;
      this.mouseY = event.pageY - bounds.top - scrollY;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 5; j++) {
          if (
            j * 80 + 80 - this.mouseX < 80 &&
            j * 80 + 80 - this.mouseX > 0 &&
            i * 40 + 40 - this.mouseY < 40 &&
            i * 40 + 40 - this.mouseY > 0
          )
            this.highlighted = [j, i];
        }
      }
      //console.log("page: " + this.mouseX + " " + this.mouseY);
    });

    this.canvas.addEventListener("mouseout", (event) => {
      this.mouseX = 0;
      this.mouseY = 0;
      this.highlighted = [6, 6];
    });
    this.canvas.addEventListener("click", (event) => {
      //console.log("clicked " + this.highlighted[0] + " " + this.highlighted[1])
      for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 30; j++) {
          if (Objects.board.checked[i][j] == 1) {
            Objects.board.boardArray[j][i][0] = this.highlighted[0];
            Objects.board.boardArray[j][i][1] = this.highlighted[1];
            Objects.board.checked[i][j] = 0;
          }
        }
      }
      Objects.history.historyArray = Objects.history.historyArray.slice(
        0,
        Objects.history.active
      );
      Objects.history.historyArray.push(
        JSON.parse(JSON.stringify(Objects.board.boardArray))
      );
      Objects.history.active++;
    });
  }

  createPatternsCanvas() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.highlighted[0] == j && this.highlighted[1] == i) {
          this.ctx.filter = "none";
          this.ctx.drawImage(
            this.spriteSheetImage,
            5 + j * 10,
            216 + i * 5,
            8,
            4,
            80 * j,
            40 * i,
            80,
            40
          );
          this.ctx.filter = "brightness(0.5)";
        } else {
          this.ctx.drawImage(
            this.spriteSheetImage,
            5 + j * 10,
            216 + i * 5,
            8,
            4,
            80 * j,
            40 * i,
            80,
            40
          );
        }
      }
    }
    window.requestAnimationFrame(() => this.createPatternsCanvas());
  }
}

export default Patterns;
