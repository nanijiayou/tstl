/*
 * @Author: hzheyuan
 * @Date: 2022-03-08 21:17:38
 * @LastEditTime: 2022-03-23 13:31:35
 * @LastEditors: hzheyuan
 * @Description: deque(double ended queue)
 * deque is an irregular acronym of double-ended queue.
 * Double-ended queues are sequence containers with dynamic sizes that can be expanded or contracted on both ends (either its front or its back).
 *
 * Deque provide a functionality similar to vectors,
 * but with efficient insertion and deletion of elements also at the beginning of the sequence,
 * and not only at its end. But, unlike vectors, deques are not guaranteed to store all its elements
 * in contiguous storage locations: accessing elements in a deque by offsetting a pointer to another element causes undefined behavior.
 *
 * Both vectors and deques provide a very similar interface and can be used for similar purposes.
 *
 * For operations that involve frequent insertion or removals of elements at positions
 * other than the beginning or the end, deques perform worse
 * and have less consistent iterators and references than lists and forward lists.
 *
 * @FilePath: /tstl/src/container/sequence/deque/deque.ts
 */
// import { DequeIterator } from './iterator'
import { InputIterator, LinearIterator } from '../../../iterator'
import { TSTLIterable } from '../../../iterator/Iterable'

export class Deque<T> implements TSTLIterable<T> {
  // the container
  cntr

  // iternally iterator to begining
  start: number = 0

  // iternally iterator to end
  finish: number = 0

  /**
   * @description: Construct deque
   * Constructs a deque container object, initializing its contents depending on the constructor version used:
   *  (1) empty container constructor(default constructor): constructor an empty container, with no elements.
   *  (2) fill constructor: constructs a container with n elements. Each element is a copy of v.
   *  (3) range constructor: constructs a container with many elements as the range [first, last), in same order.
   *  (4) copy constructor: constructs a container with a copy of each elements in other deque, in same order.
   * @param {*}
   * @return {*}
   */
  public constructor()
  public constructor(length: number, v: T)
  public constructor(list: Deque<T>)
  public constructor(first: InputIterator<T>, last: InputIterator<T>)
  constructor(...args: any[]) {
    if (args.length === 0) {
      this.cntr = new Array()
    } else if (args.length === 1) {
      if (typeof args[0] === 'number') {
        this.cntr = new Array(args[0])
      } else {
        this.cntr = new Array(...args[0])
      }
    } else {
      if (typeof args[0] === 'number') {
        this.cntr = new Array(args[0], args[1])
      } else {
        this.cntr = this.assign(args[0], args[1])
      }
    }
  }

  /**
   * @description: return iterator to begining
   * @param {*}
   * @return {*}
   */
  begin() {
    return new LinearIterator<T>(0, this.cntr)
  }

  /**
   * @description: return iterator to end
   * @param {*}
   * @return {*}
   */
  end() {
    this.finish = this.cntr.length
    return new LinearIterator<T>(this.finish, this.cntr)
  }

  /**
   * @description: return const iterator to begining
   * @param {*}
   * @return {*}
   */
  cbegin() {}

  /**
   * @description: return const iterator to end
   * @param {*}
   * @return {*}
   */
  cend() {}

  /**
   * @description: return size
   * @param {*}
   * @return {*}
   */
  size(): number {
    return this.cntr.length
  }

  /**
   * @description: test whether container is empty
   * @param {*}
   * @return {*}
   */
  empty(): boolean {
    return this.cntr.length === 0
  }

  /**
   * @description: access element
   * @param {*}
   * @return {*}
   */
  at(x: number) {
    return this.cntr[x]
  }

  /**
   * @description: access first element
   * @param {*}
   * @return {*}
   */
  front() {
    return this.cntr[0]
  }

  /**
   * @description: access last element
   * @param {*}
   * @return {*}
   */
  back() {
    const len = this.cntr.length
    return this.cntr[len - 1]
  }

  /**
   * @description: access data
   * @param {*}
   * @return {*}
   */
  get data(): T[] {
    return this.cntr
  }

  /**
   * @description: set content data
   * @param {Array} x
   * @return {*}
   */
  set data(x: T[]) {
    this.cntr = x
  }

  /**
   * @description: add element at the end
   * @param {*}
   * @return {*}
   */
  push_back(v: T) {
    this.cntr.push(v)
  }

  /**
   * @description: insert element at begining
   * @param {*}
   * @return {*}
   */
  push_front(v: T) {
    this.cntr.unshift(v)
  }

