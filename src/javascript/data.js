import { checkValid, noOverLap, getShipPosition } from "./helpers"
export const ship = (positions) => {
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

export const gameboard = () => {
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
export const player = (name) => {
    
    return { board: gameboard(), name }
}
export const computer = (name) => {
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
                let position = getShipPosition(size, ...headBottom, column)
                if(checkValid(angle, ...headBottom, column) && noOverLap(position, result)) {
                    result.push(position)
                    break
                }
            }
        })
        return result
    }
    
    return { attackPoints, hit, board: gameboard(), placeship, name }
}


