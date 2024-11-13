-- Niveles
INSERT INTO niveles (id, descripcion)
VALUES
(1, 'Básico'),
(2, 'Intermedio'),
(3, 'Avanzado');

-- Actividades
INSERT INTO actividades (id, descripcion, costo, edad_minima, id_nivel)
VALUES
(1, 'Snowboard', 100.0, 12, 2),
(2, 'Ski', 120.0, 10, 2),
(3, 'Moto de nieve', 150.0, 18, 3);

-- Login Admin único, insertado inicialmente
INSERT INTO login (correo, contrasena, rol)
VALUES
('admin@example.com', 'admin123', 'admin');

-- Login Instructores (inserción solo por el admin)
INSERT INTO login (correo, contrasena, rol)
VALUES
('juan@example.com', 'juan123', 'instructor'),
('maria@example.com', 'maria123', 'instructor');

-- Login alumnos
INSERT INTO login (correo, contrasena, rol)
VALUES
('carlos@example.com', 'carlos1234', 'alumno'),
('ana@example.com', 'ana1234', 'alumno');


-- Instructores
-- Solo el admin puede ejecutar este insert
INSERT INTO instructores (ci, nombre, apellido, fecha_nacimiento, telefono, email, id_nivel)
VALUES
(10135412, 'Juan', 'Perez', '2003-02-24', '094827322', 'juan@example.com', 2),
(10245684, 'Maria', 'Gonzalez','2000-08-12', '096652442', 'maria@example.com', 3);

-- Turnos
INSERT INTO turnos (id, hora_inicio, hora_fin, turno)
VALUES
(1, '08:00:00', '12:00:00', 'Matutino'),
(2, '12:01:00', '18:00:00', 'Vespertino'),
(3, '18:01:00', '22:00:00', 'Nocturno');

-- Alumnos
INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento, telefono, email, id_nivel)
VALUES
(20123587, 'Carlos', 'Rodriguez', '2005-08-15', 123456784, 'carlos@example.com', 2),
(20247612, 'Ana', 'Martinez', '2008-11-23', 876543217, 'ana@example.com', 1);

-- Clase
INSERT INTO clase (id, ci_instructor, id_actividad, id_turno, dictada, cupos, grupal, fecha_clase)
VALUES
(1, 10135412, 1, 1, 0, 10, 1, '2024-12-15'),
(2, 10245684, 2, 2, 0, 1, 0, '2024-12-16');

-- Equipamiento
INSERT INTO equipamiento (id, id_actividad, descripcion, costo, stock)
VALUES
(1, 1, 'Tabla de snowboard', 50.0, 10),
(2, 2, 'Esqui', 60.0, 8);

-- Alumno_clase
INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento, es_alquiler, id_turno, fecha_clase)
VALUES
(1, 20123587, 1, 1, 1, '2024-12-15'),
(2, 20247612, 2, 1, 2, '2024-12-16');

-- Asistencia
INSERT INTO asistencia (id_clase, ci_alumno, fecha, presente)
VALUES
(1, 20123587, '2024-12-15', 1),
(2, 20247612, '2024-12-16', 1);

-- Alquiler_equipamiento
INSERT INTO alquiler_equipamiento (id, id_clase, ci_alumno, id_equipamiento, es_alquiler, costo)
VALUES
(1, 1, 20123587, 1, 1, 50.0),
(2, 2, 20247612, 2, 1, 60.0);

