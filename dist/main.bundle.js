/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/default.css":
/*!*******************************!*\
  !*** ./src/style/default.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/placeship.css":
/*!*********************************!*\
  !*** ./src/style/placeship.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/play.css":
/*!****************************!*\
  !*** ./src/style/play.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/javascript/data.js":
/*!********************************!*\
  !*** ./src/javascript/data.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computer: () => (/* binding */ computer),
/* harmony export */   gameboard: () => (/* binding */ gameboard),
/* harmony export */   player: () => (/* binding */ player),
/* harmony export */   ship: () => (/* binding */ ship)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/javascript/helpers.js");

const ship = (positions) => {
    let numberOfHits = 0
    function hit(position) {
        this.positions.forEach((pos, idx) => {
            if(pos == position) {
                this.numberOfHits ++
                this.positions[idx] = 'h'
            }
        })
    }
    
    function isSunk() {
        return this.positions.every((pos) => pos == 'h')
    }
    
    return { isSunk, positions, hit, numberOfHits }
}

const gameboard = () => {
    let missedAttack = []
    const ships = []
    function placeship(positions) {
        positions.forEach((pos) => {
            ships.push(ship(pos))
        })
    }
    function receiveAttack(position) {
        let result = false
        for(let i=0; i<this.ships.length; i++) {
            let numberOfHitsBefore = this.ships[i].numberOfHits
            this.ships[i].hit(position)
            if(numberOfHitsBefore < this.ships[i].numberOfHits) {
                return true
            } 
        }
        this.missedAttack.push(position)
        return result 
        
    }
    function isAllSunk() {
        return this.ships.every((ship) => ship.isSunk())
    }
    return { placeship, receiveAttack, missedAttack, isAllSunk, ships }
}
const player = (name) => {
    
    return { board: gameboard(), name }
}
const computer = (name) => {
    const attackPoints = []
    
    function validHit(hit) {
        return !this.attackPoints.includes(hit)
    }
    function hit() {
        while(true) {
            let hit = Math.floor(Math.random()*100) + 1 
            if(validHit.call(this, hit)) {
                this.attackPoints.push(hit)
                return hit 
            }
        }
    }
    function randomAngle() {
        const number = Math.floor(Math.random()*2)
        return (number == 0) ? 0 : 90
    }
    function randomHeadBottom(angle, length, column) {
        const head = Math.floor(Math.random()*100) + 1
        let bottom
        if(angle == 0) {
            bottom = head + length -1 
        } else {
            bottom = (Math.floor(head/column) + length -1)*column + head % column
        }
        return [head, bottom]
    }
    function placeship(column, shipSizes) {
        let result = []
        shipSizes.forEach((size) => {
            let angle = randomAngle()
            let headBottom
            while(true) {
                headBottom = randomHeadBottom(angle, size, column)
                let position = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getShipPosition)(size, ...headBottom, column)
                if((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.checkValid)(angle, ...headBottom, column) && (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.noOverLap)(position, result)) {
                    result.push(position)
                    break
                }
            }
        })
        return result
    }
    
    return { attackPoints, hit, board: gameboard(), placeship, name }
}




/***/ }),

/***/ "./src/javascript/dom.js":
/*!*******************************!*\
  !*** ./src/javascript/dom.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dom: () => (/* binding */ dom)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/javascript/helpers.js");


function createPlayerBoard() {
    const gameBoardTemplate = document.getElementById('game-board').content.cloneNode(true)
    const gameBoardDiv = document.getElementById('place-ship').querySelector(".player-board")
    gameBoardDiv.appendChild(gameBoardTemplate)
}
function createBoard(column) {
    const gameBoardFragment = document.getElementById('game-board').content
    if(gameBoardFragment.childElementCount == 0) {
        for(let i=1; i<= column*column; i++) {
            let cell = document.createElement('div')
            cell.setAttribute('data-id', i)
            gameBoardFragment.appendChild(cell)
        }
    }
    
}
function setSize(size, n) {
    const gameBoard = document.getElementById('game-board').content
    const ships = document.getElementById('ships')
    const unit = size/n
    for(const cell of gameBoard.children) {
        cell.style.width = `${unit}px`
        cell.style.height = `${unit}px`
    }
    for(const ship of ships.children) {
        const shipLength = +ship.dataset.length
        ship.style.width = `${unit*shipLength}px`
        ship.style.height = `${unit}px`
    }
}
function createShipDom(shipSizes) {
    const ships = document.getElementById('ships')
    shipSizes.forEach((size, idx) => {
        const ship = document.createElement('img')
        ship.src = "https://as2.ftcdn.net/v2/jpg/03/53/84/65/1000_F_353846597_ulMROME4HZeJdzcO4AM0lH5tRDjU2Nbm.jpg"
        ship.draggable = "true"
        ship.classList.add('ship')
        ship.dataset.length = size
        ship.dataset.shipId = idx
        ships.appendChild(ship)
    })
}
function cleanNode(node) {
    while(node.lastChild) {
        node.lastChild.remove()
    }
}
function getShip(id) {
    const ships = document.getElementById('ships')
    const playerBoard = document.getElementById('place-ship').querySelector('.player-board')
    let ship = ships.querySelector(`[data-ship-id="${id}"]`)
    if(!ship) {
        ship = playerBoard.querySelector(`[data-ship-id="${id}"]`)
    }
    return ship 
    
}
function getTempResult(shipId) {
    const shipsOnBoard = document.getElementById('place-ship').querySelector('.player-board').getElementsByClassName('ship')
    let collection = []
    for(const ship of shipsOnBoard) {
        if(ship !== getShip(shipId)) {
            let shipPosition = ship.dataset.position.split(',').map((item) => +item)
            collection.push(shipPosition)
        }
    }
    return collection
}

