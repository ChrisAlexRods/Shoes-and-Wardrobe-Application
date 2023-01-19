from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from .models import Hats, LocationVO
from common.json import ModelEncoder
# Create your views here.

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        'import_href',
        "closet_name",
        "section_number",
        "shelf_number",
    ]


class HatsListEnconder(ModelEncoder):
    model = Hats
    properties = [
        "id",
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        'location' : LocationVODetailEncoder()
    }

class HatsDetailEncoder(ModelEncoder):
    model = Hats
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        'location' : LocationVODetailEncoder()
    }


@require_http_methods(["GET", "POST"])
def list_of_hats(request):
    if request.method == "GET":
            hats = Hats.objects.all()
            return JsonResponse(
                {"hats" : hats},
                encoder=HatsListEnconder,
            )
    else:
        content = json.loads(request.body)

        try:
            location_href = content['location']
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hats = Hats.objects.create(**content)
        return JsonResponse(
            hats,
            encoder=HatsDetailEncoder,
            safe=False,
        )
