from django.http import HttpResponse
from models import Note

def testing(request):
    note = Note(user_id="apalzab@gmail.com", title="Mi primera nota", content="hola django app en heroku", color="666666")
    note.save()
    return HttpResponse("hello django on heroku...")