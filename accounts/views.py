import logging
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.core.context_processors import csrf
from django.contrib.auth.forms import UserCreationForm
from django.contrib import auth
from django.shortcuts import render_to_response

from . import shortcuts

logr = logging.getLogger(__name__)


def register(request):
    form = UserCreationForm(request.POST)
    if form.is_valid():
        shortcuts.create_non_active_user(form)
        return HttpResponseRedirect('/accounts/register_success')
    else:
        return HttpResponse('Something went wrong. try again.')

def register_success(request):
    return render_to_response('accounts/register_success.html')

def confirm(request, username):
    shortcuts.activate_user(username)
    return HttpResponseRedirect(reverse('notes'))

def login(request):
    c = {}
    c.update(csrf(request))
    return render_to_response('accounts/login.html', c)

def logout(request):
    auth.logout(request)
    return HttpResponseRedirect(reverse('login'))

def auth_view(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = auth.authenticate(username=username, password=password)

    if user is not None and user.is_active is True:
        auth.login(request, user)
        return HttpResponseRedirect(reverse('notes'))
    else:
        return HttpResponseRedirect(reverse('login'))

def invalid_login(request):
    return render_to_response('accounts/invalid_login.html')