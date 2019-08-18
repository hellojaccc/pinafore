/* global describe, it */

import { QuickLRU } from '../../src/routes/_thirdparty/quick-lru/quick-lru'
import assert from 'assert'

describe('test-quick-lru.js', () => {
  it('fires evict events correctly', () => {
    return new Promise((resolve) => {
      const cache = new QuickLRU({ maxSize: 3 })
      const evictions = []
      cache.on('evict', (value, key) => {
        evictions.push({ key, value })
      })
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3)
      cache.set('d', 4)
      cache.set('e', 5)
      cache.set('f', 6)
      cache.set('a', 1)
      cache.set('d', 4)
      cache.set('g', 7)
      Promise.resolve().then(() => resolve(evictions))
    }).then(evictions => {
      assert.deepStrictEqual(evictions, [
        { key: 'a', value: 1 },
        { key: 'b', value: 2 },
        { key: 'c', value: 3 },
        { key: 'e', value: 5 },
        { key: 'f', value: 6 }
      ])
    })
  })
})