  /**
   * @description: delete last element
   * @param {*}
   * @return {*}
   */
  pop_back() {
    this.cntr.pop()
  }

  /**
   * @description: delete first element
   * @param {*}
   * @return {*}
   */
  pop_front() {
    this.cntr.shift()
  }

  /**
   * @description: inset elemnts
   *
   * The vector is extended by inserting new elements before the element at the specified position,
   * effectively increasing the container size by the number of elements inserted.
   *
   * the method has 3 versions:
   * version 1: Position in the vector where the new elements are inserted.
   * version 2: Number of elements to insert. Each element is initialized to a copy of val.
   * version 3: Iterators specifying a range of elements.
   *
   * @param {*}
   * @return {*}
   */
  insert(pos: LinearIterator<T>, x: T | number | LinearIterator<T>, last?: T | LinearIterator<T>) {
    if (typeof x === 'number' && last) {
      this._insert_fill(pos, x, last as T)
    } else if (x instanceof LinearIterator && last instanceof LinearIterator) {
      this._insert_range(pos, x as LinearIterator<T>, last as LinearIterator<T>)
    } else {
      this._insert_pos(pos, x as T)
    }
  }

  /**
   * @description: insert at a specificed pos (internally implementation)
   * @param {LinearIterator} pos
   * @param {T} x
   * @return {*}
   */
  private _insert_pos(pos: LinearIterator<T>, val: T) {
    this.cntr.splice(pos.index, 0, val)
    this.finish++
  }

  /**
   * @description: Number of elements to insert. Each element is initialized to a copy of val (internally implementation)
   * @param {LinearIterator} pos
   * @param {number} n
   * @param {T} x
   * @return {*}
   */
  private _insert_fill(pos: LinearIterator<T>, n: number, val: T) {
    if (n !== 0) {
      const added = new Array<T>(n)
      added.fill(val)
      this.cntr.splice(pos.index, 0, ...added)
      this.finish += n
    }
  }

  /**
   * @description: Iterators specifying a range of elements.
   * Copies of the elements in the range [first,last) are inserted at position in the same order (internally implementation)
   * @param {LinearIterator} pos
   * @param {LinearIterator} first
   * @param {LinearIterator} last
   * @return {*}
   */
  private _insert_range(pos: LinearIterator<T>, first: LinearIterator<T>, last: LinearIterator<T>) {
    const added = new Array<T>()
    let cur = first,
      n = 0
    while (cur.hasNext() && cur.index !== last.index) {
      added.push(cur.getValue() as T)
      cur.next()
      n++
    }
    this.cntr.splice(pos.index, 0, ...added)
    this.finish += n
  }

  /**
   * @description: erase elements
   * Removes from the vector either a single element (position) or a range of elements ([first,last)).
   * @param {*}
   * @return {*}
   */
  erase(pos: LinearIterator<T>, last?: LinearIterator<T>) {
    if (!last) this._erase_position(pos)
    else this._erase_range(pos, last)
  }

  /**
   * @description: erase version(1) erase one element of a position(internally implementation)
   * @param {VCIterator} pos
   * @return {*}
   */
  private _erase_position(pos: LinearIterator<T>) {
    this.cntr.splice(pos.index, 1)
  }

  /**
   * @description:
   * @param {VCIterator} first
   * @param {VCIterator} last
   * @return {*}
   */
  private _erase_range(first: LinearIterator<T>, last: LinearIterator<T>) {
    const count = last.index - first.index
    this.cntr.splice(first.index, count)
    this.finish = this.finish - count
  }

  /**
   * @description: assign container content
   * assign new content to the container, replacing current contents, and modifying its size accodingly
   * this mothed has three versions:
   *
   * version(1): the new contents are n elements, each initialized to copy of val
   * version(2): range version, the new content are elements constructed from each of elements in the range of [first, last]，in same order
   * version(3): the new contents are copies of the values passed as initialized list, in the same order.
   *
   * @param {*}
   * @return {*}
   */
  assign(x: number | Iterable<T>, v?: T)
  assign(first: LinearIterator<T>, last: LinearIterator<T>)
  assign(x: unknown, y: unknown) {
    if (typeof x === 'number' && y) {
      this._assign_n_elements(x, y as T)
    } else if (x instanceof LinearIterator && y instanceof LinearIterator) {
      this._assign_range(x, y)
    } else {
      this._assing_itrabel_cntr(x as Iterable<T>)
    }
  }

