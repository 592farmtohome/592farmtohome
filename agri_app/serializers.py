from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    price_display = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_price_display(self, obj):
        return f"GYD {obj.price}"
