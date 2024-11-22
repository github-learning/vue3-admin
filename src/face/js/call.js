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
  ctx = ctx == null ? globalThis : Object(ctx)

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