  /**
   * @description: assign version(1)
   * the new contents are n elements, each initialized to copy of val
   * @param {number} n
   * @param {T} v
   * @return {*}
   */
  private _assign_n_elements(n: number, v: T) {
    this.cntr.length = n
    this.cntr.fill(v)
  }

  /**
   * @description: assign new content version(2)
   * range version, the new content are elements constructed from each of elements in the range of [first, last]，in same order
   * @param {Iterator} firt
   * @param {Iterator} last
   * @return {*}
   */
  private _assign_range(first: LinearIterator<T>, last: LinearIterator<T>) {
    const cur = first,
      elements: T[] = []
    while (cur.hasNext() && cur.index !== last.index) {
      elements.push(cur.getValue())
      cur.next()
    }
    this.clear()
    this.cntr.splice(0, 0, ...elements)
  }

  /**
   * @description: assign new content version(3)
   * the new contents are copies of the values passed as initialized list, in the same order.
   * @param {*}
   * @return {*}
   */
  private _assing_itrabel_cntr(cntr: Iterable<T>) {
    this.clear()
    for (const item of cntr) {
      this.cntr.push(item)
    }
  }

  /**
   * @description: change size
   * Resizes the container so that it contains n elements.
   *
   * If n is smaller than the current container size, the content is reduced to its first n elements, removing those beyond (and destroying them).
   * If n is greater than the current container size, the content is expanded by inserting at the end as many elements as needed to reach a size of n.
   * If val is specified, the new elements are initialized as copies of val, otherwise, they are value-initialized.
   * If n is also greater than the current container capacity, an automatic reallocation of the allocated storage space takes place.
   *
   * Notice that this function changes the actual content of the container by inserting or erasing elements from it.
   * @param {*}
   * @return {*}
   */
  resize(n: number)
  resize(n: number, v: T)
  resize(n: number, v?: T) {
    const first = new LinearIterator<T>(this.begin().index + n, this.cntr)
    if (n < this.size()) this.erase(first, this.end())
    else this.insert(this.end(), n - this.size(), v)
  }

  /**
   * @description: swap content
   * @param {*}
   * @return {*}
   */
  swap(x: Deque<T>) {
    const temp = x.data
    x.data = this.cntr
    this.cntr = temp
  }

  /**
   * @description: clear content
   * @param {*}
   * @return {*}
   */
  clear() {
    this.cntr = []
    this.cntr.length = 0
    this.finish = 0
  }

  /**
   * @description: construct and insert element
   * @param {*}
   * @return {*}
   */
  emplace<K>(pos: LinearIterator<T>, c: { new (...arg) }, ...arg) {
    const ins: T = new c(arg)
    this.insert(pos, ins)
  }

  /**
   * @description: construct and insert element at the end
   * @param {*}
   * @return {*}
   */
  emplace_back<K>(c: { new (...arg) }, ...arg) {
    const ins: T = new c(arg)
    this.push_back(ins)
  }

  /**
   * @description: construct and insert element at begining
   * @param {*}
   * @return {*}
   */
  emplace_front<K>(c: { new (...arg) }, ...arg) {
    const ins: T = new c(arg)
    this.push_front(ins)
  }

  /**
   * @description: 迭代器
   * @param {*}
   * @return {*}
   */
  *[Symbol.iterator](): IterableIterator<T> {
    const cur = this.begin()
    while (cur.hasNext()) {
      try {
        const value = cur.getValue()
        cur.next()
        yield value
      } catch (error) {
        console.log(error)
      }
    }
    // return {
    //     next: () => {
    //         if (cur.hasNext()) {
    //             let node = { done: false, value: cur.getValue() }
    //             cur.next();
    //             return node
    //         } else {
    //             return { done: true, value: undefined }
    //         }
    //     }
    // }
  }

  /**
   * @description: keys迭代器
   * @param {*}
   * @return {*}
   */
  *keys() {
    let cur = this.begin(),
      idx = 0
    while (cur.hasNext()) {
      try {
        const key = idx++
        cur.next()
        yield key
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * @description: values迭代器
   * @param {*}
   * @return {*}
   */
  *values() {
    const cur = this.begin()
    while (cur.hasNext()) {
      const value = cur.getValue()
      cur.next()
      yield value
    }
  }

  /**
   * @description: entries迭代器
   * @param {*}
   * @return {*}
   */
  *entries() {
    let cur = this.begin(),
      idx: number = 0
    while (cur.hasNext()) {
      try {
        const entry: [number, T] = [idx++, cur.getValue()]
        cur.next()
        yield entry
      } catch (error) {
        console.log(error)
      }
    }
  }
}
