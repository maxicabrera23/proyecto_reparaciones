
let users = [] 

window.addEventListener("DOMContentLoaded", async() => {
    const response = await fetch("/clientes");
    const data = await response.json()
    users = data
    mostrarData(users)
});


function mostrarData(users){
    users.forEach(users => {
    console.log(users.domicilio)
    });
}