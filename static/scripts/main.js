let reparaciones = []
let modificando = false
let reparacionId = null
let contenido = null
let contador = 1
let estados = null 


let listaClientes = []

const FormUsuarios = document.querySelector('#FormUsuarios');
const ReparacionesLista = document.querySelector('#ListaReparaciones');
const nombre_cliente = document.querySelector('#nombre_cliente');
const most_clientes =document.querySelector('#mostrar_clientes')
const estadoReparacion = document.querySelector('#estadoRepa')
const modifi = FormUsuarios.querySelector('#botonAlta')


const campoNumero = document.querySelector('#nro_repa');
const AbrirModal = document.querySelector('.BotonAbrirModal');
const Modal = document.querySelector('.Modal');
const CerrarModal = document.querySelector('.CerrarModal');

AbrirModal.addEventListener('click', ()=>{
    Modal.classList.add('MostrarModal');
    document.getElementById("footer").style.display = "none";
    campoNumero.style.display="none";
    modifi.innerHTML="Dar de alta";
    modifi.style.background="linear-gradient(90deg, rgba(50,97,7,1) 0%, rgb(63, 110, 16) 37%, rgba(23,78,0,1) 100%)"

    estados = FormUsuarios['estado'].value
    console.log(estados)
    mostarEstados(estados)
});

CerrarModal.addEventListener('click', ()=>{
    Modal.classList.remove('MostrarModal');
    document.getElementById("footer").style.display = "";
    FormUsuarios.reset();
});

/* mostar clientes */
window.addEventListener("DOMContentLoaded", async() => {
    const response = await fetch("/reparaciones");
    const data = await response.json()
    reparaciones = data
    contenido = reparaciones.length
    mostrarData(reparaciones)

    data_clientes = await cargar_clientes()
    listaClientes = data_clientes
    mostrar_clientes_ol(listaClientes)
    estados = estadoReparacion.value
    console.log(estados)
    mostarEstados(estados)
    
});

/*##################### input  elejir cliente #######################*/
async function cargar_clientes(){
    const response = await fetch("/clientes")
    return await response.json()
}

const crearItemClientes = cliente => cliente.map(cliente =>
    `<option value = ${cliente._id}> ${cliente.nombre_apellido}</option>`)

    
function mostrar_clientes_ol(cliente){
    const stringCliente = crearItemClientes(cliente)
    most_clientes.innerHTML=`<option value ="buscar_cliente" selected>Buscar Cliente</option>${stringCliente}`
}

most_clientes.addEventListener('change', async e =>{
    
    const clienteSelecinado = listaClientes.filter(listaClientes => listaClientes._id.includes(most_clientes.value))
    console.log(most_clientes.value)
    if (most_clientes.value == "buscar_cliente"){
        FormUsuarios['nombre_apellido'].value = "";
        FormUsuarios['telefono'].value = "";
        FormUsuarios['email'].value = "";
        FormUsuarios['domicilio'].value = "";
        FormUsuarios['localidad'].value = "";
        FormUsuarios['provincia'].value = "";
    }else{
        clienteSelecinado.map(clienteSelecinado =>`${
        FormUsuarios['nombre_apellido'].value = clienteSelecinado.nombre_apellido,
        FormUsuarios['telefono'].value = clienteSelecinado.telefono,
        FormUsuarios['email'].value = clienteSelecinado.email,
        FormUsuarios['domicilio'].value = clienteSelecinado.domicilio,
        FormUsuarios['localidad'].value = clienteSelecinado.localidad,
        FormUsuarios['provincia'].value = clienteSelecinado.provincia}`)
    }
})


/*######################################################*/

/*##################### estados de reparacion inputs #################################*/



