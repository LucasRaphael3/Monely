"""
Supabase client configuration and utilities.
"""
import os
from supabase import create_client, Client
from decouple import config


def get_supabase_client() -> Client:
    """
    Create and return a Supabase client instance.

    Returns:
        Client: Configured Supabase client
    """
    url = config('SUPABASE_URL', default='')
    key = config('SUPABASE_ANON_KEY', default='')

    if not url or not key:
        raise ValueError(
            "SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables"
        )

    return create_client(url, key)


def get_supabase_service_client() -> Client:
    """
    Create and return a Supabase client with service role key for admin operations.

    Returns:
        Client: Configured Supabase client with service role permissions
    """
    url = config('SUPABASE_URL', default='')
    service_key = config('SUPABASE_SERVICE_ROLE_KEY', default='')

    if not url or not service_key:
        raise ValueError(
            "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables"
        )

    return create_client(url, service_key)

