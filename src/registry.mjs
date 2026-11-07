export const projects = [
  {
    slug: "campaign-command-center", number: "01", accent: "#8b5cf6", icon: "◈",
    name: "Campaign Command Center", kicker: "Launch measurement",
    description: "A cross-channel launch room for the streaming-series campaign 'Orbitfall'.",
    objective: "Move budget and creative decisions from weekly hindsight to daily action.",
    kpis: [{ label: "Qualified views", value: "4.82M", delta: "+18.4%" }, { label: "Completion rate", value: "41.8%", delta: "+6.1 pts" }, { label: "Paid CPV", value: "$0.042", delta: "−12.0%" }, { label: "Earned engagement", value: "286K", delta: "+22.6%" }],
    chart: [32, 45, 39, 58, 71, 67, 88, 94, 82, 106, 125, 118],
    dimensions: ["Platform", "Audience", "Format", "Organic / Paid", "Market"],
    insight: "YouTube trailers account for 54% of qualified views while TikTok creator cut-downs generate 2.3× more shares per view. Shift 12% of paid reach budget into creator amplification for the final launch week.",
    evidence: "Last 14 days · US, UK, IN · 92% data completeness",
    actions: ["Approve final-week creator boost", "Inspect TikTok completion cohort", "Export client scorecard"],
    table: [["YouTube", "Trailer", "2.61M", "47.2%", "$0.038"], ["TikTok", "Creator cut-down", "1.19M", "38.1%", "$0.046"], ["Instagram", "Reel", "0.72M", "35.4%", "$0.051"], ["X", "Cast clip", "0.30M", "21.8%", "$0.067"]]
  },
  {
    slug: "release-hype-radar", number: "02", accent: "#ec4899", icon: "◌",
    name: "Release Hype Radar", kicker: "Social listening",
    description: "Detect and explain audience conversation shifts around entertainment releases.",
    objective: "Turn a spike in conversation into a verified response plan before momentum is lost.",
    kpis: [{ label: "Mentions", value: "186.4K", delta: "+241%" }, { label: "Positive sentiment", value: "71%", delta: "+9 pts" }, { label: "Share of voice", value: "38.6%", delta: "+11 pts" }, { label: "Alert SLA", value: "8 min", delta: "within target" }],
    chart: [18, 20, 24, 22, 31, 37, 45, 116, 130, 96, 88, 75],
    dimensions: ["Topic", "Sentiment", "Market", "Creator", "Platform"],
    insight: "A cast-interview clip drove 68% of the incremental conversation. Subtitle complaints represent 61% of negative mentions in India; publish localized accessibility guidance and route support queries to the regional team.",
    evidence: "Detected 09:42 IST · 6,438 sampled mentions · confidence: high",
    actions: ["Open evidence sample", "Create regional response brief", "Track topic decay"],
    table: [["Cast interview", "+324%", "84% positive", "TikTok", "High"], ["Subtitle quality", "+186%", "22% positive", "X", "High"], ["Soundtrack", "+91%", "89% positive", "Instagram", "Medium"], ["Release date", "+42%", "63% positive", "YouTube", "Low"]]
  },
  {
    slug: "creative-intelligence-lab", number: "03", accent: "#14b8a6", icon: "✦",
    name: "Creative Intelligence Lab", kicker: "Creative analytics",
    description: "A searchable evidence base for creative patterns and audience response.",
    objective: "Help creative teams learn which observable choices travel across formats and audiences.",
    kpis: [{ label: "Assets tagged", value: "1,284", delta: "+128 this week" }, { label: "Winning patterns", value: "14", delta: "+3 validated" }, { label: "Median hold rate", value: "42.6%", delta: "+5.2 pts" }, { label: "Review coverage", value: "96.8%", delta: "above target" }],
    chart: [22, 27, 34, 41, 39, 54, 63, 69, 66, 81, 87, 93],
    dimensions: ["Hook", "Duration", "CTA", "Talent", "Audio", "Audience"],
    insight: "Assets showing the lead character within the first 1.5 seconds are associated with a 7.4-point higher 3-second hold rate among 18–34 viewers. This is an association, not a causal claim; prioritize it as the next A/B test.",
    evidence: "n=284 comparable vertical-video assets · mixed-effects analysis · reviewed tags",
    actions: ["View matched cohort", "Draft test hypothesis", "Correct AI tags"],
    table: [["Character in first 1.5s", "+7.4 pts hold", "284 assets", "High", "Test next"], ["Captions on", "+4.1 pts completion", "612 assets", "Medium", "Adopt"], ["CTA after 12s", "+2.8 pts CTR", "177 assets", "Medium", "Validate"], ["Trend audio", "+1.2 pts shares", "303 assets", "Low", "Monitor"]]
  },
  {
    slug: "creator-measurement-studio", number: "04", accent: "#f59e0b", icon: "◇",
    name: "Creator Measurement Studio", kicker: "Influencer intelligence",
    description: "Evaluate creator partnerships on fit, qualified attention, safety, and results.",
    objective: "Choose partners with defensible audience fit—not only the largest follower count.",
    kpis: [{ label: "Shortlisted creators", value: "24", delta: "+6 qualified" }, { label: "Audience fit", value: "78/100", delta: "+8 pts" }, { label: "Qualified CPV", value: "$0.061", delta: "−16%" }, { label: "Safety reviews", value: "100%", delta: "complete" }],
    chart: [31, 35, 29, 46, 48, 57, 60, 55, 73, 86, 84, 98],
    dimensions: ["Creator", "Audience overlap", "Cost", "Brand safety", "Market"],
    insight: "Three mid-tier creators reach 42% less duplicated audience than the two highest-reach candidates and project a 19% lower qualified CPV. Keep all recommendations explainable: fit, overlap, recent quality, and safety are scored separately.",
    evidence: "30-day performance window · sample audience match · manually reviewed safety flags",
    actions: ["Compare shortlists", "Review safety evidence", "Generate negotiation brief"],
    table: [["Maya Reviews", "86/100", "12% overlap", "$0.054", "Clear"], ["The Cut Room", "82/100", "17% overlap", "$0.059", "Clear"], ["FrameByFrame", "79/100", "21% overlap", "$0.063", "Review"], ["ScreenSense", "74/100", "34% overlap", "$0.071", "Clear"]]
  },
  {
    slug: "executive-narrative-copilot", number: "05", accent: "#3b82f6", icon: "▣",
    name: "Executive Narrative Copilot", kicker: "Decision reporting",
    description: "Convert approved metrics into accountable, evidence-linked leadership reporting.",
    objective: "Make every executive statement traceable to a metric definition, filter set, and source refresh time.",
    kpis: [{ label: "Report readiness", value: "94%", delta: "+12 pts" }, { label: "Verified claims", value: "18/18", delta: "complete" }, { label: "Time to draft", value: "21 min", delta: "−63%" }, { label: "Actions tracked", value: "7", delta: "+2 new" }],
    chart: [26, 28, 37, 48, 51, 58, 64, 76, 71, 85, 93, 103],
    dimensions: ["Executive goal", "Claim status", "Campaign", "Channel", "Period"],
    insight: "The weekly narrative is publish-ready because all 18 claims resolve to approved definitions and source queries. The recommended action—creator amplification—is linked to its owner, due date, and post-action measurement plan.",
    evidence: "Report period: Oct 21–27 · metric dictionary v1.4 · analyst review complete",
    actions: ["Open evidence ledger", "Export leadership brief", "Assign recommendation owner"],
    table: [["Qualified views rose 18.4%", "Verified", "Metric QV-01", "Analyst", "Ready"], ["TikTok creative is most shareable", "Verified", "Post performance", "Analyst", "Ready"], ["Shift 12% budget", "Recommendation", "Scenario model", "Media lead", "Assigned"], ["Subtitle concern requires action", "Verified", "Listening alert", "Regional lead", "Assigned"]]
  },
  {
    slug: "social-attribution-lab", number: "06", accent: "#ef4444", icon: "⊕",
    name: "Social Attribution Lab", kicker: "Measurement science",
    description: "A controlled workspace for attribution, incrementality evidence, and conversion-path analysis.",
    objective: "Separate observed correlation from defensible incremental impact before reallocating investment.",
    kpis: [{ label: "Attributed conversions", value: "18,402", delta: "+14.2%" }, { label: "Test lift", value: "+7.8%", delta: "95% confidence" }, { label: "iCPA", value: "$18.40", delta: "−9.1%" }, { label: "Tracked journeys", value: "1.26M", delta: "94% coverage" }],
    chart: [18, 23, 31, 27, 40, 46, 55, 61, 70, 74, 83, 91], dimensions: ["Touchpoint", "Market", "Holdout", "Channel", "Window"],
    insight: "Last-click assigns 44% of conversions to paid social; the matched-market test estimates a 7.8% incremental lift. Retain both views, but base budget changes on the experiment with its confidence interval and design limits.", evidence: "Matched-market test · 28-day readout · pre-registered analysis plan",
    actions: ["Review experiment design", "Compare attribution models", "Export measurement memo"],
    table: [["Paid social", "44% last-click", "+7.8% lift", "$18.40 iCPA", "Scale cautiously"], ["Creator codes", "11% last-click", "+4.2% lift", "$23.10 iCPA", "Test expansion"], ["Organic social", "18% assisted", "Not isolated", "—", "Measure next"], ["Search", "27% last-click", "+2.1% lift", "$31.80 iCPA", "Maintain"]]
  },
  {
    slug: "fan-lifecycle-intelligence", number: "07", accent: "#a855f7", icon: "◍",
    name: "Fan Lifecycle Intelligence", kicker: "Audience intelligence",
    description: "An audience system that follows fans from discovery through advocacy without treating people as a generic reach number.",
    objective: "Identify which audiences move from first exposure to meaningful participation and retention.",
    kpis: [{ label: "Activated fans", value: "126.8K", delta: "+19.4%" }, { label: "30-day retention", value: "34.2%", delta: "+3.8 pts" }, { label: "Advocacy rate", value: "8.9%", delta: "+1.7 pts" }, { label: "Consent coverage", value: "100%", delta: "enforced" }],
    chart: [17, 22, 24, 35, 43, 50, 57, 63, 69, 74, 82, 94], dimensions: ["Lifecycle stage", "Cohort", "Market", "Interest", "Channel"],
    insight: "Trailer viewers who save a post and join an owned waitlist retain 2.1× better than viewers who only like content. Build an opt-in follow-up journey for this high-intent cohort; do not infer sensitive audience attributes.", evidence: "Consent-based cohort · 30-day observation · identity-resolution policy applied",
    actions: ["Open cohort definition", "Draft lifecycle journey", "Review consent ledger"],
    table: [["Aware", "1.26M", "12.4% activate", "TikTok", "Nurture"], ["Engaged", "304K", "41.7% activate", "Instagram", "Convert"], ["Activated", "126.8K", "34.2% retain", "Owned CRM", "Retain"], ["Advocates", "11.3K", "8.9% refer", "Community", "Reward"]]
  },
  {
    slug: "paid-social-budget-optimizer", number: "08", accent: "#06b6d4", icon: "◐",
    name: "Paid Social Budget Optimizer", kicker: "Media operations",
    description: "A pacing and scenario-planning control room for paid social teams.",
    objective: "Protect campaign outcomes with daily pacing, saturation, and inventory-risk guardrails.",
    kpis: [{ label: "Spend paced", value: "98.6%", delta: "on target" }, { label: "Forecasted CPA", value: "$21.70", delta: "−6.5%" }, { label: "Frequency risk", value: "2 segments", delta: "needs action" }, { label: "Budget at risk", value: "$14.2K", delta: "recoverable" }],
    chart: [31, 35, 36, 44, 55, 56, 68, 72, 76, 88, 91, 97], dimensions: ["Objective", "Audience", "Creative", "Placement", "Market"],
    insight: "Two retargeting audiences will exceed the approved frequency threshold within 72 hours. Cap exposure and move $14.2K toward the under-delivering-but-unsaturated prospecting cohort, subject to conversion-lag monitoring.", evidence: "Daily pacing model · 7-day conversion lag · frequency threshold: 4.5",
    actions: ["Run budget scenario", "Approve pacing change", "Inspect saturation risk"],
    table: [["Retargeting A", "4.7 frequency", "$18.20 CPA", "High saturation", "Cap"], ["Prospecting B", "2.1 frequency", "$24.90 CPA", "Low saturation", "Fund test"], ["Creator whitelisting", "2.8 frequency", "$19.40 CPA", "Stable", "Maintain"], ["Video views", "1.9 frequency", "$0.043 CPV", "Stable", "Protect"]]
  },
  {
    slug: "competitive-intelligence-engine", number: "09", accent: "#84cc16", icon: "△",
    name: "Competitive Intelligence Engine", kicker: "Market benchmarking",
    description: "A governed benchmark workspace for measuring category position, creative patterns, and attention share.",
    objective: "Turn competitor monitoring into a useful point of view without misrepresenting unavailable data.",
    kpis: [{ label: "Share of voice", value: "31.4%", delta: "+4.6 pts" }, { label: "Category velocity", value: "+28%", delta: "week over week" }, { label: "Creative gaps", value: "6", delta: "+2 found" }, { label: "Benchmark confidence", value: "High", delta: "source-verified" }],
    chart: [22, 26, 31, 34, 38, 42, 47, 54, 60, 64, 73, 79], dimensions: ["Competitor", "Topic", "Format", "Market", "Time period"],
    insight: "The category conversation moved toward behind-the-scenes content while the brand’s share of that topic remains 9 points below the leader. Create a differentiated production-diary series; do not infer competitor paid spend from public signals.", evidence: "Public / licensed source mix · taxonomy v2.1 · confidence reviewed",
    actions: ["Open benchmark methodology", "Create content opportunity", "Review source coverage"],
    table: [["Our brand", "31.4% SOV", "+4.6 pts", "Trailer", "Expand BTS"], ["Competitor A", "36.8% SOV", "+1.1 pts", "Behind scenes", "Learn"], ["Competitor B", "19.6% SOV", "−2.8 pts", "Cast interview", "Monitor"], ["Competitor C", "12.2% SOV", "+0.4 pts", "Fan edits", "Watch"]]
  },
  {
    slug: "community-care-operations", number: "10", accent: "#f97316", icon: "◒",
    name: "Community Care Operations", kicker: "Social CX",
    description: "An operating console for community health, inbound response quality, and high-risk escalation.",
    objective: "Give social teams a reliable way to prioritize people, protect response quality, and close the feedback loop.",
    kpis: [{ label: "First response time", value: "18 min", delta: "within SLA" }, { label: "Resolved cases", value: "1,842", delta: "+16%" }, { label: "CSAT", value: "4.6/5", delta: "+0.3" }, { label: "Escalation compliance", value: "99.2%", delta: "above target" }],
    chart: [23, 28, 35, 39, 46, 52, 57, 65, 70, 76, 84, 90], dimensions: ["Queue", "Severity", "Topic", "Market", "Agent"],
    insight: "Accessibility questions are rising faster than the general queue and are resolved 31% slower. Add a specialist macro, route to trained responders, and track whether repeat contacts decline—without using automation for safety-critical final decisions.", evidence: "30-day care analysis · QA sample n=240 · SLA policy v3.2",
    actions: ["Assign specialist queue", "Review QA sample", "Escalate policy issue"],
    table: [["Accessibility", "46 min FRT", "72% resolved", "High", "Specialist"], ["Release access", "14 min FRT", "91% resolved", "Medium", "Maintain"], ["Spoiler reports", "9 min FRT", "88% resolved", "High", "Escalate"], ["General praise", "21 min FRT", "93% resolved", "Low", "Automate triage"]]
  }
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug) ?? projects[0];
}
