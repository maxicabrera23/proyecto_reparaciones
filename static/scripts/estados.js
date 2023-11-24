console.log("hola mundo")
/*const CerrarModal = document.querySelector('#BotonBuscar');
const Contenedor = document.querySelector('#EContenedorModal');
const Form = document.querySelector('#EFormModal');*/
let estado = []
const FormEstados = document.querySelector('#EForm');
const estadoInfo = document.querySelector('#Info')

FormEstados.addEventListener('submit', async e =>{
    e.preventDefault()
    estadoInfo.style.background = "none";
    estadoInfo.style.border = "none";
    
    const nro_reparacion = FormEstados['nro_reparacion'].value
    console.log(nro_reparacion)
    
    let tipo =!isNaN(nro_reparacion)
    console.log(tipo)
    url = `/buscar?objetivo=${nro_reparacion}&tipo=${tipo}`

    const response = await fetch(url)
    
    // const response = await fetch('/estados/'+nro_reparacion+'')
    const data = await response.json()
    estado = data
    renderEstados(estado[0])
    

    FormEstados.reset();

    function renderEstados(estado){
        
        estadoInfo.innerHTML= ''

        estado.forEach(est => {
            color = est.estado 
            if (color == "ingresada"){
                estadoInfo.style.background = "rgba(96, 8, 8, 0.78)";
                estadoInfo.style.border = "solid 2px #9e2121";
            
            }else if (color == "revision presupuesto"){
                estadoInfo.style.background = "rgb(240 184 46 / 59%)";
                estadoInfo.style.border = "2px solid rgb(196 171 79)";
            
            }else if (color == "espera confirmacion presupuesto"){
                estadoInfo.style.background = "rgba(13, 13, 13, 0.79)";
                estadoInfo.style.border = "solid 2px black";
            
            }else if (color == "en curso"){
                estadoInfo.style.background = "rgba(3, 93, 165, 0.64)";
                estadoInfo.style.border = "solid 2px #2694df";
            
            }else if (color == "reparada/terminada"){
                estadoInfo.style.background = "rgb(44 44 172 / 64%)";
                estadoInfo.style.border = "2px solid #4f4fc1de";
            }else if (color == "retirada/enviada"){
            
                estadoInfo.style.background = "rgb(85 169 85 / 89%)";
                estadoInfo.style.border = "2px solid rgb(29 135 29)";
            }
 

            const estadoItem = document.createElement('li')
            estadoItem.innerHTML = `
            <center><h3>N° ${est.nro_reparacion}</h3></center><br>
            <center><h3>${color}</h3></center><br>
            <div class="infoRepa">
            <div class="columnaIzqestado"> 
            <p class="campo">Fecha Ingreso: </p> <p> ${est.fecha_alta}</p>
            <p class="campo">Nombre y apellido:</p><p> ${est.nombre_apellido}</p>
            <p class="campo">Producto:</p><p> ${est.producto}</p>
            <p class="campo">Falla denunciada:</p><p> ${est.falla}</p>
            </div>
            <div class="columnaDerestado"> 
            <p class="campo">Fecha de Reparación:</p><p> ${est.fecha_reparacion}</p>
            <p class="campo">Defecto Encontrado:</p><p> ${est.defecto_encontrado}</p> 
            <p class="campo">Fecha de Retiro/Envio:</p><p> ${est.fecha_retiro}</p>
            </div> 
            </div>
            `
            // cambie los h3 por p, les agregue la clase campo a los titulos para ponerlos en negrita 
            // Habria que poner tambien el numero de reparacion en el div que se despliega con toda la info
            // cuando buscas el estado se borra el n° del buscador y no sabes cual estas viendo :( //
        estadoInfo.append(estadoItem)
        })
    }
})
/*INGRESADA - revision presupuesto -espera confirmacion presupuesto -EN CURSO – REPARADA/TERMINADA – ENVIADA*/