function mostarEstados(estado){
    if (estado == "ingresada"){
        FormUsuarios.querySelector('#defEncontrado').style.display = "none";
        FormUsuarios.querySelector('#valRepa').style.display = "none";
        FormUsuarios.querySelector('#fact').style.display = "none";
        FormUsuarios.querySelector('#fechaRepa').style.display = "none";
        FormUsuarios.querySelector('#fechaRet').style.display = "none";
        

    }
    
    if (estado == "revision presupuesto"){
        FormUsuarios.querySelector('#defEncontrado').style.display = "none";
        FormUsuarios.querySelector('#valRepa').style.display = "none";
        FormUsuarios.querySelector('#fact').style.display = "none";
        FormUsuarios.querySelector('#fechaRepa').style.display = "none";
        FormUsuarios.querySelector('#fechaRet').style.display = "none";
    }
    
    if (estado == "en curso"){
        FormUsuarios.querySelector('#defEncontrado').style.display = "";
        FormUsuarios.querySelector('#valRepa').style.display = "";
        FormUsuarios.querySelector('#fechaRepa').style.display = "none";
        FormUsuarios.querySelector('#fact').style.display = "none";
        FormUsuarios.querySelector('#fechaRet').style.display = "none";

    }
    
    
    
    if (estado == "espera confirmacion presupuesto"){
        FormUsuarios.querySelector('#defEncontrado').style.display = "";
        FormUsuarios.querySelector('#valRepa').style.display = "";
        FormUsuarios.querySelector('#fechaRepa').style.display = "none";
        FormUsuarios.querySelector('#fact').style.display = "none";
        FormUsuarios.querySelector('#fechaRet').style.display = "none";

    }
    
    if (estado == "reparada/terminada"){
        FormUsuarios.querySelector('#defEncontrado').style.display = "";
        FormUsuarios.querySelector('#valRepa').style.display = "";
        FormUsuarios.querySelector('#fechaRepa').style.display = "";
        FormUsuarios.querySelector('#fact').style.display = "none";
        FormUsuarios.querySelector('#fechaRet').style.display = "none";

    }
    if (estado == "retirada/enviada"){
        FormUsuarios.querySelector('#defEncontrado').style.display = "";
        FormUsuarios.querySelector('#valRepa').style.display = "";
        FormUsuarios.querySelector('#fact').style.display = "";
        FormUsuarios.querySelector('#fechaRepa').style.display = "";
        FormUsuarios.querySelector('#fechaRet').style.display = "";
        
    }
}

estadoReparacion.addEventListener('change', async e=> {
    estados = FormUsuarios['estado'].value
    mostarEstados(estados)
    
}) 

/*######################################################*/

function mostrarData(reparaciones){
    
    ReparacionesLista.innerHTML =''

    reparaciones.forEach(repa => {
        const reparacionItem = document.createElement('li')
        reparacionItem.innerHTML = `
            <div class="ModuloRep">
                <img class="Usuario" src="./static/images/vista-de-calle.png" alt="Logo">

                <label for="${repa.nro_reparacion}">
                    <div class="drop">
                        <h3>${repa.nombre_apellido}</h3> | <h3>Nro° de Reparacion<p>${repa.nro_reparacion}</p></h3>
                    </div>
                    <div class="ColorEstado" id="div${contador}">${repa.estado}</div>
                </label>               
                
                    <input type="checkbox" class="touch" id="${repa.nro_reparacion}"> 

                <div class="slide">
                    <div class="DatosModulo">
                        <h3>Telefono<p>${repa.telefono}</p></h3>
                        <h3>Email<p>${repa.email}</p></h3>
                        <h3>Domicilio<p>${repa.domicilio}</p></h3>
                        <h3>Localidad<p>${repa.localidad}</p></h3> 
                        <h3>Provincia<p>${repa.provincia}</p></h3>
                        <h3>Producto<p>${repa.producto}</p></h3>
                        <h3>Falla<p>${repa.falla}</p></h3>
                        <h3>Defecto encontrado<p>${repa.defecto_encontrado}</p></h3>
                        <h3>Factura<p>${repa.factura}</p></h3>
                        <h3>Valor reparacion<p>${repa.valor_reparacion}</p></h3>
                        <h3>Fecha alta<p>${repa.fecha_alta}</p></h3>
                        <h3>Fecha de reparacion<p>${repa.fecha_reparacion}</p></h3>
                        <h3>Fecha de retiro<p>${repa.fecha_retiro}</p></h3>
                    </div>
                </div>

                <button class="botonModificar CerrarModal">Modificar</button>
                <button class="botonEliminar CerrarModal">Eliminar</button>
            </div>
        `

            const btnEliminar = reparacionItem.querySelector('.botonEliminar')
                btnEliminar.addEventListener('click', async () => {
                    const seguro = confirm('Esta seguro de eliminar este Cliente')

                    if (seguro){
                        const response = await fetch(`/reparacion/${repa.id}`,{
                            method:'DELETE',
                            headers:{
                                'Content-Type' : 'application/json',
                                    }
                        })
                        const data = await response.json()
                        const cons_response = await fetch("/reparaciones");
                        const cons_data = await cons_response.json()
                        reparaciones = cons_data
                        contenido = reparaciones.length
                        mostrarData(reparaciones)
                        alert(`${data.msg}`)
                        
                    }
            });
/*###################################################################################*/           
            const btnModificar = reparacionItem.querySelector('.botonModificar')
                    btnModificar.addEventListener('click', async() => {
                        campoNumero.style.display="flex"
                        modificando = true
                        
                        estados = repa.estado
                        console.log(estados)
                        mostarEstados(estados)
                        
                        const response = await fetch (`/reparacion/${repa.id}`);
                        const data = await response.json()
                        Modal.classList.add('MostrarModal')
                        
                        modifi.innerHTML="Modificar"
                        modifi.style.background="#f0ad4e"
                        
                        FormUsuarios['nombre_apellido'].value = repa.nombre_apellido
                        FormUsuarios['telefono'].value = repa.telefono
                        FormUsuarios['email'].value = repa.email
                        FormUsuarios['domicilio'].value = repa.domicilio
                        FormUsuarios['localidad'].value = repa.localidad
                        FormUsuarios['provincia'].value = repa.provincia
                        FormUsuarios['nro_reparacion'].value = repa.nro_reparacion
                        FormUsuarios['producto'].value = repa.producto
                        FormUsuarios['falla'].value = repa.falla
                        FormUsuarios['defecto_encontrado'].value = repa.defecto_encontrado
                        FormUsuarios['factura'].value = repa.factura
                        FormUsuarios['valor_reparacion'].value = repa.valor_reparacion
                        FormUsuarios['fecha_alta'].value = repa.fecha_alta
                        FormUsuarios['fecha_reparacion'].value = repa.fecha_reparacion
                        FormUsuarios['fecha_retiro'].value = repa.fecha_retiro
                        FormUsuarios['estado'].value = repa.estado
                        
                        reparacionId = repa.id
                    });
            
/*###################################################################################*/
            
            
            ReparacionesLista.append(reparacionItem)

            const reparacionTarjeta = document.querySelector(`#div${contador}`);
            color = repa.estado
            
            if (color == "ingresada"){
                reparacionTarjeta.style.background = "rgba(220, 20, 60, 0.507)";
                reparacionTarjeta.style.border = "solid 2px crimson";
                FormUsuarios.querySelector('#defEncontrado').style.display = "none";
                

            }
            if (color == "revision presupuesto"){
                reparacionTarjeta.style.background = "rgba(255, 127, 80, 0.61)";
                reparacionTarjeta.style.border = "solid 2px coral";

            }
            if (color == "espera confirmacion presupuesto"){
                reparacionTarjeta.style.background = "rgba(240, 255, 255, 0.616)";
                reparacionTarjeta.style.border = "solid 2px azure";

            }
            if (color == "en curso"){
                reparacionTarjeta.style.background = "rgba(0, 255, 255, 0.582)";
                reparacionTarjeta.style.border = "solid 2px aqua";

            }
            if (color == "reparada/terminada"){
                reparacionTarjeta.style.background = "rgba(0, 0, 128, 0.637)";
                reparacionTarjeta.style.border = "solid 2px navy";

            }
            if (color == "retirada/enviada"){
                reparacionTarjeta.style.background = "rgba(0, 128, 0, 0.637)";
                reparacionTarjeta.style.border = "solid 2px green";
            }
            contador = contador + 1
        });
}






