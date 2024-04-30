import "bulma/css/bulma.css"
import './style.css'
import axios from 'axios'


const inicio = document.querySelector("#inicio")
inicio.addEventListener("click", () => {
  axios.get("https://opentdb.com/api.php?amount=10")
  .then(res => {
    // localStorage solo almacena datos de texto
    localStorage.setItem('preguntas', JSON.stringify(res.data.results))
    window.location = "/questions.html"
  })
})

