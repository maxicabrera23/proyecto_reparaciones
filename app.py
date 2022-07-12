from crypt import methods
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
def mostrarReparaciones():
    return render_template('index.html')

#######################################################################
# show one client
@app.route('/cliente/<id>',methods=['GET'])
def mostrarCliente():
    return 'show cliente'

# show all clients
@app.route('/clientes',methods=['GET'])
def mostrarClientes():
    return render_template('clientes.html')

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

##########################################################################
# show estados
@app.route('/estados', methods=['GET'])
def mostrarEstados():
    return render_template('estados.html') 



# server start
if __name__== "__main__":
    app.run(debug=True)
