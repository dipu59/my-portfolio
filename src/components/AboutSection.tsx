"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";

type GitHubStatus = {
  title: string;
  text: string;
  href: string;
};

function formatRelativeTime(dateString: string) {
  const timestamp = new Date(dateString).getTime();

  if (Number.isNaN(timestamp)) {
    return "recently";
  }

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays < 30) {
    return `${diffDays}d ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths < 12) {
    return `${diffMonths}mo ago`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears}y ago`;
}

export function AboutSection() {
  const [githubStatus, setGithubStatus] = useState<GitHubStatus>({
    title: "GitHub this year",
    text: "Checking latest GitHub activity...",
    href: "https://github.com/dipu59",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubStatus() {
      try {
        const response = await fetch("/api/github/activity");

        if (!response.ok) {
          throw new Error("Unable to load GitHub activity");
        }

        const data = (await response.json()) as {
          year: number;
          profileUrl: string;
          totalContributions: number | null;
          activeDays: number | null;
          latestPush: {
            repo: string | null;
            commitCount: number;
            createdAt: string | null;
            href: string;
          } | null;
        };

        if (!isMounted) {
          return;
        }

        if (data.totalContributions !== null && data.activeDays !== null) {
          const latestPushText = data.latestPush?.createdAt
            ? ` Latest push ${
                data.latestPush.commitCount > 0
                  ? `${data.latestPush.commitCount} commit${
                      data.latestPush.commitCount > 1 ? "s" : ""
                    }`
                  : "update"
              } ${formatRelativeTime(data.latestPush.createdAt)}${
                data.latestPush.repo ? ` in ${data.latestPush.repo}` : ""
              }.`
            : "";

          setGithubStatus({
            title: `${data.year} GitHub activity`,
            text: `${data.totalContributions} public contributions across ${data.activeDays} active days.${latestPushText}`,
            href: data.latestPush?.href || data.profileUrl,
          });

          return;
        }

        setGithubStatus({
          title: "GitHub status",
          text: "Active on GitHub and shipping updates regularly.",
          href: data.profileUrl,
        });
      } catch {
        if (!isMounted) {
          return;
        }

        setGithubStatus({
          title: "GitHub status",
          text: "Active on GitHub and shipping updates regularly.",
          href: "https://github.com/dipu59",
        });
      }
    }

    void loadGitHubStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="about"
      className="relative mx-auto mt-20 w-full max-w-5xl px-4 pb-10 sm:px-6 md:mt-28 md:px-0"
      aria-labelledby="about-heading"
    >
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 48, scaleY: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 space-y-6 md:order-2"
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-400/80">
              About
            </p>
            <h2
              id="about-heading"
              className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
            >
              Developer focused on real results
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
            I&apos;m{" "}
            <span className="font-semibold text-zinc-50">Dipu Biswas</span>, a
            developer from Balagarh, Hooghly, West Bengal, India, focused on
            building fast, reliable web experiences with{" "}
            <span className="font-medium bg-linear-to-r from-yellow-50 via-yellow-100 to-yellow-100 bg-clip-text text-transparent">
              Next.js, React, TypeScript, and Node.js
            </span>
            . I care about clean architecture, performance, and small UI details
            that make products feel premium.
          </p>

          <p className="text-sm leading-relaxed text-zinc-400">
            Most of my work lives in full‑stack projects where I handle both
            frontend and backend — from designing data models and APIs, to
            crafting responsive interfaces, animations, and meaningful
            micro‑interactions. I like working closely with founders, designers,
            and engineers to ship features that solve real problems, not just
            look good in screenshots.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Tech focus
              </p>
              <p className="mt-1 text-[13px] text-zinc-200">
                Next.js · React · TypeScript · Node.js · Tailwind CSS ·
                PostgreSQL
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Availability
              </p>
              <p className="mt-1 text-[13px] text-zinc-200">
                Open to remote roles &amp; select freelance work.
              </p>
            </div>
          </div>

          <a
            href={githubStatus.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3 border-t border-zinc-800/80 pt-4 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
          >
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors group-hover:border-sky-500/50 group-hover:text-sky-300">
              <FaGithub className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                {githubStatus.title}
              </span>
              <span className="mt-1 block text-[13px] leading-6 text-zinc-300">
                {githubStatus.text}
              </span>
            </span>
          </a>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200 transition-colors hover:border-sky-400/60 hover:bg-sky-500/15 hover:text-white"
            >
              More about me
              <LuArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 46 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 relative flex justify-center md:order-1 md:justify-start"
        >
          <div className="relative w-full md:max-w-105 max-w-sm rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-[0_32px_100px_rgba(0,0,0,0.95)]">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-900/80">
              <Image
                src="/dipubiswas.jpg"
                alt="Photo of Dipu Biswas"
                width={420}
                height={460}
                className="h-85 w-full object-cover sm:h-95"
                priority
              />
            </div>
            <div className="mt-3 space-y-1 text-xs text-zinc-300">
              <p className="text-sm font-semibold text-zinc-50">Dipu Biswas</p>
              <p className="text-[12px] text-zinc-400">
                Full‑stack developer · Next.js &amp; React
              </p>
              <p className="text-[11px] text-zinc-500">
                Based in Balagarh, Hooghly, West Bengal, India · Working
                remotely with teams worldwide.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
