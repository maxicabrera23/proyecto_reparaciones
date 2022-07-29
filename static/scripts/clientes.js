const AbrirModal = document.querySelector('.BotonAbrirModal');
const Modal = document.querySelector('.Modal');
const CerrarModal = document.querySelector('.CerrarModal');

AbrirModal.addEventListener('click', ()=>{
    Modal.classList.add('MostrarModal');
});

CerrarModal.addEventListener('click', ()=>{
    Modal.classList.remove('MostrarModal');
});



let clientes = []
const FormEstados = document.querySelector('#EFormClientes');

/* mostar clientes */
window.addEventListener("DOMContentLoaded", async() => {
    const response = await fetch("/clientes");
    const data = await response.json()
    clientes = data
    mostrarData(clientes)
});



    function mostrarData(clientes){
        
        const clienteLista = document.querySelector('#ListaClientes')
        clienteLista.innerHTML =''

        clientes.forEach(clie => {
            const clienteItem = document.createElement('li')
            clienteItem.innerHTML = `
            <div class="ModuloRep">
            <img class="Usuario" src="./static/images/vista-de-calle.png" alt="Logo">
            <h3>${clie.nombre_apellido}</h3>
            <p>Telefono: ${clie.telefono}</p>
            <p>Email: ${clie.email}</p>
            <p>Domicilio: ${clie.domicilio}</p>
            <p>Localidad: ${clie.localida}</p> 
            <p>Provincia: ${clie.provicia}</p>
            </div>
            `

            clienteLista.append(clienteItem)

            
        });
    };









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