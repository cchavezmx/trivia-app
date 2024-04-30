import "bulma/css/bulma.css"
import './style.css'

/* const inicio = document.querySelector("#inicio")
inicio.addEventListener("click", () => {
  axios.get("https://opentdb.com/api.php?amount=10")
  .then(res => {
    // localStorage solo almacena datos de texto
    localStorage.setItem('preguntas', JSON.stringify(res.data.results))
    window.location = "/questions.html"
  })
})
 */

//
document.addEventListener("DOMContentLoaded", () => {
  const preguntas = localStorage.getItem("preguntas")
  // como lo guarde en string lo paso a Objeto
  const arrayPreguntas = JSON.parse(preguntas)  
  arrayPreguntas.forEach((item, index) => {
    const correct = item.correct_answer
    //creo un arreglo con las preguntas incorrectas y las correctas
    // para poder pintarlas
    const allQuestions = [...item.incorrect_answers, correct]

    const div = document.createElement("div")
    div.style = "margin: 40px 0;"
    div.innerHTML = `
      <div class="pregunta">        
        <h4 id="currentPregunta">
          ${item.question}
        </h4>
      </div>
      <div class="respuestas" id="respuestas${index}">        
      </div>
    `
    const anchorQuestions = document.querySelector("#anchor-questions")
    anchorQuestions.appendChild(div)     
    const anchorOptions = document.querySelector("#respuestas"+index)

    allQuestions    
    .forEach(pregunta => {
      const btn = document.createElement("button")      
      btn.innerHTML = `<span>${pregunta}</span>`
      btn.addEventListener('click', (e) => {
        // disable all questions         
        if (pregunta === correct) {
          // logica para guardar la respuesta correcta en el localStorage
          // ya esta implentandas algunas cosas, como que al seleccionar una repuesta correcta, esta se añade a un arreglo                    
          const userResponse = localStorage.getItem("user_response")
          if (userResponse) {
            const lastResponse = JSON.parse(userResponse)
            const currentResponse = [...lastResponse, {item}]
            localStorage.setItem("user_response", JSON.stringify(currentResponse))
          } else  {
            const current = [{item}]
            localStorage.setItem("user_response", JSON.stringify(current))
          }
        }
      })
      anchorOptions.appendChild(btn)
    })
  
  })
})
