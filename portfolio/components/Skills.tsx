'use client';

import { motion } from 'framer-motion';
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiCss3,
    SiNodedotjs, SiExpress, SiGraphql, SiApachekafka,
    SiMongodb, SiPostgresql, SiRedis,
    SiKotlin, SiCplusplus, SiC,
    SiDocker, SiGithub, SiAndroidstudio, SiPostman,
    SiLinux, SiGit
} from 'react-icons/si';

// Map skills to icons
const skillIcons: Record<string, React.ReactNode> = {
    "React.js": <SiReact className="w-4 h-4 text-blue-400" />,
    "Next.js": <SiNextdotjs className="w-4 h-4 text-white" />,
    "TypeScript": <SiTypescript className="w-4 h-4 text-blue-500" />,
    "Tailwind CSS": <SiTailwindcss className="w-4 h-4 text-teal-400" />,
    "JavaScript (ES6+)": <SiJavascript className="w-4 h-4 text-yellow-400" />,
    "HTML/CSS": <div className="flex gap-1"><SiHtml5 className="w-4 h-4 text-orange-500" /><SiCss3 className="w-4 h-4 text-blue-500" /></div>,
    "Node.js": <SiNodedotjs className="w-4 h-4 text-green-500" />,
    "Express.js": <SiExpress className="w-4 h-4 text-white" />,
    "REST APIs": <span className="font-bold text-xs">API</span>,
    "GraphQL": <SiGraphql className="w-4 h-4 text-pink-500" />,
    "Apache Kafka": <SiApachekafka className="w-4 h-4 text-red-500" />,
    "MongoDB": <SiMongodb className="w-4 h-4 text-green-500" />,
    "PostgreSQL": <SiPostgresql className="w-4 h-4 text-blue-400" />,
    "Redis": <SiRedis className="w-4 h-4 text-red-500" />,
    "C": <SiC className="w-4 h-4 text-blue-500" />,
    "C++": <SiCplusplus className="w-4 h-4 text-blue-600" />,
    "Kotlin": <SiKotlin className="w-4 h-4 text-purple-500" />,
    "JavaScript": <SiJavascript className="w-4 h-4 text-yellow-400" />,
    "Docker": <SiDocker className="w-4 h-4 text-blue-500" />,
    "Git/GitHub": <div className="flex gap-1"><SiGit className="w-4 h-4 text-orange-500" /><SiGithub className="w-4 h-4 text-white" /></div>,
    "Android Studio": <SiAndroidstudio className="w-4 h-4 text-green-400" />,
    "Postman": <SiPostman className="w-4 h-4 text-orange-500" />,
    "Data Structures & Algorithms": <span className="text-lg">🧬</span>,
    "OOP": <span className="text-lg">🧩</span>,
    "DBMS": <span className="text-lg">🗄️</span>,
    "Operating Systems": <SiLinux className="w-4 h-4 text-yellow-500" />,
    "Computer Networks": <span className="text-lg">🌐</span>
};

const skills = {
    Frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", "HTML/CSS"],
    Backend: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Apache Kafka"],
    Database: ["MongoDB", "PostgreSQL", "Redis"],
    Languages: ["C", "C++", "Kotlin", "JavaScript"],
    Tools: ["Docker", "Git/GitHub", "Android Studio", "Postman"],
    "CS Fundamentals": ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"]
};

export default function Skills() {
    return (
        <section className="bg-[#121212] py-24 px-6 relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-white mb-16 tracking-tighter"
                >
                    Technical Arsenal
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(skills).map(([category, items], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors shadow-lg"
                        >
                            <h4 className="text-xl font-bold text-gray-200 mb-6 border-b border-white/10 pb-2">
                                {category}
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {items.map(skill => (
                                    <span key={skill} className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                                        {skillIcons[skill] || <span className="w-2 h-2 rounded-full bg-blue-500" />}
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
