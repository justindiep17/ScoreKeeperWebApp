let players = []
const addPlayerBtn = document.querySelector('#add-player-btn')
const scoreboard = document.querySelector('#scoreboard')

class Player {
  constructor(name, id) {
    this.name = name
    this.score = 0
    this.id = id
  }
}


// Find The Index Of The Player In 'players' With The ID 'id'
function findPlayersIndex(id) {
  let index = -1
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === id) {
      index = i
    }
  }
  return index
}

// Returns A Function That Sets The Name Of The Player In 'players' With The ID 'id' To Match The Name In Input Field
function createSetNameFunc(id, input) {
  let f = () => {
    const index = findPlayersIndex(id)
    players[index].name = input.value
  }
  return f
}

// Returns A Function That Adds 1 Point To The Player With ID 'id'
function createAddPtsFunc(id) {
  let f = () => {
    const index = findPlayersIndex(id)
    if (!(players[index].score >= 999)) {
      players[index].score++
      // Update The Score Visually
      const ptsDisplay = document.querySelector(`#scorecard${id} .pts-label`)
      ptsDisplay.innerHTML = `${players[index].score}`
    }
  }
  return f
}

// Returns A Function That Subtracts 1 Point To The Player With ID 'id'
function createSubPtsFunc(id) {
  let f = () => {
    const index = findPlayersIndex(id)
    if (!(players[index].score <= 0)) {
      players[index].score--
      // Update The Score Visually
      const ptsDisplay = document.querySelector(`#scorecard${id} .pts-label`)
      ptsDisplay.innerHTML = `${players[index].score}`
    }
  }
  return f
}

// Returns A Function That Removes The Player With ID 'id' From 'players'. Also Removes 'player's Corresponding Scorecard
function createRemovePlayerFunc(id) {
  let f = () => {
    const index = findPlayersIndex(id)
    players.splice(index, 1)
    const scorecard = document.querySelector(`#scorecard${id}`)
    scorecard.parentElement.remove()
    if (players.length < 6) {
      addPlayerBtn.style.display = "flex"
      addPlayerBtn.parentElement.style.display = "inline-block"
    }
  }
  return f
}

// Creates An HTML Object Representing The Scorecard For 'player'
function createScoreCard(player) {
  let scoreCard = document.createElement("div")
  scoreCard.classList.add("col-md-2")
  const removePlayerBtnID = `remove-player-btn-${player.id}`
  scoreCard.innerHTML =
    `<div class="scorecard" id="scorecard${player.id}">
    <input type="text" placeholder="${player.name}" class="name-lbl">
  <p class="pts-label">${player.score}</p>
  <div class="scoreboard-btns row">
  <a class="btn btn-danger col-6">-</a>
  <a class="btn btn-success col-6">+</a>
  <a class="btn btn-dark col-12 remove-player-btn" id="${removePlayerBtnID}">REMOVE PLAYER</a>
  </div>
  </div>`
  return scoreCard
}

// Calculates A Unique Available ID Between (1-6) For A New Player To Use
function calcNewId(id) {
  for (let player of players) {
    if (player.id === id) {
      return calcNewId(id + 1)
    }
  }
  return id
}

// Adds a New Player To 'players' And Produces A New Scorecard On The Website Display
function addPlayer() {
  // Calculates The Available ID From (1-6) To Use For
  const id = calcNewId(1)
  const name = `Player ${id}`
  const newPlayer = new Player(name, id)
  // Append newPlayer Onto The List of Players
  players.push(newPlayer)
  // Create A New Corresponding Scorecard For newPlayer
  scoreboard.insertBefore(createScoreCard(newPlayer), scoreboard.childNodes[0])
  // Add An Event Listener That Will Delete 'player' When The Delete Player Button Is Clicked On 'player's Scorecard
  const removeBtn = document.querySelector(`#remove-player-btn-${id}`)
  removeBtn.addEventListener('click', createRemovePlayerFunc(id))
  // Add Event Listeners That Will Add A Point Or Subtract A Point When The Corresponding Button Is Clicked
  const addPtBtn = document.querySelector(`#scorecard${id} .btn-success`)
  addPtBtn.addEventListener('click', createAddPtsFunc(id))
  const subPtBtn = document.querySelector(`#scorecard${id} .btn-danger`)
  subPtBtn.addEventListener('click', createSubPtsFunc(id))
  // Add Event Listener For Name Input
  const nameInput = document.querySelector(`#scorecard${id} .name-lbl`)
  nameInput.addEventListener('blur', createSetNameFunc(id, nameInput))
  // If There Is Already 6 Players On The Scoreboard Disable The addPlayerBtn
  if (players.length >= 6) {
    addPlayerBtn.style.display = "none"
    addPlayerBtn.parentElement.style.display = "none"
  }
}



addPlayerBtn.addEventListener('click', addPlayer)