const dom = (() => {
    
    function placeship(column) {
        // prepare dom elements
        createPlayerBoard()
        // get all of the necessary elements
        const placeshipDiv = document.getElementById('place-ship')
        const board = placeshipDiv.querySelector(".player-board")
        const ships = document.getElementById('ships')
        const finishBtn = document.getElementById('finish')
        // display place-ship Div
        display(placeshipDiv)
        // drag & drop
        let shipLength, origin, allowRotate, cursorPosition
        for(const ship of ships.children) {
            ship.dataset.angle = "0"
            ship.addEventListener('dragstart', (e) => {
                e.dataTransfer.setDragImage(new Image(0,0), 0, 0) 
                e.dataTransfer.setData('text/plain', e.target.dataset.shipId)
                shipLength = +e.target.dataset.length
                origin = shipLength/2


                let cursor = e.offsetX/(e.target.offsetWidth)*4
                cursorPosition = e.offsetX/(e.target.offsetWidth)*shipLength
                if(cursor <= 1 || cursor >= 3) {
                  allowRotate = true
                } else {
                  allowRotate = false
                }
            })
              
            ship.addEventListener('drag', (event) => {
            
                if(allowRotate) {
              //     calculate angle
                    let angle 
                    let box = event.target.getBoundingClientRect()
                    let y = event.clientY - (box.top + box.height/2)
                    let x = event.clientX - (box.left + box.width/2)
                    angle = Math.atan2(y,x)*180/(Math.PI)
                    if(angle >= 0 && angle <= 45 || angle <=0 && angle >= -45) {
                                    angle = 0
                    } else if(angle > 45 && angle <= 90 || angle > 90 && angle <= 135) {
                        angle = 90
                    } else if(angle < -45 && angle >= -90 || angle < -90 && angle >= -135 ) {
                        angle = 90
                    } else if(angle > 135 && angle <= 180 || angle < -135 && angle >= -180) {
                        angle = 0
                    }
                    event.target.dataset.angle = angle
                    event.target.style.transform = `rotate(${angle}deg)`
                }  
            })
            // prevent rotating ship outside board
        }
        board.addEventListener('dragover', (e) => {
            e.stopPropagation()
            e.preventDefault()
        })

        board.addEventListener('drop', (e) => {
            // cuz we add eventlistener to document
            e.stopPropagation()

            const shipId = e.dataTransfer.getData('text/plain')
            const ship = getShip(shipId)
            const unit = ship.offsetWidth/shipLength
            const tempResult = getTempResult(shipId)
            let shipPosition = ''
            let angle = +ship.dataset.angle
            let newHeadBottom, newPosition
            if(ship.dataset.position) {
                shipPosition = ship.dataset.position.split(',').map((item) => +item)
            }
            if(!allowRotate) {
                let originCell = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getOrigin)(+e.target.dataset.id, angle, cursorPosition, origin, column)
                newHeadBottom = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getHeadBottom)(originCell, angle, shipLength, column)
                newPosition = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getShipPosition)(shipLength, ...newHeadBottom, column)

                if((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.checkValid)(angle, ...newHeadBottom, column) && (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.noOverLap)(newPosition, tempResult)) {
                // change ship's position
                    shipPosition = newPosition
                // attach the ship to new position (change display)
                    e.preventDefault()
                    let top, left
                    const originCellDiv = board.querySelector(`[data-id="${originCell}"]`)
                    originCellDiv.appendChild(ship)
                    originCellDiv.style.position = 'relative'
                    ship.style.position = 'absolute'
                    if(angle == 0) {
                        top = 0
                        left = -Math.floor(origin)*unit
                    } else {
                        if(shipLength % 2 == 0) {
                            top = -0.5*unit
                            left = (-origin + 0.5)*unit
                        } else {
                            top = 0
                            left = -Math.floor(origin)*unit
                        }
                    }
                    ship.dataset.origin = originCell
                    ship.style.top = `${top}px`
                    ship.style.left = `${left}px`
                } 
            } else {
                let originCell = +ship.dataset.origin
                newHeadBottom = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getHeadBottom)(originCell, angle, shipLength, column)
                newPosition = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getShipPosition)(shipLength, ...newHeadBottom, column)
                if((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.checkValid)(angle, ...newHeadBottom, column) && (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.noOverLap)(newPosition, tempResult)) {
                    // change ship's position
                    shipPosition = newPosition
                    // change display
                    if(shipLength % 2 == 0) {
                        let left, top 
                        if(angle == 90) {
                            top = -0.5*unit
                            left = (-origin + 0.5)*unit
                        } else {
                            left = -origin*unit
                            top = 0
                        }
                        ship.style.left = `${left}px`
                        ship.style.top = `${top}px`
                    }
                } else {
                    // rotate the ship back (change display)
                    angle == 0 ? angle = 90 : angle = 0
                    ship.dataset.angle = angle
                    ship.style.transform = `rotate(${angle}deg`
                }
            }
            ship.dataset.position = shipPosition.toString()
            // enable finish button
            if(ships.childElementCount == 0) {
                finishBtn.disabled = false
            }
        })
        document.addEventListener('dragover', (e) => {
            e.preventDefault()
        })
        document.addEventListener('drop', (e) => {
            const ship = getShip(e.dataTransfer.getData('text/plain'))
            const playerBoard = document.getElementById('place-ship').querySelector('.player-board')
            if(playerBoard.contains(ship)) {
                let angle = +ship.dataset.angle
                angle == 0 ? angle = 90 : angle = 0
                ship.style.transform = `rotate(${angle}deg)`
            }
        })
        // finish ship's placement
        return new Promise((resolve) => {
            finishBtn.addEventListener('click', () => {
                disappear(placeshipDiv)

                let result = []
                const ships = document.getElementById('place-ship').querySelector('.player-board').getElementsByClassName('ship')
                for(const ship of ships) {
                    let shipPosition = ship.dataset.position.split(',').map((item) => +item)
                    result.push(shipPosition)
                }
                resolve(result)
            })
            
        })     
    }
    function attack() {
        const aiBoard = document.getElementById('play').querySelector('.ai-board')
        return new Promise((resolve) => {
            for(const cell of aiBoard.children) {
                // prevent the cell from being selected again
                cell.addEventListener('click', function eHandler(e) {
                    if(cell.classList.contains('missed') || cell.classList.contains('attack')) {
                        display(document.getElementById('finale'))
                        document.getElementById('finale').textContent = 'you already hit this place! Please choose again!'
                    } else {
                        disappear(document.getElementById('finale'))
                        for(const cell of aiBoard.children) {
                            cell.removeEventListener('click', eHandler)
                        }
                        resolve(+e.target.dataset.id)
                    }

                }, {once: true})
            }
        })
        
    }
    function displayAttack(name, attackCell, result) {
        const board = document.getElementById('play').querySelector(`.${name}-board`)
        const cell = board.querySelector(`[data-id="${attackCell}"]`)
        if(result) {
            cell.classList.add("attack")
        } else {
            cell.classList.add("missed")
        }
    }
    function displayFinale(winner) {
        const finaleDiv = document.getElementById('finale')
        display(finaleDiv)
        finaleDiv.textContent = `Game ends! The winner is: ${winner}!`
    }
    function reset() {
        const playDiv = document.getElementById('play')
        document.getElementById('finale').textContent = ''
        playDiv.querySelector(".player-board").remove()
        cleanNode(playDiv.querySelector(".ai-board"))

        const placeshipDiv = document.getElementById('place-ship')
        cleanNode(placeshipDiv.querySelector(".player-board"))

        cleanNode(document.getElementById('ships'))
        disappear(playDiv)

        document.getElementById('finish').disabled = true

    }
    function prepareBeforePlay(column, shipSizes, boardSize) {
        createBoard(column)
        createShipDom(shipSizes)
        setSize(boardSize, column)
    }
    function display(node) {
        node.classList.add('display')
    } 
    function disappear(node) {
        node.classList.remove('display')
    }
    function prepareBoards() {
        const boards = document.getElementById('boards')
        const playerBoard = document.getElementById('place-ship').querySelector(".player-board").cloneNode(true)
        const aiBoard = document.getElementById('game-board').content.cloneNode(true)
        boards.appendChild(playerBoard)
        boards.querySelector(".ai-board").appendChild(aiBoard)
    }
    return { placeship, attack, displayAttack, displayFinale, reset, prepareBeforePlay, display, disappear, prepareBoards }
})()

