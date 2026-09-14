from django.contrib import admin

from .models import MensajeComunicacion, LecturaMensaje


@admin.register(MensajeComunicacion)
class MensajeComunicacionAdmin(admin.ModelAdmin):
    list_display = ('folio', 'asunto', 'remitente', 'destinatario', 'curso_destino', 'tipo_comunicacion', 'fecha_hora_envio')
    list_filter = ('tipo_comunicacion',)
    search_fields = ('folio', 'asunto')


@admin.register(LecturaMensaje)
class LecturaMensajeAdmin(admin.ModelAdmin):
    list_display = ('mensaje', 'destinatario', 'leido', 'fecha_hora_lectura')
    list_filter = ('leido',)