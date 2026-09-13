# EduNova

Plataforma web de comunicación colegio-familia. Frontend con **HTMX + Alpine.js
+ Tailwind (CDN)**, backend con **Django**.

Estado del proyecto: es un **prototipo funcional** para mostrar a un cliente
potencial (aún no confirmado). Los datos son de ejemplo (`seed_demo`), no hay
integración con un colegio real todavía.

## Instalación

```bash
python3 -m venv venv
source venv/bin/activate        # en Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py seed_demo      # crea usuarios y datos de ejemplo
python manage.py runserver
```

Abrir http://127.0.0.1:8000/

## Usuarios de prueba (creados por `seed_demo`)

| Rol       | RUT          | Clave        |
|-----------|--------------|--------------|
| Docente   | 11111111-1   | edunova123   |
| Apoderado | 22222222-2   | edunova123   |

También puedes crear un superusuario para entrar a `/admin/`:

```bash
python manage.py createsuperuser
```

(al pedir el RUT como "username", ingresa un RUT válido igual que en el resto
del sistema).

## Estructura del proyecto

```
edunova_project/   # settings, urls raíz
usuarios/          # modelo Usuario (custom, login por RUT), login, registro
academico/         # Curso, Estudiante, Asistencia, Observacion,
                    # JustificacionRetiro, Evento (nuevo) + homes de docente/apoderado
comunicacion/       # MensajeComunicacion, envío de comunicados, bandeja,
                    # panel de notificaciones (HTMX)
templates/          # todas las plantillas, organizadas por app
static/css/         # tokens de diseño (paleta, tipografía) que Tailwind CDN no cubre
```

## Decisiones tomadas sobre el esquema original

- **Login por RUT**: se usa `rut` como identificador de acceso en vez de un
  username genérico o el email, ya que es lo natural para usuarios chilenos.
- **Solo 2 roles activos** (`docente`, `apoderado`): el modelo `Usuario`
  contempla `funcionario` en el enum de roles pero no se expone en el
  registro ni en las vistas, para no construir sobre un supuesto que aún no
  se confirma con el cliente. Reactivarlo es agregar el valor al
  `ROLES_ACTIVOS` en `usuarios/models.py` y crear su vista de home.
- **Modelo `Evento` (nuevo, sugerido)**: el esquema original no traía ninguna
  tabla para alimentar un calendario de clases/evaluaciones/reuniones, así
  que se agregó en `academico/models.py`. Es lo que llena el calendario en
  ambos homes.
- **Campos `leido` / `fecha_lectura` en `MensajeComunicacion`** (nuevos): se
  necesitan para que la campana de notificaciones sepa qué mostrar como "no
  leído"; el esquema original no los incluía pero `exige_recibo_lectura` ya
  sugería la necesidad de rastrear esto.
- **`apellido_familiar` en `Estudiante`** (nuevo): permite agrupar hermanos
  bajo una misma tarjeta "Familia X" en el home del apoderado; se calcula
  automáticamente del `nombre_completo` si no se especifica.

## Sugerencias para seguir avanzando

- **Firma digital de comunicados**: el campo `requiere_firma_digital` ya
  existe en el modelo pero no hay flujo de firma implementado — podría
  resolverse con un simple checkbox de "acepto/firmo" + registro de fecha,
  sin necesidad de una librería de firma electrónica avanzada al principio.
- **Recordatorios automáticos**: usando el modelo `Evento`, se puede agregar
  un correo o notificación 24h antes de una evaluación o reunión (Celery o
  un comando periódico simple).
- **Permisos más finos**: hoy cualquier docente puede escribir a cualquier
  apoderado de sus cursos; si más adelante hay más de un docente por curso
  (profesores de asignatura, no solo el jefe), conviene una tabla
  `Curso_Docente` en vez de un solo `docente_jefe`.
- **Exportar reportes**: un botón para descargar la asistencia u
  observaciones del estudiante en PDF sería un plus fácil de vender a un
  colegio o escuela de lenguaje.
- Cuando definan si el cliente final es el colegio o la escuela de lenguaje,
  conviene revisar si necesitan el rol `funcionario` (secretaría) para cargar
  matrículas o gestionar comunicados masivos — el modelo ya está listo para
  activarlo.
