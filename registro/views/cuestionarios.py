# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http.response import HttpResponseRedirect
from django.contrib import messages
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from registro.models import Cuestionario
from registro.forms import CuestionarioForm
from django.contrib.auth.decorators import permission_required

@permission_required("is_superuser")
def index(request):
    objs_list = Cuestionario.objects.all()
    paginator = Paginator(objs_list, 25)

    page = request.GET.get('page')
    try:
        objs = paginator.page(page)
    except PageNotAnInteger:
        objs = paginator.page(1)
    except EmptyPage:
        objs = paginator.page(paginator.num_pages)
    ctx = {
        "objs":objs,
    }
    return render(request, "cuestionarios/index.html", ctx)


def nuevo(request):
    tituloe="Cuestionario"
    if request.method == 'POST':
        form = CuestionarioForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            form.save()
            messages.success(request, "Sus respuestas han sido enviadas con exito. ")
            return HttpResponseRedirect(request.path)
    else:
        form = CuestionarioForm()
    return render(request,"create.html",{"titulo":tituloe,"form":form})
    # form = CuestionarioForm(request.POST or None, request.FILES or None)
    # if form.is_valid():
    #     form.save()
    #     messages.success(request, "Sus respuestas han sido enviadas con exito. ")
    #     return HttpResponseRedirect(request.path)
    # return render(request,"create.html",{"titulo":tituloe,"form":form})


