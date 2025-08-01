// Day 1 - ES6+ Fundamentals Showcase
// Simple demonstrations of core ES6+ features

// 1. Arrow Functions Demo
function arrowFunctionDemo() {
  const output = document.getElementById("arrow-output")

  // Traditional function
  const traditional = (a, b) => a + b

  // Arrow function
  const arrow = (a, b) => a + b

  // Arrow function with array methods
  const numbers = [1, 2, 3, 4, 5]
  const doubled = numbers.map((n) => n * 2)
  const evens = numbers.filter((n) => n % 2 === 0)

  output.textContent = `Traditional function: ${traditional(5, 3)}
Arrow function: ${arrow(5, 3)}
Original array: [${numbers.join(", ")}]
Doubled: [${doubled.join(", ")}]
Even numbers: [${evens.join(", ")}]`
}

// 2. Destructuring Demo
function destructuringDemo() {
  const output = document.getElementById("destructuring-output")

  // Object destructuring
  const person = {
    name: "John Doe",
    age: 30,
    city: "New York",
    job: "Developer",
  }

  const { name, age, city } = person

  // Array destructuring
  const colors = ["red", "green", "blue", "yellow"]
  const [first, second, ...rest] = colors

  output.textContent = `Object Destructuring:
Name: ${name}
Age: ${age}
City: ${city}

Array Destructuring:
First color: ${first}
Second color: ${second}
Rest: [${rest.join(", ")}]`
}

// 3. Spread Operator Demo
function spreadDemo() {
  const output = document.getElementById("spread-output")

  // Array spreading
  const fruits = ["apple", "banana"]
  const vegetables = ["carrot", "broccoli"]
  const food = [...fruits, ...vegetables, "pizza"]

  // Object spreading
  const basicInfo = { name: "Alice", age: 25 }
  const contactInfo = { email: "alice@email.com", phone: "123-456-7890" }
  const fullProfile = { ...basicInfo, ...contactInfo, status: "active" }

  // Function arguments
  const numbers = [10, 5, 8, 3, 12]
  const maxNumber = Math.max(...numbers)

  output.textContent = `Array Spread:
Fruits: [${fruits.join(", ")}]
Vegetables: [${vegetables.join(", ")}]
Combined: [${food.join(", ")}]

Object Spread:
Full Profile: ${JSON.stringify(fullProfile, null, 2)}

Function Arguments:
Numbers: [${numbers.join(", ")}]
Max: ${maxNumber}`
}

// 4. Template Literals Demo
function templateDemo() {
  const output = document.getElementById("template-output")
  const nameInput = document.getElementById("name-input")
  const name = nameInput.value || "Anonymous"

  const age = 25
  const hobby = "coding"

  // Basic template literal
  const greeting = `Hello, ${name}!`

  // Multi-line template
  const profile = `
👤 User Profile:
   Name: ${name}
   Age: ${age}
   Hobby: ${hobby}
   Status: ${age >= 18 ? "Adult" : "Minor"}
   Message: Welcome to Day ${1}/120!
    `.trim()

  // Expression in template
  const calculation = `Math result: 5 + 3 = ${5 + 3}`

  output.textContent = `${greeting}

${profile}

${calculation}`
}

// 5. Let & Const Demo
function letConstDemo() {
  const output = document.getElementById("letconst-output")

  let result = ""

  // Const demonstration
  const PI = 3.14159
  const colors = ["red", "blue", "green"]

  // Let vs var scope
  function scopeTest() {
    const letVar = "let variable"
    const constVar = "const variable"

    if (true) {
      const blockLet = "block scoped let"
      const blockConst = "block scoped const"
      return `Inside block: ${blockLet}, ${blockConst}`
    }

    return `Outside block: ${letVar}, ${constVar}`
  }

  // Let reassignment
  let counter = 0
  counter = 1
  counter += 5

  result = `Const PI: ${PI}
Const array: [${colors.join(", ")}]
Let counter: ${counter}

Scope test: ${scopeTest()}

✅ const prevents reassignment
✅ let allows reassignment
✅ Both are block-scoped`

  output.textContent = result
}

// 6. Default Parameters Demo
function defaultParamsDemo() {
  const output = document.getElementById("params-output")
  const ageInput = document.getElementById("age-input")
  const inputAge = ageInput.value

  // Function with default parameters
  const createUser = (name = "Anonymous", age = 18, role = "User") => {
    return {
      name,
      age: Number.parseInt(age) || 18,
      role,
      id: Math.floor(Math.random() * 1000),
      createdAt: new Date().toLocaleDateString(),
    }
  }

  // Create users with different parameters
  const user1 = createUser()
  const user2 = createUser("John")
  const user3 = createUser("Jane", inputAge || undefined, "Admin")

  output.textContent = `Default User: ${JSON.stringify(user1, null, 2)}

Named User: ${JSON.stringify(user2, null, 2)}

Custom User: ${JSON.stringify(user3, null, 2)}`
}

// Initialize challenges on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeChallenges()
})

function initializeChallenges() {
  const challenges = [
    { name: "Arrow Functions", description: "Basic arrow function syntax", completed: true },
    { name: "Object Destructuring", description: "Extract object properties", completed: true },
    { name: "Array Destructuring", description: "Extract array elements", completed: true },
    { name: "Spread Arrays", description: "Combine arrays with spread", completed: true },
    { name: "Spread Objects", description: "Merge objects with spread", completed: true },
    { name: "Template Literals", description: "String interpolation", completed: true },
    { name: "Multi-line Strings", description: "Template literal formatting", completed: true },
    { name: "Let vs Var", description: "Block scoping differences", completed: true },
    { name: "Const Arrays", description: "Const with mutable objects", completed: true },
    { name: "Default Parameters", description: "Function parameter defaults", completed: true },
    { name: "Rest Parameters", description: "Collect remaining arguments", completed: true },
    { name: "Array Methods", description: "Map, filter with arrows", completed: true },
    { name: "Object Shorthand", description: "Property shorthand syntax", completed: true },
    { name: "Computed Properties", description: "Dynamic object keys", completed: true },
    { name: "For...of Loop", description: "Iterate over iterables", completed: true },
  ]

  const challengesGrid = document.getElementById("challenges-grid")

  challenges.forEach((challenge) => {
    const challengeElement = document.createElement("div")
    challengeElement.className = `challenge-item ${challenge.completed ? "completed" : ""}`
    challengeElement.innerHTML = `
            <h4>${challenge.completed ? "✅" : "⏳"} ${challenge.name}</h4>
            <p>${challenge.description}</p>
        `
    challengesGrid.appendChild(challengeElement)
  })
}

// Additional ES6+ examples for learning
const additionalExamples = {
  // Object shorthand
  objectShorthand: () => {
    const name = "John"
    const age = 30

    // Old way
    const oldWay = { name: name, age: age }

    // ES6 shorthand
    const newWay = { name, age }

    return { oldWay, newWay }
  },

  // For...of loop
  forOfLoop: () => {
    const fruits = ["apple", "banana", "orange"]
    const result = []

    for (const fruit of fruits) {
      result.push(fruit.toUpperCase())
    }

    return result
  },

  // Rest parameters
  restParameters: (...args) => {
    return `Received ${args.length} arguments: ${args.join(", ")}`
  },
}

console.log("🚀 Day 1 ES6+ Fundamentals loaded!")
console.log("Try the interactive demos above to see ES6+ features in action.")
