const connectFourBuilder = (col, rows, startPlayer = 'o') => {

    //create 2d array and fill it with .
    const gird = []
    for (let i = 0; i < rows; i++) {
        gird.push(new Array(col).fill().map(()=>'.'))
    }

    //private variables and methods
    let finished = false
    let currentPlayer = startPlayer
    let winnerPlayer
    const playerTurn = (player) => (player === 'o') ? 'x' : 'o'

    const nodeTraversal = (colNumber, colOperation, rowNumber, rowOperation) => {
        //add safe guard to avoid infinit recursion
        const col = colOperation(colNumber)
        const row = rowOperation(rowNumber)
        if (gird?.[row]?.[col] === currentPlayer) {
            return nodeTraversal(col, colOperation, row, rowOperation) + 1;
        }
        return 0
    }

    const winner = (colNumber, rowNumber) => {
      //todo better naming plus add dir
        const rowResult =
          1 + nodeTraversal(colNumber, (col) => col -1 , rowNumber, (row) => row) + nodeTraversal(colNumber, (col) => col +1, rowNumber, (row) => row)
        const colResult =
          1 + nodeTraversal(colNumber, (col) => col, rowNumber, (row) => row + 1)
        const x =
          1 + nodeTraversal(colNumber, (col) => col + 1, rowNumber, (row) => row - 1) + nodeTraversal(colNumber, (col) => col - 1, rowNumber, (row) => row + 1)
        const y =
          1 + nodeTraversal(colNumber, (col) => col + 1, rowNumber, (row) => row + 1) + nodeTraversal(colNumber, (col) => col - 1, rowNumber, (row) => row - 1)

        return rowResult == 4 || colResult == 4 || x == 4 || y == 4
    }

    return {
        add: (colNumber) => {
            if(finished) return {msg: `Game finished and player ${winnerPlayer} already won`, finished, winnerPlayer}
            //todo add validation
            let rowNumber
            for (let i = rows -1; i > -1; i--) {
                if(gird[i][colNumber] === '.'){
                    gird[i][colNumber] = currentPlayer
                    rowNumber = i
                    break;
                }
            }
            const winnerResult = winner(colNumber, rowNumber)
            if(winnerResult){
              winnerPlayer = currentPlayer
              finished = true
              return {msg: `Player ${winnerPlayer} is winner`, finished, winnerPlayer }
            }

            currentPlayer = playerTurn(currentPlayer)
            return {msg: `Player ${currentPlayer} turn`, finished, winnerPlayer }

        }
    }
}

//testing
const connectFour = connectFourBuilder(6, 7)
connectFour.add(0)
connectFour.add(1)
connectFour.add(2)
connectFour.add(3)
connectFour.add(4)
connectFour.add(5)
connectFour.add(6)
connectFour.add(0)
connectFour.add(1)
connectFour.add(2)
connectFour.add(3)
connectFour.add(4)
connectFour.add(5)
connectFour.add(6)
connectFour.add(0)
connectFour.add(1)
connectFour.add(2)
connectFour.add(3)
connectFour.add(4)
const resOne = connectFour.add(5)
console.log(`resOne =>>>> ${JSON.stringify(resOne)}`)
const resTwo = connectFour.add(6)
console.log(`resTwo =>>>> ${JSON.stringify(resTwo)}`)
const resThree = connectFour.add(0)
console.log(`resThree =>>>> ${JSON.stringify(resThree)}`)
connectFour.add(1)
connectFour.add(2)
connectFour.add(3)
connectFour.add(4)
const resFour = connectFour.add(5)
console.log(`resFour =>>>> ${JSON.stringify(resFour)}`)
connectFour.add(6)
const resFive = connectFour.add(6)
console.log(`resFive =>>>> ${JSON.stringify(resFive)}`)
const resSix = connectFour.add(1)
console.log(`resSix =>>>> ${JSON.stringify(resSix)}`)

