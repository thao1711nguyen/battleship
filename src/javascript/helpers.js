
export function getOrigin(currentCell, angle, cursorPosition, origin, column) {
    const distance = -Math.floor(cursorPosition) + Math.floor(origin)
    if(angle === 0) {
      return currentCell + distance
    } else {
     return (Math.floor(currentCell/column) + distance)*column + (currentCell % column)
    }
}
export function getHeadBottom(originCell, angle,  shipLength, column) {
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
export function checkValid(angle, head, bottom, column) {
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
export function noOverLap(position, collection) {
    
    return (collection.flat().every((item) => !position.includes(item)))
}
export function getShipPosition(shipLength, head, bottom, column) {
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

