/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 14:10:10
 * @LastEditTime: 2022-02-17 17:46:01
 * @LastEditors: hzheyuan
 * @Description: 关联容器基础数据结构红黑树的结点类
 * @FilePath: \tstl\src\container\tree\RBTNode.ts
 */
export enum Color {
  RED,
  BLACK
}

export class RBTNode<K, V> {
  readonly _key: K
  _data: V
  _size: number

  public _parent: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  public _left: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  public _right: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  public _color: Color = Color.BLACK

  static readonly nilNode: RBTNode<any, any> = Object.freeze(
    new (class extends RBTNode<unknown, unknown> {
      constructor() {
        super('nil', 'nil')
        this._parent = this._left = this._right = this
        this._color = Color.BLACK
      }
    })()
  )

  constructor(key: K, v: V) {
    this._key = key
    this._data = v
    this._size = 0
  }

  get data() {
    return this._data
  }

  get key() {
    return this._key
  }

  get left() {
    return this._left
  }

  get right() {
    return this._right
  }

  get parent() {
    return this._parent
  }

  get color() {
    return this._color
  }

  get size() {
    return this._size
  }

  set left(node) {
    this._left = node
  }

  set right(node) {
    this._right = node
  }

  set parent(node) {
    this._parent = node
  }

  set color(color) {
    this._color = color
  }

  set size(sz) {
    this._size = sz;
  }
}
