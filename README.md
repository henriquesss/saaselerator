# Sasselerator

A SaaS idea accelerator that uses AI to help the founder with business planning, getting time to focus on the product.

## Features

- **AI-Powered Analysis**: Uses GPT-4o to analyze your SaaS idea
- **Business Model Canvas**: Generates a complete canvas with customer segments, value propositions, revenue streams, and more
- **MVP Plan**: Creates an actionable plan with tasks, timelines, and phases
- **Infrastructure Costs**: Suggests cost-effective services with alternatives
- **Risk Analysis**: Identifies potential problems and mitigation strategies
- **Hiring Guide**: Recommends professionals to hire and when

## How It Works

1. **Input Your Idea** - Describe your SaaS concept in the text area
2. **AI Generation** - The app sends your idea to OpenAI's GPT-4o for analysis
3. **Business Canvas** - Review and edit the generated business model canvas
4. **MVP Plan** - Explore tasks, costs, potential challenges, and hiring recommendations

## Installation

### Prerequisites

- Node.js 22.11.0 (use nvm with .nvmrc)
- An OpenAI API key

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sasselerator.git
   cd sasselerator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **AI**: Vercel AI SDK with OpenAI
- **Animations**: Framer Motion
- **Validation**: Zod

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Demo Mode

Don't have an API key? Click the "Try Demo" button to explore the app with sample data.

## License

MIT
