from django.urls import path
from hats_rest.views import(
    list_of_hats,detail_list_hats,
)

urlpatterns = [
    path("hats/",list_of_hats, name ="list_of_hats"),
    path("hats/<int:pk>/", detail_list_hats, name = "detail_list_hats"),
]
