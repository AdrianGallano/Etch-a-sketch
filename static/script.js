const buttons = document.getElementById("button-container").children
const colorButton = buttons[0]
const randomButton = buttons[1]
const clearButton = buttons[2]
const eraserButton = buttons[3]
const sliderButton = buttons[4] 
const sliderLabel = buttons[5]
const grid = document.getElementById("grid-container")
let gridSize = sliderButton.value;
let currentColor = colorButton.value;
let mouseDown = false;

const addGrid = (size) => {
    for(let i = 0; i < size; i++){
        let rowRef = addRow()
        for(let j = 0; j < size; j++){
            let colRef = addColumn()
            rowRef.append(colRef)
        }
    }
}

const addRow = () => {
    let row = document.createElement("div")
    row.className = "row"
    grid.append(row)

    return row
}

const addColumn = () => {
    let col = document.createElement("div")
    col.className = "column"

    return col
}

const clearGrid = () => {
    for(let rows of grid.children){
        for(let cell of rows.children){
            cell.style.backgroundColor = "transparent"
        }
    }
}

const removeGrid = () => {
    grid.innerHTML =""
}

grid.addEventListener("mousedown", (e) => {
    e.target.style.backgroundColor = currentColor
    mouseDown = true
})

grid.addEventListener("mousemove", (e) => {
    if(mouseDown){
        e.target.style.backgroundColor = currentColor
    }
})

window.addEventListener("mouseup", (e) => {
    mouseDown = false
})

colorButton.addEventListener("input", (e) => {
    currentColor = e.target.value
})

clearButton.addEventListener("click", (e) => {
    clearGrid()
})

eraserButton.addEventListener("click", () =>{
    currentColor = "#f2f2f2"
    colorButton.value = currentColor
})

sliderButton.addEventListener("input", (e) => {
    sliderLabel.textContent = `${e.target.value}x${e.target.value}`
    gridSize = e.target.value
    removeGrid()
    addGrid(gridSize)
})

randomButton.addEventListener("click", (e) => {
    let r = Math.floor(Math.random() * 256).toString(16)
    let g = Math.floor(Math.random() * 256).toString(16)
    let b = Math.floor(Math.random() * 256).toString(16)

    if(r.length === 1) r = "0" + r 
    if(g.length === 1) g = "0" + g 
    if(b.length === 1) b = "0" + b 
    
    currentColor = `#${r}${g}${b}`
    colorButton.value = currentColor
})


const start = () => {
    addGrid(gridSize)
}

start()