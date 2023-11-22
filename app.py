import re
from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo, ObjectId

ipDb="192.168.1.221"
ipDb2="localhost"
# instanciar servidor
app = Flask(__name__)

# crear link con la base de datos
app.config['MONGO_URI']=f'mongodb://{ipDb2}:27017/reparaciones_db'

# intsnacia de la base de datos
mongo = PyMongo(app)

# variables de tablas
db_clientes = mongo.db.clientes
db_nro = mongo.db.nro_reparacion
db_reparaciones = mongo.db.reparaciones

# rutas de clientes
# mostrar los html
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
# buscar un cliente
@app.route('/cliente/<id>',methods=['GET'])
def mostrarCliente(id):
    # consulta un id de la tabla clientes
    cliente = db_clientes.find_one({'_id': ObjectId(id)}) 
    return jsonify({
        '_id': str(ObjectId(cliente['_id'])),
        'nombre_apellido': cliente['nombre'],
        'telefono': cliente['telefono'],
        'email': cliente['email'],
        'domicilio': cliente['domicilio'],
        'localidad': cliente['localidad'],
        'provincia': cliente['provincia']
    })



# mostrar todos los clientes
@app.route('/clientes1',methods=['GET'])
def mostrarClientes1():
    # muestra todos los clientes de la tabla
    # string = '{nombre:1}'
    clientes = []
    
    registros = list(db_clientes.find().sort('nombre',1))
    
    for doc in registros:
        clientes.append({
            '_id':str(ObjectId(doc['_id'])),
            'nombre_apellido': doc['nombre'],
            'telefono': doc['telefono'],
            'email': doc['email'],
            'domicilio': doc['domicilio'],
            'localidad': doc['localidad'],
            'provincia': doc['provincia']
            })
    return jsonify(clientes)


# mostrar todos los clientes
@app.route('/clientes',methods=['GET'])
def mostrarClientes():
    # muestra todos los clientes de la tabla
    # string = '{nombre:1}'
    clientes = []
    page = int(request.args['page'])
    offset = int(request.args['offset'] )
    limit = int(request.args['limit'])
    nextp = page + 1
    prevp = page - 1
    next = offset + limit
    prev = offset - limit 
    
    registros = list(db_clientes.find().sort('nombre',1).skip(offset).limit(limit))
    cantidadRegistros = len(registros)
    
    print(f'la cantidad de registros es: {cantidadRegistros}')
    nextPage = f'/clientes?page={nextp}&limit={limit}&offset={next}'

    if prev < 0:
        prevPage = ""
    else:
        prevPage = f'/clientes?page={prevp}&limit={limit}&offset={prev}'
    
    if int(cantidadRegistros) < limit:
        nextPage = ""
    
    
    for doc in registros:
        clientes.append({
            '_id':str(ObjectId(doc['_id'])),
            'nombre_apellido': doc['nombre'],
            'telefono': doc['telefono'],
            'email': doc['email'],
            'domicilio': doc['domicilio'],
            'localidad': doc['localidad'],
            'provincia': doc['provincia']
            })
    return jsonify(clientes , {'anterior':prevPage , 'pagina':page,'siguiente':nextPage})

# prueba paginacion
@app.route('/prueba',methods=['GET'])
def mostrarReg():
    # muestra todos los clientes de la tabla
    clientes = []
    string = '{nombre:1}'
    
    page = int(request.args['page'])
    offset = int(request.args['offset'] )
    limit = int(request.args['limit'])
    nextp = page + 1
    prevp = page - 1
    next = offset + limit
    prev = offset - limit 
    
    
        
    registros = list(db_clientes.find().sort('nombre',1).skip(offset).limit(limit))
    cantidadRegistros = len(registros)
    print(registros)
    print(f'la cantidad de registros es: {cantidadRegistros}')
    nextPage = f'http://localhost:5000/prueba?page={nextp}&limit={limit}&offset={next}'

    if prev < 0:
        prevPage = ""
    else:
        prevPage = f'http://localhost:5000/prueba?page={prevp}&limit={limit}&offset={prev}'
    
    if int(cantidadRegistros) < limit:
        nextPage = ""
    # for doc in registros:
    #     print (doc)
    
    
    #     clientes.append({
    #         '_id':str(ObjectId(doc['_id'])),
    #         'nombre_apellido': doc['nombre'],
    #         'telefono': doc['telefono'],
    #         'email': doc['email'],
    #         'domicilio': doc['domicilio'],
    #         'localidad': doc['localidad'],
    #         'provincia': doc['provincia']
    #         })
    return f' -- <a href="{prevPage}">Anterior</a> page: {page} --  <a href="{nextPage}">Siguiente</a>{registros}{cantidadRegistros}'

