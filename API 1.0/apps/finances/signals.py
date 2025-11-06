from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Transaction

@receiver(post_save, sender=Transaction)
def transaction_saved(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'user_{instance.user.id}',
        {
            'type': 'transaction_update',
            'action': 'created' if created else 'updated',
            'transaction_id': instance.id,
        }
    )

@receiver(post_delete, sender=Transaction)
def transaction_deleted(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'user_{instance.user.id}',
        {
            'type': 'transaction_update',
            'action': 'deleted',
            'transaction_id': instance.id,
        }
    )