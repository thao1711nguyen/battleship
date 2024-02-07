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
    let hitAtt = []
    let dir
    function validHit(hit) {
        return hit>=1 && hit<=100 && !this.attackPoints.includes(hit)
    }
    function getAdj(cen) {
        let result = []
        const top = (Math.floor(cen/10) -1)*10 + (cen%10)
        const bot = (Math.floor(cen/10) +1)*10 + (cen%10)
        const left = cen-1
        const right = cen+1
        if(top%10 == cen%10 && top >= 1 && top < 100) {
            result.push(top)
        } 
        if(bot%10 == cen%10 && bot >= 1 && bot <= 100) {
            result.push(bot)
        }
        if(Math.floor(left/10) == Math.floor(cen/10)) {
            result.push(left)
        }
        if(Math.floor(right/10) == Math.floor(cen/10)) {
            result.push(right)
        }
        return result
    }
    function modState(result, att) {
        attackPoints.push(att)
        if(result) {
            hitAtt.push(att)
        } else {
            if(hitAtt.length >=2 || dir) {
                hitAtt = []
                dir = undefined
            }
        }
    }
    function hit() {
        let result
        if(!dir && hitAtt.length == 1) {
            const adj = getAdj(hitAtt[0])
            for(const item of adj) {
                if(validHit.call(this, item)) {
                    return item
                }
            }
        } else if(!dir && hitAtt.length > 1) {
            dir = hitAtt[hitAtt.length-1] - hitAtt[hitAtt.length-2]
            result = hitAtt[hitAtt.length-1] + dir
        } else if(dir) {
            result = hitAtt[hitAtt.length-1] + dir
        }
        if(result && validHit.call(this, result)) {
            return result
        }
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
    
    return { attackPoints, hit, board: gameboard(), placeship, name, modState }
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
                        top = top + originCellDivAlign.top - boardAlign.top
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
        const ai = (0,_data__WEBPACK_IMPORTED_MODULE_0__.computer)('computer')
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
                if(players[idx].name == 'computer') {
                    players[idx].modState(result, attack)
                }
                if(players[idx].name == 'human') {
                    _dom__WEBPACK_IMPORTED_MODULE_1__.dom.displayAttack('computer', attack, result)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1A7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzdEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ042QjtBQUNGO0FBQ0k7QUFDRTtBQUNMO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkscUNBQUc7QUFDUDtBQUNBLFFBQVEscUNBQUc7QUFDWCxRQUFRLHFDQUFHO0FBQ1gsUUFBUSx1Q0FBSTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxQ0FBRztBQUNYO0FBQ0EsS0FBSztBQUNMLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUvZGVmYXVsdC5jc3M/ZGE4OCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlL3BsYWNlc2hpcC5jc3M/YjUzOSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlL3BsYXkuY3NzP2MwNTkiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qYXZhc2NyaXB0L2RhdGEuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qYXZhc2NyaXB0L2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2phdmFzY3JpcHQvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2phdmFzY3JpcHQvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qYXZhc2NyaXB0L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNoZWNrVmFsaWQsIG5vT3ZlckxhcCwgZ2V0U2hpcFBvc2l0aW9uIH0gZnJvbSBcIi4vaGVscGVyc1wiXHJcbmV4cG9ydCBjb25zdCBzaGlwID0gKHBvc2l0aW9ucykgPT4ge1xyXG4gICAgbGV0IG51bWJlck9mSGl0cyA9IDBcclxuICAgIGZ1bmN0aW9uIGhpdChwb3NpdGlvbikge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25zLmZvckVhY2goKHBvcywgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHBvcyA9PSBwb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJPZkhpdHMgKytcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lkeF0gPSAnaCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGlzU3VuaygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnMuZXZlcnkoKHBvcykgPT4gcG9zID09ICdoJylcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHsgaXNTdW5rLCBwb3NpdGlvbnMsIGhpdCwgbnVtYmVyT2ZIaXRzIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICAgIGxldCBtaXNzZWRBdHRhY2sgPSBbXVxyXG4gICAgY29uc3Qgc2hpcHMgPSBbXVxyXG4gICAgZnVuY3Rpb24gcGxhY2VzaGlwKHBvc2l0aW9ucykge1xyXG4gICAgICAgIHBvc2l0aW9ucy5mb3JFYWNoKChwb3MpID0+IHtcclxuICAgICAgICAgICAgc2hpcHMucHVzaChzaGlwKHBvcykpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2socG9zaXRpb24pIHtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBudW1iZXJPZkhpdHNCZWZvcmUgPSB0aGlzLnNoaXBzW2ldLm51bWJlck9mSGl0c1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBzW2ldLmhpdChwb3NpdGlvbilcclxuICAgICAgICAgICAgaWYobnVtYmVyT2ZIaXRzQmVmb3JlIDwgdGhpcy5zaGlwc1tpXS5udW1iZXJPZkhpdHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrLnB1c2gocG9zaXRpb24pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0FsbFN1bmsoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBwbGFjZXNoaXAsIHJlY2VpdmVBdHRhY2ssIG1pc3NlZEF0dGFjaywgaXNBbGxTdW5rLCBzaGlwcyB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IHBsYXllciA9IChuYW1lKSA9PiB7XHJcbiAgICBcclxuICAgIHJldHVybiB7IGJvYXJkOiBnYW1lYm9hcmQoKSwgbmFtZSB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyID0gKG5hbWUpID0+IHtcclxuICAgIGNvbnN0IGF0dGFja1BvaW50cyA9IFtdXHJcbiAgICBsZXQgaGl0QXR0ID0gW11cclxuICAgIGxldCBkaXJcclxuICAgIGZ1bmN0aW9uIHZhbGlkSGl0KGhpdCkge1xyXG4gICAgICAgIHJldHVybiBoaXQ+PTEgJiYgaGl0PD0xMDAgJiYgIXRoaXMuYXR0YWNrUG9pbnRzLmluY2x1ZGVzKGhpdClcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldEFkaihjZW4pIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW11cclxuICAgICAgICBjb25zdCB0b3AgPSAoTWF0aC5mbG9vcihjZW4vMTApIC0xKSoxMCArIChjZW4lMTApXHJcbiAgICAgICAgY29uc3QgYm90ID0gKE1hdGguZmxvb3IoY2VuLzEwKSArMSkqMTAgKyAoY2VuJTEwKVxyXG4gICAgICAgIGNvbnN0IGxlZnQgPSBjZW4tMVxyXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gY2VuKzFcclxuICAgICAgICBpZih0b3AlMTAgPT0gY2VuJTEwICYmIHRvcCA+PSAxICYmIHRvcCA8IDEwMCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0b3ApXHJcbiAgICAgICAgfSBcclxuICAgICAgICBpZihib3QlMTAgPT0gY2VuJTEwICYmIGJvdCA+PSAxICYmIGJvdCA8PSAxMDApIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYm90KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihNYXRoLmZsb29yKGxlZnQvMTApID09IE1hdGguZmxvb3IoY2VuLzEwKSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChsZWZ0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihNYXRoLmZsb29yKHJpZ2h0LzEwKSA9PSBNYXRoLmZsb29yKGNlbi8xMCkpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gocmlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG1vZFN0YXRlKHJlc3VsdCwgYXR0KSB7XHJcbiAgICAgICAgYXR0YWNrUG9pbnRzLnB1c2goYXR0KVxyXG4gICAgICAgIGlmKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBoaXRBdHQucHVzaChhdHQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYoaGl0QXR0Lmxlbmd0aCA+PTIgfHwgZGlyKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRBdHQgPSBbXVxyXG4gICAgICAgICAgICAgICAgZGlyID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoaXQoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdFxyXG4gICAgICAgIGlmKCFkaXIgJiYgaGl0QXR0Lmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkaiA9IGdldEFkaihoaXRBdHRbMF0pXHJcbiAgICAgICAgICAgIGZvcihjb25zdCBpdGVtIG9mIGFkaikge1xyXG4gICAgICAgICAgICAgICAgaWYodmFsaWRIaXQuY2FsbCh0aGlzLCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYoIWRpciAmJiBoaXRBdHQubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBkaXIgPSBoaXRBdHRbaGl0QXR0Lmxlbmd0aC0xXSAtIGhpdEF0dFtoaXRBdHQubGVuZ3RoLTJdXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGhpdEF0dFtoaXRBdHQubGVuZ3RoLTFdICsgZGlyXHJcbiAgICAgICAgfSBlbHNlIGlmKGRpcikge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBoaXRBdHRbaGl0QXR0Lmxlbmd0aC0xXSArIGRpclxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXN1bHQgJiYgdmFsaWRIaXQuY2FsbCh0aGlzLCByZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgaGl0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMCkgKyAxIFxyXG4gICAgICAgICAgICBpZih2YWxpZEhpdC5jYWxsKHRoaXMsIGhpdCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrUG9pbnRzLnB1c2goaGl0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhpdCBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByYW5kb21BbmdsZSgpIHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMilcclxuICAgICAgICByZXR1cm4gKG51bWJlciA9PSAwKSA/IDAgOiA5MFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmFuZG9tSGVhZEJvdHRvbShhbmdsZSwgbGVuZ3RoLCBjb2x1bW4pIHtcclxuICAgICAgICBjb25zdCBoZWFkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMCkgKyAxXHJcbiAgICAgICAgbGV0IGJvdHRvbVxyXG4gICAgICAgIGlmKGFuZ2xlID09IDApIHtcclxuICAgICAgICAgICAgYm90dG9tID0gaGVhZCArIGxlbmd0aCAtMSBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBib3R0b20gPSAoTWF0aC5mbG9vcihoZWFkL2NvbHVtbikgKyBsZW5ndGggLTEpKmNvbHVtbiArIGhlYWQgJSBjb2x1bW5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtoZWFkLCBib3R0b21dXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwbGFjZXNoaXAoY29sdW1uLCBzaGlwU2l6ZXMpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW11cclxuICAgICAgICBzaGlwU2l6ZXMuZm9yRWFjaCgoc2l6ZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSByYW5kb21BbmdsZSgpXHJcbiAgICAgICAgICAgIGxldCBoZWFkQm90dG9tXHJcbiAgICAgICAgICAgIHdoaWxlKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRCb3R0b20gPSByYW5kb21IZWFkQm90dG9tKGFuZ2xlLCBzaXplLCBjb2x1bW4pXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBnZXRTaGlwUG9zaXRpb24oc2l6ZSwgLi4uaGVhZEJvdHRvbSwgY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgaWYoY2hlY2tWYWxpZChhbmdsZSwgLi4uaGVhZEJvdHRvbSwgY29sdW1uKSAmJiBub092ZXJMYXAocG9zaXRpb24sIHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7IGF0dGFja1BvaW50cywgaGl0LCBib2FyZDogZ2FtZWJvYXJkKCksIHBsYWNlc2hpcCwgbmFtZSwgbW9kU3RhdGUgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgIGNoZWNrVmFsaWQsIGdldFNoaXBQb3NpdGlvbiwgZ2V0T3JpZ2luLCBnZXRIZWFkQm90dG9tLCBub092ZXJMYXAgfSBmcm9tIFwiLi9oZWxwZXJzXCJcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckJvYXJkKCkge1xyXG4gICAgY29uc3QgZ2FtZUJvYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1ib2FyZCcpLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXHJcbiAgICBjb25zdCBnYW1lQm9hcmREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcCcpLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpXHJcbiAgICBnYW1lQm9hcmREaXYuYXBwZW5kQ2hpbGQoZ2FtZUJvYXJkVGVtcGxhdGUpXHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoY29sdW1uKSB7XHJcbiAgICBjb25zdCBnYW1lQm9hcmRGcmFnbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWJvYXJkJykuY29udGVudFxyXG4gICAgaWYoZ2FtZUJvYXJkRnJhZ21lbnQuY2hpbGRFbGVtZW50Q291bnQgPT0gMCkge1xyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD0gY29sdW1uKmNvbHVtbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBpKVxyXG4gICAgICAgICAgICBnYW1lQm9hcmRGcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbmZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgbikge1xyXG4gICAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtYm9hcmQnKS5jb250ZW50XHJcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcycpXHJcbiAgICBjb25zdCB1bml0ID0gc2l6ZS9uXHJcbiAgICBmb3IoY29uc3QgY2VsbCBvZiBnYW1lQm9hcmQuY2hpbGRyZW4pIHtcclxuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gYCR7dW5pdH1weGBcclxuICAgICAgICBjZWxsLnN0eWxlLmhlaWdodCA9IGAke3VuaXR9cHhgXHJcbiAgICB9XHJcbiAgICBmb3IoY29uc3Qgc2hpcCBvZiBzaGlwcy5jaGlsZHJlbikge1xyXG4gICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSArc2hpcC5kYXRhc2V0Lmxlbmd0aFxyXG4gICAgICAgIHNoaXAuc3R5bGUud2lkdGggPSBgJHt1bml0KnNoaXBMZW5ndGh9cHhgXHJcbiAgICAgICAgc2hpcC5zdHlsZS5oZWlnaHQgPSBgJHt1bml0fXB4YFxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVNoaXBEb20oc2hpcFNpemVzKSB7XHJcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcycpXHJcbiAgICBzaGlwU2l6ZXMuZm9yRWFjaCgoc2l6ZSwgaWR4KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgc2hpcC5zcmMgPSBcImh0dHBzOi8vYXMyLmZ0Y2RuLm5ldC92Mi9qcGcvMDMvNTMvODQvNjUvMTAwMF9GXzM1Mzg0NjU5N191bE1ST01FNEhaZUpkemNPNEFNMGxINXRSRGpVMk5ibS5qcGdcIlxyXG4gICAgICAgIHNoaXAuZHJhZ2dhYmxlID0gXCJ0cnVlXCJcclxuICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIHNoaXAuZGF0YXNldC5sZW5ndGggPSBzaXplXHJcbiAgICAgICAgc2hpcC5kYXRhc2V0LnNoaXBJZCA9IGlkeFxyXG4gICAgICAgIHNoaXBzLmFwcGVuZENoaWxkKHNoaXApXHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGNsZWFuTm9kZShub2RlKSB7XHJcbiAgICB3aGlsZShub2RlLmxhc3RDaGlsZCkge1xyXG4gICAgICAgIG5vZGUubGFzdENoaWxkLnJlbW92ZSgpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0U2hpcChpZCkge1xyXG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMnKVxyXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcCcpLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItYm9hcmQnKVxyXG4gICAgbGV0IHNoaXAgPSBzaGlwcy5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zaGlwLWlkPVwiJHtpZH1cIl1gKVxyXG4gICAgaWYoIXNoaXApIHtcclxuICAgICAgICBzaGlwID0gcGxheWVyQm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtc2hpcC1pZD1cIiR7aWR9XCJdYClcclxuICAgIH1cclxuICAgIHJldHVybiBzaGlwIFxyXG4gICAgXHJcbn1cclxuZnVuY3Rpb24gZ2V0VGVtcFJlc3VsdChzaGlwSWQpIHtcclxuICAgIGNvbnN0IHNoaXBzT25Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwJykucXVlcnlTZWxlY3RvcignLnBsYXllci1ib2FyZCcpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NoaXAnKVxyXG4gICAgbGV0IGNvbGxlY3Rpb24gPSBbXVxyXG4gICAgZm9yKGNvbnN0IHNoaXAgb2Ygc2hpcHNPbkJvYXJkKSB7XHJcbiAgICAgICAgaWYoc2hpcCAhPT0gZ2V0U2hpcChzaGlwSWQpKSB7XHJcbiAgICAgICAgICAgIGxldCBzaGlwUG9zaXRpb24gPSBzaGlwLmRhdGFzZXQucG9zaXRpb24uc3BsaXQoJywnKS5tYXAoKGl0ZW0pID0+ICtpdGVtKVxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLnB1c2goc2hpcFBvc2l0aW9uKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkb20gPSAoKCkgPT4ge1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBwbGFjZXNoaXAoY29sdW1uKSB7XHJcbiAgICAgICAgLy8gcHJlcGFyZSBkb20gZWxlbWVudHNcclxuICAgICAgICBjcmVhdGVQbGF5ZXJCb2FyZCgpXHJcbiAgICAgICAgLy8gZ2V0IGFsbCBvZiB0aGUgbmVjZXNzYXJ5IGVsZW1lbnRzXHJcbiAgICAgICAgY29uc3QgcGxhY2VzaGlwRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKVxyXG4gICAgICAgIGNvbnN0IGJvYXJkID0gcGxhY2VzaGlwRGl2LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpXHJcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMnKVxyXG4gICAgICAgIGNvbnN0IGZpbmlzaEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5pc2gnKVxyXG4gICAgICAgIC8vIGRpc3BsYXkgcGxhY2Utc2hpcCBEaXZcclxuICAgICAgICBkaXNwbGF5KHBsYWNlc2hpcERpdilcclxuICAgICAgICAvLyBkcmFnICYgZHJvcFxyXG4gICAgICAgIGxldCBzaGlwTGVuZ3RoLCBvcmlnaW4sIGFsbG93Um90YXRlLCBjdXJzb3JQb3NpdGlvblxyXG4gICAgICAgIGZvcihjb25zdCBzaGlwIG9mIHNoaXBzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHNoaXAuZGF0YXNldC5hbmdsZSA9IFwiMFwiXHJcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZShuZXcgSW1hZ2UoMCwwKSwgMCwgMCkgXHJcbiAgICAgICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgZS50YXJnZXQuZGF0YXNldC5zaGlwSWQpXHJcbiAgICAgICAgICAgICAgICBzaGlwTGVuZ3RoID0gK2UudGFyZ2V0LmRhdGFzZXQubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICBvcmlnaW4gPSBzaGlwTGVuZ3RoLzJcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvciA9IGUub2Zmc2V0WC8oZS50YXJnZXQub2Zmc2V0V2lkdGgpKjRcclxuICAgICAgICAgICAgICAgIGN1cnNvclBvc2l0aW9uID0gZS5vZmZzZXRYLyhlLnRhcmdldC5vZmZzZXRXaWR0aCkqc2hpcExlbmd0aFxyXG4gICAgICAgICAgICAgICAgaWYoY3Vyc29yIDw9IDEgfHwgY3Vyc29yID49IDMpIHtcclxuICAgICAgICAgICAgICAgICAgYWxsb3dSb3RhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBhbGxvd1JvdGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGFsbG93Um90YXRlKSB7XHJcbiAgICAgICAgICAgICAgLy8gICAgIGNhbGN1bGF0ZSBhbmdsZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZSBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBldmVudC5jbGllbnRZIC0gKGJveC50b3AgKyBib3guaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBldmVudC5jbGllbnRYIC0gKGJveC5sZWZ0ICsgYm94LndpZHRoLzIpXHJcbiAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSBNYXRoLmF0YW4yKHkseCkqMTgwLyhNYXRoLlBJKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFuZ2xlID49IDAgJiYgYW5nbGUgPD0gNDUgfHwgYW5nbGUgPD0wICYmIGFuZ2xlID49IC00NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYW5nbGUgPiA0NSAmJiBhbmdsZSA8PSA5MCB8fCBhbmdsZSA+IDkwICYmIGFuZ2xlIDw9IDEzNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IDkwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGFuZ2xlIDwgLTQ1ICYmIGFuZ2xlID49IC05MCB8fCBhbmdsZSA8IC05MCAmJiBhbmdsZSA+PSAtMTM1ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IDkwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGFuZ2xlID4gMTM1ICYmIGFuZ2xlIDw9IDE4MCB8fCBhbmdsZSA8IC0xMzUgJiYgYW5nbGUgPj0gLTE4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuYW5nbGUgPSBhbmdsZVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7YW5nbGV9ZGVnKWBcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBwcmV2ZW50IHJvdGF0aW5nIHNoaXAgb3V0c2lkZSBib2FyZFxyXG4gICAgICAgIH1cclxuICAgICAgICBib2FyZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGN1eiB3ZSBhZGQgZXZlbnRsaXN0ZW5lciB0byBkb2N1bWVudFxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBib2FyZEFsaWduID0gYm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgICAgY29uc3Qgc2hpcElkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpXHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBnZXRTaGlwKHNoaXBJZClcclxuICAgICAgICAgICAgY29uc3QgdW5pdCA9IHNoaXAub2Zmc2V0V2lkdGgvc2hpcExlbmd0aFxyXG4gICAgICAgICAgICBjb25zdCB0ZW1wUmVzdWx0ID0gZ2V0VGVtcFJlc3VsdChzaGlwSWQpXHJcbiAgICAgICAgICAgIGxldCBzaGlwUG9zaXRpb24gPSAnJ1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSArc2hpcC5kYXRhc2V0LmFuZ2xlXHJcbiAgICAgICAgICAgIGxldCBuZXdIZWFkQm90dG9tLCBuZXdQb3NpdGlvblxyXG4gICAgICAgICAgICBpZihzaGlwLmRhdGFzZXQucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbiA9IHNoaXAuZGF0YXNldC5wb3NpdGlvbi5zcGxpdCgnLCcpLm1hcCgoaXRlbSkgPT4gK2l0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIWFsbG93Um90YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3JpZ2luQ2VsbCA9IGdldE9yaWdpbigrZS50YXJnZXQuZGF0YXNldC5pZCwgYW5nbGUsIGN1cnNvclBvc2l0aW9uLCBvcmlnaW4sIGNvbHVtbilcclxuICAgICAgICAgICAgICAgIG5ld0hlYWRCb3R0b20gPSBnZXRIZWFkQm90dG9tKG9yaWdpbkNlbGwsIGFuZ2xlLCBzaGlwTGVuZ3RoLCBjb2x1bW4pXHJcbiAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IGdldFNoaXBQb3NpdGlvbihzaGlwTGVuZ3RoLCAuLi5uZXdIZWFkQm90dG9tLCBjb2x1bW4pXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY2hlY2tWYWxpZChhbmdsZSwgLi4ubmV3SGVhZEJvdHRvbSwgY29sdW1uKSAmJiBub092ZXJMYXAobmV3UG9zaXRpb24sIHRlbXBSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2Ugc2hpcCdzIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBvc2l0aW9uID0gbmV3UG9zaXRpb25cclxuICAgICAgICAgICAgICAgIC8vIGF0dGFjaCB0aGUgc2hpcCB0byBuZXcgcG9zaXRpb24gKGNoYW5nZSBkaXNwbGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3AsIGxlZnRcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5DZWxsRGl2ID0gYm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke29yaWdpbkNlbGx9XCJdYClcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5DZWxsRGl2QWxpZ24gPSBvcmlnaW5DZWxsRGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNoaXApXHJcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcclxuICAgICAgICAgICAgICAgICAgICBpZihhbmdsZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IDAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAtTWF0aC5mbG9vcihvcmlnaW4pKnVuaXRcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzaGlwTGVuZ3RoICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSAtMC41KnVuaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAoLW9yaWdpbiArIDAuNSkqdW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IC1NYXRoLmZsb29yKG9yaWdpbikqdW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHRvcCArIG9yaWdpbkNlbGxEaXZBbGlnbi50b3AgLSBib2FyZEFsaWduLnRvcFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0ICsgb3JpZ2luQ2VsbERpdkFsaWduLmxlZnQgLSBib2FyZEFsaWduLmxlZnRcclxuICAgICAgICAgICAgICAgICAgICBzaGlwLmRhdGFzZXQub3JpZ2luID0gb3JpZ2luQ2VsbFxyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuc3R5bGUudG9wID0gYCR7dG9wfXB4YFxyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgXHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9yaWdpbkNlbGwgPSArc2hpcC5kYXRhc2V0Lm9yaWdpblxyXG4gICAgICAgICAgICAgICAgbmV3SGVhZEJvdHRvbSA9IGdldEhlYWRCb3R0b20ob3JpZ2luQ2VsbCwgYW5nbGUsIHNoaXBMZW5ndGgsIGNvbHVtbilcclxuICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gZ2V0U2hpcFBvc2l0aW9uKHNoaXBMZW5ndGgsIC4uLm5ld0hlYWRCb3R0b20sIGNvbHVtbilcclxuICAgICAgICAgICAgICAgIGlmKGNoZWNrVmFsaWQoYW5nbGUsIC4uLm5ld0hlYWRCb3R0b20sIGNvbHVtbikgJiYgbm9PdmVyTGFwKG5ld1Bvc2l0aW9uLCB0ZW1wUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBzaGlwJ3MgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICBzaGlwUG9zaXRpb24gPSBuZXdQb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBkaXNwbGF5XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luQ2VsbERpdiA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtvcmlnaW5DZWxsfVwiXWApXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luQ2VsbERpdkFsaWduID0gb3JpZ2luQ2VsbERpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzaGlwTGVuZ3RoICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZWZ0LCB0b3AgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFuZ2xlID09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSAtMC41KnVuaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAoLW9yaWdpbiArIDAuNSkqdW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IC1vcmlnaW4qdW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0ICsgb3JpZ2luQ2VsbERpdkFsaWduLmxlZnQgLSBib2FyZEFsaWduLmxlZnQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IHRvcCArIG9yaWdpbkNlbGxEaXZBbGlnbi50b3AgLSBib2FyZEFsaWduLnRvcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnN0eWxlLnRvcCA9IGAke3RvcH1weGBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJvdGF0ZSB0aGUgc2hpcCBiYWNrIChjaGFuZ2UgZGlzcGxheSlcclxuICAgICAgICAgICAgICAgICAgICBhbmdsZSA9PSAwID8gYW5nbGUgPSA5MCA6IGFuZ2xlID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuZGF0YXNldC5hbmdsZSA9IGFuZ2xlXHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7YW5nbGV9ZGVnYFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNoaXAuZGF0YXNldC5wb3NpdGlvbiA9IHNoaXBQb3NpdGlvbi50b1N0cmluZygpXHJcbiAgICAgICAgICAgIC8vIGVuYWJsZSBmaW5pc2ggYnV0dG9uXHJcbiAgICAgICAgICAgIGlmKHNoaXBzLmNoaWxkRWxlbWVudENvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGZpbmlzaEJ0bi5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGdldFNoaXAoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpKVxyXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwJykucXVlcnlTZWxlY3RvcignLnBsYXllci1ib2FyZCcpXHJcbiAgICAgICAgICAgIGlmKHBsYXllckJvYXJkLmNvbnRhaW5zKHNoaXApKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYW5nbGUgPSArc2hpcC5kYXRhc2V0LmFuZ2xlXHJcbiAgICAgICAgICAgICAgICBhbmdsZSA9PSAwID8gYW5nbGUgPSA5MCA6IGFuZ2xlID0gMFxyXG4gICAgICAgICAgICAgICAgc2hpcC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7YW5nbGV9ZGVnKWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gZmluaXNoIHNoaXAncyBwbGFjZW1lbnRcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgZmluaXNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzYXBwZWFyKHBsYWNlc2hpcERpdilcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gW11cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKS5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWJvYXJkJykuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2hpcCcpXHJcbiAgICAgICAgICAgICAgICBmb3IoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGlwUG9zaXRpb24gPSBzaGlwLmRhdGFzZXQucG9zaXRpb24uc3BsaXQoJywnKS5tYXAoKGl0ZW0pID0+ICtpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNoaXBQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KSAgICAgXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHRhY2soKSB7XHJcbiAgICAgICAgY29uc3QgYWlCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5JykucXVlcnlTZWxlY3RvcignLmFpLWJvYXJkJylcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgZm9yKGNvbnN0IGNlbGwgb2YgYWlCb2FyZC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudCB0aGUgY2VsbCBmcm9tIGJlaW5nIHNlbGVjdGVkIGFnYWluXHJcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gZUhhbmRsZXIoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbmFsZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluYWxlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3NlZCcpIHx8IGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2snKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbHJlYWR5SGl0cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHJlYWR5SGl0cC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFscmVhZHlcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxlRGl2LmFwcGVuZENoaWxkKGFscmVhZHlIaXRwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHJlYWR5SGl0cC50ZXh0Q29udGVudCA9IFwiWW91IGFscmVhZHkgaGl0IHRoZSBjZWxsLCBwbGVhc2UgY2hvb3NlIGFnYWluXCJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFscmVhZHlcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWxyZWFkeVwiKS5yZW1vdmUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihjb25zdCBjZWxsIG9mIGFpQm9hcmQuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlSGFuZGxlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCtlLnRhcmdldC5kYXRhc2V0LmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LCB7b25jZTogdHJ1ZX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGlzcGxheUF0dGFjayhuYW1lLCBhdHRhY2tDZWxsLCByZXN1bHQpIHtcclxuICAgICAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5JykucXVlcnlTZWxlY3RvcihgLiR7bmFtZX0tYm9hcmRgKVxyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7YXR0YWNrQ2VsbH1cIl1gKVxyXG4gICAgICAgIGlmKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJhdHRhY2tcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkaXNwbGF5RmluYWxlKHdpbm5lcikge1xyXG4gICAgICAgIGNvbnN0IGZpbmFsZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5hbGUnKVxyXG4gICAgICAgIGRpc3BsYXkoZmluYWxlRGl2KVxyXG4gICAgICAgIGZpbmFsZURpdi50ZXh0Q29udGVudCA9IGBHYW1lIGVuZHMhIFRoZSB3aW5uZXIgaXM6ICR7d2lubmVyfSFgXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgICAgICBjb25zdCBwbGF5RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXknKVxyXG4gICAgICAgIHBsYXlEaXYucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIikucmVtb3ZlKClcclxuICAgICAgICBjbGVhbk5vZGUocGxheURpdi5xdWVyeVNlbGVjdG9yKFwiLmFpLWJvYXJkXCIpKVxyXG5cclxuICAgICAgICBjb25zdCBwbGFjZXNoaXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcCcpXHJcbiAgICAgICAgY2xlYW5Ob2RlKHBsYWNlc2hpcERpdi5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKSlcclxuXHJcbiAgICAgICAgY2xlYW5Ob2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcycpKVxyXG4gICAgICAgIGRpc2FwcGVhcihwbGF5RGl2KVxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluaXNoJykuZGlzYWJsZWQgPSB0cnVlXHJcblxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcHJlcGFyZUJlZm9yZVBsYXkoY29sdW1uLCBzaGlwU2l6ZXMsIGJvYXJkU2l6ZSkge1xyXG4gICAgICAgIGNyZWF0ZUJvYXJkKGNvbHVtbilcclxuICAgICAgICBjcmVhdGVTaGlwRG9tKHNoaXBTaXplcylcclxuICAgICAgICBzZXRTaXplKGJvYXJkU2l6ZSwgY29sdW1uKVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGlzcGxheShub2RlKSB7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5JylcclxuICAgIH0gXHJcbiAgICBmdW5jdGlvbiBkaXNhcHBlYXIobm9kZSkge1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheScpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcmVwYXJlQm9hcmRzKCkge1xyXG4gICAgICAgIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZHMnKVxyXG4gICAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXAnKS5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKS5jbG9uZU5vZGUodHJ1ZSlcclxuICAgICAgICBjb25zdCBhaUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtYm9hcmQnKS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxyXG4gICAgICAgIGJvYXJkcy5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZClcclxuICAgICAgICBib2FyZHMucXVlcnlTZWxlY3RvcihcIi5haS1ib2FyZFwiKS5hcHBlbmRDaGlsZChhaUJvYXJkKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgcGxhY2VzaGlwLCBhdHRhY2ssIGRpc3BsYXlBdHRhY2ssIGRpc3BsYXlGaW5hbGUsIHJlc2V0LCBwcmVwYXJlQmVmb3JlUGxheSwgZGlzcGxheSwgZGlzYXBwZWFyLCBwcmVwYXJlQm9hcmRzIH1cclxufSkoKSIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9kYXRhXCJcclxuaW1wb3J0IHsgZG9tIH0gZnJvbSBcIi4vZG9tXCJcclxuZXhwb3J0IGNvbnN0IGdhbWUgPSAoKCkgPT4ge1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnYW1lT3Zlcihib2FyZCkge1xyXG4gICAgICAgIHJldHVybiBib2FyZC5pc0FsbFN1bmsoKVxyXG4gICAgfVxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcGxheShjb2x1bW4sIHNoaXBTaXplcykge1xyXG4gICAgICAgIGNvbnN0IHBsYXllcjEgPSBwbGF5ZXIoJ2h1bWFuJylcclxuICAgICAgICBjb25zdCBhaSA9IGNvbXB1dGVyKCdjb21wdXRlcicpXHJcbiAgICAgICAgLy8gZGlzcGxheSBwbGF5ZXIncyBib2FyZCBmb3IgaGltL2hlciB0byBwbGFjZSB0aGVpciBzaGlwc1xyXG4gICAgICAgIGNvbnN0IHBsYXllclNoaXBQbGFjZW1lbnQgPSBhd2FpdCBkb20ucGxhY2VzaGlwKGNvbHVtbilcclxuICAgICAgICBwbGF5ZXIxLmJvYXJkLnBsYWNlc2hpcChwbGF5ZXJTaGlwUGxhY2VtZW50KVxyXG4gICAgICAgIGNvbnN0IGFpU2hpcFBsYWNlbWVudCA9IGFpLnBsYWNlc2hpcChjb2x1bW4sIHNoaXBTaXplcylcclxuICAgICAgICBhaS5ib2FyZC5wbGFjZXNoaXAoYWlTaGlwUGxhY2VtZW50KVxyXG4gICAgICAgIC8vIGRpc3BsYXkgcGxheURpdlxyXG4gICAgICAgIGNvbnN0IHBsYXlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheScpXHJcbiAgICAgICAgZG9tLmRpc3BsYXkocGxheURpdilcclxuICAgICAgICAvLyBkaXNwbGF5IGJvdGggYm9hcmRzIGZvciBwbGF5ZXIgdG8ga2VlcCB0cmFjayBvZiB0aGUgZ2FtZVxyXG4gICAgICAgIGRvbS5wcmVwYXJlQm9hcmRzKClcclxuICAgICAgICBjb25zdCBwbGF5ZXJzID0gW3BsYXllcjEsIGFpXVxyXG4gICAgICAgIHdoaWxlKHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGF0dGFjaywgcmVzdWx0LCBpXHJcbiAgICAgICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IHBsYXllcnMubGVuZ3RoOyBpZHgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyc1tpZHhdLm5hbWUgPT0gJ2h1bWFuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjayA9IGF3YWl0IGRvbS5hdHRhY2soKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2sgPSBwbGF5ZXJzW2lkeF0uaGl0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlkeCA9PSAwID8gaSA9MSA6IGkgPSAwXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwbGF5ZXJzW2ldLmJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrKVxyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyc1tpZHhdLm5hbWUgPT0gJ2NvbXB1dGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllcnNbaWR4XS5tb2RTdGF0ZShyZXN1bHQsIGF0dGFjaylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHBsYXllcnNbaWR4XS5uYW1lID09ICdodW1hbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20uZGlzcGxheUF0dGFjaygnY29tcHV0ZXInLCBhdHRhY2ssIHJlc3VsdClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlBdHRhY2soJ3BsYXllcicsIGF0dGFjaywgcmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZ2FtZU92ZXIocGxheWVyc1tpXS5ib2FyZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20uZGlzcGxheUZpbmFsZShwbGF5ZXJzW2lkeF0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgcGxheSB9XHJcbn0pKCkiLCJcclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yaWdpbihjdXJyZW50Q2VsbCwgYW5nbGUsIGN1cnNvclBvc2l0aW9uLCBvcmlnaW4sIGNvbHVtbikge1xyXG4gICAgY29uc3QgZGlzdGFuY2UgPSAtTWF0aC5mbG9vcihjdXJzb3JQb3NpdGlvbikgKyBNYXRoLmZsb29yKG9yaWdpbilcclxuICAgIGlmKGFuZ2xlID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBjdXJyZW50Q2VsbCArIGRpc3RhbmNlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgIHJldHVybiAoTWF0aC5mbG9vcihjdXJyZW50Q2VsbC9jb2x1bW4pICsgZGlzdGFuY2UpKmNvbHVtbiArIChjdXJyZW50Q2VsbCAlIGNvbHVtbilcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGVhZEJvdHRvbShvcmlnaW5DZWxsLCBhbmdsZSwgIHNoaXBMZW5ndGgsIGNvbHVtbikge1xyXG4gICAgbGV0IGhlYWQsIGJvdHRvbVxyXG4gICAgY29uc3Qgb3JpZ2luID0gc2hpcExlbmd0aC8yXHJcbiAgICBpZihhbmdsZSA9PSAwKSB7XHJcbiAgICAgICAgaGVhZCA9IG9yaWdpbkNlbGwgLSBNYXRoLmZsb29yKG9yaWdpbilcclxuICAgICAgICBib3R0b20gPSBoZWFkICsgc2hpcExlbmd0aCAtMVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBoZWFkID0gKE1hdGguZmxvb3Iob3JpZ2luQ2VsbC9jb2x1bW4pIC0gTWF0aC5mbG9vcihvcmlnaW4pKSpjb2x1bW4gKyAob3JpZ2luQ2VsbCAlIGNvbHVtbilcclxuICAgICAgICBib3R0b20gPSAoTWF0aC5mbG9vcihoZWFkL2NvbHVtbikgKyBzaGlwTGVuZ3RoIC0xKSpjb2x1bW4gKyAob3JpZ2luQ2VsbCAlIGNvbHVtbilcclxuICAgIH1cclxuICAgIHJldHVybiBbaGVhZCwgYm90dG9tXVxyXG59XHJcbmZ1bmN0aW9uIGNvbnZlcnRDZWxsTnVtYmVyKGNlbGxOdW1iZXIsIGNvbHVtbikge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdXHJcbiAgICBpZihjZWxsTnVtYmVyICUgY29sdW1uID09IDApIHtcclxuICAgICAgICByZXN1bHRbMF0gPSBNYXRoLmZsb29yKGNlbGxOdW1iZXIvY29sdW1uKSBcclxuICAgICAgICByZXN1bHRbMV0gPSBjb2x1bW5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0WzBdID0gTWF0aC5mbG9vcihjZWxsTnVtYmVyL2NvbHVtbikgKyAxXHJcbiAgICAgICAgcmVzdWx0WzFdID0gY2VsbE51bWJlciAlIGNvbHVtblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja1ZhbGlkKGFuZ2xlLCBoZWFkLCBib3R0b20sIGNvbHVtbikge1xyXG4gICAgY29uc3QgaGVhZENvbnZlcnRlZCA9IGNvbnZlcnRDZWxsTnVtYmVyKGhlYWQsIGNvbHVtbilcclxuICAgIGNvbnN0IGJvdHRvbUNvbnZlcnRlZCA9IGNvbnZlcnRDZWxsTnVtYmVyKGJvdHRvbSwgY29sdW1uKVxyXG4gICAgbGV0IGNvbmRpdGlvbjEsIGNvbmRpdGlvbjJcclxuICAgIGNvbmRpdGlvbjEgPSBoZWFkQ29udmVydGVkLmV2ZXJ5KChpdGVtKSA9PiBpdGVtID49MSAmJiBpdGVtIDw9IGNvbHVtbikgJiYgYm90dG9tQ29udmVydGVkLmV2ZXJ5KChpdGVtKSA9PiBpdGVtID49MSAmJiBpdGVtIDw9IGNvbHVtbilcclxuICAgIGlmKGFuZ2xlID09IDApIHtcclxuICAgICAgICBjb25kaXRpb24yID0gaGVhZENvbnZlcnRlZFswXSA9PSBib3R0b21Db252ZXJ0ZWRbMF1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uZGl0aW9uMiA9IGhlYWRDb252ZXJ0ZWRbMV0gPT0gYm90dG9tQ29udmVydGVkWzFdXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBjb25kaXRpb24xICYmIGNvbmRpdGlvbjJcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbm9PdmVyTGFwKHBvc2l0aW9uLCBjb2xsZWN0aW9uKSB7XHJcbiAgICBcclxuICAgIHJldHVybiAoY29sbGVjdGlvbi5mbGF0KCkuZXZlcnkoKGl0ZW0pID0+ICFwb3NpdGlvbi5pbmNsdWRlcyhpdGVtKSkpXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXBQb3NpdGlvbihzaGlwTGVuZ3RoLCBoZWFkLCBib3R0b20sIGNvbHVtbikge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdXHJcbiAgICBmb3IobGV0IGk9MDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmKGhlYWQgJSBjb2x1bW4gPT0gYm90dG9tICUgY29sdW1uKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXh0ID0gKE1hdGguZmxvb3IoaGVhZC9jb2x1bW4pICsgaSkqY29sdW1uICsgaGVhZCAlIGNvbHVtblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXh0KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGhlYWQraSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIlxyXG5pbXBvcnQgeyBkb20gfSBmcm9tIFwiLi9kb21cIlxyXG5pbXBvcnQgXCIuLy4uL3N0eWxlL2RlZmF1bHQuY3NzXCJcclxuaW1wb3J0IFwiLi8uLi9zdHlsZS9wbGFjZXNoaXAuY3NzXCJcclxuaW1wb3J0IFwiLi8uLi9zdHlsZS9wbGF5LmNzc1wiXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29sdW1uID0gMTBcclxuICAgIGNvbnN0IHNoaXBTaXplcyA9IFs1LDQsMywzLDJdXHJcbiAgICBjb25zdCBib2FyZFNpemUgPSA1MDBcclxuICAgIFxyXG4gICAgY29uc3Qgd2VsY29tZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lJylcclxuICAgIGRvbS5kaXNwbGF5KHdlbGNvbWUpXHJcbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcclxuICAgICAgICBkb20uZGlzYXBwZWFyKHdlbGNvbWUpXHJcbiAgICAgICAgZG9tLnByZXBhcmVCZWZvcmVQbGF5KGNvbHVtbiwgc2hpcFNpemVzLCBib2FyZFNpemUpXHJcbiAgICAgICAgZ2FtZS5wbGF5KGNvbHVtbiwgc2hpcFNpemVzKVxyXG4gICAgfVxyXG4gICAgd2VsY29tZS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0KVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICAgICAgZG9tLnJlc2V0KClcclxuICAgICAgICBzdGFydCgpICAgXHJcbiAgICB9KVxyXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==