import { describe } from 'yargs'
import { ship, gameboard, player, computer} from './data.js'
import { checkValid, noOverLap, getShipPosition, getOrigin, getHeadBottom } from './helpers.js'
describe('ship', () => {
    describe('hit', () => {
        let hitShip = ship([1,2,3])
        test('wrong spot', () => {
            hitShip.hit(4)
            expect(JSON.stringify(hitShip.positions)).toBe(JSON.stringify([1,2,3]))
            expect(hitShip.numberOfHits).toBe(0)
        })
        test('right spot', () => {
            hitShip.hit(1)
            
            expect(hitShip.positions[0]).toBe('h')
            expect(hitShip.numberOfHits).toBe(1)
        })
    })
    describe('isSunk', () => {
        let isSunkShip = ship([1, 11])
        test('not sunk 1', () => {
            isSunkShip.hit(2)
            isSunkShip.hit(12)
            expect(isSunkShip.isSunk()).toBe(false)
        })
        test('not sunk 2', () => {
            isSunkShip.hit(1)
            isSunkShip.hit(3)
            expect(isSunkShip.isSunk()).toBe(false)
        })
        test('sunk', () => {
            isSunkShip.hit(1)
            isSunkShip.hit(11)
            expect(isSunkShip.isSunk()).toBe(true)
        })
    })
})
describe('gameboard', () => {
    describe('placeship', () => {
        const newGameboard= gameboard()
        const positions = [[12, 13]]
        beforeAll(() => {
            newGameboard.placeship(positions)
        })
        test("modify ship's positions", () => {
            expect(JSON.stringify(newGameboard.ships[0].positions)).toBe(JSON.stringify([12, 13]))
        })
    })
    describe('receiveAttack', () => {
        const newGameboard = gameboard()
        const ship1 = ship([1,2])
        const ship2 = ship([11, 21, 31])
        newGameboard.ships = [ship1, ship2]
        test('do not hit the ship: return false, add coor to missedAttack', () => {
            let missedAttackBefore = newGameboard.missedAttack.length
            expect(newGameboard.receiveAttack(16)).toBe(false)
            expect(newGameboard.missedAttack.length).toBe(missedAttackBefore + 1)
        })
        test('hit the right ship: return true, do not add coor to missedAttack', () => {
            let missedAttackBefore = newGameboard.missedAttack.length
            expect(newGameboard.receiveAttack(2)).toBe(true)
            expect(newGameboard.missedAttack.length).toBe(missedAttackBefore)
        })
        
    })
    describe('isAllSunk', () => {
        const newGameboard = gameboard()
        const ship1 = ship([2,3,4,5])
        const ship2 = ship([9, 10])
        newGameboard.ships = [ship1, ship2]
        test('one ship is sunk and the other still okay', () => {
            ship1.isSunk = jest.fn(() => false)
            ship2.isSunk = jest.fn(() => true)
            expect(newGameboard.isAllSunk()).toBe(false)
        })
        test('all ships are sunk: return true', () => {
            ship1.isSunk = jest.fn(() => true)
            ship2.isSunk = jest.fn(() => true)
            expect(newGameboard.isAllSunk()).toBe(true)
        })
    })
})
describe('computer', () => {
    describe('hit', () => {
        const computer1 = computer()
        test('hit a random point', () => {
            const hitPoint = computer1.hit()
            expect(hitPoint).toBeGreaterThanOrEqual(1)
            expect(hitPoint).toBeLessThanOrEqual(100)
            expect(computer1.attackPoints[0].toString()).toBe(hitPoint.toString())
        })
        test('do not hit a point twice', () => {
            for(let i=0; i<3; i++) {
                computer1.hit()
            }
            let result = 0
            for(let i=0; i<computer1.attackPoints.length; i++) {
                for(let j=i+1; j<computer1.attackPoints.length; j++) {
                    if(computer1.attackPoints[i].toString() === computer1.attackPoints[j].toString()) {
                        result ++ 
                        break 
                    }
                }
                if(result > 0) {
                    break 
                }
            }
            expect(result).toBe(0)
        })
    })
})
describe.skip('player', () => {
    
})

describe('checkValid', () => {
    const column = 10
    test('angle=0, valid: return true', () => {
        const angle = 0
        const head = 15
        const bottom = 20
        expect(checkValid(angle, head, bottom, column)).toBe(true)
    })
    test('angle=90, valid: return true', () => {
        const angle = 90
        const head = 10
        const bottom = 50
        expect(checkValid(angle, head, bottom, column)).toBe(true)
    })
    test('angle=0, invalid: return false', () => {
        const angle = 0
        const head = 50
        const bottom = 53
        expect(checkValid(angle, head, bottom, column)).toBe(false)
    })
    test('angle=90, invalid: return false', () => {
        const angle = 90
        const head = 31
        const bottom = 35
        expect(checkValid(angle, head, bottom, column)).toBe(false)
    })
})
describe('noOverLap', () => {
    const shipPositions = [[1,2,3,4,5], [67, 77, 87, 97]]
    test('no overlap: return true', () => {
        const position = [6,7,8]
        expect(noOverLap(position, shipPositions)).toBe(true)
    })
    test('overlap: return false', () => {
        const position = [47, 57, 67, 77]
        expect(noOverLap(position, shipPositions)).toBe(false)

    })
})
describe('getShipPosition', () => {
    const column = 10
    test('horizontal ship', () => {
        const shipLength = 4
        const head = 65
        const bottom = 68
        expect(getShipPosition(shipLength, head, bottom, column).toString()).toBe([65,66,67,68].toString())
    })
    test('vertical ship', () => {
        const shipLength = 5
        const head = 29
        const bottom = 69
        expect(getShipPosition(shipLength, head, bottom, column).toString()).toBe([29, 39, 49, 59, 69].toString())
    })

})
describe('getOrigin', () => {
    let currentCell, angle, cursorPosition, origin
    const column = 10
    test('angle=0', () => {
        currentCell = 17 
        angle = 0 
        cursorPosition = 0.3
        origin = 2
        expect(getOrigin(currentCell, angle, cursorPosition, origin, column)).toBe(19)
    })
    test('angle=90', () => {
        currentCell = 2
        angle = 90
        cursorPosition = 0.12
        origin = 1
        expect(getOrigin(currentCell, angle, cursorPosition, origin, column)).toBe(12)
    })
})
describe('getHeadBottom', () => {
    let angle, originCell
    const shipLength = 4
    const column = 10 
    test('angle:0', () => {
        angle = 0
        originCell = 35
        expect(getHeadBottom(originCell, angle, shipLength, column).toString()).toBe([33, 36].toString())
    })
    test('angle:90', () => {
        angle = 90
        originCell = 50
        expect(getHeadBottom(originCell, angle, shipLength, column).toString()).toBe([30, 60].toString())
        
    })
})
describe('player', () => {
    
})