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
import random

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

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def purchase_product(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        if product.quantity > 0:
            product.quantity -= 1
            product.save()
            return Response({'success': True, 'message': 'Purchase successful'})
        else:
            return Response({'success': False, 'message': 'Product out of stock'}, status=400)
    except Product.DoesNotExist:
        return Response({'success': False, 'message': 'Product not found'}, status=404)

@api_view(['POST'])
@csrf_exempt
def sell_product(request):
    data = json.loads(request.body)
    product = Product.objects.create(
        name=data['name'],
        price=data['price'],
        quantity=data['quantity'],
        seller=request.user
    )
    return JsonResponse({'success': True, 'message': 'Product listed successfully'})

@api_view(['GET'])
def get_market_trends(request):
    # This is a simplified version. In a real application, you'd implement more complex trend analysis
    products = Product.objects.all()
    trends = []
    for product in products:
        trend = {
            'product': product.name,
            'status': 'Stable',
            'change': round(random.uniform(-10, 10), 2)
        }
        if trend['change'] > 5:
            trend['status'] = 'Rising'
        elif trend['change'] < -5:
            trend['status'] = 'Falling'
        trends.append(trend)
    return Response(trends)

@api_view(['GET'])
def get_international_markets(request):
    # This is a simplified version. In a real application, you'd fetch real data from external APIs
    markets = [
        {'id': 1, 'name': 'European Union', 'products': ['Wheat', 'Sugar'], 'exchangeRate': 0.0041, 'currency': 'EUR'},
        {'id': 2, 'name': 'United States', 'products': ['Rice', 'Sugar'], 'exchangeRate': 0.0048, 'currency': 'USD'},
        {'id': 3, 'name': 'China', 'products': ['Rice', 'Wheat'], 'exchangeRate': 0.031, 'currency': 'CNY'},
    ]
    return Response(markets)

@api_view(['POST'])
def connect_to_market(request, market_id):
    # This is a placeholder. In a real application, you'd implement the actual connection logic
    return Response({'success': True, 'message': f'Connected to market {market_id}'})

@api_view(['POST'])
def ai_assist(request):
    question = request.data.get('question')
    # In a real application, you'd integrate with an AI service here
    response = f"AI response to: {question}"
    return Response({'response': response})

@api_view(['POST'])
def purchase_product(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        if product.quantity > 0:
            product.quantity -= 1
            product.save()
            return Response({'success': True, 'message': 'Purchase successful'})
        else:
            return Response({'success': False, 'message': 'Product out of stock'}, status=400)
    except Product.DoesNotExist:
        return Response({'success': False, 'message': 'Product not found'}, status=404)

@api_view(['POST'])
@csrf_exempt
def sell_product(request):
    data = json.loads(request.body)
    product = Product.objects.create(
        name=data['name'],
        price=data['price'],
        quantity=data['quantity'],
        seller=request.user
    )
    return JsonResponse({'success': True, 'message': 'Product listed successfully'})

@api_view(['GET'])
def get_market_trends(request):
    # This is a simplified version. In a real application, you'd implement more complex trend analysis
    products = Product.objects.all()
    trends = []
    for product in products:
        trend = {
            'product': product.name,
            'status': 'Stable',
            'change': round(random.uniform(-10, 10), 2)
        }
        if trend['change'] > 5:
            trend['status'] = 'Rising'
        elif trend['change'] < -5:
            trend['status'] = 'Falling'
        trends.append(trend)
    return Response(trends)

@api_view(['GET'])
def get_international_markets(request):
    # This is a simplified version. In a real application, you'd fetch real data from external APIs
    markets = [
        {'id': 1, 'name': 'European Union', 'products': ['Wheat', 'Sugar'], 'exchangeRate': 0.0041, 'currency': 'EUR'},
        {'id': 2, 'name': 'United States', 'products': ['Rice', 'Sugar'], 'exchangeRate': 0.0048, 'currency': 'USD'},
        {'id': 3, 'name': 'China', 'products': ['Rice', 'Wheat'], 'exchangeRate': 0.031, 'currency': 'CNY'},
    ]
    return Response(markets)

@api_view(['POST'])
def connect_to_market(request, market_id):
    # This is a placeholder. In a real application, you'd implement the actual connection logic
    return Response({'success': True, 'message': f'Connected to market {market_id}'})

@api_view(['POST'])
def ai_assist(request):
    question = request.data.get('question')
    # In a real application, you'd integrate with an AI service here
    response = f"AI response to: {question}"
    return Response({'response': response})

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def purchase_product(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        if product.quantity > 0:
            product.quantity -= 1
            product.save()
            return Response({'success': True, 'message': 'Purchase successful'})
        else:
            return Response({'success': False, 'message': 'Product out of stock'}, status=400)
    except Product.DoesNotExist:
        return Response({'success': False, 'message': 'Product not found'}, status=404)

@api_view(['POST'])
@csrf_exempt
def sell_product(request):
    data = json.loads(request.body)
    product = Product.objects.create(
        name=data['name'],
        price=data['price'],
        quantity=data['quantity'],
        seller=request.user
    )
    return JsonResponse({'success': True, 'message': 'Product listed successfully'})

@api_view(['GET'])
def get_market_trends(request):
    # This is a simplified version. In a real application, you'd implement more complex trend analysis
    products = Product.objects.all()
    trends = []
    for product in products:
        trend = {
            'product': product.name,
            'status': 'Stable',
            'change': round(random.uniform(-10, 10), 2)
        }
        if trend['change'] > 5:
            trend['status'] = 'Rising'
        elif trend['change'] < -5:
            trend['status'] = 'Falling'
        trends.append(trend)
    return Response(trends)

@api_view(['GET'])
def get_international_markets(request):
    # This is a simplified version. In a real application, you'd fetch real data from external APIs
    markets = [
        {'id': 1, 'name': 'European Union', 'products': ['Wheat', 'Sugar'], 'exchangeRate': 0.0041, 'currency': 'EUR'},
        {'id': 2, 'name': 'United States', 'products': ['Rice', 'Sugar'], 'exchangeRate': 0.0048, 'currency': 'USD'},
        {'id': 3, 'name': 'China', 'products': ['Rice', 'Wheat'], 'exchangeRate': 0.031, 'currency': 'CNY'},
    ]
    return Response(markets)

@api_view(['POST'])
def connect_to_market(request, market_id):
    # This is a placeholder. In a real application, you'd implement the actual connection logic
    return Response({'success': True, 'message': f'Connected to market {market_id}'})

@api_view(['POST'])
def ai_assist(request):
    question = request.data.get('question')
    # In a real application, you'd integrate with an AI service here
    response = f"AI response to: {question}"
    return Response({'response': response})

