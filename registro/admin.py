# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Cuestionario, PuntajeTrastorno, BRMF
from import_export.admin import ImportExportModelAdmin

@admin.register(Cuestionario)
class CuestionarioAdmin(ImportExportModelAdmin):
    pass

@admin.register(PuntajeTrastorno)
class PuntajeTrastornoAdmin(ImportExportModelAdmin):
    pass

@admin.register(BRMF)
class BRMFAdmin(ImportExportModelAdmin):
    pass

# class AdminCuestionario(admin.ModelAdmin):
#     list_display = ["__unicode__","edad","sexo","carrera","p1","p2","p3","fecha"]
#     class  Meta:
#         model=Cuestionario
# admin.site.register(Cuestionario,AdminCuestionario)


