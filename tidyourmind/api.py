from tastypie.resources import ModelResource
from tastypie.constants import ALL
from tastypie.serializers import Serializer
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization

from notes.models import Note

class NoteResource(ModelResource):
    class Meta:
        queryset = Note.objects.all()
        resource_name = 'notes'
        serializer = Serializer()
        authentication = SessionAuthentication()
        authorization = Authorization()
        always_return_data=True
        serializer = Serializer(formats=['json'])

    def get_object_list(self, request):
        return super(NoteResource, self).get_object_list(request).filter(user_id=request.user.id)

    def hydrate_user_id(self, bundle):
        bundle.data['user_id'] = bundle.request.user.id
        return bundle

    def dehydrate(self, bundle):
        del(bundle.data['user_id'])
        return bundle
