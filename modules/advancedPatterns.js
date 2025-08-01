// Advanced JavaScript Patterns Demo
export class AdvancedPatternsDemo {
  constructor() {
    this.cache = new Map()
    this.observers = []
  }

  async run() {
    const examples = [
      this.closuresAndPrivacy(),
      this.memoizationPattern(),
      this.observerPattern(),
      this.modulePattern(),
      this.proxyPattern(),
    ]

    const output = examples.join("\n\n")

    return {
      output,
      code: this.getSourceCode(),
    }
  }

  // Closures for privacy and state management
  closuresAndPrivacy() {
    // Counter with private state
    const createCounter = (initialValue = 0) => {
      let count = initialValue
      let history = []

      return {
        increment: (step = 1) => {
          count += step
          history.push(`+${step}`)
          return count
        },
        decrement: (step = 1) => {
          count -= step
          history.push(`-${step}`)
          return count
        },
        getValue: () => count,
        getHistory: () => [...history], // Return copy
        reset: () => {
          count = initialValue
          history = []
          return count
        },
      }
    }

    const counter = createCounter(10)
    counter.increment(5)
    counter.decrement(2)
    counter.increment(3)

    return `🔒 Closures & Privacy:
Current Value: ${counter.getValue()}
History: ${counter.getHistory().join(", ")}
Private state is completely encapsulated!`
  }

  // Memoization for performance optimization
  memoizationPattern() {
    // Generic memoization function
    const memoize = (fn, keyGenerator = (...args) => JSON.stringify(args)) => {
      const cache = new Map()

      return (...args) => {
        const key = keyGenerator(...args)

        if (cache.has(key)) {
          return { result: cache.get(key), cached: true }
        }

        const result = fn(...args)
        cache.set(key, result)
        return { result, cached: false }
      }
    }

    // Expensive calculation function
    const fibonacci = memoize((n) => {
      if (n <= 1) return n
      const fib = memoize(fibonacci)
      return fib(n - 1).result + fib(n - 2).result
    })

    // Complex object processing
    const processData = memoize((data) => {
      // Simulate expensive operation
      return data.map((item) => item * 2).reduce((a, b) => a + b, 0)
    })

    const fib10First = fibonacci(10)
    const fib10Second = fibonacci(10)
    const dataResult = processData([1, 2, 3, 4, 5])

    return `⚡ Memoization Pattern:
Fibonacci(10) first call: ${fib10First.result} (cached: ${fib10First.cached})
Fibonacci(10) second call: ${fib10Second.result} (cached: ${fib10Second.cached})
Data processing result: ${dataResult.result}`
  }

  // Observer pattern implementation
  observerPattern() {
    class EventEmitter {
      constructor() {
        this.events = new Map()
      }

      on(event, callback) {
        if (!this.events.has(event)) {
          this.events.set(event, [])
        }
        this.events.get(event).push(callback)

        // Return unsubscribe function
        return () => {
          const callbacks = this.events.get(event)
          const index = callbacks.indexOf(callback)
          if (index > -1) callbacks.splice(index, 1)
        }
      }

      emit(event, data) {
        const callbacks = this.events.get(event) || []
        const results = callbacks.map((callback) => callback(data))
        return results
      }

      once(event, callback) {
        const unsubscribe = this.on(event, (data) => {
          callback(data)
          unsubscribe()
        })
        return unsubscribe
      }
    }

    const emitter = new EventEmitter()
    const messages = []

    // Subscribe to events
    emitter.on("user:login", (user) => {
      messages.push(`User ${user.name} logged in`)
    })

    emitter.on("user:logout", (user) => {
      messages.push(`User ${user.name} logged out`)
    })

    emitter.once("system:startup", () => {
      messages.push("System started (one-time event)")
    })

    // Emit events
    emitter.emit("system:startup")
    emitter.emit("user:login", { name: "John" })
    emitter.emit("user:logout", { name: "John" })
    emitter.emit("system:startup") // Won't trigger again

    return `👁️ Observer Pattern:
Events fired: ${messages.length}
Messages:
${messages.map((msg) => `• ${msg}`).join("\n")}`
  }

