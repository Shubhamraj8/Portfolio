'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
    {
        title: "AI Resume Analyzer",
        desc: "Responsive dashboard for resume uploads with AI-based scoring and insights. Solved cross-file imports and state sync issues using Zustand. Built scalable frontend architecture with Remix & Tailwind.",
        tags: ["React", "Remix", "TypeScript", "Tailwind CSS", "Zustand"],
        link: "https://github.com/Shubhamraj8/AI-Resume-Analyzer",
        image: "/projects/resume-analyzer-real.png"
    },
    {
        title: "AI-Powered Job Portal",
        desc: "Scalable microservices-based job portal with subscription prioritization and event-driven notifications. Features Gemini AI integration for career guidance and resume analysis.",
        tags: ["Next.js", "Node.js", "PostgreSQL", "Kafka", "Redis", "Docker"],
        link: "https://github.com/Shubhamraj8/Job-Portal",
        image: "/projects/job-portal-real.png"
    }
];

export default function Projects() {
    return (
        <section className="min-h-screen bg-[#121212] py-32 px-6 relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.h3
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-white mb-24 tracking-tighter"
                >
                    Major Projects
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((p, i) => (
                        <motion.a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative flex flex-col p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 overflow-hidden cursor-pointer h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Overlay gradient for readability if needed, or subtle shine */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                </div>

                                <h4 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h4>
                                <p className="text-gray-400 mb-6 text-lg flex-grow">{p.desc}</p>

                                <div className="flex gap-2 flex-wrap mt-auto">
                                    {p.tags.map(t => (
                                        <span key={t} className="text-xs md:text-sm font-medium px-4 py-2 rounded-full bg-white/5 text-white border border-white/5 group-hover:border-white/10 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
