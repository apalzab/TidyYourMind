from django.conf.urls import patterns, include, url
from tidyourmind.api import NoteResource

note_resource = NoteResource()


urlpatterns = patterns('notes.views',
    url(r'^$','notes', name='notes'),
)
