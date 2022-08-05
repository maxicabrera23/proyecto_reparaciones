let reparaciones = []
let modificando = false
let reparacionId = null
let contenido = null

const FormUsuarios = document.querySelector('#FormUsuarios');
const ReparacionesLista = document.querySelector('#ListaReparaciones');



const AbrirModal = document.querySelector('.BotonAbrirModal');
const Modal = document.querySelector('.Modal');
const CerrarModal = document.querySelector('.CerrarModal');

AbrirModal.addEventListener('click', ()=>{
    Modal.classList.add('MostrarModal');
});

CerrarModal.addEventListener('click', ()=>{
    Modal.classList.remove('MostrarModal');
});

/* mostar clientes */
window.addEventListener("DOMContentLoaded", async() => {
    const response = await fetch("/reparaciones");
    const data = await response.json()
    reparaciones = data
    contenido = reparaciones.length
    mostrarData(reparaciones)
    /*
    const reparacionTarjeta = document.querySelector('.ModuloRep');
    color = repa.estado 
            if (color == "ingresada"){
                reparacionTarjeta.style.background = "rgba(220, 20, 60, 0.507)";
                reparacionTarjeta.style.border = "solid 2px crimson";
            
            }else if (color == "revision presupuesto"){
                reparacionTarjeta.style.background = "rgba(255, 127, 80, 0.61)";
                reparacionTarjeta.style.border = "solid 2px coral";
            
            }else if (color == "espera confirmacion presupuesto"){
                reparacionTarjeta.style.background = "rgba(240, 255, 255, 0.616)";
                reparacionTarjeta.style.border = "solid 2px azure";
            
            }else if (color == "en curso"){
                reparacionTarjeta.style.background = "rgba(0, 255, 255, 0.582)";
                reparacionTarjeta.style.border = "solid 2px aqua";
            
            }else if (color == "reparada/terminada"){
                reparacionTarjeta.style.background = "rgba(0, 0, 128, 0.637)";
                reparacionTarjeta.style.border = "solid 2px navy";
            
            }else if (color == "retirada/enviada"){
                reparacionTarjeta.style.background = "rgba(0, 128, 0, 0.637)";
                reparacionTarjeta.style.border = "solid 2px green";
            }*/
});


function mostrarData(reparaciones){
    
    ReparacionesLista.innerHTML =''

    reparaciones.forEach(repa => {
        const reparacionItem = document.createElement('li')
        reparacionItem.innerHTML = `
            <div class="ModuloRep">
                <img class="Usuario" src="./static/images/vista-de-calle.png" alt="Logo">
                <h3>${repa.nombre_apellido}</h3>
                
                    <div class="DatosModulo">
                        <h3>Telefono<p>${repa.telefono}</p></h3>
                        <h3>Email<p>${repa.email}</p></h3>
                        <h3>Domicilio<p>${repa.domicilio}</p></h3>
                        <h3>Localidad<p>${repa.localidad}</p></h3> 
                        <h3>Provincia<p>${repa.provincia}</p></h3>
                        <p>Nro de Reparacion ${repa.nro_reparacion}</p>
                        <p>Producto ${repa.producto}</p>
                        <p>falla ${repa.falla}</p>
                        <p>defecto_encontrado ${repa.defecto_encontrado}</p>
                        <p>factura ${repa.factura}</p>
                        <p>valor_reparacion ${repa.valor_reparacion}</p>
                        <p>fecha_alta ${repa.fecha_alta}</p>
                        <p>fecha_reparacion ${repa.fecha_reparacion}</p>
                        <p>fecha_retiro ${repa.fecha_retiro}</p>
                        <p>estado ${repa.estado}</p>
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
            ReparacionesLista.append(reparacionItem)
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
    const producto = FormUsuarios['producto'].value
    const falla = FormUsuarios['falla'].value
    const defecto_encontrado = FormUsuarios['defecto_encontrado'].value
    const factura = FormUsuarios['factura'].value
    const valor_reparacion = FormUsuarios['valor_reparacion'].value
    const fecha_alta = FormUsuarios['fecha_alta'].value
    const fecha_reparacion = FormUsuarios['fecha_reparacion'].value
    const fecha_retiro = FormUsuarios['fecha_retiro'].value
    const estado = FormUsuarios['estado'].value

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
    })
})


const NuevoUsuario = await response.json();
alert(NuevoUsuario['msg']);

Modal.style.display="none";
location.reload();  

})