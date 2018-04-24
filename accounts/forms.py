# -*- coding: utf-8 -*-
from django import forms
from django.contrib.auth.models import User


class UserForm(forms.ModelForm):
    username = forms.CharField(required=True,min_length=3,max_length=15)
    email = forms.CharField(required=True,max_length=60,label="E-mail")
    class Meta:
        model = User
        fields = ('username','email','first_name','last_name', 'is_superuser','is_active')

class SignUpForm(forms.ModelForm):
    username = forms.CharField(required=True,min_length=3,max_length=15)
    password = forms.CharField(required=True,min_length=8,max_length=16,widget=forms.PasswordInput)
    email = forms.CharField(required=True,max_length=60,label="E-mail")
    class Meta:
        model = User
        fields = ['username', 'password', 'email','first_name','last_name']

class ChangePasswordForm(forms.Form):
    new_password = forms.CharField(required=True,min_length=8,max_length=16,widget=forms.PasswordInput,label="New password")
    new_password_verify = forms.CharField(required=True,min_length=8,max_length=16,widget=forms.PasswordInput,label="Repeat new password")

    def clean(self):
        new_password = self.cleaned_data.get("new_password")
        new_password_verify = self.cleaned_data.get("new_password_verify")
        if new_password and new_password != new_password_verify:
            raise forms.ValidationError("New password do not match")
        return self.cleaned_data