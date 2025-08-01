// Advanced Arrow Function Patterns Demo
export class ArrowFunctionDemo {
  constructor() {
    this.context = {
      name: "Dashboard",
      version: "1.0",
      features: ["destructuring", "spread", "arrows"],
    }
  }

  async run() {
    const examples = [
      this.lexicalThisBinding(),
      this.higherOrderFunctions(),
      this.functionalComposition(),
      this.asyncArrowPatterns(),
      this.whenNotToUseArrows(),
    ]

    const output = examples.join("\n\n")

    return {
      output,
      code: this.getSourceCode(),
    }
  }

  // Lexical this binding demonstration
  lexicalThisBinding() {
    const eventManager = {
      name: "EventManager",
      events: [],

      // Arrow function preserves 'this' context
      addEvent: (eventName) => {
        // Note: This won't work as expected because arrow functions
        // don't have their own 'this' - demonstrating the concept
        return `Adding event: ${eventName}`
      },

      // Regular function for comparison
      addEventRegular: function (eventName) {
        this.events.push(eventName)
        return `${this.name} added: ${eventName}`
      },

      // Arrow function in method (proper usage)
      processEvents: function () {
        return this.events.map((event) => `${this.name}: ${event}`)
      },
    }

    eventManager.addEventRegular("click")
    eventManager.addEventRegular("scroll")
    const processed = eventManager.processEvents()

    return `🎯 Lexical This Binding:
Events processed: ${processed.join(", ")}
Arrow functions preserve outer 'this' context!`
  }

  // Higher-order functions with arrows
  higherOrderFunctions() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // Functional pipeline with arrow functions
    const pipeline = data
      .filter((n) => n % 2 === 0) // Even numbers
      .map((n) => n * n) // Square them
      .reduce((acc, n) => acc + n, 0) // Sum them

    // Higher-order function factory
    const createValidator = (rule) => (value) => rule(value)
    const isPositive = createValidator((n) => n > 0)
    const isEven = createValidator((n) => n % 2 === 0)

    const validationResults = data.slice(0, 5).map((n) => ({
      value: n,
      positive: isPositive(n),
      even: isEven(n),
    }))

    return `🔧 Higher-Order Functions:
Pipeline Result: ${pipeline}
Validation Results:
${validationResults.map((r) => `${r.value}: positive=${r.positive}, even=${r.even}`).join("\n")}`
  }

  // Functional composition patterns
  functionalComposition() {
    // Compose function using arrows
    const compose =
      (...fns) =>
      (value) =>
        fns.reduceRight((acc, fn) => fn(acc), value)

    // Individual transformation functions
    const addTax = (price) => price * 1.1
    const addShipping = (price) => price + 10
    const applyDiscount = (discount) => (price) => price * (1 - discount)

    // Compose pricing pipeline
    const calculateFinalPrice = compose(Math.round, addShipping, addTax, applyDiscount(0.1))

    const originalPrice = 100
    const finalPrice = calculateFinalPrice(originalPrice)

    // Curried functions
    const multiply = (x) => (y) => x * y
    const double = multiply(2)
    const triple = multiply(3)

    return `🎼 Functional Composition:
Original Price: $${originalPrice}
Final Price: $${finalPrice}
Double 5: ${double(5)}
Triple 4: ${triple(4)}`
  }

  // Async arrow function patterns
  async asyncArrowPatterns() {
    // Async arrow functions
    const fetchData = async (url) => {
      // Simulate API call
      return new Promise((resolve) => setTimeout(() => resolve(`Data from ${url}`), 100))
    }

    // Parallel async operations
    const urls = ["/api/users", "/api/posts", "/api/comments"]
    const results = await Promise.all(urls.map(async (url) => await fetchData(url)))

    // Async array processing
    const processAsync = async (items) => {
      const processed = []
      for (const item of items) {
        const result = await fetchData(item)
        processed.push(result.toUpperCase())
      }
      return processed
    }

    const processedResults = await processAsync(urls.slice(0, 2))

    return `⚡ Async Arrow Patterns:
Parallel Results: ${results.length} items fetched
Sequential Results: ${processedResults.join(", ")}`
  }

  // When NOT to use arrow functions
  whenNotToUseArrows() {
    const examples = {
      // Don't use for object methods that need 'this'
      objectMethod: function () {
        return `Object method with proper 'this': ${this.name || "undefined"}`
      },

      // Don't use for constructors
      regularConstructor: function (name) {
        this.name = name
        this.getName = () => this.name // Arrow function here is OK
      },

      // Don't use when you need 'arguments' object
      withArguments: () => Array.from(arguments).join(", "),
    }

    const obj = { name: "TestObject" }
    const boundMethod = examples.objectMethod.bind(obj)
    const constructor = new examples.regularConstructor("TestName")
    const argsResult = examples.withArguments("a", "b", "c")

    return `❌ When NOT to Use Arrows:
Object Method: ${boundMethod()}
Constructor Result: ${constructor.getName()}
Arguments Example: ${argsResult}`
  }

  getSourceCode() {
    return `
// Advanced Arrow Function Patterns

// 1. Lexical This Binding
const eventManager = {
    events: [],
    processEvents: function() {
        // Arrow function preserves 'this' from outer scope
        return this.events.map(event => \`\${this.name}: \${event}\`);
    }
};

// 2. Higher-Order Functions
const createValidator = (rule) => (value) => rule(value);
const isPositive = createValidator(n => n > 0);

// 3. Functional Composition
const compose = (...fns) => (value) => 
    fns.reduceRight((acc, fn) => fn(acc), value);

const pipeline = compose(
    Math.round,
    addShipping,
    addTax,
    applyDiscount(0.1)
);

// 4. Async Arrow Functions
const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
};

// 5. Curried Functions
const multiply = x => y => x * y;
const double = multiply(2);

// When NOT to use arrows:
// - Object methods needing 'this'
// - Constructors
// - When you need 'arguments' object
        `
  }
}
