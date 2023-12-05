import re
from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo, ObjectId
import os
from dotenv import load_dotenv
from flask_mail import Mail, Message 

load_dotenv()

serverMail = os.getenv('SERVER_MAIL')
portMail = os.getenv('PORT_MAIL')
uesernameMail = os.getenv('USERNAME_MAIL')
passMail = os.getenv('PASSWORD_MAIL')

#print(serverMail, portMail,uesernameMail, passMail)


ipDb="192.168.1.221"
ipDb2="localhost"
# instanciar servidor
app = Flask(__name__)

# crear link con la base de datos
app.config['MONGO_URI']=f'mongodb://{ipDb2}:27017/reparaciones_db'

# intsnacia de la base de datos
mongo = PyMongo(app)

#servicio de mails
app.config['MAIL_SERVER'] = serverMail
app.config['MAIL_PORT'] = portMail
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = uesernameMail
app.config['MAIL_PASSWORD'] = passMail

# intsnacia de mail
mail = Mail(app)



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
    
    registros = list(db_clientes.find().sort('nombre', -1).skip(offset).limit(limit))
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
#paginacion repas
@app.route('/buscar',methods=['GET'])
def mostrarReg():
    objetivo = request.args['objetivo']
    tipo = request.args['tipo']
    
    reparacion = []
    #buscar = 'nro_reparacion':id
    
    if tipo == 'true':
        for doc in db_reparaciones.find({"nro_reparacion":int(objetivo)}):
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
        return jsonify(reparacion, {'anterior':'' , 'pagina': '1','siguiente':''})
    
    else:
        for doc in db_reparaciones.find({"$text":{"$search":str(objetivo)}}):
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
        return jsonify(reparacion, {'anterior':'' , 'pagina': '1','siguiente':''})

# mostrar una reparacion
@app.route('/reparacion/<id>',methods=['GET'])
def mostrarReparacion(id):
    reparacion = db_reparaciones.find_one({'_id':ObjectId(id)})
    if len(reparacion) > 17:
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
            'estado': reparacion['estado'],
            'garantia': reparacion['garantia']
            
        })
    else:
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
        if len(doc)> 17:
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
            'estado': doc['estado'],
            'garantia': doc['garantia']
        })
        else:
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
        'estado': request.json['estado'],
        'garantia' : request.json['garantia'] 
    })
    
    db_nro.update_one({'_id':ObjectId(nro_id)}, {'$set':{
        'nro': nueva_reparacion}})
    
    print (request.json['garantia'])
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
        'estado': request.json['estado'],
        'garantia' : request.json['garantia']

    }})
    return jsonify({'msg':'Reparacion Modificada'})

@app.route('/mail/<nro>', methods=['GET'])
def enviarMail(nro):
    def enviar(destinatario, asunto, cuerpo):
        mensaje = Message(asunto, sender = 'soporte@surix.net', recipients=[destinatario])
        # mensaje.html= render_template('mail_template.html')
        mensaje.html= cuerpo
        
        # mail.send(mensaje)
        try:
            mail.send(mensaje)
        except Exception as err:
            print(f"Ocurrió un error al enviar el email razon {err}:")

        
        return {'mensaje':'se envio el mail'}
    
    reparacion = []
    for doc in db_reparaciones.find({"nro_reparacion":int(nro)}):
            reparacion.append({
                'email': doc['email'],
                'nro_reparacion': doc['nro_reparacion'],
                'producto': doc['producto'],
                'falla': doc['falla'],
                'defecto_encontrado': doc['defecto_encontrado'],
                'valor_reparacion': doc['valor_reparacion'],
                'fecha_alta': doc['fecha_alta'],
                'fecha_reparacion': doc['fecha_reparacion'],
                'fecha_retiro': doc['fecha_retiro'],
                'estado': doc['estado'],
                'telefono': ['telefono'],
            }) 
    
    destinatario = reparacion[0]['email']
    asunto = "informacion importante" 
    
    if reparacion[0]['estado'] == 'ingresada':
        asunto = f'Su equipo fue ingresado para revisión. Reparación N°: {reparacion[0]["nro_reparacion"]} '
        mensaje = (f'<div><p style="font-size: 20px; line-height: 32px; font-weight: bold; margin-top:5px;">Ingreso el producto: {reparacion[0]["producto"]}.<br>'
                   f'Fecha de ingreso: {reparacion[0]["fecha_alta"]}.<br>'
                   f'N° de reparación: {reparacion[0]["nro_reparacion"]}</p>'
                   '<div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_kb_PWpPhiXYQouDJbVWjeZAWchcBUv6uyLdmXc6-2JBwIcJ4hFPPyDzmvRtdU4K0FA&usqp=CAU" alt="Logo">'
                   '<p style="color:#0a2b6a; font-weight: bold; line-height: 32px">Chile 111 - Villa Martelli, Vicente López <br>Whatsapp: 11-6221-9019 // Tel. 5272-9500</p>'
                   '<p style="color:#0a2b6a">Por favor consultar antes de retirar el equipo.</p>' 
                   '<p style="color:#0a2b6a">Horario de atención: Lunes a Viernes de 8 a 17hs.</p>'
                   '<p style="color:#0a2b6a">El tiempo estimado de reparacion es de entre 7 y 10 días hábiles.</p></div></div>')
        enviar(destinatario, asunto, mensaje)
        
    if reparacion[0]['estado'] == 'reparada/terminada':
        asunto = f'Su reparación N° {reparacion[0]["nro_reparacion"]} se encuentra lista para retirar!'
        mensaje = (f'<div><p style="font-size: 20px; line-height: 32px; font-weight: bold; margin-top:5px;">La reparación N° {reparacion[0]["nro_reparacion"]} ya se encuentra lista para retirar.<br>'
                  f'Producto: {reparacion[0]["producto"]}.<br>'
                  f'Defecto encontrado: {reparacion[0]["defecto_encontrado"]}.<br>'
                  f'Costo de la reparación: {reparacion[0]["valor_reparacion"]}</p>'
                   '<div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_kb_PWpPhiXYQouDJbVWjeZAWchcBUv6uyLdmXc6-2JBwIcJ4hFPPyDzmvRtdU4K0FA&usqp=CAU" alt="Logo">'
                   '<p style="color:#0a2b6a; font-weight: bold; line-height: 32px">Chile 111 - Villa Martelli, Vicente López <br>Whatsapp: 11-6221-9019 // Tel. 5272-9500</p>'
                   '<p style="color:#0a2b6a">Por favor consultar antes de retirar el equipo.</p>' 
                   '<p style="color:#0a2b6a">Horario de atención: Lunes a Viernes de 8 a 17hs.</p>'
                   '<p style="color:#0a2b6a">El tiempo estimado de reparacion es de entre 7 y 10 días hábiles.</p></div></div>')
        enviar(destinatario, asunto, mensaje)
    
    
    print (reparacion[0]['estado'])
    return {"recibido":"recibido"}

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

