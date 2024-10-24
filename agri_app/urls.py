from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, update_product_price, update_price, get_product, get_products, purchase_product, get_market_trends, get_international_markets, connect_to_market
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
import json
from .models import Product, DemandForecast
from .serializers import ProductSerializer
from .tasks import predict_demand, calculate_dynamic_price
from dynamic_pricing.pricing import real_time_pricing_system

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    # ... existing urls ...
    path('products/', views.get_products, name='get_products'),
    path('purchase/<int:product_id>/', views.purchase_product, name='purchase_product'),
    path('sell-product/', views.sell_product, name='sell_product'),
    path('market-trends/', views.get_market_trends, name='get_market_trends'),
    path('international-markets/', views.get_international_markets, name='get_international_markets'),
    path('connect-market/<int:market_id>/', views.connect_to_market, name='connect_to_market'),
    path('ai-assist/', views.ai_assist, name='ai_assist'),
    path('', include(router.urls)),
    path('update-product-price/', update_product_price, name='update_product_price'),
    path('update-price/<int:product_id>/', update_price, name='update_price'),
    path('get-product/<int:product_id>/', get_product, name='get_product'),
    path('products/', get_products, name='get_products'),
    path('purchase/<int:product_id>/', purchase_product, name='purchase_product'),
    path('market-trends/', get_market_trends, name='get_market_trends'),
    path('ai-assist/', ai_assist, name='ai_assist'),
    path('international-markets/', get_international_markets, name='get_international_markets'),
    path('connect-market/<int:market_id>/', connect_to_market, name='connect_to_market'),
]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=['get'])
    def get_dynamic_price(self, request, pk=None):
        product = self.get_object()
        try:
            price = calculate_dynamic_price(product.id, 100, 100)  # Dummy values for supply and demand
            return Response({'price': price})
        except ValueError as e:
            return Response({'error': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def update_product_price(request):
    # ... copy the update_product_price function from your original file ...

def update_price(request, product_id):
    product = Product.objects.get(id=product_id)
    new_price = real_time_pricing_system(product.name)
    update_product_price.delay(product_id, new_price)
    return JsonResponse({'status': 'Price update scheduled'})
def get_product(request, product_id):
    product = Product.objects.get(id=product_id)
    return JsonResponse({
        'id': product.id,
        'name': product.name,
        'price': str(product.price),
        'quantity': product.quantity,
        'seller': product.seller.username
    })
