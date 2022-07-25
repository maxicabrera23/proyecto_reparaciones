from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo, ObjectId

# server instance
app = Flask(__name__)

# create link of the connection db
app.config['MONGO_URI']='mongodb://localhost/reparaciones_db'

# db instance 
mongo = PyMongo(app)

#create table clientes 
db_clientes = mongo.db.clientes

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
def mostrarCliente(id):
    # consulta un id de la tabla clientes
    cliente = db_clientes.find_one({'_id': ObjectId(id)}) 
    return jsonify({
        '_id': str(ObjectId(cliente['_id'])),
        'nombre_apellido': cliente['nombre'],
        'telefono': cliente['telefono'],
        'domicilio': cliente['domicilio'],
        'localidad': cliente['localidad'],
        'provincia': cliente['provincia']
    })

# show all clients
@app.route('/clientes',methods=['GET'])
def mostrarClientes():
    # muestra todos los clientes de la tabla
    clientes = []
    for doc in db_clientes.find():
        clientes.append({
            '_id':str(ObjectId(doc['_id'])),
            'nombre_apellido': doc['nombre'],
            'telefono': doc['telefono'],
            'domicilio': doc['domicilio'],
            'localidad': doc['localidad'],
            'provincia': doc['provincia']
            })
    return jsonify(clientes)

# create client
@app.route('/clientes',methods=['POST'])
def crearCliente():
    id = db_clientes.insert_one({
        'nombre': request.json['nombre_apellido'],
        'telefono': request.json['telefono'],
        'email': request.json['email'],
        'domicilio': request.json['domicilio'],
        'localidad': request.json['localidad'],
        'provincia': request.json['provincia']
    })
    return str(ObjectId(id.inserted_id))
    
# delete client
@app.route('/cliente/<id>', methods=['DELETE'])
def borrarCliente(id):
    db_clientes.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg':'Cliente Eliminado'})

# modify client
@app.route('/cliente/<id>', methods=['PUT'])
def modificarCliente(id):
    db_clientes.update_one({'_id':ObjectId(id)}, {'$set':{
        'nombre': request.json['nombre_apellido'],
        'telefono': request.json['telefono'],
        'email': request.json['email'],
        'domicilio': request.json['domicilio'],
        'localidad': request.json['localidad'],
        'provincia': request.json['provincia']

    }})
    return jsonify({'msg':'Cliente Modificado'})

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
