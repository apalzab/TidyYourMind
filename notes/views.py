import logging

from django.shortcuts import render_to_response

from tidyourmind.api import NoteResource

from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse


logr = logging.getLogger(__name__)

def notes(request):
    """Returns notes"""
    if request.user.is_authenticated():
        logr.info('The user is authenticated, retrieving notes...')
        resource_note = NoteResource()
        notes = resource_note.get_object_list(request).filter(user_id=request.user.id)
        return render_to_response('notes/notes.html',
                               {"notes": notes},
                                context_instance=RequestContext(request))
    else:
        logr.info('The user is not authenticated, redirecting...')
        return HttpResponseRedirect(reverse('login'))