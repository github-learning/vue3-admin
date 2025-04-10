// 红包对象
interface RedPacket {
  x: number
  y: number
  speed: number
  rotation: number
  scale: number
  isClicked: boolean
}

class RedPacketRain {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private packets: RedPacket[] = []
  private animationId: number | null = null

  constructor() {
    this.canvas = document.getElementById('redPacketRain') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')!
    this.resizeCanvas()
    window.addEventListener('resize', this.resizeCanvas.bind(this))
    this.canvas.addEventListener('click', this.handleClick.bind(this))
  }

  // 初始化 Canvas 尺寸
  private resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  // 创建红包
  private createPacket() {
    this.packets.push({
      x: Math.random() * this.canvas.width,
      y: -50,
      speed: 2 + Math.random() * 3,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
      isClicked: false
    })
  }

  // 绘制单个红包
  private drawPacket(packet: RedPacket) {
    this.ctx.save()
    this.ctx.translate(packet.x, packet.y)
    this.ctx.rotate((packet.rotation * Math.PI) / 180)
    this.ctx.scale(packet.scale, packet.scale)

    // 绘制红包（简化版，实际可替换为图片）
    this.ctx.fillStyle = '#E74C3C'
    this.ctx.fillRect(-30, -40, 60, 80)
    this.ctx.fillStyle = '#F1C40F'
    this.ctx.font = 'bold 20px Arial'
    this.ctx.fillText('福', -10, 5)

    this.ctx.restore()
  }

  // 点击事件处理
  private handleClick(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    this.packets.forEach((packet) => {
      if (
        !packet.isClicked &&
        x > packet.x - 30 &&
        x < packet.x + 30 &&
        y > packet.y - 40 &&
        y < packet.y + 40
      ) {
        packet.isClicked = true
        this.explodePacket(packet)
        // 通知 Native 端
        // if (window.NativeBridge) {
        //   window.NativeBridge.onRedPacketClick()
        // }
      }
    })
  }

  // 红包爆炸效果
  private explodePacket(packet: RedPacket) {
    // 实现粒子爆炸动画（略）
  }

  // 动画循环
  private update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // 生成新红包
    if (Math.random() < 0.05) {
      this.createPacket()
    }

    // 更新红包位置
    this.packets.forEach((packet) => {
      if (!packet.isClicked) {
        packet.y += packet.speed
        packet.rotation += 1
      }
      this.drawPacket(packet)
    })

    // 移除屏幕外的红包
    this.packets = this.packets.filter((p) => p.y < this.canvas.height + 100)

    this.animationId = requestAnimationFrame(this.update.bind(this))
  }

  // 启动动画
  public start() {
    this.update()
  }

  // 停止动画
  public stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }
}

// 初始化
const redPacketRain = new RedPacketRain()
redPacketRain.start()
