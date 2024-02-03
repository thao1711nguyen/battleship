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
        for(let i=0; i<this.ships.length; i++) {
            let numberOfHitsBefore = this.ships[i].numberOfHits
            this.ships[i].hit(position)
            if(numberOfHitsBefore < this.ships[i].numberOfHits) {
                return true
            } 
        }
        this.missedAttack.push(position)
        return false
        
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
            
            const boardAlign = board.getBoundingClientRect()
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
                    const originCellDivAlign = originCellDiv.getBoundingClientRect()

                    board.appendChild(ship)
                    board.style.position = 'relative'
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
                    top = top + originCellDivAlign.top - boardAlign.top
                    left = left + originCellDivAlign.left - boardAlign.left
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
                    const originCellDiv = board.querySelector(`[data-id="${originCell}"]`)
                    const originCellDivAlign = originCellDiv.getBoundingClientRect()

                    if(shipLength % 2 == 0) {
                        let left, top 
                        if(angle == 90) {
                            top = -0.5*unit
                            left = (-origin + 0.5)*unit
                        } else {
                            left = -origin*unit
                            top = 0
                        }
                        left = left + originCellDivAlign.left - boardAlign.left 
                        top = top + originCellDivAlign - boardAlign.top
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
                    const finaleDiv = document.getElementById("finale")
                    if(cell.classList.contains('missed') || cell.classList.contains('attack')) {
                        const alreadyHitp = document.createElement('p')
                        alreadyHitp.setAttribute("id", "already")
                        finaleDiv.appendChild(alreadyHitp)
                        alreadyHitp.textContent = "You already hit the cell, please choose again"
                    } else {
                        if(document.getElementById("already")) {
                            document.getElementById("already").remove()
                        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDN0RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZCO0FBQ0Y7QUFDSTtBQUNFO0FBQ0w7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxxQ0FBRztBQUNQO0FBQ0EsUUFBUSxxQ0FBRztBQUNYLFFBQVEscUNBQUc7QUFDWCxRQUFRLHVDQUFJO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFDQUFHO0FBQ1g7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS9kZWZhdWx0LmNzcz9kYTg4Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUvcGxhY2VzaGlwLmNzcz9iNTM5Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUvcGxheS5jc3M/YzA1OSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2phdmFzY3JpcHQvZGF0YS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2phdmFzY3JpcHQvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvamF2YXNjcmlwdC9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvamF2YXNjcmlwdC9oZWxwZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2phdmFzY3JpcHQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgY2hlY2tWYWxpZCwgbm9PdmVyTGFwLCBnZXRTaGlwUG9zaXRpb24gfSBmcm9tIFwiLi9oZWxwZXJzXCJcclxuZXhwb3J0IGNvbnN0IHNoaXAgPSAocG9zaXRpb25zKSA9PiB7XHJcbiAgICBsZXQgbnVtYmVyT2ZIaXRzID0gMFxyXG4gICAgZnVuY3Rpb24gaGl0KHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbnMuZm9yRWFjaCgocG9zLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgaWYocG9zID09IHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlck9mSGl0cyArK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWR4XSA9ICdoJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gaXNTdW5rKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5ldmVyeSgocG9zKSA9PiBwb3MgPT0gJ2gnKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4geyBpc1N1bmssIHBvc2l0aW9ucywgaGl0LCBudW1iZXJPZkhpdHMgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gICAgbGV0IG1pc3NlZEF0dGFjayA9IFtdXHJcbiAgICBjb25zdCBzaGlwcyA9IFtdXHJcbiAgICBmdW5jdGlvbiBwbGFjZXNoaXAocG9zaXRpb25zKSB7XHJcbiAgICAgICAgcG9zaXRpb25zLmZvckVhY2goKHBvcykgPT4ge1xyXG4gICAgICAgICAgICBzaGlwcy5wdXNoKHNoaXAocG9zKSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhwb3NpdGlvbikge1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG51bWJlck9mSGl0c0JlZm9yZSA9IHRoaXMuc2hpcHNbaV0ubnVtYmVyT2ZIaXRzXHJcbiAgICAgICAgICAgIHRoaXMuc2hpcHNbaV0uaGl0KHBvc2l0aW9uKVxyXG4gICAgICAgICAgICBpZihudW1iZXJPZkhpdHNCZWZvcmUgPCB0aGlzLnNoaXBzW2ldLm51bWJlck9mSGl0cykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2sucHVzaChwb3NpdGlvbilcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzQWxsU3VuaygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSlcclxuICAgIH1cclxuICAgIHJldHVybiB7IHBsYWNlc2hpcCwgcmVjZWl2ZUF0dGFjaywgbWlzc2VkQXR0YWNrLCBpc0FsbFN1bmssIHNoaXBzIH1cclxufVxyXG5leHBvcnQgY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcclxuICAgIFxyXG4gICAgcmV0dXJuIHsgYm9hcmQ6IGdhbWVib2FyZCgpLCBuYW1lIH1cclxufVxyXG5leHBvcnQgY29uc3QgY29tcHV0ZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgY29uc3QgYXR0YWNrUG9pbnRzID0gW11cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gdmFsaWRIaXQoaGl0KSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmF0dGFja1BvaW50cy5pbmNsdWRlcyhoaXQpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoaXQoKSB7XHJcbiAgICAgICAgd2hpbGUodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgaGl0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMCkgKyAxIFxyXG4gICAgICAgICAgICBpZih2YWxpZEhpdC5jYWxsKHRoaXMsIGhpdCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrUG9pbnRzLnB1c2goaGl0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhpdCBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJhbmRvbUFuZ2xlKCkge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyKVxyXG4gICAgICAgIHJldHVybiAobnVtYmVyID09IDApID8gMCA6IDkwXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByYW5kb21IZWFkQm90dG9tKGFuZ2xlLCBsZW5ndGgsIGNvbHVtbikge1xyXG4gICAgICAgIGNvbnN0IGhlYWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwKSArIDFcclxuICAgICAgICBsZXQgYm90dG9tXHJcbiAgICAgICAgaWYoYW5nbGUgPT0gMCkge1xyXG4gICAgICAgICAgICBib3R0b20gPSBoZWFkICsgbGVuZ3RoIC0xIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJvdHRvbSA9IChNYXRoLmZsb29yKGhlYWQvY29sdW1uKSArIGxlbmd0aCAtMSkqY29sdW1uICsgaGVhZCAlIGNvbHVtblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW2hlYWQsIGJvdHRvbV1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBsYWNlc2hpcChjb2x1bW4sIHNoaXBTaXplcykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXVxyXG4gICAgICAgIHNoaXBTaXplcy5mb3JFYWNoKChzaXplKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHJhbmRvbUFuZ2xlKClcclxuICAgICAgICAgICAgbGV0IGhlYWRCb3R0b21cclxuICAgICAgICAgICAgd2hpbGUodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaGVhZEJvdHRvbSA9IHJhbmRvbUhlYWRCb3R0b20oYW5nbGUsIHNpemUsIGNvbHVtbilcclxuICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IGdldFNoaXBQb3NpdGlvbihzaXplLCAuLi5oZWFkQm90dG9tLCBjb2x1bW4pXHJcbiAgICAgICAgICAgICAgICBpZihjaGVja1ZhbGlkKGFuZ2xlLCAuLi5oZWFkQm90dG9tLCBjb2x1bW4pICYmIG5vT3ZlckxhcChwb3NpdGlvbiwgcmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHsgYXR0YWNrUG9pbnRzLCBoaXQsIGJvYXJkOiBnYW1lYm9hcmQoKSwgcGxhY2VzaGlwLCBuYW1lIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7ICBjaGVja1ZhbGlkLCBnZXRTaGlwUG9zaXRpb24sIGdldE9yaWdpbiwgZ2V0SGVhZEJvdHRvbSwgbm9PdmVyTGFwIH0gZnJvbSBcIi4vaGVscGVyc1wiXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJCb2FyZCgpIHtcclxuICAgIGNvbnN0IGdhbWVCb2FyZFRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtYm9hcmQnKS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxyXG4gICAgY29uc3QgZ2FtZUJvYXJkRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKS5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKVxyXG4gICAgZ2FtZUJvYXJkRGl2LmFwcGVuZENoaWxkKGdhbWVCb2FyZFRlbXBsYXRlKVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKGNvbHVtbikge1xyXG4gICAgY29uc3QgZ2FtZUJvYXJkRnJhZ21lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1ib2FyZCcpLmNvbnRlbnRcclxuICAgIGlmKGdhbWVCb2FyZEZyYWdtZW50LmNoaWxkRWxlbWVudENvdW50ID09IDApIHtcclxuICAgICAgICBmb3IobGV0IGk9MTsgaTw9IGNvbHVtbipjb2x1bW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgaSlcclxuICAgICAgICAgICAgZ2FtZUJvYXJkRnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2VsbClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5mdW5jdGlvbiBzZXRTaXplKHNpemUsIG4pIHtcclxuICAgIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWJvYXJkJykuY29udGVudFxyXG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMnKVxyXG4gICAgY29uc3QgdW5pdCA9IHNpemUvblxyXG4gICAgZm9yKGNvbnN0IGNlbGwgb2YgZ2FtZUJvYXJkLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IGAke3VuaXR9cHhgXHJcbiAgICAgICAgY2VsbC5zdHlsZS5oZWlnaHQgPSBgJHt1bml0fXB4YFxyXG4gICAgfVxyXG4gICAgZm9yKGNvbnN0IHNoaXAgb2Ygc2hpcHMuY2hpbGRyZW4pIHtcclxuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gK3NoaXAuZGF0YXNldC5sZW5ndGhcclxuICAgICAgICBzaGlwLnN0eWxlLndpZHRoID0gYCR7dW5pdCpzaGlwTGVuZ3RofXB4YFxyXG4gICAgICAgIHNoaXAuc3R5bGUuaGVpZ2h0ID0gYCR7dW5pdH1weGBcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBjcmVhdGVTaGlwRG9tKHNoaXBTaXplcykge1xyXG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMnKVxyXG4gICAgc2hpcFNpemVzLmZvckVhY2goKHNpemUsIGlkeCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIHNoaXAuc3JjID0gXCJodHRwczovL2FzMi5mdGNkbi5uZXQvdjIvanBnLzAzLzUzLzg0LzY1LzEwMDBfRl8zNTM4NDY1OTdfdWxNUk9NRTRIWmVKZHpjTzRBTTBsSDV0UkRqVTJOYm0uanBnXCJcclxuICAgICAgICBzaGlwLmRyYWdnYWJsZSA9IFwidHJ1ZVwiXHJcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJylcclxuICAgICAgICBzaGlwLmRhdGFzZXQubGVuZ3RoID0gc2l6ZVxyXG4gICAgICAgIHNoaXAuZGF0YXNldC5zaGlwSWQgPSBpZHhcclxuICAgICAgICBzaGlwcy5hcHBlbmRDaGlsZChzaGlwKVxyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBjbGVhbk5vZGUobm9kZSkge1xyXG4gICAgd2hpbGUobm9kZS5sYXN0Q2hpbGQpIHtcclxuICAgICAgICBub2RlLmxhc3RDaGlsZC5yZW1vdmUoKVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldFNoaXAoaWQpIHtcclxuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBzJylcclxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKS5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWJvYXJkJylcclxuICAgIGxldCBzaGlwID0gc2hpcHMucXVlcnlTZWxlY3RvcihgW2RhdGEtc2hpcC1pZD1cIiR7aWR9XCJdYClcclxuICAgIGlmKCFzaGlwKSB7XHJcbiAgICAgICAgc2hpcCA9IHBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNoaXAtaWQ9XCIke2lkfVwiXWApXHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2hpcCBcclxuICAgIFxyXG59XHJcbmZ1bmN0aW9uIGdldFRlbXBSZXN1bHQoc2hpcElkKSB7XHJcbiAgICBjb25zdCBzaGlwc09uQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcCcpLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItYm9hcmQnKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaGlwJylcclxuICAgIGxldCBjb2xsZWN0aW9uID0gW11cclxuICAgIGZvcihjb25zdCBzaGlwIG9mIHNoaXBzT25Cb2FyZCkge1xyXG4gICAgICAgIGlmKHNoaXAgIT09IGdldFNoaXAoc2hpcElkKSkge1xyXG4gICAgICAgICAgICBsZXQgc2hpcFBvc2l0aW9uID0gc2hpcC5kYXRhc2V0LnBvc2l0aW9uLnNwbGl0KCcsJykubWFwKChpdGVtKSA9PiAraXRlbSlcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKHNoaXBQb3NpdGlvbilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29sbGVjdGlvblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZG9tID0gKCgpID0+IHtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gcGxhY2VzaGlwKGNvbHVtbikge1xyXG4gICAgICAgIC8vIHByZXBhcmUgZG9tIGVsZW1lbnRzXHJcbiAgICAgICAgY3JlYXRlUGxheWVyQm9hcmQoKVxyXG4gICAgICAgIC8vIGdldCBhbGwgb2YgdGhlIG5lY2Vzc2FyeSBlbGVtZW50c1xyXG4gICAgICAgIGNvbnN0IHBsYWNlc2hpcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwJylcclxuICAgICAgICBjb25zdCBib2FyZCA9IHBsYWNlc2hpcERpdi5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKVxyXG4gICAgICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBzJylcclxuICAgICAgICBjb25zdCBmaW5pc2hCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluaXNoJylcclxuICAgICAgICAvLyBkaXNwbGF5IHBsYWNlLXNoaXAgRGl2XHJcbiAgICAgICAgZGlzcGxheShwbGFjZXNoaXBEaXYpXHJcbiAgICAgICAgLy8gZHJhZyAmIGRyb3BcclxuICAgICAgICBsZXQgc2hpcExlbmd0aCwgb3JpZ2luLCBhbGxvd1JvdGF0ZSwgY3Vyc29yUG9zaXRpb25cclxuICAgICAgICBmb3IoY29uc3Qgc2hpcCBvZiBzaGlwcy5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQuYW5nbGUgPSBcIjBcIlxyXG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UobmV3IEltYWdlKDAsMCksIDAsIDApIFxyXG4gICAgICAgICAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIGUudGFyZ2V0LmRhdGFzZXQuc2hpcElkKVxyXG4gICAgICAgICAgICAgICAgc2hpcExlbmd0aCA9ICtlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luID0gc2hpcExlbmd0aC8yXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjdXJzb3IgPSBlLm9mZnNldFgvKGUudGFyZ2V0Lm9mZnNldFdpZHRoKSo0XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JQb3NpdGlvbiA9IGUub2Zmc2V0WC8oZS50YXJnZXQub2Zmc2V0V2lkdGgpKnNoaXBMZW5ndGhcclxuICAgICAgICAgICAgICAgIGlmKGN1cnNvciA8PSAxIHx8IGN1cnNvciA+PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGFsbG93Um90YXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgYWxsb3dSb3RhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihhbGxvd1JvdGF0ZSkge1xyXG4gICAgICAgICAgICAgIC8vICAgICBjYWxjdWxhdGUgYW5nbGVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGUgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJveCA9IGV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gZXZlbnQuY2xpZW50WSAtIChib3gudG9wICsgYm94LmhlaWdodC8yKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gZXZlbnQuY2xpZW50WCAtIChib3gubGVmdCArIGJveC53aWR0aC8yKVxyXG4gICAgICAgICAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5hdGFuMih5LHgpKjE4MC8oTWF0aC5QSSlcclxuICAgICAgICAgICAgICAgICAgICBpZihhbmdsZSA+PSAwICYmIGFuZ2xlIDw9IDQ1IHx8IGFuZ2xlIDw9MCAmJiBhbmdsZSA+PSAtNDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGFuZ2xlID4gNDUgJiYgYW5nbGUgPD0gOTAgfHwgYW5nbGUgPiA5MCAmJiBhbmdsZSA8PSAxMzUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSA5MFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihhbmdsZSA8IC00NSAmJiBhbmdsZSA+PSAtOTAgfHwgYW5nbGUgPCAtOTAgJiYgYW5nbGUgPj0gLTEzNSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSA5MFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihhbmdsZSA+IDEzNSAmJiBhbmdsZSA8PSAxODAgfHwgYW5nbGUgPCAtMTM1ICYmIGFuZ2xlID49IC0xODApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LmFuZ2xlID0gYW5nbGVcclxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2FuZ2xlfWRlZylgXHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gcHJldmVudCByb3RhdGluZyBzaGlwIG91dHNpZGUgYm9hcmRcclxuICAgICAgICB9XHJcbiAgICAgICAgYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjdXogd2UgYWRkIGV2ZW50bGlzdGVuZXIgdG8gZG9jdW1lbnRcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgYm9hcmRBbGlnbiA9IGJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXBJZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcChzaGlwSWQpXHJcbiAgICAgICAgICAgIGNvbnN0IHVuaXQgPSBzaGlwLm9mZnNldFdpZHRoL3NoaXBMZW5ndGhcclxuICAgICAgICAgICAgY29uc3QgdGVtcFJlc3VsdCA9IGdldFRlbXBSZXN1bHQoc2hpcElkKVxyXG4gICAgICAgICAgICBsZXQgc2hpcFBvc2l0aW9uID0gJydcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gK3NoaXAuZGF0YXNldC5hbmdsZVxyXG4gICAgICAgICAgICBsZXQgbmV3SGVhZEJvdHRvbSwgbmV3UG9zaXRpb25cclxuICAgICAgICAgICAgaWYoc2hpcC5kYXRhc2V0LnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBzaGlwUG9zaXRpb24gPSBzaGlwLmRhdGFzZXQucG9zaXRpb24uc3BsaXQoJywnKS5tYXAoKGl0ZW0pID0+ICtpdGVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFhbGxvd1JvdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9yaWdpbkNlbGwgPSBnZXRPcmlnaW4oK2UudGFyZ2V0LmRhdGFzZXQuaWQsIGFuZ2xlLCBjdXJzb3JQb3NpdGlvbiwgb3JpZ2luLCBjb2x1bW4pXHJcbiAgICAgICAgICAgICAgICBuZXdIZWFkQm90dG9tID0gZ2V0SGVhZEJvdHRvbShvcmlnaW5DZWxsLCBhbmdsZSwgc2hpcExlbmd0aCwgY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBnZXRTaGlwUG9zaXRpb24oc2hpcExlbmd0aCwgLi4ubmV3SGVhZEJvdHRvbSwgY29sdW1uKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNoZWNrVmFsaWQoYW5nbGUsIC4uLm5ld0hlYWRCb3R0b20sIGNvbHVtbikgJiYgbm9PdmVyTGFwKG5ld1Bvc2l0aW9uLCB0ZW1wUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIHNoaXAncyBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2ggdGhlIHNoaXAgdG8gbmV3IHBvc2l0aW9uIChjaGFuZ2UgZGlzcGxheSlcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9wLCBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luQ2VsbERpdiA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtvcmlnaW5DZWxsfVwiXWApXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luQ2VsbERpdkFsaWduID0gb3JpZ2luQ2VsbERpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChzaGlwKVxyXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYW5nbGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSAwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gLU1hdGguZmxvb3Iob3JpZ2luKSp1bml0XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2hpcExlbmd0aCAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gLTAuNSp1bml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gKC1vcmlnaW4gKyAwLjUpKnVuaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAtTWF0aC5mbG9vcihvcmlnaW4pKnVuaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSB0b3AgKyBvcmlnaW5DZWxsRGl2QWxpZ24udG9wIC0gYm9hcmRBbGlnbi50b3BcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gbGVmdCArIG9yaWdpbkNlbGxEaXZBbGlnbi5sZWZ0IC0gYm9hcmRBbGlnbi5sZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5kYXRhc2V0Lm9yaWdpbiA9IG9yaWdpbkNlbGxcclxuICAgICAgICAgICAgICAgICAgICBzaGlwLnN0eWxlLnRvcCA9IGAke3RvcH1weGBcclxuICAgICAgICAgICAgICAgICAgICBzaGlwLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YFxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBvcmlnaW5DZWxsID0gK3NoaXAuZGF0YXNldC5vcmlnaW5cclxuICAgICAgICAgICAgICAgIG5ld0hlYWRCb3R0b20gPSBnZXRIZWFkQm90dG9tKG9yaWdpbkNlbGwsIGFuZ2xlLCBzaGlwTGVuZ3RoLCBjb2x1bW4pXHJcbiAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IGdldFNoaXBQb3NpdGlvbihzaGlwTGVuZ3RoLCAuLi5uZXdIZWFkQm90dG9tLCBjb2x1bW4pXHJcbiAgICAgICAgICAgICAgICBpZihjaGVja1ZhbGlkKGFuZ2xlLCAuLi5uZXdIZWFkQm90dG9tLCBjb2x1bW4pICYmIG5vT3ZlckxhcChuZXdQb3NpdGlvbiwgdGVtcFJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2Ugc2hpcCdzIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBvc2l0aW9uID0gbmV3UG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgZGlzcGxheVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbkNlbGxEaXYgPSBib2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7b3JpZ2luQ2VsbH1cIl1gKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbkNlbGxEaXZBbGlnbiA9IG9yaWdpbkNlbGxEaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2hpcExlbmd0aCAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVmdCwgdG9wIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhbmdsZSA9PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gLTAuNSp1bml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gKC1vcmlnaW4gKyAwLjUpKnVuaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAtb3JpZ2luKnVuaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gbGVmdCArIG9yaWdpbkNlbGxEaXZBbGlnbi5sZWZ0IC0gYm9hcmRBbGlnbi5sZWZ0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSB0b3AgKyBvcmlnaW5DZWxsRGl2QWxpZ24gLSBib2FyZEFsaWduLnRvcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnN0eWxlLnRvcCA9IGAke3RvcH1weGBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJvdGF0ZSB0aGUgc2hpcCBiYWNrIChjaGFuZ2UgZGlzcGxheSlcclxuICAgICAgICAgICAgICAgICAgICBhbmdsZSA9PSAwID8gYW5nbGUgPSA5MCA6IGFuZ2xlID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuZGF0YXNldC5hbmdsZSA9IGFuZ2xlXHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7YW5nbGV9ZGVnYFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNoaXAuZGF0YXNldC5wb3NpdGlvbiA9IHNoaXBQb3NpdGlvbi50b1N0cmluZygpXHJcbiAgICAgICAgICAgIC8vIGVuYWJsZSBmaW5pc2ggYnV0dG9uXHJcbiAgICAgICAgICAgIGlmKHNoaXBzLmNoaWxkRWxlbWVudENvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGZpbmlzaEJ0bi5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGdldFNoaXAoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpKVxyXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwJykucXVlcnlTZWxlY3RvcignLnBsYXllci1ib2FyZCcpXHJcbiAgICAgICAgICAgIGlmKHBsYXllckJvYXJkLmNvbnRhaW5zKHNoaXApKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYW5nbGUgPSArc2hpcC5kYXRhc2V0LmFuZ2xlXHJcbiAgICAgICAgICAgICAgICBhbmdsZSA9PSAwID8gYW5nbGUgPSA5MCA6IGFuZ2xlID0gMFxyXG4gICAgICAgICAgICAgICAgc2hpcC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7YW5nbGV9ZGVnKWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gZmluaXNoIHNoaXAncyBwbGFjZW1lbnRcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgZmluaXNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzYXBwZWFyKHBsYWNlc2hpcERpdilcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gW11cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKS5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWJvYXJkJykuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2hpcCcpXHJcbiAgICAgICAgICAgICAgICBmb3IoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGlwUG9zaXRpb24gPSBzaGlwLmRhdGFzZXQucG9zaXRpb24uc3BsaXQoJywnKS5tYXAoKGl0ZW0pID0+ICtpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNoaXBQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KSAgICAgXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHRhY2soKSB7XHJcbiAgICAgICAgY29uc3QgYWlCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5JykucXVlcnlTZWxlY3RvcignLmFpLWJvYXJkJylcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgZm9yKGNvbnN0IGNlbGwgb2YgYWlCb2FyZC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudCB0aGUgY2VsbCBmcm9tIGJlaW5nIHNlbGVjdGVkIGFnYWluXHJcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gZUhhbmRsZXIoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbmFsZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluYWxlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3NlZCcpIHx8IGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2snKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbHJlYWR5SGl0cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHJlYWR5SGl0cC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFscmVhZHlcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxlRGl2LmFwcGVuZENoaWxkKGFscmVhZHlIaXRwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHJlYWR5SGl0cC50ZXh0Q29udGVudCA9IFwiWW91IGFscmVhZHkgaGl0IHRoZSBjZWxsLCBwbGVhc2UgY2hvb3NlIGFnYWluXCJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFscmVhZHlcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWxyZWFkeVwiKS5yZW1vdmUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihjb25zdCBjZWxsIG9mIGFpQm9hcmQuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlSGFuZGxlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCtlLnRhcmdldC5kYXRhc2V0LmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LCB7b25jZTogdHJ1ZX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGlzcGxheUF0dGFjayhuYW1lLCBhdHRhY2tDZWxsLCByZXN1bHQpIHtcclxuICAgICAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5JykucXVlcnlTZWxlY3RvcihgLiR7bmFtZX0tYm9hcmRgKVxyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7YXR0YWNrQ2VsbH1cIl1gKVxyXG4gICAgICAgIGlmKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJhdHRhY2tcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkaXNwbGF5RmluYWxlKHdpbm5lcikge1xyXG4gICAgICAgIGNvbnN0IGZpbmFsZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5hbGUnKVxyXG4gICAgICAgIGRpc3BsYXkoZmluYWxlRGl2KVxyXG4gICAgICAgIGZpbmFsZURpdi50ZXh0Q29udGVudCA9IGBHYW1lIGVuZHMhIFRoZSB3aW5uZXIgaXM6ICR7d2lubmVyfSFgXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgICAgICBjb25zdCBwbGF5RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXknKVxyXG4gICAgICAgIHBsYXlEaXYucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIikucmVtb3ZlKClcclxuICAgICAgICBjbGVhbk5vZGUocGxheURpdi5xdWVyeVNlbGVjdG9yKFwiLmFpLWJvYXJkXCIpKVxyXG5cclxuICAgICAgICBjb25zdCBwbGFjZXNoaXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcCcpXHJcbiAgICAgICAgY2xlYW5Ob2RlKHBsYWNlc2hpcERpdi5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKSlcclxuXHJcbiAgICAgICAgY2xlYW5Ob2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcycpKVxyXG4gICAgICAgIGRpc2FwcGVhcihwbGF5RGl2KVxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluaXNoJykuZGlzYWJsZWQgPSB0cnVlXHJcblxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcHJlcGFyZUJlZm9yZVBsYXkoY29sdW1uLCBzaGlwU2l6ZXMsIGJvYXJkU2l6ZSkge1xyXG4gICAgICAgIGNyZWF0ZUJvYXJkKGNvbHVtbilcclxuICAgICAgICBjcmVhdGVTaGlwRG9tKHNoaXBTaXplcylcclxuICAgICAgICBzZXRTaXplKGJvYXJkU2l6ZSwgY29sdW1uKVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGlzcGxheShub2RlKSB7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5JylcclxuICAgIH0gXHJcbiAgICBmdW5jdGlvbiBkaXNhcHBlYXIobm9kZSkge1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheScpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcmVwYXJlQm9hcmRzKCkge1xyXG4gICAgICAgIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZHMnKVxyXG4gICAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKS5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKS5jbG9uZU5vZGUodHJ1ZSlcclxuICAgICAgICBjb25zdCBhaUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtYm9hcmQnKS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxyXG4gICAgICAgIGJvYXJkcy5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZClcclxuICAgICAgICBib2FyZHMucXVlcnlTZWxlY3RvcihcIi5haS1ib2FyZFwiKS5hcHBlbmRDaGlsZChhaUJvYXJkKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgcGxhY2VzaGlwLCBhdHRhY2ssIGRpc3BsYXlBdHRhY2ssIGRpc3BsYXlGaW5hbGUsIHJlc2V0LCBwcmVwYXJlQmVmb3JlUGxheSwgZGlzcGxheSwgZGlzYXBwZWFyLCBwcmVwYXJlQm9hcmRzIH1cclxufSkoKSIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9kYXRhXCJcclxuaW1wb3J0IHsgZG9tIH0gZnJvbSBcIi4vZG9tXCJcclxuZXhwb3J0IGNvbnN0IGdhbWUgPSAoKCkgPT4ge1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnYW1lT3Zlcihib2FyZCkge1xyXG4gICAgICAgIHJldHVybiBib2FyZC5pc0FsbFN1bmsoKVxyXG4gICAgfVxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcGxheShjb2x1bW4sIHNoaXBTaXplcykge1xyXG4gICAgICAgIGNvbnN0IHBsYXllcjEgPSBwbGF5ZXIoJ2h1bWFuJylcclxuICAgICAgICBjb25zdCBhaSA9IGNvbXB1dGVyKCdhaScpXHJcbiAgICAgICAgLy8gZGlzcGxheSBwbGF5ZXIncyBib2FyZCBmb3IgaGltL2hlciB0byBwbGFjZSB0aGVpciBzaGlwc1xyXG4gICAgICAgIGNvbnN0IHBsYXllclNoaXBQbGFjZW1lbnQgPSBhd2FpdCBkb20ucGxhY2VzaGlwKGNvbHVtbilcclxuICAgICAgICBwbGF5ZXIxLmJvYXJkLnBsYWNlc2hpcChwbGF5ZXJTaGlwUGxhY2VtZW50KVxyXG4gICAgICAgIGNvbnN0IGFpU2hpcFBsYWNlbWVudCA9IGFpLnBsYWNlc2hpcChjb2x1bW4sIHNoaXBTaXplcylcclxuICAgICAgICBhaS5ib2FyZC5wbGFjZXNoaXAoYWlTaGlwUGxhY2VtZW50KVxyXG4gICAgICAgIC8vIGRpc3BsYXkgcGxheURpdlxyXG4gICAgICAgIGNvbnN0IHBsYXlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheScpXHJcbiAgICAgICAgZG9tLmRpc3BsYXkocGxheURpdilcclxuICAgICAgICAvLyBkaXNwbGF5IGJvdGggYm9hcmRzIGZvciBwbGF5ZXIgdG8ga2VlcCB0cmFjayBvZiB0aGUgZ2FtZVxyXG4gICAgICAgIGRvbS5wcmVwYXJlQm9hcmRzKClcclxuICAgICAgICBjb25zdCBwbGF5ZXJzID0gW3BsYXllcjEsIGFpXVxyXG4gICAgICAgIHdoaWxlKHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGF0dGFjaywgcmVzdWx0LCBpXHJcbiAgICAgICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IHBsYXllcnMubGVuZ3RoOyBpZHgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyc1tpZHhdLm5hbWUgPT0gJ2h1bWFuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjayA9IGF3YWl0IGRvbS5hdHRhY2soKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2sgPSBwbGF5ZXJzW2lkeF0uaGl0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlkeCA9PSAwID8gaSA9MSA6IGkgPSAwXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwbGF5ZXJzW2ldLmJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrKVxyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyc1tpZHhdLm5hbWUgPT0gJ2h1bWFuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5QXR0YWNrKCdhaScsIGF0dGFjaywgcmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20uZGlzcGxheUF0dGFjaygncGxheWVyJywgYXR0YWNrLCByZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihnYW1lT3ZlcihwbGF5ZXJzW2ldLmJvYXJkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5RmluYWxlKHBsYXllcnNbaWR4XS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBwbGF5IH1cclxufSkoKSIsIlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3JpZ2luKGN1cnJlbnRDZWxsLCBhbmdsZSwgY3Vyc29yUG9zaXRpb24sIG9yaWdpbiwgY29sdW1uKSB7XHJcbiAgICBjb25zdCBkaXN0YW5jZSA9IC1NYXRoLmZsb29yKGN1cnNvclBvc2l0aW9uKSArIE1hdGguZmxvb3Iob3JpZ2luKVxyXG4gICAgaWYoYW5nbGUgPT09IDApIHtcclxuICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsICsgZGlzdGFuY2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgcmV0dXJuIChNYXRoLmZsb29yKGN1cnJlbnRDZWxsL2NvbHVtbikgKyBkaXN0YW5jZSkqY29sdW1uICsgKGN1cnJlbnRDZWxsICUgY29sdW1uKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWFkQm90dG9tKG9yaWdpbkNlbGwsIGFuZ2xlLCAgc2hpcExlbmd0aCwgY29sdW1uKSB7XHJcbiAgICBsZXQgaGVhZCwgYm90dG9tXHJcbiAgICBjb25zdCBvcmlnaW4gPSBzaGlwTGVuZ3RoLzJcclxuICAgIGlmKGFuZ2xlID09IDApIHtcclxuICAgICAgICBoZWFkID0gb3JpZ2luQ2VsbCAtIE1hdGguZmxvb3Iob3JpZ2luKVxyXG4gICAgICAgIGJvdHRvbSA9IGhlYWQgKyBzaGlwTGVuZ3RoIC0xXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhlYWQgPSAoTWF0aC5mbG9vcihvcmlnaW5DZWxsL2NvbHVtbikgLSBNYXRoLmZsb29yKG9yaWdpbikpKmNvbHVtbiArIChvcmlnaW5DZWxsICUgY29sdW1uKVxyXG4gICAgICAgIGJvdHRvbSA9IChNYXRoLmZsb29yKGhlYWQvY29sdW1uKSArIHNoaXBMZW5ndGggLTEpKmNvbHVtbiArIChvcmlnaW5DZWxsICUgY29sdW1uKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtoZWFkLCBib3R0b21dXHJcbn1cclxuZnVuY3Rpb24gY29udmVydENlbGxOdW1iZXIoY2VsbE51bWJlciwgY29sdW1uKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gW11cclxuICAgIGlmKGNlbGxOdW1iZXIgJSBjb2x1bW4gPT0gMCkge1xyXG4gICAgICAgIHJlc3VsdFswXSA9IE1hdGguZmxvb3IoY2VsbE51bWJlci9jb2x1bW4pIFxyXG4gICAgICAgIHJlc3VsdFsxXSA9IGNvbHVtblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHRbMF0gPSBNYXRoLmZsb29yKGNlbGxOdW1iZXIvY29sdW1uKSArIDFcclxuICAgICAgICByZXN1bHRbMV0gPSBjZWxsTnVtYmVyICUgY29sdW1uXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVmFsaWQoYW5nbGUsIGhlYWQsIGJvdHRvbSwgY29sdW1uKSB7XHJcbiAgICBjb25zdCBoZWFkQ29udmVydGVkID0gY29udmVydENlbGxOdW1iZXIoaGVhZCwgY29sdW1uKVxyXG4gICAgY29uc3QgYm90dG9tQ29udmVydGVkID0gY29udmVydENlbGxOdW1iZXIoYm90dG9tLCBjb2x1bW4pXHJcbiAgICBsZXQgY29uZGl0aW9uMSwgY29uZGl0aW9uMlxyXG4gICAgY29uZGl0aW9uMSA9IGhlYWRDb252ZXJ0ZWQuZXZlcnkoKGl0ZW0pID0+IGl0ZW0gPj0xICYmIGl0ZW0gPD0gY29sdW1uKSAmJiBib3R0b21Db252ZXJ0ZWQuZXZlcnkoKGl0ZW0pID0+IGl0ZW0gPj0xICYmIGl0ZW0gPD0gY29sdW1uKVxyXG4gICAgaWYoYW5nbGUgPT0gMCkge1xyXG4gICAgICAgIGNvbmRpdGlvbjIgPSBoZWFkQ29udmVydGVkWzBdID09IGJvdHRvbUNvbnZlcnRlZFswXVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25kaXRpb24yID0gaGVhZENvbnZlcnRlZFsxXSA9PSBib3R0b21Db252ZXJ0ZWRbMV1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIGNvbmRpdGlvbjEgJiYgY29uZGl0aW9uMlxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBub092ZXJMYXAocG9zaXRpb24sIGNvbGxlY3Rpb24pIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIChjb2xsZWN0aW9uLmZsYXQoKS5ldmVyeSgoaXRlbSkgPT4gIXBvc2l0aW9uLmluY2x1ZGVzKGl0ZW0pKSlcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcFBvc2l0aW9uKHNoaXBMZW5ndGgsIGhlYWQsIGJvdHRvbSwgY29sdW1uKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gW11cclxuICAgIGZvcihsZXQgaT0wOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYoaGVhZCAlIGNvbHVtbiA9PSBib3R0b20gJSBjb2x1bW4pIHtcclxuICAgICAgICAgICAgbGV0IG5leHQgPSAoTWF0aC5mbG9vcihoZWFkL2NvbHVtbikgKyBpKSpjb2x1bW4gKyBoZWFkICUgY29sdW1uXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5leHQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaGVhZCtpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiXHJcbmltcG9ydCB7IGRvbSB9IGZyb20gXCIuL2RvbVwiXHJcbmltcG9ydCBcIi4vLi4vc3R5bGUvZGVmYXVsdC5jc3NcIlxyXG5pbXBvcnQgXCIuLy4uL3N0eWxlL3BsYWNlc2hpcC5jc3NcIlxyXG5pbXBvcnQgXCIuLy4uL3N0eWxlL3BsYXkuY3NzXCJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb2x1bW4gPSAxMFxyXG4gICAgY29uc3Qgc2hpcFNpemVzID0gWzUsNCwzLDMsMl1cclxuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IDUwMFxyXG4gICAgXHJcbiAgICBjb25zdCB3ZWxjb21lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWUnKVxyXG4gICAgZG9tLmRpc3BsYXkod2VsY29tZSlcclxuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gICAgICAgIGRvbS5kaXNhcHBlYXIod2VsY29tZSlcclxuICAgICAgICBkb20ucHJlcGFyZUJlZm9yZVBsYXkoY29sdW1uLCBzaGlwU2l6ZXMsIGJvYXJkU2l6ZSlcclxuICAgICAgICBnYW1lLnBsYXkoY29sdW1uLCBzaGlwU2l6ZXMpXHJcbiAgICB9XHJcbiAgICB3ZWxjb21lLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnQpXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBkb20ucmVzZXQoKVxyXG4gICAgICAgIHN0YXJ0KCkgICBcclxuICAgIH0pXHJcbn0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9