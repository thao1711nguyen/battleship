/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./src/style.css?");

/***/ }),

/***/ "./src/javascript/data.js":
/*!********************************!*\
  !*** ./src/javascript/data.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   computer: () => (/* binding */ computer),\n/* harmony export */   gameboard: () => (/* binding */ gameboard),\n/* harmony export */   player: () => (/* binding */ player),\n/* harmony export */   ship: () => (/* binding */ ship)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/javascript/helpers.js\");\n\nconst ship = (positions) => {\n    let numberOfHits = 0\n    function hit(position) {\n        this.positions.forEach((pos, idx) => {\n            if(pos == position) {\n                this.numberOfHits ++\n                this.positions[idx] = 'h'\n            }\n        })\n    }\n    \n    function isSunk() {\n        return this.positions.every((pos) => pos == 'h')\n    }\n    \n    return { isSunk, positions, hit, numberOfHits }\n}\n\nconst gameboard = () => {\n    let missedAttack = []\n    const ships = []\n    function placeship(positions) {\n        positions.forEach((pos) => {\n            ships.push(ship(pos))\n        })\n    }\n    function receiveAttack(position) {\n        let result \n        this.ships.forEach((ship, idx) => {\n            let numberOfHitsBefore = ship.numberOfHits\n            ship.hit(position)\n            if(numberOfHitsBefore < ship.numberOfHits) {\n                result = true \n                return \n            } else {\n                if(idx == (this.ships.length -1)) {\n                    if(numberOfHitsBefore < ship.numberOfHits) {\n                        result = true \n                    } else {\n                        this.missedAttack.push(position)\n                        result = false\n                    }\n                }\n            }\n        })\n        return result \n        \n    }\n    function isAllSunk() {\n        return this.ships.every((ship) => ship.isSunk())\n    }\n    return { placeship, receiveAttack, missedAttack, isAllSunk, ships }\n}\nconst player = (name) => {\n    \n    return { board: gameboard(), name }\n}\nconst computer = (name) => {\n    const attackPoints = []\n    \n    function validHit(hit) {\n        return !this.attackPoints.includes(hit)\n    }\n    function hit() {\n        while(true) {\n            let hit = Math.floor(Math.random()*100) + 1 \n            if(validHit.call(this, hit)) {\n                this.attackPoints.push(hit)\n                return hit \n            }\n        }\n    }\n    function randomAngle() {\n        const number = Math.floor(Math.random()*2)\n        return (number == 0) ? 0 : 90\n    }\n    function randomHeadBottom(angle, length, column) {\n        const head = Math.floor(Math.random()*100) + 1\n        let bottom\n        if(angle == 0) {\n            bottom = head + length -1 \n        } else {\n            bottom = Math.floor(head/column + length -1) + head % column\n        }\n        return [head, bottom]\n    }\n    function placeship(column, shipSizes) {\n        let result = []\n        shipSizes.forEach((size) => {\n            let angle = randomAngle()\n            let headBottom\n            while(true) {\n                headBottom = randomHeadBottom(angle, size, column)\n                let position = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getShipPosition)(size, ...headBottom, column)\n                if((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.checkValid)(angle, ...headBottom, column) && (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.noOverLap)(position, result)) {\n                    result.push(position)\n                    break\n                }\n            }\n        })\n        return result\n    }\n    \n    return { attackPoints, hit, board: gameboard(), placeship, name }\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/javascript/data.js?");

/***/ }),

