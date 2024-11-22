/**
 * 1, 每个函数都会有一个prototype，称之为原型
 *
 * prototype 是一个对象，所以又被称之为原型对象
 *
 * 1。 存放一些属性和方法, 可以共享给实例对象
 * 2.  可以通过原型 实现继承
 * 通过构造函数 生成实例，这些实例就可以使用prototype
 * 为什么实例可以使用原型上的方法
 *
 * __proto__ 每个对象都有一个 __proto__  ：指向他的原型对象
 *
 * 对象.__prorotype === Array.prorotype  // setProtoyeOf
 *
 *
 *
 *
 *
 *
 *
 */

let arr = []
arr.shift()
console.log(arr.__proto__ === Array.prototype) // true
console.log(Array.prototype.__proto__ === Object.prototype) // true
console.log(Object.prototype.__proto__) // null
