import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  Eye,
  GraduationCap,
  Link2,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Repeat2,
  ThumbsUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResponsibleAiNote } from "@/components/tool-shell";
import headshot from "@/assets/lynnety-headshot.jpg";
import banner from "@/assets/profile-banner.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Lynnety Chauke — AI Engineer at Google | LinkedIn Profile" },
      {
        name: "description",
        content:
          "LinkedIn-style professional profile for Lynnety Chauke, AI Engineer at Google, with experience across Cape Town AI companies, projects, skills and certifications.",
      },
      { property: "og:title", content: "Lynnety Chauke — AI Engineer at Google" },
      {
        property: "og:description",
        content:
          "AI Engineer building production LLM systems. Cape Town AI ecosystem alumnus, now at Google.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const EXPERIENCE = [
  {
    role: "AI Engineer",
    company: "Google",
    type: "Full-time",
    period: "Mar 2024 – Present · 2 yrs 6 mos",
    location: "Cape Town, Western Cape, South Africa · Hybrid",
    bullets: [
      "Build and ship production LLM features across Workspace productivity surfaces, serving evaluation-gated model updates to millions of users.",
      "Own an internal retrieval-augmented generation platform: hybrid vector + keyword retrieval, prompt versioning, and automated regression evals on every release.",
      "Cut inference cost per request by 38% through model routing, caching and distillation of a high-traffic summarisation workload.",
      "Lead Responsible AI reviews for launch readiness — bias probes, red-team suites, refusal calibration and human-in-the-loop escalation paths.",
    ],
    skills: ["LLM Systems", "RAG", "Python", "Vertex AI", "Responsible AI"],
  },
  {
    role: "Machine Learning Engineer",
    company: "Aerobotics",
    type: "Full-time",
    period: "Aug 2022 – Feb 2024 · 1 yr 7 mos",
    location: "Cape Town, Western Cape, South Africa",
    bullets: [
      "Trained computer-vision models on drone imagery for per-tree yield estimation across 40,000+ hectares of farmland.",
      "Reduced false-positive pest detections by 27% with a re-labelled dataset pipeline and active-learning loop.",
      "Deployed inference services on GPU-backed Kubernetes with sub-200ms p95 latency.",
    ],
    skills: ["Computer Vision", "PyTorch", "MLOps", "Kubernetes"],
  },
  {
    role: "AI Solutions Engineer",
    company: "DataProphet",
    type: "Full-time",
    period: "Jan 2021 – Jul 2022 · 1 yr 7 mos",
    location: "Cape Town, Western Cape, South Africa",
    bullets: [
      "Delivered predictive-quality AI for manufacturing clients, translating plant-floor problems into supervised learning targets.",
      "Built feature stores and monitoring dashboards that surfaced model drift before it hit production yield.",
    ],
    skills: ["Predictive Modelling", "Feature Engineering", "SQL"],
  },
  {
    role: "Junior Data Scientist",
    company: "Praelexis",
    type: "Full-time",
    period: "Feb 2019 – Dec 2020 · 1 yr 11 mos",
    location: "Cape Town, Western Cape, South Africa",
    bullets: [
      "Built credit-risk and churn models for financial services clients, with clear model cards for compliance sign-off.",
      "Automated reporting pipelines that saved analysts roughly 12 hours per week.",
    ],
    skills: ["Statistics", "scikit-learn", "Data Storytelling"],
  },
];

const PROJECTS = [
  {
    name: "Aria Workspace — AI Productivity Assistant",
    meta: "Personal project · 2026",
    body:
      "A single integrated dashboard with five AI features: smart email generator, meeting-notes summariser, task planner, research assistant and a streaming chatbot. Built with TanStack Start, React 19 and a Lovable AI Gateway backend, with structured prompt engineering and a Responsible AI disclaimer on every surface.",
    links: [
      { label: "GitHub repository", href: "https://github.com/LeeNertie/AI-Productivity-Assistant.git" },
      { label: "Live app", href: "https://lynnety-chauke-ai-assitant.lovable.app" },
    ],
  },
  {
    name: "Ubuntu Voice — Low-Resource Speech Models",
    meta: "Open source · 2025",
    body:
      "Fine-tuned Whisper for isiXhosa and Xitsonga on a community-collected 220-hour corpus, lowering word error rate from 41% to 19%. Released the dataset recipe and eval harness publicly.",
    links: [],
  },
  {
    name: "Thrift Vision — Retail Demand Forecasting",
    meta: "Consulting engagement · 2024",
    body:
      "Hierarchical forecasting for a 60-store retail chain that cut stockouts by 22% and reduced dead inventory by R4.1m over two seasons.",
    links: [],
  },
  {
    name: "Loadshedding Copilot",
    meta: "Hackathon winner · 2023",
    body:
      "An agentic assistant that reads municipal schedules and recommends optimal appliance and generator scheduling for households. First place, Cape Town AI Summit hackathon.",
    links: [],
  },
];

