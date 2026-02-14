/**
 * Dummy analyzer: returns fixed dummy scores and vulnerabilities for any repo.
 * Replace with real analysis (e.g. OpenAI, Semgrep) later.
 */

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface Vulnerability {
  severity: Severity;
  file: string;
  line: number;
  description: string;
  suggestion?: string;
}

export interface AnalysisResult {
  repoUrl: string;
  securityScore: number;
  privacyScore: number;
  complianceScore: number;
  vulnerabilities: Vulnerability[];
}

export function dummyAnalyze(repoUrl: string): AnalysisResult {
  return {
    repoUrl,
    securityScore: 62,
    privacyScore: 71,
    complianceScore: 45,
    vulnerabilities: [
      {
        severity: "HIGH",
        file: "src/api/auth.ts",
        line: 23,
        description: "Possible hardcoded API key or secret",
        suggestion: "Use environment variables or a secrets manager",
      },
      {
        severity: "MEDIUM",
        file: "src/routes/users.ts",
        line: 41,
        description: "User input used in query without validation",
        suggestion: "Add input validation and use parameterized queries",
      },
      {
        severity: "CRITICAL",
        file: "config/database.js",
        line: 8,
        description: "Database credentials in plain text",
        suggestion: "Move to env and never commit credentials",
      },
      {
        severity: "LOW",
        file: "middleware/cors.js",
        line: 5,
        description: "Overly permissive CORS (origins: *)",
        suggestion: "Restrict to known origins",
      },
      {
        severity: "MEDIUM",
        file: "src/utils/logger.ts",
        line: 12,
        description: "Sensitive data may be logged (PII)",
        suggestion: "Sanitize or redact PII before logging",
      },
    ],
  };
}
