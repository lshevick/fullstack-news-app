# Generated by Django 4.0.5 on 2022-06-22 21:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0003_article_is_draft'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='is_editable',
            field=models.BooleanField(default=False),
        ),
    ]
