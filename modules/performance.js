// Performance Optimization Patterns Demo
export class PerformanceDemo {
  constructor() {
    this.testData = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      score: Math.random() * 100,
      active: Math.random() > 0.5,
    }))
  }

  async run() {
    const examples = [
      await this.debouncingThrottling(),
      this.lazyEvaluation(),
      this.memoryOptimization(),
      this.algorithmOptimization(),
      this.asyncOptimization(),
    ]

    const output = examples.join("\n\n")

    return {
      output,
      code: this.getSourceCode(),
    }
  }

  // Debouncing and throttling patterns
  async debouncingThrottling() {
    // Debounce function
    const debounce = (func, wait) => {
      let timeout
      return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
      }
    }

    // Throttle function
    const throttle = (func, limit) => {
      let inThrottle
      return (...args) => {
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          setTimeout(() => (inThrottle = false), limit)
        }
      }
    }

    // Simulate expensive operations
    let debounceCount = 0
    let throttleCount = 0
    let directCount = 0

    const expensiveOperation = () => directCount++
    const debouncedOperation = debounce(() => debounceCount++, 100)
    const throttledOperation = throttle(() => throttleCount++, 100)

    // Simulate rapid calls
    const rapidCalls = Array.from({ length: 50 }, (_, i) => i)

    rapidCalls.forEach(() => {
      expensiveOperation()
      debouncedOperation()
      throttledOperation()
    })

    // Wait for debounce to complete
    await new Promise((resolve) => setTimeout(resolve, 150))

    return `⚡ Debouncing & Throttling:
Direct calls: ${directCount}
Debounced calls: ${debounceCount}
Throttled calls: ${throttleCount}
Performance improvement: ${Math.round((1 - debounceCount / directCount) * 100)}%`
  }

  // Lazy evaluation patterns
  lazyEvaluation() {
    // Lazy sequence generator
    function* lazyRange(start, end) {
      for (let i = start; i <= end; i++) {
        yield i
      }
    }

    // Lazy map implementation
    function* lazyMap(iterable, mapper) {
      for (const item of iterable) {
        yield mapper(item)
      }
    }

    // Lazy filter implementation
    function* lazyFilter(iterable, predicate) {
      for (const item of iterable) {
        if (predicate(item)) {
          yield item
        }
      }
    }

    // Performance comparison
    const start = performance.now()

    // Eager evaluation
    const eagerResult = this.testData
      .filter((user) => user.active)
      .map((user) => user.score * 2)
      .slice(0, 5)

    const eagerTime = performance.now() - start

    // Lazy evaluation
    const lazyStart = performance.now()

    const lazySequence = lazyFilter(this.testData, (user) => user.active)
    const lazyMapped = lazyMap(lazySequence, (user) => user.score * 2)

    const lazyResult = []
    let count = 0
    for (const score of lazyMapped) {
      if (count >= 5) break
      lazyResult.push(score)
      count++
    }

    const lazyTime = performance.now() - lazyStart

    return `🔄 Lazy Evaluation:
Eager time: ${eagerTime.toFixed(3)}ms
Lazy time: ${lazyTime.toFixed(3)}ms
Performance gain: ${Math.round(((eagerTime - lazyTime) / eagerTime) * 100)}%
Results match: ${JSON.stringify(eagerResult.slice(0, 2)) === JSON.stringify(lazyResult.slice(0, 2))}`
  }

  // Memory optimization techniques
  memoryOptimization() {
    // Object pooling
    class ObjectPool {
      constructor(createFn, resetFn, initialSize = 10) {
        this.createFn = createFn
        this.resetFn = resetFn
        this.pool = []

        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
          this.pool.push(this.createFn())
        }
      }

      acquire() {
        return this.pool.length > 0 ? this.pool.pop() : this.createFn()
      }

      release(obj) {
        this.resetFn(obj)
        this.pool.push(obj)
      }

      size() {
        return this.pool.length
      }
    }

    // Create object pool for user objects
    const userPool = new ObjectPool(
      () => ({ id: 0, name: "", score: 0, active: false }),
      (obj) => {
        obj.id = 0
        obj.name = ""
        obj.score = 0
        obj.active = false
      },
    )

    // WeakMap for memory-efficient caching
    const cache = new WeakMap()
    const processUser = (user) => {
      if (cache.has(user)) {
        return cache.get(user)
      }

      const processed = {
        ...user,
        processed: true,
        timestamp: Date.now(),
      }

      cache.set(user, processed)
      return processed
    }

    // Test object pooling
    const pooledObjects = []
    for (let i = 0; i < 5; i++) {
      const obj = userPool.acquire()
      obj.id = i
      obj.name = `Pooled User ${i}`
      pooledObjects.push(obj)
    }

    // Release objects back to pool
    pooledObjects.forEach((obj) => userPool.release(obj))

    return `💾 Memory Optimization:
Object Pool Size: ${userPool.size()}
WeakMap Cache: Automatic garbage collection
Memory-efficient patterns implemented
Pool reuse: ${pooledObjects.length} objects recycled`
  }

  // Algorithm optimization
  algorithmOptimization() {
    // Binary search vs linear search
    const sortedData = [...this.testData].sort((a, b) => a.score - b.score)
    const targetScore = 50

    // Linear search
    const linearStart = performance.now()
    const linearResult = sortedData.find((user) => user.score >= targetScore)
    const linearTime = performance.now() - linearStart

    // Binary search
    const binarySearch = (arr, target) => {
      let left = 0
      let right = arr.length - 1

      while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (arr[mid].score >= target) {
          if (mid === 0 || arr[mid - 1].score < target) {
            return arr[mid]
          }
          right = mid - 1
        } else {
          left = mid + 1
        }
      }
      return null
    }

    const binaryStart = performance.now()
    const binaryResult = binarySearch(sortedData, targetScore)
    const binaryTime = performance.now() - binaryStart

    // Hash table optimization
    const hashStart = performance.now()
    const scoreMap = new Map()
    sortedData.forEach((user) => {
      const scoreKey = Math.floor(user.score)
      if (!scoreMap.has(scoreKey)) {
        scoreMap.set(scoreKey, [])
      }
      scoreMap.get(scoreKey).push(user)
    })

    const hashResult = scoreMap.get(Math.floor(targetScore))?.[0]
    const hashTime = performance.now() - hashStart

    return `🚀 Algorithm Optimization:
Linear Search: ${linearTime.toFixed(4)}ms
Binary Search: ${binaryTime.toFixed(4)}ms
Hash Lookup: ${hashTime.toFixed(4)}ms
Binary vs Linear: ${Math.round(linearTime / binaryTime)}x faster
Hash Map: ${Math.round(linearTime / hashTime)}x faster`
  }

  // Async optimization patterns
  async asyncOptimization() {
    // Simulate async operations
    const asyncOperation = (delay, value) => new Promise((resolve) => setTimeout(() => resolve(value), delay))

    // Sequential vs parallel execution
    const sequentialStart = performance.now()
    const seq1 = await asyncOperation(50, "A")
    const seq2 = await asyncOperation(50, "B")
    const seq3 = await asyncOperation(50, "C")
    const sequentialTime = performance.now() - sequentialStart

    const parallelStart = performance.now()
    const [par1, par2, par3] = await Promise.all([
      asyncOperation(50, "A"),
      asyncOperation(50, "B"),
      asyncOperation(50, "C"),
    ])
    const parallelTime = performance.now() - parallelStart

    // Batch processing
    const batchStart = performance.now()
    const batchSize = 100
    const batches = []

    for (let i = 0; i < this.testData.length; i += batchSize) {
      const batch = this.testData.slice(i, i + batchSize)
      batches.push(Promise.resolve(batch.map((user) => user.score * 2)))
    }

    const batchResults = await Promise.all(batches)
    const batchTime = performance.now() - batchStart

    return `⚡ Async Optimization:
Sequential: ${sequentialTime.toFixed(2)}ms
Parallel: ${parallelTime.toFixed(2)}ms
Batch Processing: ${batchTime.toFixed(2)}ms
Parallel speedup: ${Math.round(sequentialTime / parallelTime)}x faster
Batches processed: ${batches.length}`
  }

  getSourceCode() {
    return `
// Performance Optimization Patterns

// 1. Debouncing & Throttling
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// 2. Lazy Evaluation
function* lazyMap(iterable, mapper) {
    for (const item of iterable) {
        yield mapper(item);
    }
}

function* lazyFilter(iterable, predicate) {
    for (const item of iterable) {
        if (predicate(item)) yield item;
    }
}

// 3. Object Pooling
class ObjectPool {
    constructor(createFn, resetFn, initialSize = 10) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }
    
    acquire() {
        return this.pool.length > 0 ? this.pool.pop() : this.createFn();
    }
    
    release(obj) {
        this.resetFn(obj);
        this.pool.push(obj);
    }
}

// 4. Binary Search Optimization
const binarySearch = (arr, target) => {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        arr[mid] < target ? left = mid + 1 : right = mid - 1;
    }
    return -1;
};

// 5. Parallel Async Processing
const results = await Promise.all([
    asyncOperation1(),
    asyncOperation2(),
    asyncOperation3()
]);
        `
  }
}