  // Module pattern with namespace
  modulePattern() {
    const UserModule = (() => {
      // Private variables
      const users = []
      let currentId = 1

      // Private methods
      const validateUser = (user) => {
        return user.name && user.email && user.email.includes("@")
      }

      const generateId = () => currentId++

      // Public API
      return {
        create(userData) {
          if (!validateUser(userData)) {
            throw new Error("Invalid user data")
          }

          const user = {
            id: generateId(),
            ...userData,
            createdAt: new Date().toISOString(),
          }

          users.push(user)
          return user
        },

        findById(id) {
          return users.find((user) => user.id === id)
        },

        getAll() {
          return users.map((user) => ({ ...user })) // Return copies
        },

        count() {
          return users.length
        },

        // Expose only safe private methods
        isValid: validateUser,
      }
    })()

    // Use the module
    const user1 = UserModule.create({ name: "John", email: "john@example.com" })
    const user2 = UserModule.create({ name: "Jane", email: "jane@example.com" })

    return `🏗️ Module Pattern:
Created Users: ${UserModule.count()}
User 1: ${user1.name} (ID: ${user1.id})
User 2: ${user2.name} (ID: ${user2.id})
Private state is completely encapsulated!`
  }

  // Proxy pattern for advanced object behavior
  proxyPattern() {
    // Smart object with validation and logging
    const createSmartObject = (target = {}) => {
      const accessLog = []

      return new Proxy(target, {
        get(obj, prop) {
          accessLog.push(`GET: ${prop}`)

          // Dynamic property generation
          if (prop.startsWith("is") && prop.length > 2) {
            const property = prop.slice(2).toLowerCase()
            return () => obj[property] !== undefined
          }

          return obj[prop]
        },

        set(obj, prop, value) {
          accessLog.push(`SET: ${prop} = ${value}`)

          // Validation
          if (prop === "age" && (value < 0 || value > 150)) {
            throw new Error("Invalid age value")
          }

          if (prop === "email" && !value.includes("@")) {
            throw new Error("Invalid email format")
          }

          obj[prop] = value
          return true
        },

        has(obj, prop) {
          accessLog.push(`HAS: ${prop}`)
          return prop in obj
        },

        ownKeys(obj) {
          // Add virtual property
          return [...Object.keys(obj), "accessLog"]
        },

        getOwnPropertyDescriptor(obj, prop) {
          if (prop === "accessLog") {
            return {
              enumerable: true,
              configurable: true,
              value: accessLog,
            }
          }
          return Object.getOwnPropertyDescriptor(obj, prop)
        },
      })
    }

    const smartUser = createSmartObject()
    smartUser.name = "John"
    smartUser.age = 30
    smartUser.email = "john@example.com"

    const hasName = "name" in smartUser
    const isName = smartUser.isName()
    const log = smartUser.accessLog

    return `🎭 Proxy Pattern:
User Name: ${smartUser.name}
Has Name: ${hasName}
Is Name (dynamic): ${isName}
Access Log: ${log.slice(-3).join(", ")}
Total Operations: ${log.length}`
  }

  getSourceCode() {
    return `
// Advanced JavaScript Patterns

// 1. Closures for Privacy
const createCounter = (initialValue = 0) => {
    let count = initialValue; // Private variable
    let history = [];
    
    return {
        increment: (step = 1) => {
            count += step;
            history.push(\`+\${step}\`);
            return count;
        },
        getValue: () => count,
        getHistory: () => [...history] // Return copy
    };
};

// 2. Memoization Pattern
const memoize = (fn, keyGenerator = (...args) => JSON.stringify(args)) => {
    const cache = new Map();
    return (...args) => {
        const key = keyGenerator(...args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

// 3. Observer Pattern
class EventEmitter {
    constructor() { this.events = new Map(); }
    
    on(event, callback) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(callback);
    }
    
    emit(event, data) {
        const callbacks = this.events.get(event) || [];
        callbacks.forEach(callback => callback(data));
    }
}

// 4. Module Pattern
const UserModule = (() => {
    let users = []; // Private
    
    return {
        create(userData) { /* public method */ },
        findById(id) { /* public method */ }
    };
})();

// 5. Proxy Pattern
const smartObject = new Proxy(target, {
    get(obj, prop) { /* intercept property access */ },
    set(obj, prop, value) { /* intercept property setting */ }
});
        `
  }
}
