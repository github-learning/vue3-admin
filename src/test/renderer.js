class CanvasRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.data = options.data || []
    this.batchSize = options.batchSize || 10000
    this.currentBatch = 0
    this.offscreenCanvas = document.createElement('canvas')
    this.offscreenCanvas.width = canvas.width
    this.offscreenCanvas.height = canvas.height
    this.offscreenCtx = this.offscreenCanvas.getContext('2d')
    this.isRendering = false
  }

  // 设置数据
  setData(data) {
    this.data = data
    this.currentBatch = 0
    this.isRendering = false
  }

  // 开始渲染
  startRender() {
    this.isRendering = true
    this.renderNextBatch()
  }

  // 停止渲染
  stopRender() {
    this.isRendering = false
  }

  // 渲染单个批次的数据
  renderNextBatch() {
    if (!this.isRendering) return

    const start = this.currentBatch * this.batchSize
    const end = Math.min(
      (this.currentBatch + 1) * this.batchSize,
      this.data.length
    )

    for (let i = start; i < end; i++) {
      const point = this.data[i]
      this.offscreenCtx.fillRect(point.x, point.y, 1, 1) // 绘制一个像素点
    }

    // 把离屏内容绘制到主画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.offscreenCanvas, 0, 0)

    this.currentBatch++

    if (this.currentBatch * this.batchSize < this.data.length) {
      requestAnimationFrame(() => this.renderNextBatch()) // 继续渲染下一批
    } else {
      this.isRendering = false
    }
  }
}

// 获取Canvas元素
const canvas = document.getElementById('canvas')

// 创建Canvas渲染引擎实例
const renderer = new CanvasRenderer(canvas, { batchSize: 10000 })

// 模拟生成1000万个数据点
const data = Array.from({ length: 1000000 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height
}))

// 设置数据
renderer.setData(data)

// 启动渲染
document.getElementById('startBtn').addEventListener('click', () => {
  renderer.startRender()
})

// 停止渲染
document.getElementById('stopBtn').addEventListener('click', () => {
  renderer.stopRender()
})
