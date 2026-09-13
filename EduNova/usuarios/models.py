from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    """
    Extiende AbstractUser para representar la tabla Usuario del esquema.
    El RUT se usa como identificador de acceso (username = rut).

    Roles:
      - docente
      - apoderado
      - funcionario (reservado: aún no se define si el cliente será un
        colegio con administrativos propios; se deja modelado pero no
        se expone en el registro ni en las vistas por ahora)
    """

    class Rol(models.TextChoices):
        DOCENTE = 'docente', 'Docente'
        APODERADO = 'apoderado', 'Apoderado / Tutor legal'
        FUNCIONARIO = 'funcionario', 'Funcionario'  # reservado, no habilitado aún

    # Roles que pueden registrarse / usarse mientras el cliente no esté confirmado
    ROLES_ACTIVOS = (Rol.DOCENTE, Rol.APODERADO)

    rut = models.CharField('RUT', max_length=12, unique=True)
    apellidos = models.CharField('Apellidos', max_length=50)
    rol = models.CharField(max_length=30, choices=Rol.choices)
    telefono = models.CharField('Teléfono', max_length=15, blank=True)

    # Campos heredados de AbstractUser que reutilizamos:
    #   first_name -> nombre
    #   email      -> email
    #   username   -> se completa automáticamente con el RUT

    REQUIRED_FIELDS = ['email', 'first_name', 'apellidos', 'rol']

    def save(self, *args, **kwargs):
        # username interno = rut, para que AbstractUser siga funcionando
        # sin reescribir todo el backend de auth.
        self.username = self.rut
        super().save(*args, **kwargs)

    @property
    def nombre_completo(self):
        return f"{self.first_name} {self.apellidos}".strip()

    def es_docente(self):
        return self.rol == self.Rol.DOCENTE

    def es_apoderado(self):
        return self.rol == self.Rol.APODERADO

    def __str__(self):
        return f"{self.nombre_completo} ({self.get_rol_display()})"

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
