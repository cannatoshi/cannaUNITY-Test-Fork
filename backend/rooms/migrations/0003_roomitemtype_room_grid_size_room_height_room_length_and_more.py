# Generated by Django 5.2 on 2025-04-27 21:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0002_remove_room_created_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='RoomItemType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('category', models.CharField(choices=[('furniture', 'Möbel'), ('lighting', 'Beleuchtung'), ('sensor', 'Sensorik'), ('access', 'Zugang'), ('other', 'Sonstiges')], max_length=20)),
                ('icon', models.CharField(help_text='Icon-Klassenname oder URL', max_length=100)),
                ('default_width', models.IntegerField(default=100, help_text='Standardbreite in cm')),
                ('default_height', models.IntegerField(default=100, help_text='Standardhöhe in cm')),
                ('allowed_quantities', models.JSONField(blank=True, default=list, help_text='Liste erlaubter Pflanzenmengen, z.B. [9,16,25]', null=True)),
            ],
        ),
        migrations.AddField(
            model_name='room',
            name='grid_size',
            field=models.IntegerField(default=10, help_text='Rastergröße in cm'),
        ),
        migrations.AddField(
            model_name='room',
            name='height',
            field=models.IntegerField(default=250, help_text='Höhe in cm'),
        ),
        migrations.AddField(
            model_name='room',
            name='length',
            field=models.IntegerField(default=500, help_text='Länge in cm'),
        ),
        migrations.AddField(
            model_name='room',
            name='width',
            field=models.IntegerField(default=500, help_text='Breite in cm'),
        ),
        migrations.CreateModel(
            name='RoomItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x_position', models.IntegerField(help_text='X-Position im Raumraster')),
                ('y_position', models.IntegerField(help_text='Y-Position im Raumraster')),
                ('width', models.IntegerField(help_text='Breite in Rastereinheiten')),
                ('height', models.IntegerField(help_text='Höhe in Rastereinheiten')),
                ('rotation', models.IntegerField(default=0, help_text='Rotation in Grad')),
                ('plant_quantity', models.IntegerField(default=0, help_text='Anzahl der Pflanzen auf diesem Element')),
                ('plant_arrangement', models.CharField(blank=True, help_text="z.B. '3x3', '4x4'", max_length=10, null=True)),
                ('properties', models.JSONField(blank=True, default=dict, help_text='Weitere Eigenschaften des Elements als JSON', null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='rooms.room')),
                ('item_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='rooms.roomitemtype')),
            ],
        ),
        migrations.CreateModel(
            name='Sensor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sensor_type', models.CharField(choices=[('temperature', 'Temperatur'), ('humidity', 'Luftfeuchtigkeit'), ('co2', 'CO2'), ('ph', 'pH-Wert'), ('ec', 'EC-Wert'), ('light', 'Lichtstärke'), ('dust', 'Staubwerte'), ('other', 'Sonstiges')], max_length=20)),
                ('data_source', models.CharField(blank=True, help_text='API-Endpunkt oder Gerätedaten', max_length=255, null=True)),
                ('last_reading', models.JSONField(blank=True, default=dict, null=True)),
                ('last_updated', models.DateTimeField(blank=True, null=True)),
                ('properties', models.JSONField(blank=True, default=dict, null=True)),
                ('room_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sensors', to='rooms.roomitem')),
            ],
        ),
    ]
