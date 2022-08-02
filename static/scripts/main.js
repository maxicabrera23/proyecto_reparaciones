const AbrirModal = document.querySelector('.BotonAbrirModal');
const Modal = document.querySelector('.Modal');
const CerrarModal = document.querySelector('.CerrarModal');

AbrirModal.addEventListener('click', ()=>{
    Modal.classList.add('MostrarModal');
});

CerrarModal.addEventListener('click', ()=>{
    Modal.classList.remove('MostrarModal');
});



const FormUsuarios = document.querySelector('#FormUsuarios');

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
            'Content-Type' : 'application/json'
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