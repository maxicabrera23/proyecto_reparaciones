let clientes = []
let modificando = false
let clienteId = null
let contenido = null
let contador = 1

const FormClientes = document.querySelector('#EFormClientes');
const clienteLista = document.querySelector('#ListaClientes')


const AbrirModal = document.querySelector('.BotonAbrirModal');
const Modal = document.querySelector('.Modal');
const CerrarModal = document.querySelector('.CerrarModal');
const modifi = FormClientes.querySelector('#botonAlta')

AbrirModal.addEventListener('click', ()=>{
    modificando = false
    FormClientes.reset();
    Modal.classList.add('MostrarModal');
    document.getElementById("footer").style.display = "none";
    modifi.innerHTML="Agregar cliente"

});

CerrarModal.addEventListener('click', ()=>{
    Modal.classList.remove('MostrarModal');
    document.getElementById("footer").style.display = "";
});


console.log(modificando)



/* mostar clientes */
window.addEventListener("DOMContentLoaded", async() => {
    const ruta = "/clientes?page=1&limit=10&offset=0"
    var respuesta = await cargar(ruta) 
    console.log(respuesta)
    contenido = clientes.length
    mostrarData(respuesta)
    
});

async function cargar(ruta) {
    const response = await fetch(ruta);
    const data = await response.json()
    reparaciones = data
    
    return reparaciones
}


