from django.conf.urls import url
from registro.views import cuestionarios, usuarios, procesos
urlpatterns = [
    # cuestionario
    url(r'^cuestionario/$', cuestionarios.nuevo, name='cuestionarios_nuevo'),
    url(r'^listar/$', cuestionarios.index, name='cuestionarios'),

    # usuarios
    url(r'^$', usuarios.index, name='usuarios'),
    url(r'^usuarios/nuevo/$', usuarios.nuevo, name='usuarios_nuevo'),
    url(r'^usuarios/(?P<pk>\d+)/editar$', usuarios.editar, name='usuarios_editar'),
    url(r'^usuarios/(?P<pk>\d+)/password$', usuarios.password, name='usuarios_password'),

    #Procesos
    url(r'^importar/$', procesos.import_data, name='import_data'),
    url(r'^resultados/$', procesos.listar_resultados, name='listar_resultados'),
    url(r'^actualizarresult/$', procesos.resultados_1, name='proceso_1'),
    url(r'^resultfinal/$', procesos.listar_resultados_final, name='listar_resulfinal'),
    url(r'^actualizarfinal/$', procesos.resultados_2, name='proceso_2'),
]