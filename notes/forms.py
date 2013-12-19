from django import forms


class NoteForm(forms.Form):
    title = forms.CharField(max_length=250, required=False)
    content = forms.CharField(max_length=1000, required=False)
    color = forms.CharField(max_length=250, required=False)

    def clean_color(self):
        color = self.cleaned_data['color']

        if len(color) == 7 or len(color) == 4:
            raise forms.ValidationError("Color error")
        return color