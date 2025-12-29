# Customer Management API - SvelteKit

A full-stack REST API built with SvelteKit and Supabase for managing customers, contacts, and sheets.

## Features

- 🔐 **Authentication** - Email/password authentication with Supabase
- 👥 **Customer Management** - Full CRUD operations with search, sort, and pagination
- 📞 **Contact Management** - Associate contacts with customers
- 📋 **Sheet Management** - Organize customers into sheets
- 🔒 **Row Level Security** - Users can only access their own data
- 🚀 **TypeScript** - Fully typed API with type-safe conversions

## Setup

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

\`\`\`bash
cp .env.example .env
\`\`\`

Then fill in your Supabase credentials:

\`\`\`env
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

### 3. Run Database Migrations

Execute the SQL script in `scripts/001_create_tables.sql` in your Supabase SQL editor to create the necessary tables.

### 4. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The API will be available at `http://localhost:5173`

## API Endpoints

### Authentication

#### Register
\`\`\`bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

#### Login
\`\`\`bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

#### Logout
\`\`\`bash
POST /api/auth/logout
\`\`\`

#### Get Current User
\`\`\`bash
GET /api/auth/me
\`\`\`

### Customers

#### List Customers (with search, sort, pagination)
\`\`\`bash
GET /api/customers?page=1&limit=50&search=acme&sortBy=name&sortOrder=asc&status=active&type=premium&priority=high
\`\`\`

Query Parameters:
- `page` (default: 1) - Page number
- `limit` (default: 50) - Items per page
- `search` - Search by customer name
- `sortBy` - Sort field (name, status, priority, type, last_communication, created_at)
- `sortOrder` - Sort order (asc, desc)
- `status` - Filter by status
- `type` - Filter by type
- `priority` - Filter by priority

#### Get Customer by ID
\`\`\`bash
GET /api/customers/{id}
\`\`\`

#### Create Customer
\`\`\`bash
POST /api/customers
Content-Type: application/json

{
  "name": "Acme Corp",
  "addresses": ["123 Main St", "456 Oak Ave"],
  "type": "premium",
  "contacts": [],
  "containerType": "standard",
  "status": "active",
  "lastCommunication": "2025-01-15T10:00:00Z",
  "priority": "high",
  "comments": ["First contact made"],
  "otherData": {}
}
\`\`\`

#### Update Customer
\`\`\`bash
PUT /api/customers/{id}
Content-Type: application/json

{
  "name": "Updated Name",
  "status": "inactive"
}
\`\`\`

#### Delete Customer
\`\`\`bash
DELETE /api/customers/{id}
\`\`\`

### Contacts

#### List Contacts
\`\`\`bash
GET /api/contacts?customerId={customerId}
\`\`\`

#### Get Contact by ID
\`\`\`bash
GET /api/contacts/{id}
\`\`\`

#### Create Contact
\`\`\`bash
POST /api/contacts
Content-Type: application/json

{
  "customerId": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
\`\`\`

#### Update Contact
\`\`\`bash
PUT /api/contacts/{id}
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
\`\`\`

#### Delete Contact
\`\`\`bash
DELETE /api/contacts/{id}
\`\`\`

### Sheets

#### List Sheets
\`\`\`bash
GET /api/sheets
\`\`\`

#### Get Sheet by ID
\`\`\`bash
GET /api/sheets/{id}
\`\`\`

#### Create Sheet
\`\`\`bash
POST /api/sheets
Content-Type: application/json

{
  "name": "Q1 2025 Customers",
  "description": "First quarter customer list",
  "customerIds": ["uuid1", "uuid2"]
}
\`\`\`

#### Update Sheet
\`\`\`bash
PUT /api/sheets/{id}
Content-Type: application/json

{
  "name": "Updated Sheet Name",
  "customerIds": ["uuid1", "uuid2", "uuid3"]
}
\`\`\`

#### Delete Sheet
\`\`\`bash
DELETE /api/sheets/{id}
\`\`\`

## Type Definitions

The API uses TypeScript types for all entities:

\`\`\`typescript
type Customer = {
    id: string;
    userId: string;
    name: string;
    addresses: Array<string>;
    type: string;
    contacts: Array<string>;
    containerType: string;
    status: string;
    lastCommunication: string | null;
    priority: string;
    comments: Array<string>;
    otherData: Row;
    createdAt: string;
    updatedAt: string;
};

type Contact = {
    id: string;
    customerId: string;
    userId: string;
    name: string;
    email: string | null;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
};

type Sheet = {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    customerIds: Array<string>;
    createdAt: string;
    updatedAt: string;
};
\`\`\`

## Security

- All routes require authentication (except register/login)
- Row Level Security (RLS) ensures users can only access their own data
- Session management uses secure HTTP-only cookies
- Passwords are handled securely by Supabase Auth

## Development

### Project Structure

\`\`\`
src/
├── lib/
│   ├── server/
│   │   └── supabase.ts          # Supabase client utilities
│   └── types/
│       └── database.ts           # TypeScript type definitions
├── routes/
│   ├── api/
│   │   ├── auth/                # Authentication endpoints
│   │   ├── customers/           # Customer endpoints
│   │   ├── contacts/            # Contact endpoints
│   │   └── sheets/              # Sheet endpoints
│   ├── +page.svelte             # Homepage/API documentation
│   └── +layout.svelte           # Root layout
├── hooks.server.ts              # Server hooks for auth
└── app.d.ts                     # TypeScript declarations

scripts/
└── 001_create_tables.sql        # Database schema
\`\`\`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Using from Your Svelte Frontend

Example of calling the API from your Svelte app:

\`\`\`typescript
// Login
const response = await fetch('http://localhost:5173/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important for cookies
  body: JSON.stringify({ email, password })
});

// Get customers with search and pagination
const response = await fetch(
  'http://localhost:5173/api/customers?page=1&limit=20&search=acme&sortBy=name&sortOrder=asc',
  { credentials: 'include' }
);
const data = await response.json();

// Create customer
const response = await fetch('http://localhost:5173/api/customers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    name: 'New Customer',
    status: 'active',
    type: 'premium'
  })
});
\`\`\`

## License

MIT
