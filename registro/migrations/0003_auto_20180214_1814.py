# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-02-14 23:14
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registro', '0002_auto_20180214_1429'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cuestionario',
            name='fecha',
            field=models.DateTimeField(default=datetime.datetime(2018, 2, 14, 18, 14, 29, 458000)),
        ),
        migrations.AlterField(
            model_name='puntajetrastorno',
            name='puntaje_trastorno',
            field=models.IntegerField(),
        ),
    ]
