window.addEventListener('load', function (ev) {
  const field = createRandomField(64, 64)
  document.body.appendChild(createFieldEl(field))
})

function createRandomField(w, h) {
  let ar = []
  for (let j = 0; j < h; j++) {
    ar.push([])
    for (let i = 0; i < w; i++) {
      ar[j].push(Math.random() > 0.5 ? true : false)
    }
  }
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
