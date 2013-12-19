from django.conf.urls import patterns, url

urlpatterns = patterns('accounts.views',
    url(r'^register/$','register', name='register'),
    url(r'^register_success/$','register_success', name='register_success'),
    url(r'^confirm/(?P<username>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$','confirm', name='confirm'),
    url(r'^login/$','login', name='login'),
    url(r'^logout/$','logout', name='logout'),
    url(r'^auth/$','auth_view', name='auth'),
)
