# Supabase Database Setup

This Django project is configured to use Supabase as the database backend.

## Prerequisites

1. A Supabase account and project
2. Python virtual environment activated

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Django Settings
SECRET_KEY=your-secret-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Supabase Database Configuration
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-db-password
SUPABASE_DB_HOST=your-project-ref.supabase.co
SUPABASE_DB_PORT=5432

# Supabase API Configuration (optional - for direct API calls)
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Redis Configuration (for Channels/WebSocket)
REDIS_HOST=127.0.0.1
```

### 3. Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Copy the connection details:
   - **Host**: Your project reference (e.g., `abc123.supabase.co`)
   - **Database name**: Usually `postgres`
   - **Username**: Usually `postgres`
   - **Password**: Your database password
   - **Port**: Usually `5432`

4. For API access, go to **Settings** → **API**:
   - Copy the **Project URL**
   - Copy the **anon public** key
   - Copy the **service_role** key (for admin operations)

### 4. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Superuser

```bash
python manage.py createsuperuser
```

### 6. Test the Connection

```bash
python manage.py runserver
```

## Database Configuration

The project is configured to use PostgreSQL with SSL mode required, which is the standard for Supabase connections.

## Supabase Client Usage

If you need to make direct API calls to Supabase, you can use the provided client:

```python
from apps.supabase_client import get_supabase_client, get_supabase_service_client

# For regular operations (uses anon key)
supabase = get_supabase_client()

# For admin operations (uses service role key)
supabase_admin = get_supabase_service_client()
```

## Troubleshooting

- **Connection refused**: Check your Supabase project is active and credentials are correct
- **SSL errors**: Ensure `sslmode: 'require'` is set in database config (already configured)
- **Authentication errors**: Verify your database password and user permissions

