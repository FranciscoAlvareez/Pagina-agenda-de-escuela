from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from datetime import datetime, timedelta  # Importar datetime y timedelta
import jwt

SECRET_KEY = "mi_clave_secreta_super_segura"

app = Flask(__name__)
CORS(app)

db_config = {
    'user': 'root',
    'password': 'rootpassword',
    'host': 'localhost',
    'database': 'Obligatorio',
    'port': 3306
}

# Ruta para obtener los alumnos
@app.route('/alumnos', methods=['GET'])
def obtener_alumnos():
    try:
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # dictionary=True devuelve un dict por fila

        # Consulta a la tabla "alumnos"
        query = "SELECT * FROM alumnos"
        cursor.execute(query)

        # Recuperar resultados
        resultados = cursor.fetchall()
        
        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver resultados como JSON
        return jsonify(resultados)

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500


@app.route('/instructores', methods=['GET'])
def obtener_instructores():
    try:
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # Devuelve resultados como diccionarios

        # Consulta a la tabla "instructores"
        query = "SELECT * FROM instructores"
        cursor.execute(query)

        # Recuperar todos los resultados
        resultados = cursor.fetchall()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver resultados como JSON
        return jsonify(resultados)

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/clase', methods=['GET'])
def obtener_clase():
    try:    
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # Devuelve resultados como diccionarios

         # Consulta a la tabla "clase"
        query = "SELECT * FROM clase"
        cursor.execute(query)
        
        # Recuperar todos los resultados
        resultados = cursor.fetchall()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver resultados como JSON
        return jsonify(resultados)
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/alumno_clase', methods=['GET'])
def obtener_alumno_clase():
    try:    
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # Devuelve resultados como diccionarios

         # Consulta a la tabla "alumnos_clase"
        query = "SELECT * FROM alumno_clase"
        cursor.execute(query)
        
        # Recuperar todos los resultados
        resultados = cursor.fetchall()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver resultados como JSON
        return jsonify(resultados)
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/equipamiento', methods=['GET'])
def obtener_equipamiento():
    try:    
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # Devuelve resultados como diccionarios

         # Consulta a la tabla "equipamiento"
        query = "SELECT * FROM equipamiento"
        cursor.execute(query)
        
        # Recuperar todos los resultados
        resultados = cursor.fetchall()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver resultados como JSON
        return jsonify(resultados)
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/actividades', methods=['GET'])
def obtener_actividad():
    try:    
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # Devuelve resultados como diccionarios

         # Consulta a la tabla "actividades"
        query = "SELECT * FROM actividades"
        cursor.execute(query)
        
        # Recuperar todos los resultados
        resultados = cursor.fetchall()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver resultados como JSON
        return jsonify(resultados)
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/turnos', methods=['GET'])
def obtener_turnos():
    try:    
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # Devuelve resultados como diccionarios

         # Consulta a la tabla "turnos"
        query = "SELECT * FROM turnos"
        cursor.execute(query)
        
        # Recuperar todos los resultados

        resultados = cursor.fetchall()
        for turno in resultados:
            turno['hora_inicio'] = str(turno['hora_inicio'])  # Convertir hora_inicio a cadena
            turno['hora_fin'] = str(turno['hora_fin'])        # Convertir hora_fin a cadena

        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver resultados como JSON
        return jsonify(resultados)
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/aistencia', methods=['GET'])
def obtener_asistencia():
    try:    
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # Devuelve resultados como diccionarios

         # Consulta a la tabla "asistencia"
        query = "SELECT * FROM asistencia"
        cursor.execute(query)
        
        # Recuperar todos los resultados
        resultados = cursor.fetchall()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver resultados como JSON
        return jsonify(resultados)
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500



@app.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.json  # Recibir los datos en formato JSON
        correo = data.get('mail')
        contrasena = data.get('password')
        nombre = data.get('name')
        apellido = data.get('lastname')
        ci = data.get('ci')
        telefono = data.get('contactnumber')
        fecha_nacimiento = data.get('dateBirth')

        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor()

        # Insertar en login y alumnos
        query_login = "INSERT INTO login (correo, contrasena, rol) VALUES (%s, %s, 'alumno')"
        query_alumno = """
            INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento, telefono, email, id_nivel)
            VALUES (%s, %s, %s, %s, %s, %s, 1)
        """
        cursor.execute(query_login, (correo, contrasena))
        cursor.execute(query_alumno, (ci, nombre, apellido, fecha_nacimiento, telefono, correo))

        conexion.commit()
        cursor.close()
        conexion.close()

        return jsonify({"message": "Usuario registrado con éxito"}), 201

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500


@app.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.json
        correo = data.get('mail')
        contrasena = data.get('password')

        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)

        # Consultar si existe el usuario y su rol
        query = """
            SELECT alumnos.ci, alumnos.nombre, login.rol 
            FROM login 
            INNER JOIN alumnos ON login.correo = alumnos.email 
            WHERE correo = %s AND contrasena = %s
        """
        cursor.execute(query, (correo, contrasena))
        usuario = cursor.fetchone()

        cursor.close()
        conexion.close()

        if usuario:
            # Generar un token con los datos del usuario
            payload = {
                "ci": usuario["ci"],
                "rol": usuario["rol"],
                "nombre": usuario["nombre"],
                "exp": datetime.utcnow() + timedelta(hours=1)  # Expira en 1 hora
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            return jsonify({"message": "Inicio de sesión exitoso", "token": token}), 200
        else:
            return jsonify({"error": "Correo o contraseña incorrectos"}), 401

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500


@app.route('/inscribir', methods=['POST'])
def inscribir_alumno():
    try:
        data = request.json
        id_clase = data.get('id_clase')
        ci_alumno = data.get('ci_alumno')
        id_turno = data.get('id_turno')
        fecha_clase = data.get('fecha_clase')
        es_grupal = data.get('es_grupal')
        id_equipamiento = data.get('id_equipamiento')  # Equipamiento obligatorio
        es_alquiler = data.get('es_alquiler', 0)

        print("ID equipamiento recibido:", id_equipamiento)  # Debug
        if not id_equipamiento:
            return jsonify({"error": "El equipamiento es obligatorio"}), 400

        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)

        # Verificar si el equipamiento existe
        query_equipamiento = "SELECT * FROM equipamiento WHERE id = %s"
        cursor.execute(query_equipamiento, (id_equipamiento,))
        equipamiento = cursor.fetchone()

        if not equipamiento:
            return jsonify({"error": "El equipamiento seleccionado no existe"}), 404

        # Verificar cupos en la clase seleccionada
        query_clase = "SELECT * FROM clase WHERE id = %s AND id_turno = %s AND fecha_clase = %s"
        cursor.execute(query_clase, (id_clase, id_turno, fecha_clase))
        clase = cursor.fetchone()
        if not clase:
            return jsonify({"error": "La clase seleccionada no existe"}), 404

        if clase["cupos"] <= 0:
            return jsonify({"error": "No hay cupos disponibles en la clase"}), 400

        # Insertar al alumno en la tabla alumno_clase
        query_insert = """
            INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento, es_alquiler, id_turno, fecha_clase)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query_insert, (id_clase, ci_alumno, id_equipamiento, id_turno, fecha_clase))

        # Reducir el cupo de la clase
        query_update_cupos = "UPDATE clase SET cupos = cupos - 1 WHERE id = %s"
        cursor.execute(query_update_cupos, (id_clase,))

        conexion.commit()
        cursor.close()
        conexion.close()

        return jsonify({"message": "Inscripción realizada con éxito"}), 201

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500






# Inicio del servidor
if __name__ == '__main__':
    app.run(debug=True)