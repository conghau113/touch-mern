import { useLayoutEffect } from 'react'

export default function PrimaryGrowingNodeEffect() {
  useLayoutEffect(() => {
    let nodes: any[] = []

    // total number of nodes used (incremented after creation)
    let NODES_QTY = 0

    // how close next node must be to activate connection (in px)
    // shorter distance == better connection (line width)
    const SENSITIVITY = 100

    // note that siblings limit is not 'accurate' as the node can actually have more connections than this value that's because the node accepts sibling nodes with no regard to their current connections this is acceptable because potential fix would not result in significant visual difference
    // more siblings == bigger node
    const SIBLINGS_LIMIT = 10

    // default node margin
    const DENSITY = 50

    // avoid nodes spreading
    const ANCHOR_LENGTH = 20

    // highlight radius
    const MOUSE_RADIUS = 100

    const circ = 2 * Math.PI

    const canvas = document.querySelector('canvas.growing-node') as HTMLCanvasElement

    if (canvas) {
      resizeWindow()
      const mouse = {
        x: -100,
        y: -100,
      }
      const ctx = canvas.getContext('2d')

      class Node {
        anchorX
        anchorY
        x
        y
        vx
        vy
        energy
        radius
        siblings: any[]
        brightness

        constructor(x: number, y: number) {
          this.anchorX = x
          this.anchorY = y
          this.x = Math.random() * (x - (x - ANCHOR_LENGTH)) + (x - ANCHOR_LENGTH)
          this.y = Math.random() * (y - (y - ANCHOR_LENGTH)) + (y - ANCHOR_LENGTH)
          this.vx = Math.random() * 2 - 2
          this.vy = Math.random() * 2 - 2
          this.energy = Math.random() * 100
          this.radius = Math.random()
          this.siblings = []
          this.brightness = 0
        }

        drawNode() {}
        drawConnections() {}
        moveNode() {}
      }

      Node.prototype.drawNode = function () {
        if (ctx) {
          const color = `rgba(255, 255, 255, ${this.brightness})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, 2 * this.radius + (2 * this.siblings.length) / SIBLINGS_LIMIT, 0, circ)
          ctx.fillStyle = color
          ctx.fill()
        }
      }

      Node.prototype.drawConnections = function () {
        if (ctx) {
          for (let i = 0; i < this.siblings.length; i++) {
            const color = `rgba(255, 255, 255, ${this.brightness})`
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.siblings[i].x, this.siblings[i].y)
            ctx.lineWidth = 1 - calcDistance(this, this.siblings[i]) / SENSITIVITY
            ctx.strokeStyle = color
            ctx.stroke()
          }
        }
      }

      Node.prototype.moveNode = function () {
        this.energy -= 2
        if (this.energy < 1) {
          this.energy = Math.random() * 100
          if (this.x - this.anchorX < -ANCHOR_LENGTH) {
            this.vx = Math.random() * 2
          } else if (this.x - this.anchorX > ANCHOR_LENGTH) {
            this.vx = Math.random() * -2
          } else {
            this.vx = Math.random() * 4 - 2
          }
          if (this.y - this.anchorY < -ANCHOR_LENGTH) {
            this.vy = Math.random() * 2
          } else if (this.y - this.anchorY > ANCHOR_LENGTH) {
            this.vy = Math.random() * -2
          } else {
            this.vy = Math.random() * 4 - 2
          }
        }
        this.x += (this.vx * this.energy) / 100
        this.y += (this.vy * this.energy) / 100
      }

      function initNodes() {
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          nodes = []
          for (let i = DENSITY; i < canvas.width; i += DENSITY) {
            for (let j = DENSITY; j < canvas.height; j += DENSITY) {
              nodes.push(new Node(i, j))
              NODES_QTY++
            }
          }
        }
      }

      function calcDistance(node1: any, node2: any) {
        if (node1 && node2) {
          return Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2))
        }
        return 0
      }

      function findSiblings() {
        let node1, node2, distance
        for (let i = 0; i < NODES_QTY; i++) {
          node1 = nodes[i]
          if (node1) {
            node1.siblings = []
            for (let j = 0; j < NODES_QTY; j++) {
              node2 = nodes[j]
              if (node1 !== node2) {
                distance = calcDistance(node1, node2)
                if (distance < SENSITIVITY) {
                  if (node1.siblings.length < SIBLINGS_LIMIT) {
                    node1.siblings.push(node2)
                  } else {
                    let maxDistance = 0
                    let nodeSiblingDistance = 0
                    let s
                    for (let k = 0; k < SIBLINGS_LIMIT; k++) {
                      nodeSiblingDistance = calcDistance(node1, node1.siblings[k])
                      if (nodeSiblingDistance > maxDistance) {
                        maxDistance = nodeSiblingDistance
                        s = k
                      }
                    }
                    if (distance < maxDistance) {
                      node1.siblings.splice(s, 1)
                      node1.siblings.push(node2)
                    }
                  }
                }
              }
            }
          }
        }
      }

      function redrawScene() {
        resizeWindow()
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        findSiblings()
        let i, node, distance
        for (i = 0; i < NODES_QTY; i++) {
          node = nodes[i]
          if (node) {
            distance = calcDistance(
              {
                x: mouse.x,
                y: mouse.y,
              },
              node,
            )
            if (distance < MOUSE_RADIUS) {
              node.brightness = 1 - distance / MOUSE_RADIUS
            } else {
              node.brightness = 0
            }
          }
        }
        for (i = 0; i < NODES_QTY; i++) {
          node = nodes[i]
          if (node) {
            if (node.brightness) {
              node.drawNode()
              node.drawConnections()
            }
            node.moveNode()
          }
        }
        window.requestAnimationFrame(redrawScene)
      }

      function initHandlers() {
        document.addEventListener('resize', resizeWindow, false)
        if (canvas) {
          canvas.addEventListener('mousemove', mousemoveHandler, false)
          canvas.addEventListener('mouseout', mouseoutHandler, false)
        }
      }

      function resizeWindow() {
        if (canvas) {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }
      }

      function mousemoveHandler(event: MouseEvent) {
        mouse.x = event.clientX
        mouse.y = event.clientY
      }

      function mouseoutHandler() {
        mouse.x = -100
        mouse.y = -100
      }

      initHandlers()
      initNodes()
      redrawScene()
    }

    return () => {
      nodes = []
    }
  }, [])

  return <></>
}
