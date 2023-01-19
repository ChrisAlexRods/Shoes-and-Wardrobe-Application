from django.db import models
from django.urls import reverse
from django.conf import settings

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200, unique=True)
    section_number = models.PositiveSmallIntegerField()
    shelf_number =  models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.closet_name} {self.section_number} {self.shelf_number}"


class Hats(models.Model):
    fabric = models.CharField(max_length=40)
    style_name = models.CharField(max_length=40)
    color = models.CharField(max_length=40)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )
