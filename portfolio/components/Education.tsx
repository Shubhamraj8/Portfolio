'use client';

import { motion } from 'framer-motion';

const education = [
    {
        degree: "B.Tech – Electronics & Communication Engineering",
        institution: "Jaypee Institute of Information Technology, Noida",
        duration: "2022 – 2026",
        score: null
    },
    {
        degree: "Class 12 – CBSE",
        institution: "Gyan Bharti Global School, Gaya",
        duration: null,
        score: "85.2%"
    },
    {
        degree: "Class 10 – CBSE",
        institution: "Pragya Bharti Public School, Gaya",
        duration: null,
        score: "91.6%"
    }
];

export default function Education() {
    return (
        <section className="bg-[#121212] py-24 px-6 relative z-20 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tighter text-center"
                >
                    Education
                </motion.h3>

                <div className="space-y-12">
                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 border-l border-white/10"
                        >
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <h4 className="text-xl md:text-2xl font-bold text-white">{item.degree}</h4>
                            <p className="text-lg text-gray-400 mt-1">{item.institution}</p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-500 font-mono">
                                {item.duration && <span>{item.duration}</span>}
                                {item.score && <span>Score: {item.score}</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
