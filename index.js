const canvas = document.querySelector('canvas')

const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio

const canvasWidth = innerWidth
const canvasHeight = innerHeight

canvas.style.width = canvasWidth + 'px'
canvas.style.height = canvasHeight + 'px'
canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
ctx.scale(dpr, dpr)

ctx.beginPath()
ctx.arc(100, 100, 50, 0, Math.PI / 180 * 360)
ctx.fillStyle = 'red'
ctx.fill()
ctx.closePath()


class Particle {
    constructor(x, y, radius, vy, acc) {
        this.x = x
        this.y = y
        this.radius = radius
        this.vy = vy
        this.acc = 1.03
    }

    update() {
        this.vy *= this.acc
        this.y += this.vy
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
        ctx.fillStyle = 'orange'
        ctx.fill()
        ctx.closePath()
    }
}

const x = 100
const y = 100
const radius = 50
const particle = new Particle(x, y, radius)
const TOTAL = 20

const randomNumBetween = (min, max) => {
    return Math.random() * (max - min + 1) + min
}

let particles = []

for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth)
    const y = randomNumBetween(0, canvasHeight)
    const radius = randomNumBetween(50, 100)
    const vy = randomNumBetween(1, 5)
    const particle = new Particle(x, y, radius, vy)
    particles.push(particle)
}

let interval = 1000 / 60 //60fps
let now, delta
let then = Date.now()

function animate() {
    window.requestAnimationFrame(animate)
    now = Date.now()
    delta = now - then

    if (delta < interval) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    particles.map(particle => {
        particle.update()
        particle.draw()

        if (particle.y - particle.radius > canvasHeight) {
            particle.y = -particle.radius
            particle.x = randomNumBetween(0, canvasWidth)
            particle.radius = randomNumBetween(50, 100)
            particle.vy = randomNumBetween(1, 5)
        }
    })


    then = now - (delta % interval) //60fps
}

animate()