const SKILLS = [
  "Large Language Models",
  "Prompt Engineering",
  "Retrieval-Augmented Generation",
  "Python",
  "PyTorch",
  "TensorFlow",
  "MLOps",
  "Vertex AI",
  "Google Cloud Platform",
  "Computer Vision",
  "NLP",
  "Model Evaluation",
  "Responsible AI",
  "Docker & Kubernetes",
  "SQL",
  "TypeScript / React",
  "Data Storytelling",
  "Technical Mentorship",
];

const CERTIFICATES = [
  { name: "Google Cloud Professional Machine Learning Engineer", issuer: "Google Cloud", date: "Issued Jun 2025 · No expiry", id: "GCP-PMLE-4471902" },
  { name: "Google Cloud Professional Data Engineer", issuer: "Google Cloud", date: "Issued Nov 2023", id: "GCP-PDE-2280114" },
  { name: "Microsoft Certified: Azure AI Engineer Associate", issuer: "Microsoft", date: "Issued Feb 2023", id: "MS-AI102-889231" },
  { name: "Microsoft Certified: Azure Data Scientist Associate", issuer: "Microsoft", date: "Issued Aug 2021", id: "MS-DP100-551740" },
  { name: "Google Advanced Data Analytics Professional Certificate", issuer: "Google", date: "Issued Mar 2021", id: "GADA-118477" },
];

const RECOMMENDATIONS = [
  {
    name: "Dr. Naledi Mokoena",
    title: "Staff Software Engineer, Google · Managed Lynnety directly",
    text:
      "Lynnety is the engineer you want owning an ambiguous AI problem. He took our summarisation stack from a promising demo to a launch-ready service with real evals behind it, and he pushed hard on responsible-AI review even when it slowed him down. Calm under pressure and unusually good at explaining model behaviour to non-technical stakeholders.",
  },
  {
    name: "Ruan de Villiers",
    title: "Head of Machine Learning, Aerobotics · Senior to Lynnety",
    text:
      "In eighteen months Lynnety rebuilt our labelling pipeline, mentored two juniors and shipped the highest-accuracy detection model we had ever put in front of farmers. He works from the customer backwards, which is rarer in ML than it should be.",
  },
  {
    name: "Zanele Dlamini",
    title: "Product Manager, DataProphet · Worked with Lynnety on the same team",
    text:
      "Lynnety translates between the plant floor and the model. Our clients trusted him quickly because he never oversold what AI could do — he showed them the limits first and then the value.",
  },
];

const ACTIVITY = [
  {
    kind: "Lynnety posted this",
    time: "3d",
    text:
      "Shipped Aria Workspace — one dashboard, five AI features, and a Responsible AI disclaimer on every screen. The hardest part was never the model; it was designing outputs people can edit and trust. Repo and live demo in the comments.",
    stats: { likes: 412, comments: 58, reposts: 24 },
  },
  {
    kind: "Lynnety commented on a post",
    time: "1w",
    text:
      "Evals are the product. If you cannot measure a regression, you do not have a model — you have a vibe.",
    stats: { likes: 189, comments: 21, reposts: 6 },
  },
  {
    kind: "Lynnety shared an article",
    time: "2w",
    text:
      "Cape Town's AI ecosystem is quietly world-class. Four of the best engineers I have worked with never left the Western Cape. Here is what local teams get right about shipping constrained, cost-aware AI.",
    stats: { likes: 736, comments: 94, reposts: 51 },
  },
];

