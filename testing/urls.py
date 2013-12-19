from django.conf.urls import patterns, include, url





urlpatterns = patterns('testing.views',
    url(r'^$','testing', name='testing'),
)
