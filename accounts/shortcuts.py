from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


def create_non_active_user(data):
    """ Creates a user with is_active = False
    :param data: dictionary that fills out :class:`UserCreationForm`
    """
    form = data
    user = User.objects.create_user(form.cleaned_data['username'], None, form.cleaned_data['password1'])
    user.is_active = False
    user.save()
    send_confirmation_email(user)

def activate_user(username):
    """ Sets the user to active in the db
    :param username:
    """
    user = User.objects.get(username=username)
    user = get_object_or_404(User, username=username)
    user.is_active = True
    user.save()

def send_confirmation_email(user):
    """ Sends account confirmation email
    :param user: django.contrib.auth.models User object
    """
    subject, from_email, to = 'Thanks for signing up!', 'from@example.com', user.username
    text_content = 'This is an important message.'
    html_content = get_template('accounts/confirmation_email.html').render(
            Context({
                'user': user,
            })
        )
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()