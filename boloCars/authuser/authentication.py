# authuser/authentication.py
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
import jwt

class CustomBearerTokenAuth(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        
        if not auth_header:
            return None
        
        parts = auth_header.split()
        
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return None
        
        try:
            user_id_from_token_logic_here = self.validate_bearer_token(parts[1])
            
            try:
                from django.contrib.auth.models import User
                
                user_obj = User.objects.get(id=user_id_from_token_logic_here)
                return user_obj, None
            
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed("Invalid credentials.")
        
        except Exception as e:
            raise exceptions.AuthenticationFailed(f"Invalid credentials: {str(e)}")

    def validate_bearer_token(self, token_value):
        try:
            # Assuming secret key from settings.
            from django.conf import settings
            
            payload = jwt.decode(token_value, key=settings.SECRET_KEY, algorithms=['HS256'])
            
            # Here, assuming payload contains user ID.
            return payload['user_id']
    
        except jwt.ExpiredSignatureError as e1:  
            raise exceptions.AuthenticationFailed("Token has expired.")
    
