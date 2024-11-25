// Function.prototype.mycall = function (ctx, ...args) {
//   ctx == null || ctx == undefined ? globalThis : Object(ctx)
//   const key = Symbol()
//   // Object.defineProperty(ctx, key, {
//   //   value: this,
//   //   enumerable: false
//   // })
//   Object.defineProperty(ctx, key, {
//     value: this,
//     enumerable: false
//   })
//   const r = ctx[key](...args)
//   delete ctx[key]
//   return r
// }
// function method(a, b) {
//   console.log('args:', a, b)
//   console.log('this:', this)
// }
// method.mycall(1, 2, 3)

Function.prototype.mycall = function (ctx, ...args) {
  // If ctx is null or undefined, default to globalThis (or window in browsers)
  // ctx = ctx == null ? globalThis : Object(ctx)
  ctx = ctx || globalThis

  const key = Symbol()

  // Define a property on ctx with the function as its value
  // Object.defineProperty(ctx, key, {
  //   value: this,
  //   enumerable: false
  // })
  ctx[key] = this

  // Call the function with the specified context and arguments
  const result = ctx[key](...args)

  // Delete the temporary property added to ctx
  delete ctx[key]

  return result
}

function method(a, b) {
  console.log('args:', a, b)
  console.log('this:', this)
}

// Example usage:
method.mycall(1, 2, 3)

/**
 * 当第一次点击的时候，使用time 去记录定时器，如果不使用闭包去暂存他的话，下次点击，会重新创建一个函数，也就是一个新的定时器，他们两个不是互通的，没有引用去做连通，
 * 也就是我们使用闭包的时候，他不会在内存中消失，在下一次调用的时候，就能获取到下一次定时器的时间，防抖就是为了获取上一次时间
 * 放在内存中不消失，这是我们一个可预期的一个情况，我们就是为了用他的这个特性。我们要及时把这些变量进行指控，防止内存过多，内存爆照
 *
 * 缺点就是可能会导致内存泄漏，
 *
 * 垃圾回收机制： 标记清除算法，引用计数算法，新生代 ，老生代
 *
 *
 * 还有一写，闭包的应用： 函数颗粒化，vue 响应式原理，hooks， 常见的一些数组方法，map，filter, reduce, forEach
 */