var estadocliente = false
function mostrar(id){
    console.log("clic")
        if (estadocliente == false){
        document.getElementById(id).style.display = "flex";
        document.getElementById(id).style.transition = " 1s ease";
        estadocliente = true
    }else{
        document.getElementById(id).style.display = "none";
        estadocliente = false
    }
    
}

    function mostrarData(clientes){
        /*if (contenido == 0){

        }*/
        clientes.sort()
        console .log(`los datos actuales de clientes son: ${clientes[1]}`)
        clienteLista.innerHTML =''

        clientes[1].forEach(clie => {
            const clienteItem = document.createElement('li')
            clienteItem.innerHTML = `
            <div class="ModuloRep">
            <div class="infoOculta">
                        
                        <div class="usuarioCliente" onclick="mostrar(${contador})">
                        <img class="Usuario" src="./static/images/user.svg" alt="Logo">
                        <label for="${clie.nombre_apellido}">
                            <div class="drop">
                                <h3>${clie.nombre_apellido}</h3>
                            </div>
                        </label>
                        
                        </div>     
                        
                        <div class="acciones">
                            <button class="botonModificar CerrarModal"><img class="icon_b" src="./static/images/edit.png"></button>
                            <button class="botonEliminar CerrarModal"><img alt="anular" class="icon_b"  src="./static/images/anular.svg"></button>
                        </div>
            </div>
            
                <div class="slide" id='${contador}'>
                        <div class="DatosModulo">
                            <div class="columnaIzq">
                                <div class="datoCliente fechaService">
                                    <h3>Telefono:</h3>
                                    <p>${clie.telefono}</p>
                                </div>
                                <div class="datoCliente falla">
                                    <h3>Mail:</h3>
                                    <p>${clie.email}</p>
                                </div>
                                <div class="datoCliente falla">
                                    <h3>Domicilio:</h3>
                                    <p>${clie.domicilio}</p>
                                </div>
                        
                            </div>
                        <div class="columnaCentro">
                                
                              
                                <div class="datoCliente defecto">
                                    <h3>Localidad:</h3>
                                    <p>${clie.localidad}</p>
                                </div>
                                <div class="datoCliente defecto">
                                    <h3>Provincia:</h3>
                                    <p>${clie.provincia}</p>
                                </div>


                            
                            
                        </div>
            
            
            
            </div>                   
        `
        // <div class="ModuloRep">
        //     <div class="infoOculta">
        //                       <!--  <div class="info" onclick="mostrar(${contador})">
        //                             <p class="nombreCliente">${clie.nombre_apellido}</p>
        //                         </div> --> 
                            
        //                     <div class="acciones">
        //                             <button class="botonModificar CerrarModal"><img class="icon_b" src="./static/images/edit.png"></button>
        //                             <button class="botonImprimir CerrarModal"><img class="icon_b" src="./static/images/print.svg"></button>
        //                             <button class="botonEliminar CerrarModal"><img alt="anular" class="icon_b"  src="./static/images/anular.svg"></button>
        //                     </div>
        //         </div>
        //     </div>    
        //     <!--<div class="ModuloRep">
        //     <img class="Usuario" src="./static/images/vista-de-calle.png" alt="Logo">
        //     <label for="${clie.nombre_apellido}">
        //         <div class="drop">
        //             <h3>${clie.nombre_apellido}</h3>
        //         </div>
        //     </label>

        //     <input type="checkbox" class="touch" id="${clie.nombre_apellido}">

        //     <div class="slide">
        //         <div class="DatosModulo">
        //         <h3>Telefono<p>${clie.telefono}</p></h3>
        //         <h3>Email<p>${clie.email}</p></h3>
        //         <h3>Domicilio<p>${clie.domicilio}</p></h3>
        //         <h3>Localidad<p>${clie.localidad}</p></h3> 
        //         <h3>Provincia<p>${clie.provincia}</p></h3>
        //         </div>
        //     </div>
            
        //     <button class="botonModificar CerrarModal">Modificar</button>
        //     <button class="botonEliminar CerrarModal">Eliminar</button>
        //     </div> -->
        //     `

            
                const btnEliminar = clienteItem.querySelector('.botonEliminar')

                    btnEliminar.addEventListener('click', async () => {
                        const seguro = confirm('Está seguro que desea eliminar este Cliente?')

                        if (seguro){

                            const response = await fetch(`/cliente/${clie._id}`,{
                                method:'DELETE',
                                headers:{
                                    'Content-Type' : 'application/json',
                                }
                            })
                            const data = await response.json()
                            /*clientes = clientes.filter(clie => clie._id != data._id)*/
                            const response_clientes = await fetch("/clientes");
                            const data_clientes = await response_clientes.json()
                            clientes = data_clientes
                            mostrarData(clientes)
                            alert(`${data.msg}`)
                            
                            /*const data = await response.json()
                            clientes = clientes.filter(clie => clie._id != data._id)
                            clienteLista.append(clientes)
                            mostrarData(clientes)*/
                        }
                    });
                const btnModificar = clienteItem.querySelector('.botonModificar')
                    btnModificar.addEventListener('click', async() => {
                        modificando = true
                        const response = await fetch (`/cliente/${clie._id}`);
                        const data = await response.json()
                        Modal.classList.add('MostrarModal')
                        modifi.innerHTML="Modificar"
                        FormClientes['nombre_apellido'].value = data.nombre_apellido
                        FormClientes['telefono'].value = data.telefono
                        FormClientes['email'].value = data.email
                        domicilio = FormClientes['domicilio'].value = data.domicilio
                        FormClientes['localidad'].value = data.localidad
                        provincia = FormClientes['provincia'].value = data.provincia
                        
                        console.log(modificando)
                        clienteId = data._id
                        console.log(clienteId)
                    });
        
        let contenido = clientes.length

        clienteLista.append(clienteItem)
        contador = contador + 1  
        });
    }
