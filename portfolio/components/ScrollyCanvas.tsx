'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import Overlay from './Overlay';

const FRAME_COUNT = 128; // Adjust based on actual count 0..127

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
    const [isLoading, setIsLoading] = useState(true);

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            // We initiate loading for ALL images in parallel
            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                const paddedIndex = String(i).padStart(3, '0');
                img.src = `/sequence/frame_${paddedIndex}.png`;

                img.onload = () => {
                    imagesRef.current[i] = img;
                    // If the first frame is loaded, we can unblock the view
                    if (i === 0) {
                        setIsLoading(false);
                    }
                };
                img.onerror = (e) => {
                    console.error(`Failed to load frame ${i}`, e);
                    // Even if frame 0 fails, we should eventually unblock
                    if (i === 0) setIsLoading(false);
                };
            }
        };

        loadImages();
    }, []);

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Map 0..1 to 0..FRAME_COUNT-1
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Use the floored index
        const imgIndex = Math.floor(index);
        const img = imagesRef.current[imgIndex];

        // If image isn't loaded yet, do nothing (keep previous frame on canvas)
        if (!img) return;

        // Canvas dimensions setup
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Object Fit Cover Logic
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        // We DO NOT clear rect here, so that if a frame is skipped, the previous one remains
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Render on scroll change
    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(latest);
    });

    // Initial render when loading finishes (or rather, when frame 0 is ready)
    useEffect(() => {
        if (!isLoading) {
            // Force a render of the first frame when we unblock
            renderFrame(0);
        }
    }, [isLoading]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            renderFrame(frameIndex.get());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [frameIndex]);

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-[#121212]">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center text-white bg-black transition-opacity duration-1000">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            )}

            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                />
                <Overlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