# crear un cliente
@app.route('/cliente',methods=['POST'])
def crearCliente():
    id = db_clientes.insert_one({
        'nombre': request.json['nombre_apellido'],
        'telefono': request.json['telefono'],
        'email': request.json['email'],
        'domicilio': request.json['domicilio'],
        'localidad': request.json['localidad'],
        'provincia': request.json['provincia']
    })
    return jsonify({
        "id": str(ObjectId(id.inserted_id)),
        'nombre_apellido': request.json['nombre_apellido'],
        'telefono': request.json['telefono'],
        'email': request.json['email'],
        'domicilio': request.json['domicilio'],
        'localidad': request.json['localidad'],
        'provincia': request.json['provincia'],
        "msg":"Cliente Creado"
        })
    
# borrar cliente
@app.route('/cliente/<id>', methods=['DELETE'])
def borrarCliente(id):
    db_clientes.delete_one({'_id': ObjectId(id)})
    return jsonify({'_id': str(ObjectId(id)),
                    'msg':'Cliente Eliminado'})

# modificar cliente
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
    print(request.json)
    return jsonify({
        '_id':str(ObjectId(id)),
        'nombre_apellido': request.json['nombre_apellido'],
        'telefono': request.json['telefono'],
        'email': request.json['email'],
        'domicilio': request.json['domicilio'],
        'localidad': request.json['localidad'],
        'provincia': request.json['provincia'],
        "msg":"Cliente modificado"
        })

######################## reparaciones ##################################################
# mostrar una reparacion
@app.route('/reparacion/<id>',methods=['GET'])
def mostrarReparacion(id):
    reparacion = db_reparaciones.find_one({'_id':ObjectId(id)})
    
    return jsonify({
        'id':str(ObjectId(reparacion['_id'])),
        'nombre_apellido': reparacion['nombre_apellido'], 
        'telefono': reparacion['telefono'],
        'email': reparacion['email'],
        'domicilio': reparacion['domicilio'],
        'localidad': reparacion['localidad'],
        'provincia': reparacion['provincia'],
        'nro_reparacion': reparacion['nro_reparacion'],
        'producto': reparacion['producto'],
        'falla': reparacion['falla'],
        'defecto_encontrado': reparacion['defecto_encontrado'],
        'factura': reparacion['factura'],
        'valor_reparacion': reparacion['valor_reparacion'],
        'fecha_alta': reparacion['fecha_alta'],
        'fecha_reparacion': reparacion['fecha_reparacion'],
        'fecha_retiro': reparacion['fecha_retiro'],
        'estado': reparacion['estado']
    })

# mostrar todas las reparaciones
@app.route('/reparaciones',methods=['GET'])
def mostrarReparaciones():
    reparaciones = []
    page = int(request.args['page'])
    offset = int(request.args['offset'] )
    limit = int(request.args['limit'])
    nextp = page + 1
    prevp = page - 1
    next = offset + limit
    prev = offset - limit 
    
    registros = list(db_reparaciones.find().sort('nro_reparacion', -1).skip(offset).limit(limit))
    cantidadRegistros = len(registros)
    
    print(f'la cantidad de registros es: {cantidadRegistros}')
    nextPage = f'/reparaciones?page={nextp}&limit={limit}&offset={next}'

    if prev < 0:
        prevPage = ""
    else:
        prevPage = f'/reparaciones?page={prevp}&limit={limit}&offset={prev}'
    
    if int(cantidadRegistros) < limit:
        nextPage = ""
    
    
    
    
    for doc in registros:
        reparaciones.append({
            'id':str(ObjectId(doc['_id'])),
            'nombre_apellido': doc['nombre_apellido'], 
            'telefono': doc['telefono'],
            'email': doc['email'],
            'domicilio': doc['domicilio'],
            'localidad': doc['localidad'],
            'provincia': doc['provincia'],
            'nro_reparacion': doc['nro_reparacion'],
            'producto': doc['producto'],
            'falla': doc['falla'],
            'defecto_encontrado': doc['defecto_encontrado'],
            'factura': doc['factura'],
            'valor_reparacion': doc['valor_reparacion'],
            'fecha_alta': doc['fecha_alta'],
            'fecha_reparacion': doc['fecha_reparacion'],
            'fecha_retiro': doc['fecha_retiro'],
            'estado': doc['estado']
        })
    return jsonify(reparaciones , {'anterior':prevPage , 'pagina':page,'siguiente':nextPage})
    
