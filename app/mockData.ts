import type { GeneratedPlan } from './types';

export const mockPlan: GeneratedPlan = {
  businessCanvas: {
    customerSegments: "Software development teams (5-50 developers) at mid-sized tech companies who use GitHub for version control. These teams value code quality but lack time for thorough manual reviews. Secondary segment: solo developers and small startups looking to maintain professional coding standards.",
    valuePropositions: "AI-powered instant code reviews that catch bugs, security vulnerabilities, and code quality issues before they reach production. Reduces review time by 70% while improving code quality scores. Provides educational feedback that helps developers learn and grow.",
    channels: "GitHub Marketplace for discovery and installation. Content marketing through developer blogs and tutorials. Conference sponsorships and developer community engagement. Strategic partnerships with developer bootcamps and online learning platforms.",
    customerRelationships: "Self-service onboarding with in-app tutorials. Automated feedback and insights via pull request comments. Premium support for enterprise customers. Community forums for peer support and feature requests.",
    revenueStreams: "Freemium model: Free tier for open-source projects with limited private repos. Pro tier at $15/dev/month for small teams. Enterprise tier with custom pricing for advanced features, SSO, and priority support. Annual subscriptions with 20% discount.",
    keyResources: "Proprietary AI models trained on millions of code patterns. Engineering team with ML and developer tools expertise. GitHub integration infrastructure. Customer success and support team.",
    keyActivities: "Continuous AI model improvement and training. GitHub API integration maintenance. Customer onboarding and success management. Security and compliance certifications. Developer community building.",
    keyPartnerships: "GitHub as primary platform partner. Cloud infrastructure providers (AWS/GCP). Security audit firms for certifications. Developer education platforms for co-marketing. Integration partners (Slack, Jira, Linear).",
    costStructure: "AI inference compute costs (largest variable cost). Engineering salaries and benefits. Cloud infrastructure. Customer support operations. Marketing and sales. Legal and compliance."
  },
  mvpPlan: {
    summary: "Build a focused MVP that integrates with GitHub to provide AI-powered code review on pull requests. Start with JavaScript/TypeScript support, expand to other languages post-launch. Target 100 beta users in 8 weeks.",
    timelineWeeks: 8,
    tasks: [
      {
        id: "1",
        title: "Define core features and user stories",
        description: "Document the exact functionality for MVP: PR analysis, comment generation, security checks, and basic dashboard.",
        priority: "high",
        estimatedHours: 8,
        completed: false,
        phase: "planning"
      },
      {
        id: "2",
        title: "Design system architecture",
        description: "Plan the backend services, AI pipeline, GitHub webhook handling, and data storage approach.",
        priority: "high",
        estimatedHours: 12,
        completed: false,
        phase: "planning"
      },
      {
        id: "3",
        title: "Create UI/UX wireframes",
        description: "Design the dashboard, settings page, and review summary interfaces. Focus on developer-friendly UX.",
        priority: "medium",
        estimatedHours: 16,
        completed: false,
        phase: "planning"
      },
      {
        id: "4",
        title: "Set up development environment",
        description: "Configure Next.js project, set up CI/CD pipeline, and establish coding standards.",
        priority: "high",
        estimatedHours: 6,
        completed: false,
        phase: "development"
      },
      {
        id: "5",
        title: "Build GitHub OAuth integration",
        description: "Implement GitHub OAuth for user authentication and repository access.",
        priority: "high",
        estimatedHours: 12,
        completed: false,
        phase: "development"
      },
      {
        id: "6",
        title: "Create webhook handling system",
        description: "Build the backend to receive and process GitHub webhooks for pull request events.",
        priority: "high",
        estimatedHours: 16,
        completed: false,
        phase: "development"
      },
      {
        id: "7",
        title: "Integrate AI code analysis",
        description: "Connect to OpenAI/Claude API for code analysis and implement prompt engineering for quality reviews.",
        priority: "high",
        estimatedHours: 24,
        completed: false,
        phase: "development"
      },
      {
        id: "8",
        title: "Build PR comment system",
        description: "Create the system to post inline comments and summary reviews on GitHub PRs.",
        priority: "high",
        estimatedHours: 12,
        completed: false,
        phase: "development"
      },
      {
        id: "9",
        title: "Create user dashboard",
        description: "Build the web dashboard showing review history, settings, and usage analytics.",
        priority: "medium",
        estimatedHours: 20,
        completed: false,
        phase: "development"
      },
      {
        id: "10",
        title: "Implement billing system",
        description: "Integrate Stripe for subscription management and usage-based billing.",
        priority: "medium",
        estimatedHours: 16,
        completed: false,
        phase: "development"
      },
      {
        id: "11",
        title: "Write unit and integration tests",
        description: "Create comprehensive test coverage for core functionality and edge cases.",
        priority: "high",
        estimatedHours: 20,
        completed: false,
        phase: "testing"
      },
      {
        id: "12",
        title: "Perform security audit",
        description: "Review code for security vulnerabilities, especially around GitHub token handling.",
        priority: "high",
        estimatedHours: 8,
        completed: false,
        phase: "testing"
      },
      {
        id: "13",
        title: "Beta testing with early adopters",
        description: "Recruit 20 beta users to test the product and gather feedback.",
        priority: "high",
        estimatedHours: 16,
        completed: false,
        phase: "testing"
      },
      {
        id: "14",
        title: "Create landing page and documentation",
        description: "Build marketing landing page and comprehensive documentation for users.",
        priority: "medium",
        estimatedHours: 16,
        completed: false,
        phase: "launch"
      },
      {
        id: "15",
        title: "Submit to GitHub Marketplace",
        description: "Prepare and submit the app for GitHub Marketplace listing approval.",
        priority: "high",
        estimatedHours: 8,
        completed: false,
        phase: "launch"
      }
    ],
    infrastructureCosts: [
      {
        service: "Application Hosting",
        provider: "Vercel Pro",
        monthlyCost: 20,
        description: "Next.js hosting with edge functions for webhook processing.",
        alternative: "Railway ($5/mo) or self-hosted on a $5 VPS",
        alternativeCost: 5
      },
      {
        service: "Database",
        provider: "PlanetScale",
        monthlyCost: 29,
        description: "Serverless MySQL for user data, repositories, and review history.",
        alternative: "Supabase free tier or SQLite for MVP",
        alternativeCost: 0
      },
      {
        service: "AI API",
        provider: "OpenAI GPT-4",
        monthlyCost: 100,
        description: "Code analysis API calls. Cost scales with usage (~$0.03 per review).",
        alternative: "Use GPT-3.5-turbo for 90% cheaper calls on simple reviews",
        alternativeCost: 10
      },
      {
        service: "Queue/Background Jobs",
        provider: "Upstash",
        monthlyCost: 10,
        description: "Redis for job queues and caching PR analysis results.",
        alternative: "Vercel KV free tier for low volume",
        alternativeCost: 0
      },
      {
        service: "Monitoring",
        provider: "Sentry",
        monthlyCost: 26,
        description: "Error tracking and performance monitoring.",
        alternative: "Self-hosted GlitchTip or Highlight.io free tier",
        alternativeCost: 0
      },
      {
        service: "Email",
        provider: "Resend",
        monthlyCost: 0,
        description: "Transactional emails for notifications (free tier: 3k/month).",
        alternative: "SendGrid free tier",
        alternativeCost: 0
      }
    ],
    totalMonthlyCost: 185,
    problems: [
      {
        title: "AI Response Quality Inconsistency",
        description: "AI models may produce inconsistent or low-quality code reviews, especially for complex or domain-specific code.",
        severity: "high",
        mitigation: "Implement prompt engineering best practices, use structured output formats, and add human feedback loop for continuous improvement. Consider fine-tuning for specific languages."
      },
      {
        title: "GitHub API Rate Limits",
        description: "GitHub API has strict rate limits that could impact service availability for high-volume users.",
        severity: "medium",
        mitigation: "Implement efficient caching, batch API calls where possible, and use GitHub App installation tokens for higher rate limits. Queue non-urgent operations."
      },
      {
        title: "Security and Trust Concerns",
        description: "Users may be hesitant to grant access to their private repositories for AI analysis.",
        severity: "high",
        mitigation: "Obtain SOC 2 compliance, clearly document data handling policies, offer on-premise deployment for enterprise, and never store code longer than necessary for analysis."
      },
      {
        title: "Market Competition",
        description: "GitHub Copilot and established code quality tools may add similar AI review features.",
        severity: "medium",
        mitigation: "Focus on specialized features (security-first, learning-focused), build strong community, and target underserved segments like bootcamp graduates and small teams."
      },
      {
        title: "Cost Management at Scale",
        description: "AI API costs could grow faster than revenue if not properly managed.",
        severity: "medium",
        mitigation: "Implement tiered analysis (quick scan vs. deep review), cache similar code patterns, and use cheaper models for initial triage. Set usage limits per tier."
      }
    ],
    professionals: [
      {
        role: "Full-Stack Developer",
        description: "Build and maintain the core product including GitHub integrations, dashboard, and API.",
        estimatedCost: "$120,000-150,000/year or $80-120/hour freelance",
        whenToHire: "Co-founder or first hire - needed from day one for MVP development.",
        alternative: "Use no-code tools for dashboard, outsource to dev agency for MVP, or find technical co-founder."
      },
      {
        role: "ML/AI Engineer",
        description: "Optimize prompts, fine-tune models, and improve code analysis quality.",
        estimatedCost: "$150,000-200,000/year or $100-150/hour freelance",
        whenToHire: "Post-MVP when you need to improve AI quality based on user feedback.",
        alternative: "Start with prompt engineering guides, use AI consulting services for initial optimization."
      },
      {
        role: "DevRel / Developer Advocate",
        description: "Create content, engage with developer community, and gather user feedback.",
        estimatedCost: "$100,000-140,000/year",
        whenToHire: "After achieving product-market fit, to accelerate growth.",
        alternative: "Founders handle initial community building, hire part-time content creators, or leverage developer influencers."
      },
      {
        role: "Customer Success Manager",
        description: "Onboard users, handle support, and reduce churn.",
        estimatedCost: "$70,000-100,000/year",
        whenToHire: "When reaching 50+ paying customers to maintain quality support.",
        alternative: "Use AI chatbots for tier-1 support, founders handle premium accounts, outsource to VA service."
      },
      {
        role: "Security Engineer",
        description: "Ensure secure handling of code and tokens, achieve compliance certifications.",
        estimatedCost: "$140,000-180,000/year or $120-180/hour consultant",
        whenToHire: "Before targeting enterprise customers, for SOC 2 and security audits.",
        alternative: "Use security consulting firms for audits, implement security best practices from start, use managed security services."
      }
    ]
  }
};
