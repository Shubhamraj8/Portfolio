'use client';

import { MotionValue, motion, useTransform } from 'framer-motion';

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {

    // Section 1: "My Name. Creative Developer." (Center) - Visible 0% to 15%
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

    // Section 2: "I build digital experiences." (Left aligned) - Visible 25% to 45%
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.25, 0.45], [-50, 0]); // Slide in slightly
    const y2 = useTransform(scrollYProgress, [0.25, 0.45], [50, -50]); // Parallax up

    // Section 3: "Bridging design and engineering." (Right aligned) - Visible 55% to 75%
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.55, 0.75], [50, 0]);
    const y3 = useTransform(scrollYProgress, [0.55, 0.75], [50, -50]);

    return (
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none text-white">
            {/* Section 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
            >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 pb-4">
                    Shubham Raj Rathaur
                </h1>
                <p className="text-xl md:text-2xl mt-4 font-light text-gray-300">
                    Full Stack Developer
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: opacity2, x: x2, y: y2 }}
                className="absolute inset-0 flex items-center justify-start p-12 md:p-24"
            >
                <h2 className="text-4xl md:text-6xl font-bold max-w-lg leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Building scalable distributed systems.
                </h2>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ opacity: opacity3, x: x3, y: y3 }}
                className="absolute inset-0 flex items-center justify-end p-12 md:p-24"
            >
                <h2 className="text-4xl md:text-6xl font-bold max-w-lg leading-tight text-right text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-cyan-500">
                    Crafting AI-powered experiences.
                </h2>
            </motion.div>
        </div>
    );
}