function ProfilePage() {
  return (
    <div className="profile-theme min-h-full bg-background">
      <div className="mx-auto w-full max-w-5xl space-y-4 px-3 py-5 sm:px-6 lg:py-8">
        {/* Top card */}
        <Card className="overflow-hidden p-0 shadow-soft">
          <img
            src={banner}
            alt="Abstract graphite and bronze profile banner"
            width={1920}
            height={512}
            className="h-28 w-full object-cover sm:h-40"
          />
          <CardContent className="relative px-4 pb-5 pt-0 sm:px-6">
            <img
              src={headshot}
              alt="Portrait of Lynnety Chauke, AI Engineer at Google"
              width={816}
              height={816}
              className="-mt-12 size-24 rounded-full border-4 border-card object-cover shadow-soft sm:-mt-16 sm:size-32"
            />

            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Lynnety Chauke
                  </h1>
                  <BadgeCheck className="size-5 text-primary" aria-label="Verified" />
                  <span className="text-sm text-muted-foreground">(He/Him)</span>
                </div>
                <p className="max-w-2xl text-[15px] font-medium">
                  AI Engineer at Google | LLM Systems, RAG &amp; Responsible AI | Ex-Aerobotics,
                  DataProphet
                </p>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" />
                  65 Berg Crescent, Belhar, Cape Town, Western Cape, South Africa
                  <span aria-hidden>·</span>
                  <a href="#contact" className="font-medium text-primary hover:underline">
                    Contact info
                  </a>
                </p>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-sm">
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">
                    <Users className="size-3.5" /> 500+ connections
                  </span>
                  <span className="text-muted-foreground">3,914 followers</span>
                </p>
                <p className="flex items-center gap-1.5 pt-1 text-sm text-muted-foreground">
                  <Link2 className="size-3.5" />
                  linkedin.com/in/lynnetychauke-ai
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm">
                  <Building2 className="size-4 text-primary" />
                  <span className="font-medium">Google</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm">
                  <GraduationCap className="size-4 text-primary" />
                  <span className="font-medium">University of Cape Town</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button size="sm">Open to</Button>
                  <Button size="sm" variant="outline">
                    Add profile section
                  </Button>
                  <Button size="sm" variant="outline">
                    More
                  </Button>
                </div>
              </div>
            </div>

            {/* Private open-to-work */}
            <div className="mt-4 rounded-xl border border-dashed border-primary/40 bg-accent/50 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Lock className="size-4 text-primary" />
                <p className="text-sm font-semibold">Open to work — recruiters only</p>
                <Badge variant="secondary" className="gap-1">
                  <Eye className="size-3" /> Private · not shown on your public profile
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Staff AI Engineer, ML Platform Lead and Applied Research Engineer roles · Cape Town
                (Hybrid), Johannesburg, Remote (EMEA) · Full-time and contract ·{" "}
                <span className="font-medium text-foreground">
                  Visible only to LinkedIn Recruiter seat holders. No green #OpenToWork photo frame.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] leading-relaxed">
            <p>
              I build AI systems that people actually keep using after the demo ends. Most of my
              work sits in the unglamorous middle of the stack — retrieval that returns the right
              passage, evaluation harnesses that catch a regression before a user does, and prompt
              architectures that behave the same on a Tuesday afternoon as they did in the pull
              request. The model is rarely the hard part. Making its output trustworthy, cheap and
              editable is.
            </p>
            <p>
              My route into AI ran through Cape Town, and that shaped how I engineer. At Praelexis I
              learned that a credit model without a model card is a liability. At DataProphet I
              learned to sit on a factory floor until I understood what the operators were actually
              optimising for. At Aerobotics I learned what it means when a farmer bets a season on
              your prediction. Constrained budgets, patchy connectivity and users who cannot afford
              to be wrong turn out to be excellent teachers.
            </p>
            <p>
              Today I am an AI Engineer at Google, working on large language model features inside
              productivity products. I own retrieval-augmented generation infrastructure, run the
              evaluation and red-team suites that gate our launches, and spend a good share of my
              week arguing for the boring safeguards — refusal calibration, human-in-the-loop
              escalation, honest uncertainty in the interface. I have brought serving cost down
              sharply through routing and distillation, but the number I am proudest of is how few
              incidents we have shipped.
            </p>
            <p>
              Outside the day job I mentor junior engineers moving from analytics into ML, publish
              open work on low-resource South African language models, and build small tools that
              scratch my own itch — most recently Aria Workspace, an AI productivity dashboard.
              If you are working on applied AI that has to survive contact with real users, or you
              want someone to pressure-test whether your AI roadmap is realistic, my inbox is open.
            </p>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="size-4 text-primary" /> Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {EXPERIENCE.map((job, index) => (
              <div key={job.company} className="space-y-2">
                <div className="flex gap-3">
                  <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
                    {job.company.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-semibold">{job.role}</p>
                    <p className="text-sm">
                      {job.company} · {job.type}
                    </p>
                    <p className="text-sm text-muted-foreground">{job.period}</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                </div>
                <ul className="ml-14 list-disc space-y-1.5 pl-4 text-sm leading-relaxed">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="ml-14 flex flex-wrap gap-2 pt-1">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                {index < EXPERIENCE.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {PROJECTS.map((project, index) => (
              <div key={project.name} className="space-y-1.5">
                <p className="font-semibold">{project.name}</p>
                <p className="text-sm text-muted-foreground">{project.meta}</p>
                <p className="text-sm leading-relaxed">{project.body}</p>
                {project.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        <Link2 className="size-3.5" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                {index < PROJECTS.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <Badge key={skill} variant="outline" className="border-primary/30 bg-accent/40 py-1">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="size-4 text-primary" /> Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-semibold">University of Cape Town</p>
              <p>BSc (Hons), Computer Science &amp; Applied Statistics</p>
              <p className="text-muted-foreground">2015 – 2018 · Dean&apos;s Merit List</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold">Stellenbosch University</p>
              <p>Postgraduate Certificate, Machine Learning &amp; Artificial Intelligence</p>
              <p className="text-muted-foreground">2020 – 2021</p>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Licenses &amp; certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {CERTIFICATES.map((cert, index) => (
              <div key={cert.id}>
                <div className="flex gap-3">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <BadgeCheck className="size-5 text-primary" />
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold">{cert.name}</p>
                    <p>{cert.issuer}</p>
                    <p className="text-muted-foreground">{cert.date}</p>
                    <p className="text-muted-foreground">Credential ID {cert.id}</p>
                  </div>
                </div>
                {index < CERTIFICATES.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Recommendations · Received</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {RECOMMENDATIONS.map((rec, index) => (
              <div key={rec.name} className="space-y-1.5">
                <p className="font-semibold">{rec.name}</p>
                <p className="text-sm text-muted-foreground">{rec.title}</p>
                <p className="text-sm leading-relaxed">&ldquo;{rec.text}&rdquo;</p>
                {index < RECOMMENDATIONS.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Activity &amp; engagement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground">
              3,914 followers · Posts about applied AI, evaluation and the Cape Town tech scene
            </p>
            {ACTIVITY.map((item, index) => (
              <div key={item.text} className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {item.kind} · {item.time}
                </p>
                <p className="text-sm leading-relaxed">{item.text}</p>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ThumbsUp className="size-3.5" /> {item.stats.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="size-3.5" /> {item.stats.comments} comments
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Repeat2 className="size-3.5" /> {item.stats.reposts} reposts
                  </span>
                </div>
                {index < ACTIVITY.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact */}
        <Card id="contact" className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Contact info</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              <a href="mailto:leenertywam@gmail.com" className="hover:underline">
                leenertywam@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              <a href="tel:+27693277232" className="hover:underline">
                069 327 7232
              </a>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              65 Berg Crescent, Belhar, Cape Town
            </p>
            <p className="flex items-center gap-2">
              <Link2 className="size-4 text-primary" />
              linkedin.com/in/lynnetychauke-ai
            </p>
            <p className="flex items-center gap-2 sm:col-span-2">
              <Link2 className="size-4 text-primary" />
              <a
                href="https://github.com/LeeNertie/AI-Productivity-Assistant.git"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                github.com/LeeNertie/AI-Productivity-Assistant
              </a>
            </p>
          </CardContent>
        </Card>

        <ResponsibleAiNote />
      </div>
    </div>
  );
}
