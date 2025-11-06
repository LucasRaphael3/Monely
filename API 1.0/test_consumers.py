import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from config.asgi import application

User = get_user_model()

@pytest.mark.asyncio
class TestFinanceConsumer:

    async def test_authenticated_user_can_connect(self):
        """
        Testa se um usuário autenticado consegue se conectar ao WebSocket.
        """
        user = User.objects.create_user(username='testconsumer', password='password')
        communicator = WebsocketCommunicator(application, "/ws/finances/")
        communicator.scope['user'] = user
        
        connected, subprotocol = await communicator.connect()
        assert connected
        
        # Testa se o consumidor envia uma mensagem de volta
        # (Este teste pode ser expandido se houver uma mensagem de boas-vindas)

        await communicator.disconnect()

    async def test_unauthenticated_user_is_rejected(self):
        """
        Testa se um usuário anônimo/não autenticado é desconectado.
        """
        communicator = WebsocketCommunicator(application, "/ws/finances/")
        communicator.scope['user'] = AnonymousUser()
        
        connected, subprotocol = await communicator.connect()
        assert not connected

    async def test_receives_transaction_update(self):
        """
        Testa se o consumidor envia corretamente um evento de atualização de transação.
        """
        user = User.objects.create_user(username='testconsumer2', password='password')
        communicator = WebsocketCommunicator(application, "/ws/finances/")
        communicator.scope['user'] = user
        await communicator.connect()

        # Simula o envio de um evento pelo backend (ex: via um signal)
        await communicator.send_json_to({
            'type': 'transaction.update',
            'action': 'created',
            'transaction_id': 123
        })

        response = await communicator.receive_json_from()
        assert response['type'] == 'transaction_update'
        assert response['action'] == 'created'
        assert response['transaction_id'] == 123

        await communicator.disconnect()
