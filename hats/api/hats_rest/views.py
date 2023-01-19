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

@require_http_methods(["DELETE", "GET", "PUT"])
def detail_list_hats(request, pk):
    if request.method == "GET":
        hat = Hats.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder = HatsListEnconder,
            safe = False,
        )
    elif request.method == "DELETE":
        count,_ = Hats.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            content = json.loads(request.body)
            hat = Hats.objects.get(id=pk)

            props = ["fabric", "style_name", "color", "picture_url"]
            for prop in props:
                if prop in content:
                    setattr(hat, prop, content[prop])
            if "location" in content:
                location_href = content["location"]["import_href"]
                location = LocationVO.objects.get(import_href=location_href)
                hat.location = location
            hat.save()
            return JsonResponse(
                hat,
                encoder=HatsDetailEncoder,
                safe=False,
            )
        except Hats.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response