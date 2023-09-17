import { server } from "./server"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")
const fullContent = document.querySelector("#fullContent")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  fullContent.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser um shorts.")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."
  fullContent.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID)

  fullContent.textContent = transcription.data.result
  fullContent.classList.remove("placeholder")

  content.textContent = "realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })
  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
