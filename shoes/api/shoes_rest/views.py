from django.shortcuts import render
from .models import Shoe, BinVO
from common.json import ModelEncoder
import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["import_href", "id", "closet_name", "bin_number", "bin_size"]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["id", "manufacturer", "model_name", "color", "picture_url"]
    def get_extra_data(self, o):
        return {"bin": o.bin.id}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):

    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        # except BinVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid bin idkjhbkjb"},
        #         status=400,
        #     )
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 500
            return response

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_shoe(request, pk):

    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            {"shoe": shoe},
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "bin" in content:
                bin = BinVO.objects.get(id=content["bin"])
                content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        Shoe.objects.filter(id=pk).update(**content)

        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            {"shoe": shoe},
            encoder=ShoeDetailEncoder,
            safe=False,
        )
