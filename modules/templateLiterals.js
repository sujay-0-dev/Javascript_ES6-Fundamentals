// Advanced Template Literal Patterns Demo
export class TemplateLiteralDemo {
  constructor() {
    this.userData = {
      name: "John Doe",
      role: "Senior Developer",
      experience: 5,
      skills: ["JavaScript", "React", "Node.js"],
      projects: [
        { name: "E-commerce Platform", status: "completed", duration: "6 months" },
        { name: "Analytics Dashboard", status: "in-progress", duration: "3 months" },
      ],
    }
  }

  async run() {
    const examples = [
      this.basicTemplating(),
      this.taggedTemplates(),
      this.multilineTemplates(),
      this.conditionalTemplating(),
      this.templateFunctions(),
    ]

    const output = examples.join("\n\n")

    return {
      output,
      code: this.getSourceCode(),
    }
  }

  updatePreview(name) {
    const output = document.getElementById("template-literals-output")
    if (output) {
      const preview = this.generatePersonalizedTemplate(name)
      output.innerHTML = preview
    }
  }

  // Basic template literal with expressions
  basicTemplating() {
    const { name, role, experience, skills } = this.userData

    const profile = `
👤 Developer Profile:
Name: ${name}
Role: ${role}
Experience: ${experience} year${experience !== 1 ? "s" : ""}
Skills: ${skills.join(" • ")}
Skill Count: ${skills.length}
Senior Level: ${experience >= 5 ? "✅ Yes" : "❌ No"}
        `.trim()

    return `📝 Basic Template Literals:
${profile}`
  }

  // Tagged template literals
  taggedTemplates() {
    // Custom tag function for highlighting
    const highlight = (strings, ...values) => {
      return strings.reduce((result, string, i) => {
        const value = values[i] ? `<mark>${values[i]}</mark>` : ""
        return result + string + value
      }, "")
    }

    // Custom tag for SQL-like queries
    const query = (strings, ...values) => {
      const sanitized = values.map((value) => (typeof value === "string" ? `'${value.replace(/'/g, "''")}'` : value))

      return strings.reduce((result, string, i) => {
        const value = sanitized[i] || ""
        return result + string + value
      }, "")
    }

    const { name, role } = this.userData
    const highlighted = highlight`Developer ${name} works as ${role}`
    const sqlQuery = query`SELECT * FROM users WHERE name = ${name} AND role = ${role}`

    return `🏷️ Tagged Template Literals:
Highlighted: ${highlighted}
SQL Query: ${sqlQuery}`
  }

  // Multiline templates with formatting
  multilineTemplates() {
    const { name, projects } = this.userData

    const projectReport = `
╔══════════════════════════════════════╗
║           PROJECT REPORT             ║
╠══════════════════════════════════════╣
║ Developer: ${name.padEnd(25)} ║
║ Total Projects: ${projects.length.toString().padEnd(20)} ║
╠══════════════════════════════════════╣
${projects
  .map(
    (project) => `║ • ${project.name.padEnd(32)} ║
║   Status: ${project.status.padEnd(26)} ║
║   Duration: ${project.duration.padEnd(24)} ║`,
  )
  .join("\n")}
╚══════════════════════════════════════╝
        `.trim()

    return `📊 Multiline Templates:
${projectReport}`
  }

  // Conditional templating patterns
  conditionalTemplating() {
    const { name, experience, skills, projects } = this.userData

    const completedProjects = projects.filter((p) => p.status === "completed").length
    const inProgressProjects = projects.filter((p) => p.status === "in-progress").length

    const statusReport = `
🎯 Developer Status Report:
${name} is a ${experience >= 5 ? "Senior" : experience >= 2 ? "Mid-level" : "Junior"} developer
${skills.length > 3 ? "🌟 Highly skilled" : "📚 Growing skillset"} (${skills.length} skills)
${completedProjects > 0 ? `✅ ${completedProjects} completed project${completedProjects !== 1 ? "s" : ""}` : ""}
${inProgressProjects > 0 ? `🚧 ${inProgressProjects} project${inProgressProjects !== 1 ? "s" : ""} in progress` : ""}
${experience >= 5 && skills.length > 3 ? "🏆 Ready for leadership roles!" : ""}
        `.trim()

    return `🔀 Conditional Templating:
${statusReport}`
  }

  // Template literal functions
  templateFunctions() {
    // Template factory function
    const createEmailTemplate = (type) => {
      const templates = {
        welcome: (name, role) =>
          `
Welcome ${name}! 🎉
We're excited to have you join us as a ${role}.
Your journey starts now!
                `.trim(),

        project: (name, projectName, status) =>
          `
Hi ${name},
Project Update: "${projectName}"
Status: ${status.toUpperCase()}
${status === "completed" ? "🎉 Congratulations!" : "⏳ Keep up the great work!"}
                `.trim(),

        reminder: (name, task, deadline) =>
          `
Reminder for ${name}:
Task: ${task}
Deadline: ${deadline}
⚠️ Don't forget to complete this task!
                `.trim(),
      }

      return templates[type] || (() => "Template not found")
    }

    const welcomeEmail = createEmailTemplate("welcome")
    const projectEmail = createEmailTemplate("project")

    const { name, role, projects } = this.userData
    const welcome = welcomeEmail(name, role)
    const project = projectEmail(name, projects[0].name, projects[0].status)

    return `📧 Template Functions:
Welcome Email:
${welcome}

Project Email:
${project}`
  }

  generatePersonalizedTemplate(name) {
    if (!name.trim()) return "Enter a name to see personalized template..."

    return `
🎨 Personalized Template for: ${name}

Hello ${name}! 👋
${name.length > 10 ? "What a beautiful long name!" : "Nice to meet you!"}
${name.toLowerCase().includes("john") ? "Great name choice! 😊" : ""}
${name.split(" ").length > 1 ? `I see you have ${name.split(" ").length} names.` : ""}

Generated at: ${new Date().toLocaleTimeString()}
        `.trim()
  }

  getSourceCode() {
    return `
// Advanced Template Literal Patterns

// 1. Basic Templates with Expressions
const profile = \`
Name: \${name}
Experience: \${experience} year\${experience !== 1 ? 's' : ''}
Senior: \${experience >= 5 ? '✅ Yes' : '❌ No'}
\`;

// 2. Tagged Template Literals
const highlight = (strings, ...values) => {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
        return result + string + value;
    }, '');
};

const highlighted = highlight\`User \${name} has \${role} role\`;

// 3. SQL Query Builder
const query = (strings, ...values) => {
    const sanitized = values.map(v => 
        typeof v === 'string' ? \`'\${v.replace(/'/g, "''")}'\` : v
    );
    return strings.reduce((result, string, i) => 
        result + string + (sanitized[i] || ''), ''
    );
};

// 4. Conditional Templates
const status = \`
\${name} is \${experience >= 5 ? 'Senior' : 'Junior'}
\${skills.length > 3 ? '🌟 Highly skilled' : '📚 Growing'}
\${completedProjects > 0 ? \`✅ \${completedProjects} completed\` : ''}
\`;

// 5. Template Factory Functions
const createTemplate = (type) => (name, data) => \`
Template for \${name}: \${data}
\`;
        `
  }
}
