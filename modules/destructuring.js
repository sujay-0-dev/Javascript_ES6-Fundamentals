// Advanced Destructuring Patterns Demo
export class DestructuringDemo {
  constructor() {
    this.sampleData = {
      user: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        preferences: {
          theme: "dark",
          notifications: {
            email: true,
            push: false,
            sms: true,
          },
        },
        addresses: [
          { type: "home", city: "New York", zipCode: "10001" },
          { type: "work", city: "San Francisco", zipCode: "94105" },
        ],
      },
      products: [
        { id: 1, name: "Laptop", price: 999, category: "Electronics" },
        { id: 2, name: "Book", price: 29, category: "Education" },
        { id: 3, name: "Coffee", price: 5, category: "Food" },
      ],
    }
  }

  async run() {
    const examples = [
      this.nestedObjectDestructuring(),
      this.arrayDestructuringWithDefaults(),
      this.functionParameterDestructuring(),
      this.dynamicPropertyExtraction(),
      this.restPatternInDestructuring(),
    ]

    const output = examples.join("\n\n")

    return {
      output,
      code: this.getSourceCode(),
    }
  }

  // Complex nested object destructuring
  nestedObjectDestructuring() {
    const {
      user: {
        name,
        email,
        preferences: {
          theme,
          notifications: { email: emailNotif, push: pushNotif = true },
        },
        addresses: [homeAddress, workAddress = { city: "Unknown" }],
      },
    } = this.sampleData

    return `🎯 Nested Object Destructuring:
Name: ${name}
Email: ${email}
Theme: ${theme}
Email Notifications: ${emailNotif}
Push Notifications: ${pushNotif}
Home City: ${homeAddress.city}
Work City: ${workAddress.city}`
  }

  // Advanced array destructuring with defaults and rest
  arrayDestructuringWithDefaults() {
    const { products } = this.sampleData
    const [first, second, third, fourth = { name: "No more products", price: 0 }] = products

    return `📦 Array Destructuring with Defaults:
First Product: ${first.name} - $${first.price}
Second Product: ${second.name} - $${second.price}
Third Product: ${third.name} - $${third.price}
Fourth Product: ${fourth.name} - $${fourth.price}`
  }

  // Function parameter destructuring
  functionParameterDestructuring() {
    const processUser = ({ name, email, preferences: { theme = "light" } = {}, addresses = [] }) => {
      const addressCount = addresses.length
      return `Processing ${name} (${email}) with ${theme} theme and ${addressCount} addresses`
    }

    const result = processUser(this.sampleData.user)
    return `🔧 Function Parameter Destructuring:
${result}`
  }

  // Dynamic property extraction
  dynamicPropertyExtraction() {
    const extractProperties = (obj, ...props) => {
      return props.reduce((result, prop) => {
        const keys = prop.split(".")
        let value = obj

        for (const key of keys) {
          value = value?.[key]
        }

        return { ...result, [prop]: value }
      }, {})
    }

    const extracted = extractProperties(this.sampleData, "user.name", "user.preferences.theme", "user.addresses.0.city")

    return `🎪 Dynamic Property Extraction:
${JSON.stringify(extracted, null, 2)}`
  }

  // Rest pattern in destructuring
  restPatternInDestructuring() {
    const {
      products: [firstProduct, ...restProducts],
    } = this.sampleData
    const {
      user: { name, email, ...otherUserData },
    } = this.sampleData

    return `🔄 Rest Pattern in Destructuring:
First Product: ${firstProduct.name}
Remaining Products: ${restProducts.length} items
User Core: ${name}, ${email}
Other User Data Keys: ${Object.keys(otherUserData).join(", ")}`
  }

  getSourceCode() {
    return `
// Advanced Destructuring Patterns

// 1. Nested Object Destructuring with Defaults
const {
    user: {
        name,
        preferences: {
            notifications: { email: emailNotif, push: pushNotif = true }
        },
        addresses: [homeAddress, workAddress = { city: 'Unknown' }]
    }
} = complexData;

// 2. Function Parameter Destructuring
const processUser = ({
    name,
    email,
    preferences: { theme = 'light' } = {},
    addresses = []
}) => {
    // Process user with destructured parameters
};

// 3. Dynamic Property Extraction
const extractProperties = (obj, ...props) => {
    return props.reduce((result, prop) => {
        const keys = prop.split('.');
        let value = obj;
        for (const key of keys) {
            value = value?.[key];
        }
        return { ...result, [prop]: value };
    }, {});
};

// 4. Rest Pattern in Destructuring
const [first, ...rest] = array;
const { name, email, ...otherData } = user;
        `
  }
}
