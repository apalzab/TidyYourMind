from django.db import models


class Note(models.Model):
    user_id = models.EmailField(max_length=250)
    title = models.CharField(max_length=250)
    content = models.CharField(max_length=1000)
    color = models.CharField(max_length=250)
