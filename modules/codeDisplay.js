// Code Display Manager
export class CodeDisplayManager {
  constructor() {
    this.codeDisplay = document.getElementById("code-display")
    this.currentCode = ""
  }

  show(code, feature = "") {
    if (!this.codeDisplay) return

    this.currentCode = code
    this.codeDisplay.textContent = code

    // Add syntax highlighting effect
    this.highlightSyntax()

    // Scroll to code display
    this.codeDisplay.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    })
  }

  highlightSyntax() {
    if (!this.codeDisplay) return

    const html = this.currentCode
      // Keywords
      .replace(
        /\b(const|let|var|function|class|return|if|else|for|while|async|await|import|export|default)\b/g,
        '<span style="color: #ff6b6b; font-weight: bold;">$1</span>',
      )
      // Strings
      .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span style="color: #51cf66;">$1$2$1</span>')
      // Comments
      .replace(/(\/\/.*$)/gm, '<span style="color: #868e96; font-style: italic;">$1</span>')
      // Numbers
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #ffd43b;">$1</span>')
      // Functions
      .replace(/\b(\w+)(?=\s*\()/g, '<span style="color: #74c0fc;">$1</span>')

    this.codeDisplay.innerHTML = html
  }

  clear() {
    if (this.codeDisplay) {
      this.codeDisplay.textContent = ""
    }
  }
}
