// Advanced JavaScript Feature Showcase Dashboard
// Day 1/120 - Full Stack Developer Challenge

import { DestructuringDemo } from "./modules/destructuring.js"
import { SpreadRestDemo } from "./modules/spreadRest.js"
import { ArrowFunctionDemo } from "./modules/arrowFunctions.js"
import { TemplateLiteralDemo } from "./modules/templateLiterals.js"
import { AdvancedPatternsDemo } from "./modules/advancedPatterns.js"
import { PerformanceDemo } from "./modules/performance.js"
import { CodeDisplayManager } from "./modules/codeDisplay.js"

class FeatureDashboard {
  constructor() {
    this.demos = new Map([
      ["destructuring", new DestructuringDemo()],
      ["spread-rest", new SpreadRestDemo()],
      ["arrow-functions", new ArrowFunctionDemo()],
      ["template-literals", new TemplateLiteralDemo()],
      ["advanced-patterns", new AdvancedPatternsDemo()],
      ["performance", new PerformanceDemo()],
    ])

    this.codeDisplay = new CodeDisplayManager()
    this.initializeEventListeners()
    this.showWelcomeMessage()
  }

  initializeEventListeners() {
    // Advanced event delegation pattern
    document.addEventListener("click", this.handleDemoClick.bind(this))

    // Debounced input handling for template literals
    const userNameInput = document.getElementById("user-name")
    if (userNameInput) {
      userNameInput.addEventListener(
        "input",
        this.debounce(() => this.updateTemplatePreview(), 300),
      )
    }
  }

  // Advanced arrow function with proper this binding
  handleDemoClick = (event) => {
    const { target } = event

    if (!target.classList.contains("demo-btn")) return

    const action = target.dataset.action
    const demo = this.demos.get(action)

    if (demo) {
      this.runDemo(action, demo)
    }
  }

  async runDemo(action, demo) {
    try {
      const output = document.getElementById(`${action}-output`)
      const result = await demo.run()

      output.innerHTML = result.output
      this.codeDisplay.show(result.code, action)

      // Add success animation
      output.classList.add("highlight")
      setTimeout(() => output.classList.remove("highlight"), 2000)
    } catch (error) {
      this.handleError(action, error)
    }
  }

  handleError(action, error) {
    const output = document.getElementById(`${action}-output`)
    output.innerHTML = `<span class="error">Error: ${error.message}</span>`
    console.error(`Demo ${action} failed:`, error)
  }

  // Higher-order function for debouncing
  debounce(func, wait) {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  updateTemplatePreview() {
    const demo = this.demos.get("template-literals")
    const input = document.getElementById("user-name")
    if (demo && input.value.trim()) {
      demo.updatePreview(input.value)
    }
  }

  showWelcomeMessage() {
    this.codeDisplay.show(
      `
// 🚀 Welcome to Advanced JavaScript Feature Showcase!
// Day 1/120 - Full Stack Developer Challenge

// This dashboard demonstrates sophisticated ES6+ patterns:
// ✅ Complex destructuring with nested objects and arrays
// ✅ Advanced spread/rest operator applications
// ✅ Arrow functions in real-world scenarios
// ✅ Template literals with advanced formatting
// ✅ Higher-order functions and closures
// ✅ Performance optimization techniques

// Click any demo button to see these patterns in action!
console.log('Ready to showcase advanced JavaScript mastery! 💪');
        `,
      "welcome",
    )
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new FeatureDashboard()
})

// Export for potential module usage
export { FeatureDashboard }