/***/ }),

/***/ "./src/javascript/game.js":
/*!********************************!*\
  !*** ./src/javascript/game.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   game: () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/javascript/data.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/javascript/dom.js");


const game = (() => {
    
    function gameOver(board) {
        return board.isAllSunk()
    }
    async function play(column, shipSizes) {
        const player1 = (0,_data__WEBPACK_IMPORTED_MODULE_0__.player)('human')
        const ai = (0,_data__WEBPACK_IMPORTED_MODULE_0__.computer)('ai')
        // display player's board for him/her to place their ships
        const playerShipPlacement = await _dom__WEBPACK_IMPORTED_MODULE_1__.dom.placeship(column)
        player1.board.placeship(playerShipPlacement)
        const aiShipPlacement = ai.placeship(column, shipSizes)
        ai.board.placeship(aiShipPlacement)
        // display playDiv
        const playDiv = document.getElementById('play')
        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.display(playDiv)
        // display both boards for player to keep track of the game
        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.prepareBoards()
        const players = [player1, ai]
        while(true) {
            let attack, result, i
            for(let idx=0; idx < players.length; idx++) {
                if(players[idx].name == 'human') {
                    attack = await _dom__WEBPACK_IMPORTED_MODULE_1__.dom.attack()
                } else {
                    attack = players[idx].hit()
                }
                idx == 0 ? i =1 : i = 0
                result = players[i].board.receiveAttack(attack)
                if(players[idx].name == 'human') {
                    _dom__WEBPACK_IMPORTED_MODULE_1__.dom.displayAttack('ai', attack, result)
                } else {
                    _dom__WEBPACK_IMPORTED_MODULE_1__.dom.displayAttack('player', attack, result)
                }
                if(gameOver(players[i].board)) {
                    _dom__WEBPACK_IMPORTED_MODULE_1__.dom.displayFinale(players[idx].name)
                    return 
                } 
            }
            
            

        }
    }
    return { play }
})()

/***/ }),

/***/ "./src/javascript/helpers.js":
/*!***********************************!*\
  !*** ./src/javascript/helpers.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkValid: () => (/* binding */ checkValid),
/* harmony export */   getHeadBottom: () => (/* binding */ getHeadBottom),
/* harmony export */   getOrigin: () => (/* binding */ getOrigin),
/* harmony export */   getShipPosition: () => (/* binding */ getShipPosition),
/* harmony export */   noOverLap: () => (/* binding */ noOverLap)
/* harmony export */ });

function getOrigin(currentCell, angle, cursorPosition, origin, column) {
    const distance = -Math.floor(cursorPosition) + Math.floor(origin)
    if(angle === 0) {
      return currentCell + distance
    } else {
     return (Math.floor(currentCell/column) + distance)*column + (currentCell % column)
    }
}
function getHeadBottom(originCell, angle,  shipLength, column) {
    let head, bottom
    const origin = shipLength/2
    if(angle == 0) {
        head = originCell - Math.floor(origin)
        bottom = head + shipLength -1
    } else {
        head = (Math.floor(originCell/column) - Math.floor(origin))*column + (originCell % column)
        bottom = (Math.floor(head/column) + shipLength -1)*column + (originCell % column)
    }
    return [head, bottom]
}
function convertCellNumber(cellNumber, column) {
    let result = []
    if(cellNumber % column == 0) {
        result[0] = Math.floor(cellNumber/column) 
        result[1] = column
    } else {
        result[0] = Math.floor(cellNumber/column) + 1
        result[1] = cellNumber % column
    }
    return result
}
function checkValid(angle, head, bottom, column) {
    const headConverted = convertCellNumber(head, column)
    const bottomConverted = convertCellNumber(bottom, column)
    let condition1, condition2
    condition1 = headConverted.every((item) => item >=1 && item <= column) && bottomConverted.every((item) => item >=1 && item <= column)
    if(angle == 0) {
        condition2 = headConverted[0] == bottomConverted[0]
    } else {
        condition2 = headConverted[1] == bottomConverted[1]
    }
    
    return condition1 && condition2
}
function noOverLap(position, collection) {
    
    return (collection.flat().every((item) => !position.includes(item)))
}
function getShipPosition(shipLength, head, bottom, column) {
    let result = []
    for(let i=0; i < shipLength; i++) {
        if(head % column == bottom % column) {
            let next = (Math.floor(head/column) + i)*column + head % column
            result.push(next)
        } else {
            result.push(head+i)
        }
    }
    return result
}



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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/javascript/game.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/javascript/dom.js");
/* harmony import */ var _style_default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../style/default.css */ "./src/style/default.css");
/* harmony import */ var _style_placeship_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../style/placeship.css */ "./src/style/placeship.css");
/* harmony import */ var _style_play_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../style/play.css */ "./src/style/play.css");





