from django.conf.urls import patterns, include, url
from tidyourmind.api import NoteResource
from tastypie.api import Api


v1_api = Api(api_name='v1')
v1_api.register(NoteResource())


# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('tidyourmind.views',
    # Examples:
    url(r'^$', 'index', name='index'),
    url(r'^notes/', include('notes.urls')),
    url(r'^accounts/', include('accounts.urls')),
    url(r'api/', include(v1_api.urls)),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