# crear reparacion
@app.route('/reparacion',methods=['POST'])
def crearReparacion():
    for doc in db_nro.find():
        nro_id = str(ObjectId(doc['_id']))
        nro_reparacion = doc['nro']

    nueva_reparacion = nro_reparacion + 1
    
    id = db_reparaciones.insert_one({
        'nombre_apellido': request.json['nombre_apellido'], 
        'telefono': request.json['telefono'],
        'email': request.json['email'],
        'domicilio' : request.json['domicilio'],
        'localidad' : request.json['localidad'],
        'provincia' : request.json['provincia'],
        'nro_reparacion': nueva_reparacion ,
        'producto' : request.json['producto'],
        'falla' : request.json['falla'],
        'defecto_encontrado': request.json['defecto_encontrado'],
        'factura': request.json['factura'],
        'valor_reparacion': request.json['valor_reparacion'],
        'fecha_alta': request.json['fecha_alta'],
        'fecha_reparacion': request.json['fecha_reparacion'],
        'fecha_retiro': request.json['fecha_retiro'],
        'estado': request.json['estado']
    })
    
    db_nro.update_one({'_id':ObjectId(nro_id)}, {'$set':{
        'nro': nueva_reparacion}})
    
    return jsonify({
        'id':str(ObjectId(id.inserted_id)),
        'nombre_apellido': request.json['nombre_apellido'], 
        'telefono': request.json['telefono'],
        'email': request.json['email'],
        'domicilio' : request.json['domicilio'],
        'localidad' : request.json['localidad'],
        'provincia' : request.json['provincia'],
        'nro_reparacion': nueva_reparacion ,
        'producto' : request.json['producto'],
        'falla' : request.json['falla'],
        'defecto_encontrado': request.json['defecto_encontrado'],
        'factura': request.json['factura'],
        'valor_reparacion': request.json['valor_reparacion'],
        'fecha_alta': request.json['fecha_alta'],
        'fecha_reparacion': request.json['fecha_reparacion'],
        'fecha_retiro': request.json['fecha_retiro'],
        'estado': request.json['estado'],
        'msg':'Reparacion Creada'
        })

# borrar reparacion 
@app.route('/reparacion/<id>', methods=['DELETE'])
def borrarReparacion(id):
    db_reparaciones.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg':'Reparacion Eliminada'})

# modificar reparacion
@app.route('/reparacion/<id>', methods=['PUT'])
def modificarReparacion(id):
    db_reparaciones.update_one({'_id': ObjectId(id)}, {'$set':{
        'nombre_apellido': request.json['nombre_apellido'], 
        'telefono': request.json['telefono'],
        'email': request.json['email'],
        'domicilio' : request.json['domicilio'],
        'localidad' : request.json['localidad'],
        'provincia' : request.json['provincia'],
        'nro_reparacion': int(request.json['nro_reparacion']),
        'producto' : request.json['producto'],
        'falla' : request.json['falla'],
        'defecto_encontrado': request.json['defecto_encontrado'],
        'factura': request.json['factura'],
        'valor_reparacion': request.json['valor_reparacion'],
        'fecha_alta': request.json['fecha_alta'],
        'fecha_reparacion': request.json['fecha_reparacion'],
        'fecha_retiro': request.json['fecha_retiro'],
        'estado': request.json['estado']

    }})
    return jsonify({'msg':'Reparacion Modificada'})


######################### estados #################################################

# show estados
@app.route('/estados/<id>', methods=['GET'])
def mostrarestados(id):
    reparacion = []
    #buscar = 'nro_reparacion':id
    for doc in db_reparaciones.find({"nro_reparacion":int(id)}):
        reparacion.append({
            'id':str(ObjectId(doc['_id'])),
            'nombre_apellido': doc['nombre_apellido'], 
            'telefono': doc['telefono'],
            'email': doc['email'],
            'domicilio': doc['domicilio'],
            'localidad': doc['localidad'],
            'provincia': doc['provincia'],
            'nro_reparacion': doc['nro_reparacion'],
            'producto': doc['producto'],
            'falla': doc['falla'],
            'defecto_encontrado': doc['defecto_encontrado'],
            'factura': doc['factura'],
            'valor_reparacion': doc['valor_reparacion'],
            'fecha_alta': doc['fecha_alta'],
            'fecha_reparacion': doc['fecha_reparacion'],
            'fecha_retiro': doc['fecha_retiro'],
            'estado': doc['estado']
        })
    return jsonify(reparacion)


# iniciar servidor
if __name__== "__main__":
    app.run(host ='0.0.0.0', debug=True)