window.addEventListener('load', () => {
    const column = 10
    const shipSizes = [5,4,3,3,2]
    const boardSize = 500
    
    const welcome = document.getElementById('welcome')
    _dom__WEBPACK_IMPORTED_MODULE_1__.dom.display(welcome)
    function start() {
        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.disappear(welcome)
        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.prepareBeforePlay(column, shipSizes, boardSize)
        _game__WEBPACK_IMPORTED_MODULE_0__.game.play(column, shipSizes)
    }
    welcome.querySelector('button').addEventListener('click', start)
    document.getElementById('restart').addEventListener('click', () => {

        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.reset()
        start()   
    })
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZCO0FBQ0Y7QUFDSTtBQUNFO0FBQ0w7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxxQ0FBRztBQUNQO0FBQ0EsUUFBUSxxQ0FBRztBQUNYLFFBQVEscUNBQUc7QUFDWCxRQUFRLHVDQUFJO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFDQUFHO0FBQ1g7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS9kZWZhdWx0LmNzcz9kYTg4Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUvcGxhY2VzaGlwLmNzcz9iNTM5Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUvcGxheS5jc3M/YzA1OSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2phdmFzY3JpcHQvZGF0YS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2phdmFzY3JpcHQvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvamF2YXNjcmlwdC9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvamF2YXNjcmlwdC9oZWxwZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2phdmFzY3JpcHQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgY2hlY2tWYWxpZCwgbm9PdmVyTGFwLCBnZXRTaGlwUG9zaXRpb24gfSBmcm9tIFwiLi9oZWxwZXJzXCJcclxuZXhwb3J0IGNvbnN0IHNoaXAgPSAocG9zaXRpb25zKSA9PiB7XHJcbiAgICBsZXQgbnVtYmVyT2ZIaXRzID0gMFxyXG4gICAgZnVuY3Rpb24gaGl0KHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbnMuZm9yRWFjaCgocG9zLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgaWYocG9zID09IHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlck9mSGl0cyArK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWR4XSA9ICdoJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gaXNTdW5rKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5ldmVyeSgocG9zKSA9PiBwb3MgPT0gJ2gnKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4geyBpc1N1bmssIHBvc2l0aW9ucywgaGl0LCBudW1iZXJPZkhpdHMgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gICAgbGV0IG1pc3NlZEF0dGFjayA9IFtdXHJcbiAgICBjb25zdCBzaGlwcyA9IFtdXHJcbiAgICBmdW5jdGlvbiBwbGFjZXNoaXAocG9zaXRpb25zKSB7XHJcbiAgICAgICAgcG9zaXRpb25zLmZvckVhY2goKHBvcykgPT4ge1xyXG4gICAgICAgICAgICBzaGlwcy5wdXNoKHNoaXAocG9zKSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhwb3NpdGlvbikge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZVxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG51bWJlck9mSGl0c0JlZm9yZSA9IHRoaXMuc2hpcHNbaV0ubnVtYmVyT2ZIaXRzXHJcbiAgICAgICAgICAgIHRoaXMuc2hpcHNbaV0uaGl0KHBvc2l0aW9uKVxyXG4gICAgICAgICAgICBpZihudW1iZXJPZkhpdHNCZWZvcmUgPCB0aGlzLnNoaXBzW2ldLm51bWJlck9mSGl0cykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2sucHVzaChwb3NpdGlvbilcclxuICAgICAgICByZXR1cm4gcmVzdWx0IFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNBbGxTdW5rKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgcGxhY2VzaGlwLCByZWNlaXZlQXR0YWNrLCBtaXNzZWRBdHRhY2ssIGlzQWxsU3Vuaywgc2hpcHMgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgXHJcbiAgICByZXR1cm4geyBib2FyZDogZ2FtZWJvYXJkKCksIG5hbWUgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBjb21wdXRlciA9IChuYW1lKSA9PiB7XHJcbiAgICBjb25zdCBhdHRhY2tQb2ludHMgPSBbXVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiB2YWxpZEhpdChoaXQpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuYXR0YWNrUG9pbnRzLmluY2x1ZGVzKGhpdClcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhpdCgpIHtcclxuICAgICAgICB3aGlsZSh0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBoaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwKSArIDEgXHJcbiAgICAgICAgICAgIGlmKHZhbGlkSGl0LmNhbGwodGhpcywgaGl0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tQb2ludHMucHVzaChoaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGl0IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmFuZG9tQW5nbGUoKSB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjIpXHJcbiAgICAgICAgcmV0dXJuIChudW1iZXIgPT0gMCkgPyAwIDogOTBcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJhbmRvbUhlYWRCb3R0b20oYW5nbGUsIGxlbmd0aCwgY29sdW1uKSB7XHJcbiAgICAgICAgY29uc3QgaGVhZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDApICsgMVxyXG4gICAgICAgIGxldCBib3R0b21cclxuICAgICAgICBpZihhbmdsZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGJvdHRvbSA9IGhlYWQgKyBsZW5ndGggLTEgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYm90dG9tID0gKE1hdGguZmxvb3IoaGVhZC9jb2x1bW4pICsgbGVuZ3RoIC0xKSpjb2x1bW4gKyBoZWFkICUgY29sdW1uXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbaGVhZCwgYm90dG9tXVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGxhY2VzaGlwKGNvbHVtbiwgc2hpcFNpemVzKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdXHJcbiAgICAgICAgc2hpcFNpemVzLmZvckVhY2goKHNpemUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gcmFuZG9tQW5nbGUoKVxyXG4gICAgICAgICAgICBsZXQgaGVhZEJvdHRvbVxyXG4gICAgICAgICAgICB3aGlsZSh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkQm90dG9tID0gcmFuZG9tSGVhZEJvdHRvbShhbmdsZSwgc2l6ZSwgY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gZ2V0U2hpcFBvc2l0aW9uKHNpemUsIC4uLmhlYWRCb3R0b20sIGNvbHVtbilcclxuICAgICAgICAgICAgICAgIGlmKGNoZWNrVmFsaWQoYW5nbGUsIC4uLmhlYWRCb3R0b20sIGNvbHVtbikgJiYgbm9PdmVyTGFwKHBvc2l0aW9uLCByZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4geyBhdHRhY2tQb2ludHMsIGhpdCwgYm9hcmQ6IGdhbWVib2FyZCgpLCBwbGFjZXNoaXAsIG5hbWUgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgIGNoZWNrVmFsaWQsIGdldFNoaXBQb3NpdGlvbiwgZ2V0T3JpZ2luLCBnZXRIZWFkQm90dG9tLCBub092ZXJMYXAgfSBmcm9tIFwiLi9oZWxwZXJzXCJcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckJvYXJkKCkge1xyXG4gICAgY29uc3QgZ2FtZUJvYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1ib2FyZCcpLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXHJcbiAgICBjb25zdCBnYW1lQm9hcmREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcCcpLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpXHJcbiAgICBnYW1lQm9hcmREaXYuYXBwZW5kQ2hpbGQoZ2FtZUJvYXJkVGVtcGxhdGUpXHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoY29sdW1uKSB7XHJcbiAgICBjb25zdCBnYW1lQm9hcmRGcmFnbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWJvYXJkJykuY29udGVudFxyXG4gICAgaWYoZ2FtZUJvYXJkRnJhZ21lbnQuY2hpbGRFbGVtZW50Q291bnQgPT0gMCkge1xyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD0gY29sdW1uKmNvbHVtbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBpKVxyXG4gICAgICAgICAgICBnYW1lQm9hcmRGcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbmZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgbikge1xyXG4gICAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtYm9hcmQnKS5jb250ZW50XHJcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcycpXHJcbiAgICBjb25zdCB1bml0ID0gc2l6ZS9uXHJcbiAgICBmb3IoY29uc3QgY2VsbCBvZiBnYW1lQm9hcmQuY2hpbGRyZW4pIHtcclxuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gYCR7dW5pdH1weGBcclxuICAgICAgICBjZWxsLnN0eWxlLmhlaWdodCA9IGAke3VuaXR9cHhgXHJcbiAgICB9XHJcbiAgICBmb3IoY29uc3Qgc2hpcCBvZiBzaGlwcy5jaGlsZHJlbikge1xyXG4gICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSArc2hpcC5kYXRhc2V0Lmxlbmd0aFxyXG4gICAgICAgIHNoaXAuc3R5bGUud2lkdGggPSBgJHt1bml0KnNoaXBMZW5ndGh9cHhgXHJcbiAgICAgICAgc2hpcC5zdHlsZS5oZWlnaHQgPSBgJHt1bml0fXB4YFxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVNoaXBEb20oc2hpcFNpemVzKSB7XHJcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcycpXHJcbiAgICBzaGlwU2l6ZXMuZm9yRWFjaCgoc2l6ZSwgaWR4KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgc2hpcC5zcmMgPSBcImh0dHBzOi8vYXMyLmZ0Y2RuLm5ldC92Mi9qcGcvMDMvNTMvODQvNjUvMTAwMF9GXzM1Mzg0NjU5N191bE1ST01FNEhaZUpkemNPNEFNMGxINXRSRGpVMk5ibS5qcGdcIlxyXG4gICAgICAgIHNoaXAuZHJhZ2dhYmxlID0gXCJ0cnVlXCJcclxuICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIHNoaXAuZGF0YXNldC5sZW5ndGggPSBzaXplXHJcbiAgICAgICAgc2hpcC5kYXRhc2V0LnNoaXBJZCA9IGlkeFxyXG4gICAgICAgIHNoaXBzLmFwcGVuZENoaWxkKHNoaXApXHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGNsZWFuTm9kZShub2RlKSB7XHJcbiAgICB3aGlsZShub2RlLmxhc3RDaGlsZCkge1xyXG4gICAgICAgIG5vZGUubGFzdENoaWxkLnJlbW92ZSgpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0U2hpcChpZCkge1xyXG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMnKVxyXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcCcpLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItYm9hcmQnKVxyXG4gICAgbGV0IHNoaXAgPSBzaGlwcy5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zaGlwLWlkPVwiJHtpZH1cIl1gKVxyXG4gICAgaWYoIXNoaXApIHtcclxuICAgICAgICBzaGlwID0gcGxheWVyQm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtc2hpcC1pZD1cIiR7aWR9XCJdYClcclxuICAgIH1cclxuICAgIHJldHVybiBzaGlwIFxyXG4gICAgXHJcbn1cclxuZnVuY3Rpb24gZ2V0VGVtcFJlc3VsdChzaGlwSWQpIHtcclxuICAgIGNvbnN0IHNoaXBzT25Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwJykucXVlcnlTZWxlY3RvcignLnBsYXllci1ib2FyZCcpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NoaXAnKVxyXG4gICAgbGV0IGNvbGxlY3Rpb24gPSBbXVxyXG4gICAgZm9yKGNvbnN0IHNoaXAgb2Ygc2hpcHNPbkJvYXJkKSB7XHJcbiAgICAgICAgaWYoc2hpcCAhPT0gZ2V0U2hpcChzaGlwSWQpKSB7XHJcbiAgICAgICAgICAgIGxldCBzaGlwUG9zaXRpb24gPSBzaGlwLmRhdGFzZXQucG9zaXRpb24uc3BsaXQoJywnKS5tYXAoKGl0ZW0pID0+ICtpdGVtKVxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLnB1c2goc2hpcFBvc2l0aW9uKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkb20gPSAoKCkgPT4ge1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBwbGFjZXNoaXAoY29sdW1uKSB7XHJcbiAgICAgICAgLy8gcHJlcGFyZSBkb20gZWxlbWVudHNcclxuICAgICAgICBjcmVhdGVQbGF5ZXJCb2FyZCgpXHJcbiAgICAgICAgLy8gZ2V0IGFsbCBvZiB0aGUgbmVjZXNzYXJ5IGVsZW1lbnRzXHJcbiAgICAgICAgY29uc3QgcGxhY2VzaGlwRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKVxyXG4gICAgICAgIGNvbnN0IGJvYXJkID0gcGxhY2VzaGlwRGl2LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpXHJcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMnKVxyXG4gICAgICAgIGNvbnN0IGZpbmlzaEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5pc2gnKVxyXG4gICAgICAgIC8vIGRpc3BsYXkgcGxhY2Utc2hpcCBEaXZcclxuICAgICAgICBkaXNwbGF5KHBsYWNlc2hpcERpdilcclxuICAgICAgICAvLyBkcmFnICYgZHJvcFxyXG4gICAgICAgIGxldCBzaGlwTGVuZ3RoLCBvcmlnaW4sIGFsbG93Um90YXRlLCBjdXJzb3JQb3NpdGlvblxyXG4gICAgICAgIGZvcihjb25zdCBzaGlwIG9mIHNoaXBzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHNoaXAuZGF0YXNldC5hbmdsZSA9IFwiMFwiXHJcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZShuZXcgSW1hZ2UoMCwwKSwgMCwgMCkgXHJcbiAgICAgICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgZS50YXJnZXQuZGF0YXNldC5zaGlwSWQpXHJcbiAgICAgICAgICAgICAgICBzaGlwTGVuZ3RoID0gK2UudGFyZ2V0LmRhdGFzZXQubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICBvcmlnaW4gPSBzaGlwTGVuZ3RoLzJcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvciA9IGUub2Zmc2V0WC8oZS50YXJnZXQub2Zmc2V0V2lkdGgpKjRcclxuICAgICAgICAgICAgICAgIGN1cnNvclBvc2l0aW9uID0gZS5vZmZzZXRYLyhlLnRhcmdldC5vZmZzZXRXaWR0aCkqc2hpcExlbmd0aFxyXG4gICAgICAgICAgICAgICAgaWYoY3Vyc29yIDw9IDEgfHwgY3Vyc29yID49IDMpIHtcclxuICAgICAgICAgICAgICAgICAgYWxsb3dSb3RhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBhbGxvd1JvdGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGFsbG93Um90YXRlKSB7XHJcbiAgICAgICAgICAgICAgLy8gICAgIGNhbGN1bGF0ZSBhbmdsZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZSBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBldmVudC5jbGllbnRZIC0gKGJveC50b3AgKyBib3guaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBldmVudC5jbGllbnRYIC0gKGJveC5sZWZ0ICsgYm94LndpZHRoLzIpXHJcbiAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSBNYXRoLmF0YW4yKHkseCkqMTgwLyhNYXRoLlBJKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFuZ2xlID49IDAgJiYgYW5nbGUgPD0gNDUgfHwgYW5nbGUgPD0wICYmIGFuZ2xlID49IC00NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYW5nbGUgPiA0NSAmJiBhbmdsZSA8PSA5MCB8fCBhbmdsZSA+IDkwICYmIGFuZ2xlIDw9IDEzNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IDkwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGFuZ2xlIDwgLTQ1ICYmIGFuZ2xlID49IC05MCB8fCBhbmdsZSA8IC05MCAmJiBhbmdsZSA+PSAtMTM1ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IDkwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGFuZ2xlID4gMTM1ICYmIGFuZ2xlIDw9IDE4MCB8fCBhbmdsZSA8IC0xMzUgJiYgYW5nbGUgPj0gLTE4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuYW5nbGUgPSBhbmdsZVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7YW5nbGV9ZGVnKWBcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBwcmV2ZW50IHJvdGF0aW5nIHNoaXAgb3V0c2lkZSBib2FyZFxyXG4gICAgICAgIH1cclxuICAgICAgICBib2FyZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGN1eiB3ZSBhZGQgZXZlbnRsaXN0ZW5lciB0byBkb2N1bWVudFxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcblxyXG4gICAgICAgICAgICBjb25zdCBzaGlwSWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGdldFNoaXAoc2hpcElkKVxyXG4gICAgICAgICAgICBjb25zdCB1bml0ID0gc2hpcC5vZmZzZXRXaWR0aC9zaGlwTGVuZ3RoXHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBSZXN1bHQgPSBnZXRUZW1wUmVzdWx0KHNoaXBJZClcclxuICAgICAgICAgICAgbGV0IHNoaXBQb3NpdGlvbiA9ICcnXHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9ICtzaGlwLmRhdGFzZXQuYW5nbGVcclxuICAgICAgICAgICAgbGV0IG5ld0hlYWRCb3R0b20sIG5ld1Bvc2l0aW9uXHJcbiAgICAgICAgICAgIGlmKHNoaXAuZGF0YXNldC5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc2hpcFBvc2l0aW9uID0gc2hpcC5kYXRhc2V0LnBvc2l0aW9uLnNwbGl0KCcsJykubWFwKChpdGVtKSA9PiAraXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighYWxsb3dSb3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvcmlnaW5DZWxsID0gZ2V0T3JpZ2luKCtlLnRhcmdldC5kYXRhc2V0LmlkLCBhbmdsZSwgY3Vyc29yUG9zaXRpb24sIG9yaWdpbiwgY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgbmV3SGVhZEJvdHRvbSA9IGdldEhlYWRCb3R0b20ob3JpZ2luQ2VsbCwgYW5nbGUsIHNoaXBMZW5ndGgsIGNvbHVtbilcclxuICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gZ2V0U2hpcFBvc2l0aW9uKHNoaXBMZW5ndGgsIC4uLm5ld0hlYWRCb3R0b20sIGNvbHVtbilcclxuXHJcbiAgICAgICAgICAgICAgICBpZihjaGVja1ZhbGlkKGFuZ2xlLCAuLi5uZXdIZWFkQm90dG9tLCBjb2x1bW4pICYmIG5vT3ZlckxhcChuZXdQb3NpdGlvbiwgdGVtcFJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBzaGlwJ3MgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICBzaGlwUG9zaXRpb24gPSBuZXdQb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIHRoZSBzaGlwIHRvIG5ldyBwb3NpdGlvbiAoY2hhbmdlIGRpc3BsYXkpXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvcCwgbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbkNlbGxEaXYgPSBib2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7b3JpZ2luQ2VsbH1cIl1gKVxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbkNlbGxEaXYuYXBwZW5kQ2hpbGQoc2hpcClcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5DZWxsRGl2LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYW5nbGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAtTWF0aC5mbG9vcihvcmlnaW4pKnVuaXRcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzaGlwTGVuZ3RoICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSAtMC41KnVuaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAoLW9yaWdpbiArIDAuNSkqdW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IC1NYXRoLmZsb29yKG9yaWdpbikqdW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuZGF0YXNldC5vcmlnaW4gPSBvcmlnaW5DZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5zdHlsZS50b3AgPSBgJHt0b3B9cHhgXHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGBcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3JpZ2luQ2VsbCA9ICtzaGlwLmRhdGFzZXQub3JpZ2luXHJcbiAgICAgICAgICAgICAgICBuZXdIZWFkQm90dG9tID0gZ2V0SGVhZEJvdHRvbShvcmlnaW5DZWxsLCBhbmdsZSwgc2hpcExlbmd0aCwgY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBnZXRTaGlwUG9zaXRpb24oc2hpcExlbmd0aCwgLi4ubmV3SGVhZEJvdHRvbSwgY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgaWYoY2hlY2tWYWxpZChhbmdsZSwgLi4ubmV3SGVhZEJvdHRvbSwgY29sdW1uKSAmJiBub092ZXJMYXAobmV3UG9zaXRpb24sIHRlbXBSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHNoaXAncyBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIGRpc3BsYXlcclxuICAgICAgICAgICAgICAgICAgICBpZihzaGlwTGVuZ3RoICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZWZ0LCB0b3AgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFuZ2xlID09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSAtMC41KnVuaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAoLW9yaWdpbiArIDAuNSkqdW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IC1vcmlnaW4qdW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAuc3R5bGUudG9wID0gYCR7dG9wfXB4YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcm90YXRlIHRoZSBzaGlwIGJhY2sgKGNoYW5nZSBkaXNwbGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIGFuZ2xlID09IDAgPyBhbmdsZSA9IDkwIDogYW5nbGUgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5kYXRhc2V0LmFuZ2xlID0gYW5nbGVcclxuICAgICAgICAgICAgICAgICAgICBzaGlwLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHthbmdsZX1kZWdgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2hpcC5kYXRhc2V0LnBvc2l0aW9uID0gc2hpcFBvc2l0aW9uLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgLy8gZW5hYmxlIGZpbmlzaCBidXR0b25cclxuICAgICAgICAgICAgaWYoc2hpcHMuY2hpbGRFbGVtZW50Q291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZmluaXNoQnRuLmRpc2FibGVkID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcChlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJykpXHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKS5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWJvYXJkJylcclxuICAgICAgICAgICAgaWYocGxheWVyQm9hcmQuY29udGFpbnMoc2hpcCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhbmdsZSA9ICtzaGlwLmRhdGFzZXQuYW5nbGVcclxuICAgICAgICAgICAgICAgIGFuZ2xlID09IDAgPyBhbmdsZSA9IDkwIDogYW5nbGUgPSAwXHJcbiAgICAgICAgICAgICAgICBzaGlwLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHthbmdsZX1kZWcpYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBmaW5pc2ggc2hpcCdzIHBsYWNlbWVudFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBmaW5pc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkaXNhcHBlYXIocGxhY2VzaGlwRGl2KVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcCcpLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItYm9hcmQnKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaGlwJylcclxuICAgICAgICAgICAgICAgIGZvcihjb25zdCBzaGlwIG9mIHNoaXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNoaXBQb3NpdGlvbiA9IHNoaXAuZGF0YXNldC5wb3NpdGlvbi5zcGxpdCgnLCcpLm1hcCgoaXRlbSkgPT4gK2l0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goc2hpcFBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pICAgICBcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGF0dGFjaygpIHtcclxuICAgICAgICBjb25zdCBhaUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXknKS5xdWVyeVNlbGVjdG9yKCcuYWktYm9hcmQnKVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IoY29uc3QgY2VsbCBvZiBhaUJvYXJkLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IHRoZSBjZWxsIGZyb20gYmVpbmcgc2VsZWN0ZWQgYWdhaW5cclxuICAgICAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiBlSGFuZGxlcihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3NlZCcpIHx8IGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2snKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5hbGUnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmFsZScpLnRleHRDb250ZW50ID0gJ3lvdSBhbHJlYWR5IGhpdCB0aGlzIHBsYWNlISBQbGVhc2UgY2hvb3NlIGFnYWluISdcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhcHBlYXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmFsZScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IoY29uc3QgY2VsbCBvZiBhaUJvYXJkLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZUhhbmRsZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgrZS50YXJnZXQuZGF0YXNldC5pZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwge29uY2U6IHRydWV9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRpc3BsYXlBdHRhY2sobmFtZSwgYXR0YWNrQ2VsbCwgcmVzdWx0KSB7XHJcbiAgICAgICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheScpLnF1ZXJ5U2VsZWN0b3IoYC4ke25hbWV9LWJvYXJkYClcclxuICAgICAgICBjb25zdCBjZWxsID0gYm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2F0dGFja0NlbGx9XCJdYClcclxuICAgICAgICBpZihyZXN1bHQpIHtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiYXR0YWNrXCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGlzcGxheUZpbmFsZSh3aW5uZXIpIHtcclxuICAgICAgICBjb25zdCBmaW5hbGVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluYWxlJylcclxuICAgICAgICBkaXNwbGF5KGZpbmFsZURpdilcclxuICAgICAgICBmaW5hbGVEaXYudGV4dENvbnRlbnQgPSBgR2FtZSBlbmRzISBUaGUgd2lubmVyIGlzOiAke3dpbm5lcn0hYFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICAgICAgY29uc3QgcGxheURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5JylcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluYWxlJykudGV4dENvbnRlbnQgPSAnJ1xyXG4gICAgICAgIHBsYXlEaXYucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIikucmVtb3ZlKClcclxuICAgICAgICBjbGVhbk5vZGUocGxheURpdi5xdWVyeVNlbGVjdG9yKFwiLmFpLWJvYXJkXCIpKVxyXG5cclxuICAgICAgICBjb25zdCBwbGFjZXNoaXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcCcpXHJcbiAgICAgICAgY2xlYW5Ob2RlKHBsYWNlc2hpcERpdi5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKSlcclxuXHJcbiAgICAgICAgY2xlYW5Ob2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcycpKVxyXG4gICAgICAgIGRpc2FwcGVhcihwbGF5RGl2KVxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluaXNoJykuZGlzYWJsZWQgPSB0cnVlXHJcblxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcHJlcGFyZUJlZm9yZVBsYXkoY29sdW1uLCBzaGlwU2l6ZXMsIGJvYXJkU2l6ZSkge1xyXG4gICAgICAgIGNyZWF0ZUJvYXJkKGNvbHVtbilcclxuICAgICAgICBjcmVhdGVTaGlwRG9tKHNoaXBTaXplcylcclxuICAgICAgICBzZXRTaXplKGJvYXJkU2l6ZSwgY29sdW1uKVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGlzcGxheShub2RlKSB7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5JylcclxuICAgIH0gXHJcbiAgICBmdW5jdGlvbiBkaXNhcHBlYXIobm9kZSkge1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheScpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcmVwYXJlQm9hcmRzKCkge1xyXG4gICAgICAgIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZHMnKVxyXG4gICAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKS5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKS5jbG9uZU5vZGUodHJ1ZSlcclxuICAgICAgICBjb25zdCBhaUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtYm9hcmQnKS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxyXG4gICAgICAgIGJvYXJkcy5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZClcclxuICAgICAgICBib2FyZHMucXVlcnlTZWxlY3RvcihcIi5haS1ib2FyZFwiKS5hcHBlbmRDaGlsZChhaUJvYXJkKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgcGxhY2VzaGlwLCBhdHRhY2ssIGRpc3BsYXlBdHRhY2ssIGRpc3BsYXlGaW5hbGUsIHJlc2V0LCBwcmVwYXJlQmVmb3JlUGxheSwgZGlzcGxheSwgZGlzYXBwZWFyLCBwcmVwYXJlQm9hcmRzIH1cclxufSkoKSIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9kYXRhXCJcclxuaW1wb3J0IHsgZG9tIH0gZnJvbSBcIi4vZG9tXCJcclxuZXhwb3J0IGNvbnN0IGdhbWUgPSAoKCkgPT4ge1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnYW1lT3Zlcihib2FyZCkge1xyXG4gICAgICAgIHJldHVybiBib2FyZC5pc0FsbFN1bmsoKVxyXG4gICAgfVxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcGxheShjb2x1bW4sIHNoaXBTaXplcykge1xyXG4gICAgICAgIGNvbnN0IHBsYXllcjEgPSBwbGF5ZXIoJ2h1bWFuJylcclxuICAgICAgICBjb25zdCBhaSA9IGNvbXB1dGVyKCdhaScpXHJcbiAgICAgICAgLy8gZGlzcGxheSBwbGF5ZXIncyBib2FyZCBmb3IgaGltL2hlciB0byBwbGFjZSB0aGVpciBzaGlwc1xyXG4gICAgICAgIGNvbnN0IHBsYXllclNoaXBQbGFjZW1lbnQgPSBhd2FpdCBkb20ucGxhY2VzaGlwKGNvbHVtbilcclxuICAgICAgICBwbGF5ZXIxLmJvYXJkLnBsYWNlc2hpcChwbGF5ZXJTaGlwUGxhY2VtZW50KVxyXG4gICAgICAgIGNvbnN0IGFpU2hpcFBsYWNlbWVudCA9IGFpLnBsYWNlc2hpcChjb2x1bW4sIHNoaXBTaXplcylcclxuICAgICAgICBhaS5ib2FyZC5wbGFjZXNoaXAoYWlTaGlwUGxhY2VtZW50KVxyXG4gICAgICAgIC8vIGRpc3BsYXkgcGxheURpdlxyXG4gICAgICAgIGNvbnN0IHBsYXlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheScpXHJcbiAgICAgICAgZG9tLmRpc3BsYXkocGxheURpdilcclxuICAgICAgICAvLyBkaXNwbGF5IGJvdGggYm9hcmRzIGZvciBwbGF5ZXIgdG8ga2VlcCB0cmFjayBvZiB0aGUgZ2FtZVxyXG4gICAgICAgIGRvbS5wcmVwYXJlQm9hcmRzKClcclxuICAgICAgICBjb25zdCBwbGF5ZXJzID0gW3BsYXllcjEsIGFpXVxyXG4gICAgICAgIHdoaWxlKHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGF0dGFjaywgcmVzdWx0LCBpXHJcbiAgICAgICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IHBsYXllcnMubGVuZ3RoOyBpZHgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyc1tpZHhdLm5hbWUgPT0gJ2h1bWFuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjayA9IGF3YWl0IGRvbS5hdHRhY2soKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2sgPSBwbGF5ZXJzW2lkeF0uaGl0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlkeCA9PSAwID8gaSA9MSA6IGkgPSAwXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwbGF5ZXJzW2ldLmJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrKVxyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyc1tpZHhdLm5hbWUgPT0gJ2h1bWFuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5QXR0YWNrKCdhaScsIGF0dGFjaywgcmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20uZGlzcGxheUF0dGFjaygncGxheWVyJywgYXR0YWNrLCByZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihnYW1lT3ZlcihwbGF5ZXJzW2ldLmJvYXJkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5RmluYWxlKHBsYXllcnNbaWR4XS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBwbGF5IH1cclxufSkoKSIsIlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3JpZ2luKGN1cnJlbnRDZWxsLCBhbmdsZSwgY3Vyc29yUG9zaXRpb24sIG9yaWdpbiwgY29sdW1uKSB7XHJcbiAgICBjb25zdCBkaXN0YW5jZSA9IC1NYXRoLmZsb29yKGN1cnNvclBvc2l0aW9uKSArIE1hdGguZmxvb3Iob3JpZ2luKVxyXG4gICAgaWYoYW5nbGUgPT09IDApIHtcclxuICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsICsgZGlzdGFuY2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgcmV0dXJuIChNYXRoLmZsb29yKGN1cnJlbnRDZWxsL2NvbHVtbikgKyBkaXN0YW5jZSkqY29sdW1uICsgKGN1cnJlbnRDZWxsICUgY29sdW1uKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWFkQm90dG9tKG9yaWdpbkNlbGwsIGFuZ2xlLCAgc2hpcExlbmd0aCwgY29sdW1uKSB7XHJcbiAgICBsZXQgaGVhZCwgYm90dG9tXHJcbiAgICBjb25zdCBvcmlnaW4gPSBzaGlwTGVuZ3RoLzJcclxuICAgIGlmKGFuZ2xlID09IDApIHtcclxuICAgICAgICBoZWFkID0gb3JpZ2luQ2VsbCAtIE1hdGguZmxvb3Iob3JpZ2luKVxyXG4gICAgICAgIGJvdHRvbSA9IGhlYWQgKyBzaGlwTGVuZ3RoIC0xXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhlYWQgPSAoTWF0aC5mbG9vcihvcmlnaW5DZWxsL2NvbHVtbikgLSBNYXRoLmZsb29yKG9yaWdpbikpKmNvbHVtbiArIChvcmlnaW5DZWxsICUgY29sdW1uKVxyXG4gICAgICAgIGJvdHRvbSA9IChNYXRoLmZsb29yKGhlYWQvY29sdW1uKSArIHNoaXBMZW5ndGggLTEpKmNvbHVtbiArIChvcmlnaW5DZWxsICUgY29sdW1uKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtoZWFkLCBib3R0b21dXHJcbn1cclxuZnVuY3Rpb24gY29udmVydENlbGxOdW1iZXIoY2VsbE51bWJlciwgY29sdW1uKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gW11cclxuICAgIGlmKGNlbGxOdW1iZXIgJSBjb2x1bW4gPT0gMCkge1xyXG4gICAgICAgIHJlc3VsdFswXSA9IE1hdGguZmxvb3IoY2VsbE51bWJlci9jb2x1bW4pIFxyXG4gICAgICAgIHJlc3VsdFsxXSA9IGNvbHVtblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHRbMF0gPSBNYXRoLmZsb29yKGNlbGxOdW1iZXIvY29sdW1uKSArIDFcclxuICAgICAgICByZXN1bHRbMV0gPSBjZWxsTnVtYmVyICUgY29sdW1uXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVmFsaWQoYW5nbGUsIGhlYWQsIGJvdHRvbSwgY29sdW1uKSB7XHJcbiAgICBjb25zdCBoZWFkQ29udmVydGVkID0gY29udmVydENlbGxOdW1iZXIoaGVhZCwgY29sdW1uKVxyXG4gICAgY29uc3QgYm90dG9tQ29udmVydGVkID0gY29udmVydENlbGxOdW1iZXIoYm90dG9tLCBjb2x1bW4pXHJcbiAgICBsZXQgY29uZGl0aW9uMSwgY29uZGl0aW9uMlxyXG4gICAgY29uZGl0aW9uMSA9IGhlYWRDb252ZXJ0ZWQuZXZlcnkoKGl0ZW0pID0+IGl0ZW0gPj0xICYmIGl0ZW0gPD0gY29sdW1uKSAmJiBib3R0b21Db252ZXJ0ZWQuZXZlcnkoKGl0ZW0pID0+IGl0ZW0gPj0xICYmIGl0ZW0gPD0gY29sdW1uKVxyXG4gICAgaWYoYW5nbGUgPT0gMCkge1xyXG4gICAgICAgIGNvbmRpdGlvbjIgPSBoZWFkQ29udmVydGVkWzBdID09IGJvdHRvbUNvbnZlcnRlZFswXVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25kaXRpb24yID0gaGVhZENvbnZlcnRlZFsxXSA9PSBib3R0b21Db252ZXJ0ZWRbMV1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIGNvbmRpdGlvbjEgJiYgY29uZGl0aW9uMlxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBub092ZXJMYXAocG9zaXRpb24sIGNvbGxlY3Rpb24pIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIChjb2xsZWN0aW9uLmZsYXQoKS5ldmVyeSgoaXRlbSkgPT4gIXBvc2l0aW9uLmluY2x1ZGVzKGl0ZW0pKSlcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcFBvc2l0aW9uKHNoaXBMZW5ndGgsIGhlYWQsIGJvdHRvbSwgY29sdW1uKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gW11cclxuICAgIGZvcihsZXQgaT0wOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYoaGVhZCAlIGNvbHVtbiA9PSBib3R0b20gJSBjb2x1bW4pIHtcclxuICAgICAgICAgICAgbGV0IG5leHQgPSAoTWF0aC5mbG9vcihoZWFkL2NvbHVtbikgKyBpKSpjb2x1bW4gKyBoZWFkICUgY29sdW1uXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5leHQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaGVhZCtpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiXHJcbmltcG9ydCB7IGRvbSB9IGZyb20gXCIuL2RvbVwiXHJcbmltcG9ydCBcIi4vLi4vc3R5bGUvZGVmYXVsdC5jc3NcIlxyXG5pbXBvcnQgXCIuLy4uL3N0eWxlL3BsYWNlc2hpcC5jc3NcIlxyXG5pbXBvcnQgXCIuLy4uL3N0eWxlL3BsYXkuY3NzXCJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb2x1bW4gPSAxMFxyXG4gICAgY29uc3Qgc2hpcFNpemVzID0gWzUsNCwzLDMsMl1cclxuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IDUwMFxyXG4gICAgXHJcbiAgICBjb25zdCB3ZWxjb21lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWUnKVxyXG4gICAgZG9tLmRpc3BsYXkod2VsY29tZSlcclxuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gICAgICAgIGRvbS5kaXNhcHBlYXIod2VsY29tZSlcclxuICAgICAgICBkb20ucHJlcGFyZUJlZm9yZVBsYXkoY29sdW1uLCBzaGlwU2l6ZXMsIGJvYXJkU2l6ZSlcclxuICAgICAgICBnYW1lLnBsYXkoY29sdW1uLCBzaGlwU2l6ZXMpXHJcbiAgICB9XHJcbiAgICB3ZWxjb21lLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnQpXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBkb20ucmVzZXQoKVxyXG4gICAgICAgIHN0YXJ0KCkgICBcclxuICAgIH0pXHJcbn0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9