/***/ "./src/javascript/dom.js":
/*!*******************************!*\
  !*** ./src/javascript/dom.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dom: () => (/* binding */ dom)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/javascript/helpers.js\");\n\n\nfunction createPlayerBoard() {\n    const gameBoardTemplate = document.getElementById('game-board').content.cloneNode(true)\n    const gameBoardDiv = document.getElementById('place-ship').querySelector(\".player-board\")\n    gameBoardDiv.appendChild(gameBoardTemplate)\n}\nfunction createBoard(column) {\n    const gameBoard = document.getElementById('game-board')\n    if(gameBoard.children.length == 0) {\n        for(let i=1; i<=column*column; i++) {\n            let cell = document.createElement('div')\n            cell.setAttribute('data-id', i)\n            gameBoard.appendChild(cell)\n        }\n    }\n    \n}\nfunction setSize(size, n) {\n    const gameBoard = document.getElementById('game-board')\n    const ships = document.getElementById('ships')\n    gameBoard.style.width = `${size}px`\n    gameBoard.style.height = `${size}px`\n    const unit = size/n\n    for(const ship of ships.children) {\n        const shipLength = +ship.dataset.length\n        ship.style.width = `${unit*shipLength}px`\n        ship.style.height = `${unit}px`\n    }\n}\nfunction createShipDom(shipSizes) {\n    const ships = document.getElementById('ships')\n    shipSizes.forEach((size, idx) => {\n        const ship = document.createElement('img')\n        ship.src = \"https://as2.ftcdn.net/v2/jpg/03/53/84/65/1000_F_353846597_ulMROME4HZeJdzcO4AM0lH5tRDjU2Nbm.jpg\"\n        ship.draggable = \"true\"\n        ship.classList.add('ship')\n        ship.dataset.length = size\n        ship.dataset.shipId = idx\n        ships.appendChild(ship)\n    })\n}\nfunction cleanNode(node) {\n    while(node.lastChild) {\n        node.lastChild.remove()\n    }\n}\nconst dom = (() => {\n    \n    function placeship(column) {\n        // prepare dom elements\n        createPlayerBoard()\n        // get all of the necessary elements\n        const placeshipDiv = document.getElementById('place-ship')\n        const board = placeshipDiv.querySelector(\".player-board\")\n        const ships = document.getElementById('ships')\n        const finishBtn = document.getElementById('finish')\n        let result = []\n        // display place-ship Div\n        display(placeshipDiv)\n        // drag & drop\n        for(const ship of ships.children) {\n            const shipLength = +ship.dataset.length\n            const origin = shipLength/2\n            let allowRotate\n            let angle = 0\n            let cursorPosition\n            let originCell\n            let shipPosition\n            result.push(shipPosition)\n            \n            ship.addEventListener('dragstart', (e) => {\n                e.dataTransfer.setDragImage(new Image(0,0), 0, 0) \n                e.dataTransfer.setData('text/plain', e.target.dataset.shipId)\n                let cursor = e.offsetX/(e.target.offsetWidth)*4\n                cursorPosition = e.offsetX/(e.target.offsetWidth)*shipLength\n                if(cursor <= 1 || cursor >= 3) {\n                  allowRotate = true\n                } else {\n                  allowRotate = false\n                }\n            })\n              \n            ship.addEventListener('drag', (event) => {\n                if(allowRotate) {\n              //     calculate angle\n                  let box = event.target.getBoundingClientRect()\n                  let y = event.clientY - (box.top + box.height/2)\n                  let x = event.clientX - (box.left + box.width/2)\n                  angle = Math.atan2(y,x)*180/(Math.PI)\n                  if(angle >= 0 && angle <= 45 || angle <=0 && angle >= -45) {\n                                  angle = 0\n                  } else if(angle > 45 && angle <= 90 || angle > 90 && angle <= 135) {\n                    angle = 90\n                  } else if(angle < -45 && angle >= -90 || angle < -90 && angle >= -135 ) {\n                    angle = 90\n                  } else if(angle > 135 && angle <= 180 || angle < -135 && angle >= -180) {\n                    angle = 0\n                  }\n                  event.target.style.transform = `rotate(${angle}deg)`\n                }  \n            })\n\n            board.addEventListener('dragover', (e) => {\n                e.preventDefault()\n            })\n\n            board.addEventListener('drop', (e) => {\n                const shipId = e.dataTransfer.getData('text/plain')\n                const ship = ships.querySelector(`[data-ship-id = \"${shipId}\"]`)\n                const unit = ship.offsetWidth/shipLength\n                let newHeadBottom, newPosition\n                if(!allowRotate) {\n                    let newOriginCell = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getOrigin)(+e.target.dataset.id, angle, cursorPosition, column)\n                    newHeadBottom = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getHeadBottom)(newOriginCell, angle, column)\n                    newPosition = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getShipPosition)(shipLength, ...newHeadBottom, column)\n                    if((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.checkValid)(angle, ...newHeadBottom, column) && (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.noOverLap)(newPosition, result)) {\n                    // change ship's position\n                        originCell = newOriginCell\n                        shipPosition = newPosition\n                    // attach the ship to new position (change display)\n                        e.preventDefault()\n                        let top, left\n                        const originCellDiv = board.querySelector(`[data-id=\"${originCell}\"]`)\n                        originCellDiv.appendChild(ship)\n                        originCellDiv.style.position = 'relative'\n                        ship.style.position = 'absolute'\n                        if(angle == 0) {\n                            top = 0\n                            left = -Math.floor(origin)*unit\n                        } else {\n                            if(shipLength % 2 == 0) {\n                                top = -0.5*unit\n                                left = (-origin + 0.5)*unit\n                            } else {\n                                top = 0\n                                left = -Math.floor(origin)*unit\n                            }\n                        }\n                        ship.style.top = `${top}px`\n                        ship.style.left = `${left}px`\n                    } \n                } else {\n                    newHeadBottom = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getHeadBottom)(originCell, angle, column)\n                    newPosition = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getShipPosition)(shipLength, ...newHeadBottom, column)\n                    if((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.checkValid)(...newHeadBottom) && (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.noOverLap)(newPosition, result)) {\n                        // change ship's position\n                        shipPosition = newPosition\n                        // change display\n                        if(shipLength % 2 == 0) {\n                            let left, top \n                            if(angle == 90) {\n                                top = -0.5*unit\n                                left = (-origin + 0.5)*unit\n                            } else {\n                                left = -origin*unit\n                                top = 0\n                            }\n                            ship.style.left = `${left}px`\n                            ship.style.top = `${top}px`\n                        }\n                    } else {\n                        // rotate the ship back (change display)\n                        angle == 0 ? angle = 90 : angle = 0\n                        ship.style.transform = `rotate(${angle}deg`\n                    }\n                }\n            })\n\n        }\n        // finish ship's placement\n        return new Promise((resolve) => {\n            if(ships.children.length === 0) {\n                finishBtn.disabled = \"false\"\n                finishBtn.addEventListener('click', () => {\n                    disappear(placeshipDiv)\n                    resolve(result)\n                })\n            }\n        })     \n    }\n    function attack() {\n        const aiBoard = document.getElementById('ai-board')\n        let promises = []\n        for(const cell of aiBoard) {\n            const promise = new Promise((resolve) => {\n                cell.addEventListener('click', (e) => {\n                    resolve(+cell.dataset.id)\n                })\n            })\n            promises.push(promise)\n        }\n        return Promise.any(promises)\n        \n    }\n    function displayAttack(name, attackCell, result) {\n        const board = document.getElementById('play').querySelector(`.${name}-board`)\n        const cell = board.querySelector(`[data-id=\"${attackCell}\"]`)\n        if(result) {\n            cell.classList.add(\"attack\")\n        } else {\n            cell.classList.add(\"missed\")\n        }\n    }\n    function displayFinale(winner) {\n        const finaleDiv = document.getElementById('finale')\n        display(finaleDiv)\n        finaleDiv.textContent = `Game ends! The winner is: ${winner}!`\n    }\n    function reset() {\n        const playDiv = document.getElementById('play')\n        document.getElementById('finale').textContent = ''\n        cleanNode(playDiv.querySelector(\".player-board\"))\n        cleanNode(playDiv.querySelector(\".ai-board\"))\n\n        const placeshipDiv = document.getElementById('place-ship')\n        cleanNode(placeshipDiv.querySelector(\".player-board\"))\n\n        cleanNode(document.getElementById('ships'))\n\n    }\n    function prepareBeforePlay(column, shipSizes, boardSize) {\n        createBoard(column)\n        createShipDom(shipSizes)\n        setSize(boardSize, column)\n    }\n    function display(node) {\n        node.classList.add('display')\n    } \n    function disappear(node) {\n        node.classList.remove('display')\n    }\n    return { placeship, attack, displayAttack, displayFinale, reset, prepareBeforePlay, display, disappear }\n})()\n\n//# sourceURL=webpack://battleship/./src/javascript/dom.js?");

