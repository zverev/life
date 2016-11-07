let field = createGliderField(64, 64)

window.addEventListener('load', function (ev) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  setInterval(() => {
    field = turn(field)
    refresh()
  }, 100)

  function refresh() {
    container.innerHTML = ''
    container.appendChild(createFieldEl(field))
  }
})

function turn(field) {
  return field.map((row, j) => {
    return row.map((cell, i) => cellLogic(cell, getNeighboursNumber(field, j, i)))
  })
}

function cellLogic(isAlive, nNeighbours) {
  if (isAlive) {
    if (nNeighbours == 2 || nNeighbours == 3) {
      return true
    } else {
      return false
    }
  } else {
    if (nNeighbours == 3) {
      return true
    } else {
      return false
    }
  }
}

function getNeighboursNumber(field, y, x) {
  let c = 0
  for (let j = y - 1; j < y + 2; j++) {
    for (let i = x - 1; i < x + 2; i++) {
      if (j != y || i != x) {
        c += (field[j] && field[j][i]) ? 1 : 0
      }
    }
  }
  return c
}

function createRandomField(w, h) {
  let ar = []
  for (let j = 0; j < h; j++) {
    ar.push([])
    for (let i = 0; i < w; i++) {
      ar[j].push(Math.random() > 0.96 ? true : false)
    }
  }
  return ar
}

function createGliderField(w, h) {
  let ar = []
  for (let j = 0; j < h; j++) {
    ar.push([])
    for (let i = 0; i < w; i++) {
      ar[j].push(false)
    }
  }
  ar[0][1] = true
  ar[1][2] = true
  ar[2][0] = true
  ar[2][1] = true
  ar[2][2] = true
  return ar
}

function createFieldEl(field) {
  let el = document.createElement('div')
  el.className = 'field'
  return field.reduce((fieldEl, row) => {
    return fieldEl.appendChild(createRowEl(row)), fieldEl
  }, el)
}

function createRowEl(row) {
  let el = document.createElement('div')
  el.className = 'row'
  return row.reduce((rowEl, cell) => {
    return rowEl.appendChild(createCellEl(cell)), rowEl
  }, el)
}

function createCellEl(cell) {
  let isActive = cell
  let el = document.createElement('div')
  el.className = `cell ${isActive ? 'cell_active' : ''}`
  return el
}
