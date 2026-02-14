"use client";

import { useState } from "react";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

interface Vulnerability {
  severity: Severity;
  file: string;
  line: number;
  description: string;
  suggestion?: string;
}

interface AnalysisResult {
  repoUrl: string;
  securityScore: number;
  privacyScore: number;
  complianceScore: number;
  vulnerabilities: Vulnerability[];
}

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Analysis failed");
        return;
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Repo Security Scanner</h1>
      <p style={{ color: "#64748b", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
        Paste a GitHub repo URL and click Analyze. We&apos;ll show security, privacy, and compliance scores plus vulnerabilities.
      </p>

      <form onSubmit={handleAnalyze}>
        <input
          type="text"
          placeholder="https://github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </form>

      {loading && <p className="loading">Analyzing repo…</p>}
      {error && <p className="error">{error}</p>}

      {result && (
        <>
          <p className="repo-display">Repo: {result.repoUrl}</p>

          <div className="scores">
            <div className="score-card">
              <div className="value">{result.securityScore}</div>
              <div className="label">Security</div>
            </div>
            <div className="score-card">
              <div className="value">{result.privacyScore}</div>
              <div className="label">Privacy</div>
            </div>
            <div className="score-card">
              <div className="value">{result.complianceScore}</div>
              <div className="label">Compliance</div>
            </div>
          </div>

          <div className="vuln-list">
            <h2>Vulnerabilities ({result.vulnerabilities.length})</h2>
            {result.vulnerabilities.map((v, i) => (
              <div key={i} className="vuln-item">
                <span className={`severity severity-${v.severity}`}>
                  {v.severity}
                </span>
                <div>
                  <span className="file">{v.file}</span>
                  <span className="line">line {v.line}</span>
                </div>
                <div className="description">{v.description}</div>
                {v.suggestion && (
                  <div className="suggestion">→ {v.suggestion}</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
