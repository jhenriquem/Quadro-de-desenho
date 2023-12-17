import _ from "lodash";

(function () {
  const N_FRAMES_DEFAULT = 16;

  let current_color = "#000";
  let current_mode = "color";

  let mouseDown = false;
  //
  document.body.addEventListener("mousedown", () => (mouseDown = true));
  document.body.addEventListener("mouseup", () => (mouseDown = false));

  //
  const board = document.querySelector(".board");
  const numberFrames = document.querySelector("#number-frames");
  const colorPick = document.getElementById("choice-color");
  const btnClean = document.getElementById("btn-clean");
  const btnEraser = document.getElementById("btn-eraser");
  const btnColor = document.getElementById("btn-color");
  const labelSize = document.getElementById("show-size");

  colorPick.addEventListener("input", (e) => {
    actions.setColor(e.target.value);
  });
  btnClean.addEventListener("click", () => {
    actions.cleanBoard();
  });
  btnEraser.addEventListener("click", () => {
    actions.setMode("eraser");
  });
  btnColor.addEventListener("click", () => {
    actions.setMode("color");
  });

  numberFrames.addEventListener("change", () => {
    setupBoard(numberFrames.value);
  });
  numberFrames.addEventListener("mousemove", () =>
    actions.showSize(numberFrames.value),
  );

  function setupBoard(n_frames) {
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${n_frames}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${n_frames}, 1fr)`;

    for (let i = 1; i <= n_frames ** 2; i++) {
      const frame = document.createElement("div");
      board.appendChild(frame);

      frame.addEventListener("mousedown", colorFrame);
      frame.addEventListener("mouseover", colorFrame);
    }
  }

  const actions = (function () {
    const setColor = (color) => {
      current_color = color;
    };

    const setMode = (mode) => {
      activeButtons(mode);
      current_mode = mode;
    };

    const showSize = (size) => {
      labelSize.innerHTML = `${size} x ${size}`;
    };
    const cleanBoard = () => {
      board.innerHTML = "";
      setupBoard(numberFrames.value);
    };

    return { setColor, setMode, showSize, cleanBoard };
  })();

  function activeButtons(mode) {
    if (current_mode === "color") {
      btnColor.classList.remove("current");
    } else if (current_mode === "eraser") {
      btnEraser.classList.remove("current");
    }

    if (mode === "color") {
      btnColor.classList.add("current");
    } else if (mode === "eraser") {
      btnEraser.classList.add("current");
    }
  }

  function colorFrame(e) {
    const current_frame = e.target;

    if (e.type === "mouseover" && !mouseDown) return;

    if (current_mode === "color") {
      current_frame.style.backgroundColor = current_color;
    } else if (current_mode === "eraser") {
      current_frame.style.backgroundColor = "#fff";
    }
  }

  activeButtons(current_mode);
  setupBoard(N_FRAMES_DEFAULT);
})();
