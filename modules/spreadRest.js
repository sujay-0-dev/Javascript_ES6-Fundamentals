// Advanced Spread & Rest Operator Demo
export class SpreadRestDemo {
  constructor() {
    this.baseUser = { id: 1, name: "John", role: "user" }
    this.permissions = ["read", "write"]
    this.additionalData = { lastLogin: "2024-01-01", isActive: true }
  }

  async run() {
    const examples = [
      this.objectComposition(),
      this.immutableUpdates(),
      this.arrayMerging(),
      this.functionArguments(),
      this.conditionalSpreading(),
    ]

    const output = examples.join("\n\n")

    return {
      output,
      code: this.getSourceCode(),
    }
  }

  // Advanced object composition
  objectComposition() {
    const enhancedUser = {
      ...this.baseUser,
      ...this.additionalData,
      permissions: [...this.permissions, "admin"],
      metadata: {
        createdAt: new Date().toISOString(),
        version: "1.0",
      },
    }

    return `🏗️ Object Composition:
${JSON.stringify(enhancedUser, null, 2)}`
  }

  // Immutable updates with spread
  immutableUpdates() {
    const users = [
      { id: 1, name: "John", active: true },
      { id: 2, name: "Jane", active: false },
      { id: 3, name: "Bob", active: true },
    ]

    // Update user with id 2
    const updatedUsers = users.map((user) =>
      user.id === 2 ? { ...user, active: true, lastUpdated: Date.now() } : user,
    )

    // Add new user
    const withNewUser = [...updatedUsers, { id: 4, name: "Alice", active: true, isNew: true }]

    return `🔄 Immutable Updates:
Original Users: ${users.length}
Updated Users: ${updatedUsers.length}
With New User: ${withNewUser.length}
Jane is now active: ${withNewUser.find((u) => u.id === 2).active}`
  }

  // Advanced array merging and manipulation
  arrayMerging() {
    const frontend = ["React", "Vue", "Angular"]
    const backend = ["Node.js", "Python", "Java"]
    const databases = ["MongoDB", "PostgreSQL"]

    // Multiple array merging with deduplication
    const allTech = [...new Set([...frontend, ...backend, ...databases])]

    // Conditional array building
    const isFullStack = true
    const techStack = [
      ...frontend.slice(0, 1), // Take first frontend
      ...(isFullStack ? backend : []),
      ...databases,
    ]

    return `📚 Array Merging & Manipulation:
All Technologies: ${allTech.join(", ")}
Tech Stack: ${techStack.join(", ")}
Unique Count: ${allTech.length}`
  }

  // Variadic functions with rest parameters
  functionArguments() {
    const calculateStats = (operation, ...numbers) => {
      const operations = {
        sum: (nums) => nums.reduce((a, b) => a + b, 0),
        avg: (nums) => nums.reduce((a, b) => a + b, 0) / nums.length,
        max: (nums) => Math.max(...nums),
        min: (nums) => Math.min(...nums),
      }

      return operations[operation]?.(numbers) ?? "Invalid operation"
    }

    const numbers = [10, 25, 30, 15, 40]
    const sum = calculateStats("sum", ...numbers)
    const avg = calculateStats("avg", ...numbers)
    const max = calculateStats("max", ...numbers)

    return `🧮 Variadic Functions:
Numbers: ${numbers.join(", ")}
Sum: ${sum}
Average: ${avg.toFixed(2)}
Maximum: ${max}`
  }

  // Conditional spreading
  conditionalSpreading() {
    const createApiRequest = (baseUrl, options = {}) => {
      const isProduction = false
      const hasAuth = true

      return {
        url: baseUrl,
        method: "GET",
        ...options,
        ...(isProduction && { timeout: 5000 }),
        ...(hasAuth && {
          headers: {
            ...options.headers,
            Authorization: "Bearer token123",
          },
        }),
        ...(options.cache !== false && { cache: "default" }),
      }
    }

    const request = createApiRequest("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })

    return `🔧 Conditional Spreading:
${JSON.stringify(request, null, 2)}`
  }

  getSourceCode() {
    return `
// Advanced Spread & Rest Patterns

// 1. Object Composition
const enhancedUser = {
    ...baseUser,
    ...additionalData,
    permissions: [...permissions, 'admin']
};

// 2. Immutable Updates
const updatedUsers = users.map(user => 
    user.id === targetId 
        ? { ...user, active: true, lastUpdated: Date.now() }
        : user
);

// 3. Array Deduplication
const uniqueItems = [...new Set([...array1, ...array2])];

// 4. Variadic Functions
const calculateStats = (operation, ...numbers) => {
    return operations[operation]?.(numbers);
};

// 5. Conditional Spreading
const config = {
    ...baseConfig,
    ...(isProduction && { timeout: 5000 }),
    ...(hasAuth && { headers: { Authorization: token } })
};
        `
  }
}