/***/ }),

/***/ "./src/javascript/game.js":
/*!********************************!*\
  !*** ./src/javascript/game.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   game: () => (/* binding */ game)\n/* harmony export */ });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/javascript/data.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/javascript/dom.js\");\n\n\nconst game = (() => {\n    function prepareBoards() {\n        const playDiv = document.getElementById('play')\n        const playerBoard = document.getElementById('place-ship').querySelector(\".player-board\").content.cloneNode(true)\n        const aiBoard = document.getElementById('game-board').content.cloneNode(true)\n        playDiv.querySelector(\".player-board\").appendChild(playerBoard)\n        playDiv.querySelector(\".ai-board\").appendChild(aiBoard)\n    }\n    function gameOver(board) {\n        return board.isAllSunk()\n    }\n    async function play(column, shipSizes) {\n        const player1 = (0,_data__WEBPACK_IMPORTED_MODULE_0__.player)('human')\n        const ai = (0,_data__WEBPACK_IMPORTED_MODULE_0__.computer)('ai')\n        // display playDiv\n        const playDiv = document.getElementById('play')\n        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.display(playDiv)\n        // display player's board for him/her to place their ships\n        const playerShipPlacement = await _dom__WEBPACK_IMPORTED_MODULE_1__.dom.placeship(column)\n        player1.board.placeship(playerShipPlacement)\n        const aiShipPlacement = ai.placeship(column, shipSizes)\n        ai.board.placeship(aiShipPlacement)\n        // display both boards for player to keep track of the game\n        prepareBoards()\n        const players = [player1, ai]\n        while(true) {\n            let attack, result\n            players.forEach(async function(player, idx) {\n                if(player.name == 'human') {\n                    attack = await _dom__WEBPACK_IMPORTED_MODULE_1__.dom.attack()\n                } else {\n                    attack = player.hit()\n                }\n                result = player.board.receiveAttack(attack)\n                if(player.name == 'human') {\n                    _dom__WEBPACK_IMPORTED_MODULE_1__.dom.displayAttack('ai', attack, result)\n                } else {\n                    _dom__WEBPACK_IMPORTED_MODULE_1__.dom.displayAttack('human', attack, result)\n                }\n                idx == 0 ? idx =1 : idx = 0\n                if(gameOver(players[idx]).board) {\n                    _dom__WEBPACK_IMPORTED_MODULE_1__.dom.displayFinale(player.name)\n                    return \n                }\n            })\n\n            // display ai's board attack result \n            // ai attacks \n            // display result of ai's attack \n            // check if gameover \n            // display result\n\n        }\n    }\n    return { play }\n})()\n\n//# sourceURL=webpack://battleship/./src/javascript/game.js?");

