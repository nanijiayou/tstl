/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:00:16
 * @LastEditTime: 2022-04-06 23:32:50
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/Interface/ICollection.ts
 */
import type { IteratorTypes, ListIteratorTypes } from '../Iterators/type'
export interface ICollection<E> extends Iterable<E> {
    size(): number
    isEmpty(): boolean
    contains(e: E): boolean
    iterator(): IteratorTypes<E>

    add(e: E): boolean
    add(index: number, e: E): boolean
    addAll(elements: Iterable<E>): boolean
    addAll(index: number, elements: Iterable<E>): boolean

    remove()
    remove(e: E)
    remove(index: number): boolean

    removeIf(): boolean
    removeAll(): boolean

    clear()
    hashCode(): number
    equals(e: E): boolean
}