import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import ProjectDetailClient from "../../components/ProjectDetailClient";
import type { Project } from "../../../types/project";

export const metadata = { title: "Project — Legions" };

export function generateStaticParams() {
  const dataDir = path.join(process.cwd(), "data/projects");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  return files.map((f) => ({
    slug: f.replace(".json", ""),
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "data/projects", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const project: Project = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return (
    <main>
      <Nav />
      <ProjectDetailClient project={project} />
      <Footer />
    </main>
  );
}