FormUsuarios.addEventListener('submit', async e=>{
    e.preventDefault()
    const nombre_apellido = FormUsuarios['nombre_apellido'].value
    const telefono = FormUsuarios['telefono'].value
    const email = FormUsuarios['email'].value
    const domicilio = FormUsuarios['domicilio'].value
    const localidad = FormUsuarios['localidad'].value
    const provincia = FormUsuarios['provincia'].value
    const nro_reparacion = FormUsuarios['nro_reparacion'].value
    const producto = FormUsuarios['producto'].value
    const falla = FormUsuarios['falla'].value
    const defecto_encontrado = FormUsuarios['defecto_encontrado'].value
    const factura = FormUsuarios['factura'].value
    const valor_reparacion = FormUsuarios['valor_reparacion'].value
    const fecha_alta = FormUsuarios['fecha_alta'].value
    const fecha_reparacion = FormUsuarios['fecha_reparacion'].value
    const fecha_retiro = FormUsuarios['fecha_retiro'].value
    const estado = FormUsuarios['estado'].value

    if(!modificando){
        const response = await fetch('/reparacion', {
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
                "producto": producto,
                "falla": falla,
                "defecto_encontrado": defecto_encontrado,
                "factura": factura,
                "valor_reparacion": valor_reparacion,
                "fecha_alta": fecha_alta,
                "fecha_reparacion": fecha_reparacion,
                "fecha_retiro": fecha_retiro,
                "estado": estado
            })/*json*/
        })/*response*/
        const NuevoUsuario = await response.json();
        alert(NuevoUsuario['msg']);
    }else{
        const response = await fetch(`/reparacion/${reparacionId}`,{
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
                "nro_reparacion":nro_reparacion,
                "producto": producto,
                "falla": falla,
                "defecto_encontrado": defecto_encontrado,
                "factura": factura,
                "valor_reparacion": valor_reparacion,
                "fecha_alta": fecha_alta,
                "fecha_reparacion": fecha_reparacion,
                "fecha_retiro": fecha_retiro,
                "estado": estado
            })
        })
        const reparacionModificada = await response.json();
        alert(reparacionModificada['msg'])
        modificando = false
        reparacionId = null  
    }   




Modal.classList.remove('MostrarModal');
const response = await fetch("/reparaciones");
const data = await response.json()
reparaciones = data
contenido = reparaciones.length
mostrarData(reparaciones)
FormUsuarios.reset();
})