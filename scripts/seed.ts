import "dotenv/config";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

import { prisma } from "@/lib/prisma";

import { placeholderJobs } from "./jobs";

const employerId = process.env.EMPLOYER_ID!;

async function insertJobs() {
  try {
    for (let i = placeholderJobs.length - 1; i >= 0; i--) {
      const job = placeholderJobs[i];
      const skills = job.skills.map((skill) => skill.toLowerCase());

      // Markdown → Sanitized HTML
      const rawHtml = await marked.parse(job.description);
      const safeHtml = sanitizeHtml(rawHtml);

      await prisma.job.create({
        data: {
          companyLogo: job.companyLogo ?? "",
          companyName: job.companyName,
          role: job.role,
          jobType: job.jobType,
          jobMode: job.jobMode,
          location: job.location,
          salary: job.salary,
          currency: job.currency,
          experienceMin: job.experienceMin,
          experienceMax: job.experienceMax,
          openings: job.openings,
          description: safeHtml,
          jobStatus: job.jobStatus ?? "OPEN",
          isFeatured: job.isFeatured,
          employerId,
          skills: {
            create: skills.map((skillName) => ({
              skill: {
                connectOrCreate: {
                  where: { name: skillName },
                  create: { name: skillName },
                },
              },
            })),
          },
        },
      });
    }
    console.log("✅ Jobs inserted successfully");
  } catch (error) {
    console.error("❌ Error inserting jobs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

insertJobs();
