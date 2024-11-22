/**
 创建一个新对象并关联原型。
执行构造函数并绑定 this。
初始化新对象的属性。
返回新对象或显式返回的对象。
 * 
 * 
 * 
 * 
 * 
 * 
 * 

 *  */
function Person(name, age) {
  this.name = name
  this.age = age
  return { greeting: 'Hello' }
}

// 创建空对象
// 将空对象的原型指向构造函数的原型
// 将空对象作为构造函数的上下文
// 对构造函数的返回值进行判断
function myNew(fn, ...args) {
  // 创建空对象
  let obj = {}
  // 将空对象的原型指向构造函数的原型
  Object.setPrototypeOf(obj, fn.prototype)
  // 绑定this 将空对象作为构造函数的上下文
  let result = fn.apply(obj, args)
  // 相当于执行：
  // obj.name = 'Alice';
  // obj.age = 12;
  // obj.greet = function () { ... };
  // 对构造函数的返回值进行判断
  return result instanceof Object ? result : obj
}
const person = myNew(Person, 'Alice', 12)
console.log('per', person)
