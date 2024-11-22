class EventEmitter {
  constructor() {
    this.events = {}
  }
  // 注册监听器
  on(eventName, listener) {
    // 如果没有该事件注册过，则初始化一个空数组
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    // 将事件监听田间到事件队列
    this.events[eventName].push(listener)
    console.log('this.events', this.events)
  }

  // 触发事件，调用所有的监听器
  emit(eventName, ...args) {
    // 如果没有这个事件，直接返回
    if (!this.events[eventName]) return

    // 触发所有监听器
    this.events[eventName].forEach((listener) => {
      listener(...args)
    })
  }

  // 注销事件监听
  // off(eventName, listener) {
  //   // 如果没有这个事件，直接返回
  //   if (!this.events[eventName]) return
  //   // 从事件队列中移除指定的监视器
  //   this.events[eventName] = this.events[eventName].filter((fn) => fn !== listener)
  // }
  off(eventName, listener) {
    if (eventName && listener) {
      this.events[eventName] = this.events[eventName].filter(
        (fn) => fn !== listener
      )
    } else if (eventName) {
      delete this.events[eventName]
    } else {
      this.events = {}
    }
  }

  // 注册只会触发一次的事件监听器
  once(event, listener) {
    // 创建一个包装函数，监听触发后自动移除
    // const onceListener = (...args) => {
    //   listener(...args)
    //   this.off(event, onceListener)
    // }
    // 调用on 进行注册
    this.on(event, listener)
  }
}
const eventBus = new EventEmitter()
// 创建一个回调函数
const handleEvent = (data) => {
  console.log('事件被触发，数据:', data)
}
// 注册事件监听器
eventBus.on('event1', handleEvent)

// 触发
eventBus.emit('event1', { data: { list: [1, 2, 4] } })
eventBus.off('event1', handleEvent)
// 触发事件，事件监听器不会被调用了
eventBus.emit('event1', { data: 'some data' }) // 控制台没有输出
