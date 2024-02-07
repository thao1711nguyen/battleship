import {  checkValid, getShipPosition, getOrigin, getHeadBottom, noOverLap } from "./helpers"

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

export const dom = (() => {
    
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
                let originCell = getOrigin(+e.target.dataset.id, angle, cursorPosition, origin, column)
                newHeadBottom = getHeadBottom(originCell, angle, shipLength, column)
                newPosition = getShipPosition(shipLength, ...newHeadBottom, column)

                if(checkValid(angle, ...newHeadBottom, column) && noOverLap(newPosition, tempResult)) {
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
                newHeadBottom = getHeadBottom(originCell, angle, shipLength, column)
                newPosition = getShipPosition(shipLength, ...newHeadBottom, column)
                if(checkValid(angle, ...newHeadBottom, column) && noOverLap(newPosition, tempResult)) {
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