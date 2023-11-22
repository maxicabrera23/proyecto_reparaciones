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
const divPaginacion = document.querySelector('#paginacion')
let buscar = document.getElementById('buscador');

AbrirModal.addEventListener('click', ()=>{
    Modal.classList.add('MostrarModal');
    document.getElementById("footer").style.display = "none";
    campoNumero.style.display="none";
    modifi.innerHTML="Guardar";
    modifi.style.background="#0d860dcf";

    estados = FormUsuarios['estado'].value
    console.log(estados)
    mostarEstados(estados)
});

CerrarModal.addEventListener('click', ()=>{
    Modal.classList.remove('MostrarModal');
    document.getElementById("footer").style.display = "";
    FormUsuarios.reset();
});

/* mostar reparaciones */
window.addEventListener("DOMContentLoaded", async() => {
    const ruta = "/reparaciones?page=1&limit=10&offset=0";
    var respuesta = await cargar(ruta)
    console.log(respuesta)
    divPaginacion.innerHTML = `<input id=anterior type="button" value="anterior"> -- page: ${respuesta[1].pagina} --  <input id="siguiente" type="button" value="Siguiente">`
    
    // console.log(respuesta)
    
    
    contenido = reparaciones.length
    mostrarData(respuesta)

    data_clientes = await cargar_clientes()
    listaClientes = data_clientes
    mostrar_clientes_ol(listaClientes)
    estados = estadoReparacion.value
    // console.log(estados)
    mostarEstados(estados)
    
});