/***/ }),

/***/ "./src/javascript/helpers.js":
/*!***********************************!*\
  !*** ./src/javascript/helpers.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkValid: () => (/* binding */ checkValid),\n/* harmony export */   getHeadBottom: () => (/* binding */ getHeadBottom),\n/* harmony export */   getOrigin: () => (/* binding */ getOrigin),\n/* harmony export */   getShipPosition: () => (/* binding */ getShipPosition),\n/* harmony export */   noOverLap: () => (/* binding */ noOverLap)\n/* harmony export */ });\n\nfunction getOrigin(currentCell, angle, cursorPosition, column) {\n    const distance = -Math.floor(cursorPosition) + Math.floor(origin)\n    if(angle === 0) {\n      return currentCell + distance\n    } else {\n     return (Math.floor(currentCell/column) + distance)*column + (currentCell % column)\n    }\n}\nfunction getHeadBottom(originCell, angle, column) {\n    let head, bottom\n    if(angle == 0) {\n        head = originCell - Math.floor(origin)\n        bottom = head + shipLength -1\n    } else {\n        head = (Math.floor(originCell/column) - Math.floor(origin))*column + (originCell % column)\n        bottom = (Math.floor(head/column) + shipLength -1)*column + (originCell % column)\n    }\n    return [head, bottom]\n}\nfunction convertCellNumber(cellNumber, column) {\n    let result = []\n    if(cellNumber % column == 0) {\n        result[0] = Math.floor(cellNumber/column) \n        result[1] = column\n    } else {\n        result[0] = Math.floor(cellNumber/column) + 1\n        result[1] = cellNumber % column\n    }\n    return result\n}\nfunction checkValid(angle, head, bottom, column) {\n    const headConverted = convertCellNumber(head, column)\n    const bottomConverted = convertCellNumber(bottom, column)\n    let condition1, condition2\n    condition1 = headConverted.every((item) => item >=1 && item <= column) && bottomConverted.every((item) => item >=1 && item <= column)\n    if(angle == 0) {\n        condition2 = headConverted[0] == bottomConverted[0]\n    } else {\n        condition2 = headConverted[1] == bottomConverted[1]\n    }\n    \n    return condition1 && condition2\n}\nfunction noOverLap(position, collection) {\n    return (collection.flat().every((item) => !position.includes(item)))\n}\nfunction getShipPosition(shipLength, head, bottom, column) {\n    let result = []\n    for(let i=0; i < shipLength; i++) {\n        if(head % column == bottom % column) {\n            let next = (Math.floor(head/column) + i)*column + head % column\n            result.push(next)\n        } else {\n            result.push(head+i)\n        }\n    }\n    return result\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/javascript/helpers.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/javascript/game.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/javascript/dom.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../style.css */ \"./src/style.css\");\n\n\n\nwindow.addEventListener('load', () => {\n    const column = 10\n    const shipSizes = [5,4,3,3,2]\n    const boardSize = 500\n    \n    const welcome = document.getElementById('welcome')\n    _dom__WEBPACK_IMPORTED_MODULE_1__.dom.display(welcome)\n    function start() {\n        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.disappear(welcome)\n        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.prepareBeforePlay(column, shipSizes, boardSize)\n        _game__WEBPACK_IMPORTED_MODULE_0__.game.play(column, shipSizes)\n    }\n    welcome.querySelector('button').addEventListener('click', start)\n    document.getElementById('restart').addEventListener('click', () => {\n\n        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.reset()\n        start()   \n    })\n})\n\n//# sourceURL=webpack://battleship/./src/javascript/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/javascript/index.js");
/******/ 	
/******/ })()
;