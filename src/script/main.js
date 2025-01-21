document.addEventListener("DOMContentLoaded", function () {
       const form = document.getElementById("form_request").addEventListener('submit',function(evento){
             evento.preventDefault();
              let numeroMaximo = document.querySelector('input').value;
                     numeroMaximo = parseInt(numeroMaximo);

                     let numeroAleatorio = Math.random()*numeroMaximo+1;
                     numeroAleatorio = Math.floor(numeroAleatorio );

                     document.getElementById('resul').innerText=numeroAleatorio;
                     document.querySelector(".resultado").style.display = "flex";
       })
})