/*##################### input  elejir cliente #######################*/
async function cargar_clientes(){
    const response = await fetch("/clientes1")
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
async function link(link){
    res = await cargar(link)
    // console.log(`respuesta desde link:${res[0]} , ${res[1].anterior} , ${res[1].siguiente}`)
    
    
    // bprev.addEventListener('click' , async() =>{
    //     link(res[1].anterior)
    // })
    // bSig.addEventListener('click' , async() =>{
    //     link(res[1].siguiente)
    // })
    
    
    // respuesta = res
    mostrarData(res)
    return res
    
}


async function cargar(ruta) {
    const response = await fetch(ruta);
    const data = await response.json()
    reparaciones = data
    
    return reparaciones

}
var estadorepa = false
function mostrar(id){
    
    if (estadorepa == false){
        document.getElementById(id).style.display = "flex";
        document.getElementById(id).style.transition = " 1s ease";
        estadorepa = true
    }else{
        document.getElementById(id).style.display = "none";
        estadorepa = false
    }
    
}

function busca(value){
    console.log(value)
}


function mostrarData(reparaciones){
    // Botones de paginacion y pagina. 
    divPaginacion.innerHTML = divPaginacion.innerHTML = `<button id="anterior"><svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 320 512"><style>svg{fill:#ffffff}</style><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button> <p class="pagina"> Pág. ${reparaciones[1].pagina}  </p><button id="siguiente" class="botones"><svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 320 512"><style>svg{fill:#ffffff}</style><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg></button>`

    var bprev = document.getElementById("anterior")
    bprev.addEventListener('click' , async() =>{
        const nuevoParp = await link(reparaciones[1].anterior)
    })
    
    var bSig = document.getElementById("siguiente")
    bSig.addEventListener('click' , async() =>{
        const nuevoPars = await link(reparaciones[1].siguiente)
    })
    
    
    ReparacionesLista.innerHTML =''

    reparaciones[0].forEach(repa => {
        const reparacionItem = document.createElement('li')
        reparacionItem.innerHTML = `
            <div class="ModuloRep">
                        <div class="infoOculta">
                                <div class="info" onclick="mostrar(${contador})">
                                    <p class="numeroService">N° ${repa.nro_reparacion}</p>
                                    
                                    <p class="nombreCliente">${repa.nombre_apellido}</p>
                                </div>  
                            <div class="ColorEstado" id="div${contador}" style="padding: 5px;">${repa.estado}
                            </div>
                            
                            <div class="acciones">
                                    <button class="botonModificar CerrarModal"><img class="icon_b" src="./static/images/edit.png"></button>
                                    <button class="botonImprimir CerrarModal"><img class="icon_b" src="./static/images/print.svg"></button>
                                    <button class="botonEliminar CerrarModal"><img alt="anular" class="icon_b"  src="./static/images/anular.svg"></button>
                            </div>
                        </div>

                        <input type="checkbox" class="touch" id="${repa.nro_reparacion}"> 
                
                        <div class="slide" id='${contador}'>
                        <div class="DatosModulo">
                            <div class="columnaIzq">
                                <div class="datoCliente fechaService">
                                    <h3>Fecha alta:</h3>
                                    <p>${repa.fecha_alta}</p>
                                </div>
                                <div class="datoCliente contacto">
                                    <h3>Cliente:</h3>
                                    <p>${repa.nombre_apellido}</p>
                                </div>
                                <div class="datoCliente contacto">
                                    <h3>Teléfono:</h3>
                                    <p>${repa.telefono}</p>
                                </div>
                                <div class="datoCliente contacto">
                                    <h3>Mail:</h3>
                                    <p>${repa.email}</p>
                                </div>

                            </div>
                            <div class="columnaCentro">
                                <div class="datoCliente fechaService">
                                    <h3>Fecha de reparación:</h3>
                                    <p>${repa.fecha_reparacion}</p>
                                </div>
                                <div class="datoCliente falla">
                                    <h3>Producto:</h3>
                                    <p>${repa.producto}</p>
                                </div>
                                <div class="datoCliente falla">
                                    <h3>Falla:</h3>
                                    <p>${repa.falla}</p>
                                </div>
                                <div class="datoCliente defecto">
                                    <h3>Defecto encontrado:</h3>
                                    <p>${repa.defecto_encontrado}</p>
                                </div>


                            </div>
                            <div class="columnaDer">
                                <div class="datoCliente fechaService">
                                    <h3>Fecha de retiro:</h3>
                                    <p>${repa.fecha_retiro}</p>
                                    
                                </div>
                                <div class="datoCliente valorRepa">
                                    <h3>Valor reparación:</h3>
                                    <p>${repa.valor_reparacion}</p>
                                </div>
                                <div class="datoCliente valorRepa">
                                    <h3>Factura:</h3>
                                    <p>${repa.factura}</p>
                                </div>   
                                <div class="datoCliente valorRepa">
                                    <h3>Garantía:</h3>
                                    <p>Si/No</p>
                                </div> 
                            </div>
                        </div>
                </div> 
        `
        
            
        
        
        
        
        // <div class="info">
        //         <div class="drop">
        //             <p class="numeroService">N° ${repa.nro_reparacion}</p>
        //             <p class="nombreCliente">${repa.nombre_apellido}</p>
        //         </div>
        //     </div>   

        //     <div class="ColorEstado" id="div${contador}" ; padding: 5px;">${repa.estado}</div>
        // <!-- <img class="Usuario" src="./static/images/vista-de-calle.png" alt="Logo"> -->

        //             <div class="info">
        //                 <div class="drop">
        //                     <p class="numeroService">N° ${repa.nro_reparacion}</p><p class="nombreCliente">${repa.nombre_apellido}</p>
        //                 </div>

        //                 <div class="ColorEstado" id="div${contador}">${repa.estado}</div>
                        
        //             </div>               
                
        //             <input type="checkbox" class="touch" id="${repa.nro_reparacion}"> 

        //             <div class="slide">
        //                 <div class="DatosModulo">
        //                     <h3>Telefono<p>${repa.telefono}</p></h3>
        //                     <h3>Email<p>${repa.email}</p></h3>
        //                     <h3>Domicilio<p>${repa.domicilio}</p></h3>
        //                     <h3>Localidad<p>${repa.localidad}</p></h3> 
        //                     <h3>Provincia<p>${repa.provincia}</p></h3>
        //                     <h3>Producto<p>${repa.producto}</p></h3>
        //                     <h3>Falla<p>${repa.falla}</p></h3>
        //                     <h3>Defecto encontrado<p>${repa.defecto_encontrado}</p></h3>
        //                     <h3>Factura<p>${repa.factura}</p></h3>
        //                     <h3>Valor reparacion<p>${repa.valor_reparacion}</p></h3>
        //                     <h3>Fecha alta<p>${repa.fecha_alta}</p></h3>
        //                     <h3>Fecha de reparacion<p>${repa.fecha_reparacion}</p></h3>
        //                     <h3>Fecha de retiro<p>${repa.fecha_retiro}</p></h3>
        //                 </div>
        //             </div>
        //             <div class="acciones">
        //                 <button class="botonModificar CerrarModal"><img class="icon_b" src="./static/images/edit.png"/></button>
        //                 <button class="botonEliminar CerrarModal"><img class="icon_b" src="./static/images/trash.png"/></button>
        //             </div>
        //     </div>

            // const btnEliminar = reparacionItem.querySelector('.botonEliminar')
            //     btnEliminar.addEventListener('click', async () => {
            //         const seguro = confirm('Esta seguro de eliminar este Cliente')

            //         if (seguro){
            //             const response = await fetch(`/reparacion/${repa.id}`,{
            //                 method:'DELETE',
            //                 headers:{
            //                     'Content-Type' : 'application/json',
            //                         }
            //             })
            //             const data = await response.json()
            //             const cons_response = await fetch("/reparaciones");
            //             const cons_data = await cons_response.json()
            //             reparaciones = cons_data
            //             contenido = reparaciones.length
            //             mostrarData(reparaciones)
            //             alert(`${data.msg}`)
                        
            //      }
        //});
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
                        
                        modifi.innerHTML="Guardar"
                        modifi.style.background="rgb(16 105 169 / 92%)"
                        
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
                reparacionTarjeta.style.background = "rgb(161 43 43 / 90%)";
                reparacionTarjeta.style.padding = "5px";
                FormUsuarios.querySelector('#defEncontrado').style.display = "none";
                

            }
            if (color == "revision presupuesto"){
                reparacionTarjeta.style.background = "rgba(240, 184, 46, 0.59)";
                reparacionTarjeta.style.padding = "5px";

            }
            if (color == "espera confirmacion presupuesto"){
                reparacionTarjeta.style.background = "rgba(13, 13, 13, 0.79)";
                reparacionTarjeta.style.padding = "5px";

            }
            if (color == "en curso"){
                reparacionTarjeta.style.background = "rgba(3, 93, 165, 0.64)";
                reparacionTarjeta.style.padding = "5px";

            }
            if (color == "reparada/terminada"){
                reparacionTarjeta.style.background = "rgba(0, 0, 128, 0.637)";
                reparacionTarjeta.style.padding = "5px";

            }
            if (color == "retirada/enviada"){
                reparacionTarjeta.style.background = "rgba(0, 128, 0, 0.637)";
                reparacionTarjeta.style.padding = "5px";
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
        // alert(NuevoUsuario['msg']);
        swal("Reparación creada!", "", "success");
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
        swal("Listo!", "Reparación modificada.", "success");
        // alert(reparacionModificada['msg'])
        modificando = false
        reparacionId = null  
    }   




Modal.classList.remove('MostrarModal');
const response = await fetch("/reparaciones?page=1&limit=10&offset=0");
const data = await response.json()
reparaciones = data
contenido = reparaciones.length
mostrarData(reparaciones)
FormUsuarios.reset();
})