'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function Contact() {
    return (
        <section className="bg-black py-32 px-6 relative z-20">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter"
                >
                    Let's Build Something Scalable.
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400 mb-12"
                >
                    Open for opportunities in Full Stack Development and Distributed Systems.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-6"
                >
                    <a
                        href="mailto:shubhamrajrathaur@gmail.com"
                        className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        Email Me
                    </a>
                    <a
                        href="https://in.linkedin.com/in/shubham-raj-rathaur/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-colors border border-white/10"
                    >
                        <Linkedin className="w-5 h-5" />
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/Shubhamraj8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-colors border border-white/10"
                    >
                        <Github className="w-5 h-5" />
                        GitHub
                    </a>
                </motion.div>

                <footer className="mt-32 text-gray-600 text-sm">
                    <p>© {new Date().getFullYear()} Shubham Raj Rathaur. Built with Next.js & Framer Motion.</p>
                </footer>
            </div>
        </section>
    );
}
