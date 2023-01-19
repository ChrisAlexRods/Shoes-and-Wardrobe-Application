from django.urls import path
from hats_rest.views import(
    list_of_hats,
)

urlpatterns = [
    path("hats/",list_of_hats, name ="list_of_hats" )
]
