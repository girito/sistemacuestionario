# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.http.response import HttpResponseRedirect
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required, permission_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.models import User
from hashlib import md5
import urllib
from pinax.eventlog.models import log

def build_url(*args, **kwargs):
    get = kwargs.pop('get', {})
    url = reverse(*args, **kwargs)
    if get:
        url += '?' + urllib.urlencode(get)
    return url

@login_required
def home(request):
    ctx = {
    }
    return render(request,"dashboard.html", ctx)


