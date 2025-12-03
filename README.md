# Nobi - AI-Powered Document Summarizer

Nobi is an intelligent document processing platform that extracts text from PDF and DOCX files and generates comprehensive, structured summaries using AI. Built with Next.js and powered by Google's Gemini AI through the Vercel AI SDK.

## 🚀 Features

- **Smart Document Extraction**: Accurately extracts text from PDF and DOCX files while preserving context and structure
- **AI-Powered Summaries**: Generates structured summaries with key findings, actionable insights, and recommendations using Gemini AI
- **Chunk Processing**: Handles large documents by processing them in chunks for optimal performance
- **Rich Text Editor**: Built-in Tiptap editor for viewing and editing generated summaries
- **Authentication**: Secure user authentication with Better Auth
- **Document History**: Track and manage your processed documents
- **Export Functionality**: Export summaries in various formats
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling
- **[Tiptap](https://tiptap.dev/)** - Rich text editor
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[React Dropzone](https://react-dropzone.js.org/)** - File upload

### Backend & AI
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - AI integration framework
- **[Google Gemini AI](https://ai.google.dev/)** - Language model (via @ai-sdk/google)
- **[Better Auth](https://better-auth.com/)** - Authentication
- **[Drizzle ORM](https://orm.drizzle.team/)** - Database ORM
- **[Neon Database](https://neon.tech/)** - Serverless Postgres

### Document Processing
- **[pdf2json](https://www.npmjs.com/package/pdf2json)** - PDF parsing
- **[Mammoth](https://www.npmjs.com/package/mammoth)** - DOCX extraction

## 📋 Prerequisites

- Node.js 20 or later
- npm/yarn/pnpm
- Google AI API Key (Gemini)
- Neon Database account

## ⚙️ Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd nobi
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
# Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key

# Database
DATABASE_URL=your_neon_database_url

# Better Auth (add your auth configuration)
```

4. **Run database migrations**
```bash
npm run db:push
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nobi/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── api/                      # API routes
│   │   ├── actions/              # Server actions
│   │   ├── auth/                 # Auth endpoints
│   │   ├── export/               # Export functionality
│   │   ├── summarize/            # AI summarization
│   │   └── upload/               # File upload
│   ├── history/                  # Document history page
│   ├── upload/                   # Upload page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # React components
│   ├── ui/                       # UI components
│   ├── Dropzone.tsx              # File upload component
│   ├── Navbar.tsx                # Navigation
│   ├── SummaryCard.tsx           # Summary display
│   └── TiptapEditor.tsx          # Rich text editor
├── db/                           # Database
│   └── schema.ts                 # Database schema
├── lib/                          # Utilities
│   ├── auth.ts                   # Auth configuration
│   ├── db.ts                     # Database client
│   ├── file-extractor.ts         # Document parsing
│   ├── gemini-adapter.ts         # AI integration
│   └── utils.ts                  # Helper functions
├── store/                        # State management
│   └── use-app-store.ts
└── types/                        # TypeScript types
```

## 🤖 AI Summary Structure

Nobi generates structured summaries with the following components:

- **Executive Summary**: Concise overview of the entire document
- **Main Themes**: Key topics identified across the document
- **Key Findings**: Important discoveries with importance levels
- **Actionable Insights**: Practical takeaways with priorities
- **Critical Data**: Important data points with significance
- **Recommendations**: Suggested actions based on analysis
- **Conclusion**: Final assessment and thoughts

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npm run db:studio    # Open Drizzle Studio
```

## 🚀 Deployment

This project can be deployed on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.
