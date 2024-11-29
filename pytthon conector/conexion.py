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
@app.route('/login', methods=['GET'])
def obtener_login():
    try:
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # Retornar resultados como diccionario

        # Consulta para obtener los datos de la tabla login
        query = "SELECT correo, rol FROM login"
        cursor.execute(query)

        # Obtener los resultados
        resultados = cursor.fetchall()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver los datos en formato JSON
        return jsonify(resultados), 200
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Ocurrió un error inesperado: " + str(e)}), 500


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
    
@app.route('/alquiler_equipamiento', methods=['GET'])
def obtener_alquiler_equipamiento():
    try:
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)  # Devuelve resultados como diccionarios

        query = "SELECT * FROM alquiler_equipamiento"
        cursor.execute(query)

        # Recuperar todos los resultados
        resultados = cursor.fetchall()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        # Devolver resultados como JSON
        return jsonify(resultados), 200

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "Ocurrió un error inesperado: " + str(e)}), 500
    

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

        # Consultar si el usuario existe en la tabla login
        query_login = "SELECT correo, rol FROM login WHERE correo = %s AND contrasena = %s"
        cursor.execute(query_login, (correo, contrasena))
        usuario = cursor.fetchone()

        if not usuario:
            return jsonify({"error": "Correo o contraseña incorrectos"}), 401

        # Inicializar el payload con la información básica del usuario
        payload = {
            "correo": usuario["correo"],
            "rol": usuario["rol"],
            "exp": datetime.utcnow() + timedelta(hours=1)  # Expira en 1 hora
        }

        # Si el rol es "alumno", buscar el ci en la tabla alumnos
        if usuario["rol"] == "alumno":
            query_alumno = "SELECT ci, nombre FROM alumnos WHERE email = %s"
            cursor.execute(query_alumno, (correo,))
            alumno = cursor.fetchone()

            if alumno:
                payload["ci"] = alumno["ci"]
                payload["nombre"] = alumno["nombre"]

        # Generar el token
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

        # Cerrar conexión
        cursor.close()
        conexion.close()

        return jsonify({"message": "Inicio de sesión exitoso", "token": token}), 200

    except mysql.connector.Error as e:
        return jsonify({"error": f"Error en la base de datos: {e}"}), 500
    except Exception as e:
        print(f"Error en el backend: {e}")
        return jsonify({"error": str(e)}), 500

    

@app.route('/inscribir', methods=['POST'])
def inscribir_alumno():
    try:
        # Obtener los datos enviados desde el frontend
        data = request.json
        id_clase = data.get('id_clase')
        ci_alumno = data.get('ci_alumno')
        id_turno = data.get('id_turno')
        fecha_clase = data.get('fecha_clase')
        id_equipamiento = data.get('id_equipamiento')
        es_alquiler = data.get('es_alquiler', 0)  # Valor por defecto: 0

        # Validar campos requeridos
        if not (id_clase and ci_alumno and id_turno and fecha_clase):
            return jsonify({"error": "Todos los campos requeridos deben estar presentes"}), 400

        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)

        # Verificar que la clase existe
        query_clase = "SELECT * FROM clase WHERE id = %s AND id_turno = %s AND fecha_clase = %s"
        cursor.execute(query_clase, (id_clase, id_turno, fecha_clase))
        clase = cursor.fetchone()

        if not clase:
            return jsonify({"error": "La clase seleccionada no existe"}), 404

        # Verificar que hay cupos disponibles
        if clase['cupos'] <= 0:
            return jsonify({"error": "No hay cupos disponibles en la clase"}), 400

        # Verificar si el alumno ya está inscrito en otra clase en el mismo turno y fecha
        query_verificar_alumno = """
            SELECT * FROM alumno_clase 
            WHERE ci_alumno = %s AND id_turno = %s AND fecha_clase = %s
        """
        cursor.execute(query_verificar_alumno, (ci_alumno, id_turno, fecha_clase))
        if cursor.fetchone():
            return jsonify({"error": "El alumno ya está inscrito en otra clase en este turno y fecha"}), 400

        # Verificar si el equipamiento existe, si es necesario
        if id_equipamiento:
            query_equipamiento = "SELECT * FROM equipamiento WHERE id = %s"
            cursor.execute(query_equipamiento, (id_equipamiento,))
            equipamiento = cursor.fetchone()

            if not equipamiento:
                return jsonify({"error": "El equipamiento seleccionado no existe"}), 404

        # Insertar en la tabla alumno_clase
        query_insert = """
            INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento, es_alquiler, id_turno, fecha_clase)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query_insert, (id_clase, ci_alumno, id_equipamiento, es_alquiler, id_turno, fecha_clase))

        # Reducir cupos disponibles en la clase
        query_update_cupos = "UPDATE clase SET cupos = cupos - 1 WHERE id = %s"
        cursor.execute(query_update_cupos, (id_clase,))

        # Confirmar los cambios
        conexion.commit()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        return jsonify({"message": "Inscripción realizada con éxito"}), 201

    except mysql.connector.Error as e:
        return jsonify({"error": f"Error en la base de datos: {e}"}), 500
    except Exception as e:
        print("Error en el backend:", str(e))
        return jsonify({"error": str(e)}), 500

    
@app.route('/agregar_clase', methods=['POST'])
def agregar_clase():
    try:
        # Obtener el token de autorización del encabezado
        token = request.headers.get("Authorization").split(" ")[1]
        if not token:
            return jsonify({"error": "No se proporcionó un token"}), 401

        # Decodificar el token para verificar el rol
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        if payload["rol"] != "admin":
            return jsonify({"error": "No tienes permiso para realizar esta acción"}), 403

        # Obtener los datos enviados desde el frontend
        data = request.json
        ci_instructor = data.get('instructor_id')
        id_turno = data.get('turno_id')
        id_actividad = data.get('actividad_id')
        fecha_clase = data.get('fecha')
        cupos = data.get('cupos')
        grupal = data.get('es_grupal')

        # Validar datos obligatorios
        if not (ci_instructor and id_actividad and id_turno and fecha_clase and cupos):
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor()

        # Insertar la clase en la base de datos
        query = """
            INSERT INTO clase (ci_instructor, id_actividad, id_turno, fecha_clase, cupos, grupal)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (ci_instructor, id_actividad, id_turno, fecha_clase, cupos, grupal))
        conexion.commit()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        return jsonify({"message": "Clase agregada exitosamente"}), 201

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "El token ha expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Token inválido"}), 401
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Ocurrió un error: {e}"}), 500

@app.route('/clase/<int:id>', methods=['DELETE'])
def eliminar_clase(id):
    try:
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor()

        # Verificar si la clase existe
        verificar_query = "SELECT * FROM clase WHERE id = %s"
        cursor.execute(verificar_query, (id,))
        clase = cursor.fetchone()

        if not clase:
            return jsonify({"error": "La clase no existe"}), 404

        # Eliminar la clase
        eliminar_query = "DELETE FROM clase WHERE id = %s"
        cursor.execute(eliminar_query, (id,))
        conexion.commit()

        # Cerrar la conexión
        cursor.close()
        conexion.close()

        return jsonify({"message": "Clase eliminada exitosamente"}), 200

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "Ocurrió un error inesperado: " + str(e)}), 500


@app.route('/agregar_equipamiento', methods=['POST'])
def agregar_equipamiento():
    try:
        data = request.json

        # Extraer datos del cuerpo de la solicitud
        descripcion = data.get('descripcion')
        costo = data.get('costo')
        stock = data.get('stock')
        id_actividad = data.get('id_actividad')

        # Validar que todos los campos estén presentes
        if not (descripcion and costo and stock and id_actividad):
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor()

        # Insertar el equipamiento en la base de datos
        query = """
            INSERT INTO equipamiento (descripcion, costo, stock, id_actividad)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (descripcion, costo, stock, id_actividad))
        conexion.commit()

        # Cerrar la conexión
        cursor.close()
        conexion.close()

        return jsonify({"message": "Equipamiento agregado exitosamente"}), 201

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "Ocurrió un error inesperado: " + str(e)}), 500
    
@app.route('/equipamientos/<int:id>', methods=['DELETE'])
def eliminar_equipamiento(id):
    try:
        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor()

        # Verificar si el equipamiento existe
        verificar_query = "SELECT * FROM equipamiento WHERE id = %s"
        cursor.execute(verificar_query, (id,))
        equipamiento = cursor.fetchone()

        if not equipamiento:
            return jsonify({"error": "El equipamiento no existe"}), 404

        # Eliminar el equipamiento
        eliminar_query = "DELETE FROM equipamiento WHERE id = %s"
        cursor.execute(eliminar_query, (id,))
        conexion.commit()

        # Cerrar la conexión
        cursor.close()
        conexion.close()

        return jsonify({"message": "Equipamiento eliminado exitosamente"}), 200

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "Ocurrió un error inesperado: " + str(e)}), 500
    
@app.route('/alquiler_equipamiento', methods=['POST'])
def registrar_alquiler_equipamiento():
    try:
        data = request.json

        # Extraer datos
        id_clase = data.get('id_clase')
        ci_alumno = data.get('ci_alumno')
        id_equipamiento = data.get('id_equipamiento')
        es_alquiler = data.get('es_alquiler')
        costo = data.get('costo')

        # Validar datos
        if not (id_clase and ci_alumno and id_equipamiento and costo is not None):
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        # Conexión a la base de datos
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor()

        # Insertar alquiler en la base de datos
        query = """
            INSERT INTO alquiler_equipamiento 
            (id_clase, ci_alumno, id_equipamiento, es_alquiler, costo)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (id_clase, ci_alumno, id_equipamiento, es_alquiler, costo))
        conexion.commit()

        # Cerrar la conexión
        cursor.close()
        conexion.close()

        return jsonify({"message": "Alquiler registrado con éxito"}), 201

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "Ocurrió un error inesperado: " + str(e)}), 500




# Inicio del servidor
if __name__ == '__main__':
    app.run(debug=True)