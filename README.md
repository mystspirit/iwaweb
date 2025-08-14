# Infinite Wall Art - Complete Ecommerce Website

A modern, minimalistic wall art ecommerce website built with Next.js, featuring admin authentication, product management, blog functionality, and integrated payments.

## ✨ Features

### Customer Features
- 🎨 **Product Catalog**: Browse beautiful wall art with automatic size variants
- 🛒 **Shopping Cart**: Add products and manage cart with persistent state
- 💳 **Stripe Checkout**: Secure payment processing with Stripe
- 📱 **Responsive Design**: Mobile-first, modern UI with Tailwind CSS
- 📖 **Blog**: Read articles and insights about wall art
- 🔗 **Social Sharing**: Share products and blog posts on social media
- 🔍 **SEO Optimized**: Meta tags, structured data, and search-friendly URLs

### Admin Features
- 🔐 **Secure Authentication**: JWT-based admin login system
- 📤 **Image Upload**: Upload artwork images with automatic processing
- 🏷️ **Product Management**: Create, edit, and delete products
- 📝 **Blog Management**: Write and publish blog posts with WYSIWYG editor
- 📊 **Dashboard**: Centralized admin interface for all management tasks

### Technical Features
- 📈 **Google Analytics**: Track visitor behavior and conversions
- 🗄️ **Database**: SQLite with Prisma ORM for development
- 🔒 **Security**: Password hashing, JWT tokens, input validation
- 🚀 **Performance**: Optimized images, lazy loading, efficient queries

## 🛠️ Tech Stack

- **Frontend/Backend**: Next.js 14 (React 18)
- **Database**: SQLite with Prisma ORM
- **Authentication**: Custom JWT-based admin authentication
- **Payments**: Stripe Checkout
- **Styling**: Tailwind CSS
- **Image Processing**: Sharp (local uploads)
- **Analytics**: Google Analytics 4
- **Social Sharing**: react-share
- **Rich Text Editor**: React Quill
- **Security**: bcryptjs for password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd infinite-wall-art
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your actual values:
   - Add your Stripe keys
   - Set your Google Analytics ID
   - Configure JWT secret

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Create an admin user**
   ```bash
   node -e "
   const bcrypt = require('bcryptjs');
   const { PrismaClient } = require('@prisma/client');
   const prisma = new PrismaClient();
   async function createAdmin() {
     const email = 'admin@infinitewallart.com';
     const password = 'your-secure-password';
     const hash = await bcrypt.hash(password, 10);
     await prisma.admin.create({ data: { email, passwordHash: hash } });
     console.log('Admin user created');
     await prisma.\$disconnect();
   }
   createAdmin();
   "
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/admin/login

## 📁 Project Structure

```
infinite-wall-art/
├── components/           # Reusable React components
│   ├── GoogleAnalytics.tsx
│   └── ...
├── context/             # React context providers
│   └── CartContext.tsx  # Shopping cart state
├── pages/               # Next.js pages and API routes
│   ├── api/            # Backend API endpoints
│   │   ├── admin/      # Admin-only API routes
│   │   └── ...
│   ├── admin/          # Admin dashboard pages
│   ├── blog/           # Blog pages
│   ├── products/       # Product pages
│   └── ...
├── prisma/             # Database schema and migrations
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Database migrations
├── public/             # Static assets
│   └── uploads/        # Uploaded images
├── styles/             # Global CSS
├── utils/              # Utility functions and HOCs
│   └── withAdminAuth.tsx
└── ...
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite database file path | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `NEXT_PUBLIC_GA_ID` | Google Analytics tracking ID | ✅ |
| `JWT_SECRET` | Secret for JWT token signing | ✅ |
| `NEXTAUTH_SECRET` | NextAuth secret (if using) | ❌ |
| `CLOUDINARY_URL` | Cloudinary URL (if using) | ❌ |

### Product Configuration

Products are automatically created in 3 sizes:
- **Small**: 16 x 12 inches ($79)
- **Medium**: 24 x 16 inches ($99) 
- **Large**: 36 x 24 inches ($149)

Both Canvas and Framed options are available.

## 🔐 Admin Usage

### Accessing Admin Dashboard
1. Go to `/admin/login`
2. Enter your admin credentials
3. Access the dashboard at `/admin`

### Managing Products
1. **Upload Images**: Use the file upload in the admin dashboard
2. **Create Products**: Fill in title, description, and type
3. **Edit Products**: Click edit on any product to modify details
4. **Delete Products**: Click delete to remove products

### Managing Blog Posts
1. **Create Posts**: Use the WYSIWYG editor to write posts
2. **Edit Posts**: Modify existing posts
3. **Publish/Unpublish**: Control post visibility

## 🚀 Deployment

### Production Checklist
- [ ] Set up production database (PostgreSQL recommended)
- [ ] Configure production environment variables
- [ ] Set up Stripe in live mode
- [ ] Configure Google Analytics with real tracking ID
- [ ] Set up image hosting (Cloudinary recommended)
- [ ] Configure domain and SSL
- [ ] Test all functionality

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or similar
- **Database**: PlanetScale, Supabase, or managed PostgreSQL
- **Images**: Cloudinary, AWS S3, or similar CDN

## 🧪 Testing

### Manual Testing Checklist
- [ ] Product browsing and filtering
- [ ] Add to cart functionality
- [ ] Checkout process with Stripe
- [ ] Admin login and logout
- [ ] Product management (CRUD)
- [ ] Blog post management
- [ ] Social sharing buttons
- [ ] Mobile responsiveness
- [ ] SEO meta tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js and modern web technologies.**