/* crear clientes */
FormClientes.addEventListener('submit', async e =>{
    e.preventDefault()

    const nombre_apellido = FormClientes['nombre_apellido'].value
    const telefono = FormClientes['telefono'].value
    const email = FormClientes['email'].value
    const domicilio = FormClientes['domicilio'].value
    const localidad = FormClientes['localidad'].value
    const provincia = FormClientes['provincia'].value
    
    if (!modificando){
        console.log(`el valor de modificando es: ${modificando}`)
        const response = await fetch('/cliente', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                "nombre_apellido": nombre_apellido,
                "telefono": telefono,
                "email": email,
                "domicilio": domicilio,
                "localidad": localidad,
                "provincia": provincia,
            })
        })
    const NuevoCliente = await response.json();
    console.log(NuevoCliente)
    /*clientes.unshift(NuevoCliente)*/
    const response_clientes = await fetch("/clientes?page=1&limit=10&offset=0");
    const data_clientes = await response_clientes.json()
    clientes = data_clientes
    swal("Cliente creado!", "Se agregó el nuevo cliente.", "success");
    // alert(NuevoCliente['msg']);
        
        
    }else{
        const response = await fetch(`/cliente/${clienteId}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "nombre_apellido": nombre_apellido,
                "telefono": telefono,
                "email": email,
                "domicilio": domicilio,
                "localidad": localidad,
                "provincia": provincia,
            })
        })
        const clienteModificado = await response.json();
        console.log(clienteModificado)
        swal("Listo!", "Cliente modificado.", "success");
        // alert(clienteModificado['msg'])
        /*clientes = clientes.map(clientes => clientes._id === clienteModificado._id ? clienteModificado: clientes)*/
        const response_clientes = await fetch("/clientes?page=1&limit=10&offset=0");
        const data_clientes = await response_clientes.json()
        clientes = data_clientes
        console .log(`los datos actuales de clientes en modificar son: ${clientes}`)
        modificando = false
        clienteId = null  
    }
mostrarData(clientes)
FormClientes.reset();
Modal.classList.remove('MostrarModal');


    /* mostrarData(clientes) location.reload() location.reload();*/
})








/*

FormEstados.addEventListener('submit', async e =>{
    e.preventDefault()
    estadoInfo.style.background = "none";
    estadoInfo.style.border = "none";
    
    const nro_reparacion = FormEstados['nro_reparacion'].value
    console.log(nro_reparacion)

    const response = await fetch('/estados/'+nro_reparacion+'')
    const data = await response.json()
    estado = data
    renderEstados(estado)
    

    FormEstados.reset();

    function renderEstados(estado){
        
        estadoInfo.innerHTML= ''

        estado.forEach(est => {
            color = est.estado 
            if (color == "ingresada"){
                estadoInfo.style.background = "rgba(220, 20, 60, 0.507)";
                estadoInfo.style.border = "solid 2px crimson";
            
            }else if (color == "revision presupuesto"){
                estadoInfo.style.background = "rgba(255, 127, 80, 0.61)";
                estadoInfo.style.border = "solid 2px coral";
            
            }else if (color == "espera confirmacion presupuesto"){
                estadoInfo.style.background = "rgba(240, 255, 255, 0.616)";
                estadoInfo.style.border = "solid 2px azure";
            
            }else if (color == "en curso"){
                estadoInfo.style.background = "rgba(0, 255, 255, 0.582)";
                estadoInfo.style.border = "solid 2px aqua";
            
            }else if (color == "reparada/terminada"){
                estadoInfo.style.background = "rgba(0, 0, 128, 0.637)";
                estadoInfo.style.border = "solid 2px navy";
            
            }else if (color == "retirada/enviada"){
                estadoInfo.style.background = "rgba(0, 128, 0, 0.637)";
                estadoInfo.style.border = "solid 2px green";
            }


            const estadoItem = document.createElement('li')
            estadoItem.innerHTML = `
            <center><h2>Estado: ${color}</h2></center><br>
            <h3>Fecha Ingreso: ${est.fecha_alta}</h3>
            <h3>Nombre y apellido: ${est.nombre_apellido}</h3>
            <h3>Producto: ${est.producto}</h3>
            <h3>Fecha de Reparacion: ${est.fecha_reparacion}</h3>
            <h3>Falla: ${est.falla}</h3>
            <h3>Defecto Encontrado: ${est.defecto_encontrado}</h3> 
            <h3>Fecha de Retiro/Envio: ${est.Fecha_retiro}</h3>
            `
        estadoInfo.append(estadoItem)
        })
    }
})
*/