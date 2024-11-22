// let obj = {
//   name: 'ww',
//   age: 12
// }
// Function.prototype.myBind = function (context, ...args) {
//   let fn = this
//   return function (...newArgs) {
//     return this instanceof fn
//       ? new fn(...args, ...newArgs)
//       : fn.apply(context, [...args, ...newArgs])
//   }
// }

// function test(name) {
//   this.name = name
//   console.log('this', this)
// }

// let newF = test.myBind(obj)

// // newF('11')
// new newF('11')
