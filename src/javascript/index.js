import { game } from "./game"
import { dom } from "./dom"
import "./../style/default.css"
import "./../style/placeship.css"
import "./../style/play.css"
window.addEventListener('load', () => {
    const column = 10
    const shipSizes = [5,4,3,3,2]
    const boardSize = 500
    
    const welcome = document.getElementById('welcome')
    dom.display(welcome)
    function start() {
        dom.disappear(welcome)
        dom.prepareBeforePlay(column, shipSizes, boardSize)
        game.play(column, shipSizes)
    }
    welcome.querySelector('button').addEventListener('click', start)
    document.getElementById('restart').addEventListener('click', () => {

        dom.reset()
        start()   
    })
})