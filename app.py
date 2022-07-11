from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/prueba', methods=['POST'])
def recibirJson():
    resp = request.get_json()
    print (resp)
    return jsonify(resp)


if __name__ == '__main__':
    app.run(debug=True)