import { player, computer } from "./data"
import { dom } from "./dom"
export const game = (() => {
    
    function gameOver(board) {
        return board.isAllSunk()
    }
    async function play(column, shipSizes) {
        const player1 = player('human')
        const ai = computer('computer')
        // display player's board for him/her to place their ships
        const playerShipPlacement = await dom.placeship(column)
        player1.board.placeship(playerShipPlacement)
        const aiShipPlacement = ai.placeship(column, shipSizes)
        ai.board.placeship(aiShipPlacement)
        // display playDiv
        const playDiv = document.getElementById('play')
        dom.display(playDiv)
        // display both boards for player to keep track of the game
        dom.prepareBoards()
        const players = [player1, ai]
        while(true) {
            let attack, result, i
            for(let idx=0; idx < players.length; idx++) {
                if(players[idx].name == 'human') {
                    attack = await dom.attack()
                } else {
                    attack = players[idx].hit()
                }
                idx == 0 ? i =1 : i = 0
                result = players[i].board.receiveAttack(attack)
                if(players[idx].name == 'computer') {
                    players[idx].modState(result, attack)
                }
                if(players[idx].name == 'human') {
                    dom.displayAttack('computer', attack, result)
                } else {
                    dom.displayAttack('player', attack, result)
                }
                if(gameOver(players[i].board)) {
                    dom.displayFinale(players[idx].name)
                    return 
                } 
            }
            
            

        }
    }
    return { play }
})()