# -*- coding: utf-8 -*-
from django.core.urlresolvers import reverse
from django.shortcuts import render
from django.http.response import HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.models import User
from accounts.forms import UserForm, ChangePasswordForm, SignUpForm

@permission_required("is_superuser")
def index(request):
    objs_list = User.objects.all()
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
    return render(request, "usuarios/index.html", ctx)

@permission_required("is_superuser")
def nuevo(request):
    form_user = SignUpForm(request.POST)
    if request.method == "POST":
        if form_user.is_valid():
            user = form_user.save()
            user.set_password(request.POST.get("password"))
            user.save()
            messages.success(request, "Usuario creado con exito.")
        else:
            messages.warning(request, "Verificar los campos obligatorios")
    else:
        form_user = SignUpForm()
    ctx = {
        "form_user":form_user,
    }
    return render(request,"usuarios/nuevo.html",ctx)

@permission_required("is_superuser")
def editar(request,pk):
    try:
        obj = User.objects.get(pk=pk)
    except User.DoesNotExist:
        messages.warning(request, "Usuario no encontrado.")
        return HttpResponseRedirect(reverse("usuarios"))

    if request.method == 'POST':
        form = UserForm(request.POST, instance=obj)
        if form.is_valid():
            form.save()
            messages.success(request, "Información actualizado.")
            return HttpResponseRedirect(reverse("empresas_detalle", args=(pk,)))
        else:
            messages.warning(request, 'Verifique la información completada.')
    else:
        form = UserForm(instance=obj)
    ctx = {
        'form': form,
        }
    return render(request,'usuarios/editar.html',ctx)


@permission_required("is_superuser")
def password(request,pk):
    try:
        obj = User.objects.get(pk=pk)
    except User.DoesNotExist:
        messages.warning(request, "Usuario no encontrada.")
        return HttpResponseRedirect(reverse("usuarios"))

    if request.method == 'POST':
        form = ChangePasswordForm(request.POST)
        if form.is_valid():
            obj.set_password(request.POST.get("new_password"))
            obj.save()
            messages.success(request, "Contraseña actualizada.")
            return HttpResponseRedirect(reverse("empresas_detalle", args=(pk,)))
        else:
            messages.warning(request, 'Verifique la información completada.')
    else:
        form = ChangePasswordForm()
    ctx = {
        'form': form,
        }
    return render(request,'usuarios/password.html',ctx)