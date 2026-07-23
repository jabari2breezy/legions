import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { EditorialStatement } from "../components/EditorialStatement";

export const metadata = { title: "About — Legions" };

export default function About() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="container-narrow" style={{ paddingTop: "var(--space-section)", paddingBottom: "var(--space-block)" }}>
        <span className="stat-label" style={{ color: "var(--color-text-secondary)", display: "block", marginBottom: "12px" }}>Our Story</span>
        <h1 style={{ font: "var(--text-h1)", letterSpacing: "var(--letter-spacing-display)", maxWidth: "900px" }}>
          Founded by students in 2022.
        </h1>
        <p style={{ font: "var(--text-body-lg)", color: "var(--color-text-secondary)", maxWidth: "600px", marginTop: "24px" }}>
          We didn&apos;t want to wait until we were older to make a difference. We started Legions because Dar es Salaam needed action, not just awareness.
        </p>
      </section>

      {/* Mission */}
      <EditorialStatement>
        From renovating cancer patient housing at Ujasiri House to coastal beach cleanups and tree planting, our mandate is simple: direct action, zero bureaucracy, total transparency.
      </EditorialStatement>

      {/* Tenets */}
      <section className="container-narrow" style={{ paddingTop: "var(--space-section)" }}>
        <span className="stat-label" style={{ color: "var(--color-text-secondary)", display: "block", marginBottom: "12px" }}>Core Tenets</span>
        <h2 style={{ font: "var(--text-h2)", letterSpacing: "var(--letter-spacing-display)", marginBottom: "var(--space-block)" }}>What We Believe</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-gap)" }}>
          {[
            { title: "Radical Transparency", desc: "Every donation is accounted for. We show exactly where the money goes and the physical impact it creates." },
            { title: "Action Over Words", desc: "We don't host galas to talk about problems; we get our hands dirty to fix them. Field work is our primary metric." },
            { title: "Youth Empowerment", desc: "Age is not a barrier to impact. We train the next generation of Tanzanian leaders through real-world service." },
          ].map((t) => (
            <div key={t.title} style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <h3 style={{ font: "var(--text-h3)", marginBottom: "8px" }}>{t.title}</h3>
              <p style={{ font: "var(--text-body)", color: "var(--color-text-secondary)" }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-narrow" style={{ paddingTop: "var(--space-section)" }}>
        <span className="stat-label" style={{ color: "var(--color-text-secondary)", display: "block", marginBottom: "12px" }}>History</span>
        <h2 style={{ font: "var(--text-h2)", letterSpacing: "var(--letter-spacing-display)", marginBottom: "var(--space-block)" }}>The Journey So Far</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "48px", borderLeft: "1px solid var(--color-border)", paddingLeft: "32px", maxWidth: "700px" }}>
          {[
            { year: "2022", title: "Legions Founded", desc: "A small group of high schoolers decides to formalize their community service efforts." },
            { year: "2023", title: "First Major Success", desc: "The MYK Tree Planting initiative hits 10,000 trees, proving the model works at scale." },
            { year: "2024", title: "Expanding Scope", desc: "Moving into healthcare infrastructure with Ujasiri House and clean water with the Pwani Well." },
          ].map((item) => (
            <div key={item.year}>
              <span style={{ font: "var(--text-label)", color: "var(--color-accent-teal)", display: "block", marginBottom: "4px" }}>{item.year}</span>
              <h3 style={{ font: "var(--text-h3)", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ font: "var(--text-body)", color: "var(--color-text-secondary)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: "var(--space-section)" }} />
      <Footer />
    </main>
  );
}
