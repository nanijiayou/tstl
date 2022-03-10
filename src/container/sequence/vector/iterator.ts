/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:41
 * @LastEditTime: 2022-03-10 23:24:15
 * @LastEditors: hzheyuan
 * @Description: vector容器迭代器
 * @FilePath: /tstl/src/container/sequence/vector/iterator.ts
 */
// import { Iterator } from '../../../Iterator/index'
import { TSTLIterator } from '@/Iterator/Iterator'

export class VCIterator<T> implements TSTLIterator<T> {
  _cur: number
  _cntr: Array<T>

  constructor(c, cntr: Array<T>) {
    this._cur = c
    this._cntr = cntr
    // return new Proxy(this, {
    //   get: function (target, prop, receiver) {
    //     console.log('get', target, prop, Reflect.has(target, prop), receiver);
    //     if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)
    //   },
    //   set: function (target, prop, value, receiver) {
    //     console.log(`set: `, target, prop, value, Reflect.has(target, prop));
    //     // if(prop === 'cur') {
    //     //   target.cur =  value
    //     // } else
    //     if(prop !== 'cur' && Reflect.has(target, prop)) {
    //       Reflect.set(target, prop, value, receiver);
    //       return true
    //     } else {
    //       target._cur = value;
    //       return true
    //     }
    //     return true
    //   }
    // })
  }

  // valueOf() {
  //   return this._cur
  // }

  private get cur() {
    return this._cur
  }

  private set cur(val) {
    this._cur = val
  }

  private get cntr() {
    return this._cntr
  }

  /**
   * @description: return index
   * @param {*}
   * @return {*}
   */  
  getKey() {
    return this.cur
  }

  /**
   * @description: get element value(same as get)
   * @return {*}
   */
  value = (): T | boolean => {
    return this.hasNext() ? this.cntr[this.cur] : false
  }

  /**
   * @description: get element value(same as get)
   * @return {*}
   */
  getValue = ():T => {
    return this.cntr[this.cur]
  }

  /**
   * @description: access node (vector no need this method)
   * @param {*}
   * @return {*}
   */
  getNode(): number {
    return this.cur
  }

  /**
   * @description: test whether has next element (like jdk hasnext method)
   */
  hasNext(): boolean {
    return this.cur !== this.cntr.length
  }

  /**
   * @description: same with has next (like jdk hasnext method)
   */
  done(): boolean {
    return !this.hasNext()
  }

  /**
   * @description: 迭代器前移接口
   * @param {*}
   * @return {*}
   */
  prev() {
    this.decrement()
    return this._cntr[this.cur]
  }

  /**
   * @description: js迭代协议规定的next方法
   * @param {*}
   * @return {*}
   */
  public next(): T {
    this.cur++
    return this.cntr[this.cur]
    // return new VCIterator(++this.cur, this._cntr)
  }

  /**
   * @description: 迭代器
   * @param {*}
   * @return {*}
   */
  [Symbol.iterator](): Iterator<T> {
    return {
      next: () => {
        if (this.hasNext()) {
          let node = { done: false, value: this.getValue() }
          this.increment()
          return node
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }

  /**
   * @description: 迭代器后移，具体实现
   * @param {*}
   * @return {*}
   */
  private increment(): void {
    this.cur++
  }

  /**
   * @description: 迭代器前移具体实现
   * @param {*}
   * @return {*}
   */
  private decrement(): void {
    this.cur--
  }

  /**
   * @description: 两个迭代器之间的距离
   * @param {*} begin
   * @param {*} end
   * @return {*}
   */
  static distance(begin, end) {
    let f = begin.getNode(), l = end.getNode()
    return l - f
  }

  remove() { }
}
