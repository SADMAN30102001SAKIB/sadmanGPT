import { config } from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"
import readline from "readline"

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
)

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const greetings = ["Hello!", "Hi there!", "Greetings!", "Nice to meet you!"]
const prompts = [
  "\n\n-- What can I help you with today?\n",
  "\n\n-- How can I assist you?\n",
  "\n\n-- What do you need help with?\n",
]

console.log(`-- ${greetings[Math.floor(Math.random() * greetings.length)]} I'm here to help!`)
userInterface.prompt()

userInterface.on("line", async input => {
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  })
  const message = response.data.choices[0].message.content
  console.log("\n" + message)
  
  if (message.startsWith("Sure, I can help you with ")) {
    console.log("\n\n-- Great! What else can I help you with?\n")
  } else if (message.startsWith("Sorry, I didn't understand ")) {
    console.log("\n\n-- I'm sorry, could you please rephrase your request?\n")
  } else {
    console.log(`${prompts[Math.floor(Math.random() * prompts.length)]}`)
  }
  
  userInterface.prompt()
})
