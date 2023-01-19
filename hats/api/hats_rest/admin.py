from django.contrib import admin
from .models import LocationVO, Hats
# Register your models here.

@admin.register(LocationVO)
class LocationVOadmin(admin.ModelAdmin):
    pass


@admin.register(Hats)
class HatsAdmin(admin.ModelAdmin):
    pass
