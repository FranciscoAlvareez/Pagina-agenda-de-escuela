CREATE DATABASE Obligatorio;
USE Obligatorio;
-- Tabla niveles
CREATE TABLE niveles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

-- Tabla actividades
CREATE TABLE actividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    costo DOUBLE NOT NULL,
    edad_minima INT,
    id_nivel INT,
    FOREIGN KEY (id_nivel) REFERENCES niveles(id)
);

-- Tabla login
CREATE TABLE login (
    correo VARCHAR(255) PRIMARY KEY,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('instructor', 'alumno', 'admin')
);

-- Tabla instructores
CREATE TABLE instructores (
    ci INT PRIMARY KEY ,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    id_nivel INT NOT NULL,
    FOREIGN KEY (id_nivel) REFERENCES niveles(id),
    FOREIGN KEY (email) REFERENCES login(correo)
);

-- Tabla turnos
CREATE TABLE turnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    turno VARCHAR(45) NOT NULL
);



-- Tabla clase
CREATE TABLE clase (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_instructor INT NOT NULL,
    id_actividad INT NOT NULL,
    id_turno INT NOT NULL,
    dictada BOOLEAN ,
    cupos INT NOT NULL,
    grupal BOOLEAN NOT NULL,
    fecha_clase DATE NOT NULL,
    CONSTRAINT unico_instructor UNIQUE (ci_instructor, id_turno, fecha_clase),
    FOREIGN KEY (ci_instructor) REFERENCES instructores(ci),
    FOREIGN KEY (id_actividad) REFERENCES actividades(id),
    FOREIGN KEY (id_turno) REFERENCES turnos(id)
);

-- Creacion de indice para el atributo fecha_clase para busqueda mas eficiente
CREATE INDEX idx_fecha_clase ON clase(fecha_clase);

-- Añadimos unicidad entre los atributos id_turno, fecha_clase, para que no tengamos la misma clase en varios turnos
ALTER TABLE clase
ADD UNIQUE KEY unico_clase (id_turno, fecha_clase);

-- Tabla equipamiento
CREATE TABLE equipamiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_actividad INT NOT NULL ,
    descripcion VARCHAR(255),
    costo DOUBLE NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (id_actividad) REFERENCES actividades(id)
);

-- Tabla alumnos
CREATE TABLE alumnos (
    ci INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    id_nivel INT NOT NULL,
    FOREIGN KEY (id_nivel) REFERENCES niveles(id),
    FOREIGN KEY (email) REFERENCES login(correo)
);

-- Tabla alumno_clase (relación entre alumnos, clases y equipamiento)
CREATE TABLE alumno_clase (
    id_clase INT,
    ci_alumno INT,
    id_equipamiento INT,
    es_alquiler BOOLEAN NOT NULL,
    id_turno INT,
    fecha_clase DATE,
    PRIMARY KEY (id_clase, ci_alumno, id_equipamiento),
    CONSTRAINT  unico_alumno UNIQUE (ci_alumno, id_turno, fecha_clase),
    FOREIGN KEY (id_clase) REFERENCES clase(id),
    FOREIGN KEY (ci_alumno) REFERENCES alumnos(ci),
    FOREIGN KEY (id_turno, fecha_clase) REFERENCES clase(id_turno, fecha_clase),
    FOREIGN KEY (id_equipamiento) REFERENCES equipamiento(id)
);

-- Tabla asistencia (registro de asistencia de los alumnos a las clases)
CREATE TABLE asistencia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_clase INT NOT NULL,
    ci_alumno INT NOT NULL,
    fecha DATE NOT NULL,
    presente BOOLEAN NOT NULL,
    FOREIGN KEY (id_clase) REFERENCES clase(id),
    FOREIGN KEY (ci_alumno) REFERENCES alumnos(ci)
);

-- Tabla alquiler_equipamiento (registro de alquileres)
CREATE TABLE alquiler_equipamiento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_clase INT NOT NULL,
  ci_alumno INT NOT NULL,
  id_equipamiento INT NOT NULL,
  es_alquiler BOOLEAN NOT NULL,
  costo DOUBLE,
  FOREIGN KEY (id_clase) REFERENCES clase(id),
  FOREIGN KEY (ci_alumno) REFERENCES alumnos(ci),
  FOREIGN KEY (id_equipamiento) REFERENCES equipamiento(id)
);

