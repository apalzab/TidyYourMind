from django.conf.urls import patterns, include, url, settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('tidyourmind.views',
    # Examples:
    # url(r'^$', 'tidyourmind.views.home', name='home'),
    # url(r'^tidyourmind/', include('tidyourmind.foo.urls')),

    url(r'^testing/', include('testing.urls')),
    url(r'^accounts/', include('accounts.urls')),


    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)


urlpatterns += patterns('',
    (r'^static/(?P.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)
