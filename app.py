from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo

# server instance
app = Flask(__name__)

# create link of the connection db
app.config['MONGO_URI']='mongodb://localhost/reparaciones_db'

# db instance 
mongo = PyMongo(app)

#create table clientes 
db = mongo.db.clientes

# route clients
# show index.html
@app.route('/', methods=['GET'])
def mostrarPrincipal():
    return render_template('index.html')

@app.route('/1', methods=['GET'])
def mostrarcliente():
    return render_template('clientes.html')

@app.route('/2', methods=['GET'])
def mostrarestado():
    return render_template('estados.html')
############################ clientes ###########################################
# show one client
@app.route('/cliente/<id>',methods=['GET'])
def mostrarCliente():
    return 'show cliente'

# show all clients
@app.route('/clientes',methods=['GET'])
def mostrarClientes():
    clientes=[{
                "nombre y apellido":"maxi", 
                "nro celular/telefono":11111111,
                "email":"maxi@gmail.com",
                "domicilio":"sarasa 20",
                "localidad":"almagro",
                "provincia":"bs as"

              },
              {
                "nombre y apellido":"tomy", 
                "nro celular/telefono":1111111,
                "email":"tomy@gmail.com",
                "domicilio":"sarasa 30",
                "localidad":" la caba",
                "provincia":"bs as"
              }, 
              {
                "nombre y apellido":"ivan", 
                "nro celular/telefono":111111111,
                "email":"ivan@gmail.com",
                "domicilio":"sarasa 40",
                "localidad":"martelli",
                "provincia":"bs as"
              }]
    return jsonify(clientes)#render_template('clientes.html')

# create client
@app.route('/clientes',methods=['POST'])
def crearCliente():
    reque = request.get_json()
    print(reque)
    return 'created'

@app.route('/clientes/<id>', methods=['GET'])
def borrarCliente():
    return 'delete client'

@app.route('/clientes/<id>', methods=['PUT'])
def modificarCliente():
    return 'upgrade client'

######################## reparaciones ##################################################
# show one reparacion
@app.route('/reparacion/<id>',methods=['GET'])
def mostrarReparacion():
    return 'show reparacion'

# show all reparaciones
@app.route('/reparaciones',methods=['GET'])
def mostrarReparaciones():
    reparaciones=[{
                   "nombre y apellido cliente":"electroservice", 
                   "celular/telefono":47029500,
                   "email":"electroservice@gmail.com",
                   "domicilio":"congreso 2000",
                   "localidad":"caba",
                   "provincia":"bs as",
                   "nro reparacion": 123456,
                   "producto":"frente de calle",
                   "falla":"no funciona el parlante",
                   "defecto encotrado":"se cambio parlante por otro",
                   "factura":"si",
                   "valor de reparacion":"1500",
                   "fecha de alta":"15/6/2002",
                   "fecha de reparacion":"16/6/2022",
                   "fecha de retiro/envio":"17/6/2022",
                   "estado":"reparada"
                   },
                   {
                   "nombre y apellido cliente":"steines", 
                   "celular/telefono":47029500,
                   "email":"steines@gmail.com",
                   "domicilio":"sarandi 203",
                   "localidad":"caba",
                   "provincia":"bs as",
                   "nro reparacion": 654321,
                   "producto":"central multifamiliar",
                   "falla":"un interno no tiene tono",
                   "defecto encotrado":"se cambio el trafiro de audio",
                   "factura":"si",
                   "valor de reparacion":"",
                   "fecha de alta":"20/6/2002",
                   "fecha de reparacion":"21/6/2022",
                   "fecha de retiro/envio":"",
                   "estado":"en curso"
                   }]
    return jsonify(reparaciones)#render_template('clientes.html')

# create reparacion
@app.route('/reparacion',methods=['POST'])
def crearReparacion():
    reque = request.get_json()
    print(reque)
    return 'created'

# delete reparacion 
@app.route('/reparacion/<id>', methods=['GET'])
def borrarReparacion():
    return 'delete reparacion'

# update reparacion
@app.route('/reparacion/<id>', methods=['PUT'])
def modificarReparacion():
    return 'upgrade reparacion'


######################### estados #################################################
# show estados
@app.route('/estados', methods=['GET'])
def mostrarEstados():
    estados=[{
                "nro reparacion": 123456,
                "producto":"frente de calle",
                "falla":"no funciona el parlante",
                "defecto encotrado":"se cambio parlante por otro",
                "factura":"si",
                "valor de reparacion":"1500",
                "fecha de alta":"15/6/2002",
                "fecha de reparacion":"16/6/2022",
                "fecha de retiro/envio":"17/6/2022",
                "estado":"reparada"
                },
                {
                "nro reparacion": 654321,
                "producto":"central multifamiliar",
                "falla":"un interno no tiene tono",
                "defecto encotrado":"",
                "factura":"si",
                "valor de reparacion":"",
                "fecha de alta":"20/6/2002",
                "fecha de reparacion":"21/6/2022",
                "fecha de retiro/envio":"",
                "estado":"en curso"
                }]
    return jsonify(estados) 



# server start
if __name__== "__main__":
    app.run(debug=True)
