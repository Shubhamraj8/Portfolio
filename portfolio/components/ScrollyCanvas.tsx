'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import Overlay from './Overlay';

const FRAME_COUNT = 128; // Adjust based on actual count 0..127

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Pad index to 3 digits matches file naming: frame_000.png
                    const paddedIndex = String(i).padStart(3, '0');
                    img.src = `/sequence/frame_${paddedIndex}.png`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load frame ${i}`, e);
                        resolve(); // resolve anyway to avoid stuck
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoading(false);
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
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Use the floored index
        const imgIndex = Math.floor(index);
        const img = images[imgIndex];
        if (!img) return;

        // Canvas dimensions setup (handle DPI for sharpness if needed, but keeping simple first)
        // We assume canvas is sized via CSS or resize event listeners.
        // Let's set internal resolution to match client size.
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Render on scroll change
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!isLoading) {
            renderFrame(latest);
        }
    });

    // Initial render when loaded
    useEffect(() => {
        if (!isLoading && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoading, images]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (!isLoading && images.length > 0) {
                // We need the current index, but useTransform gives us a stream.
                // We can read the current value of the motion value.
                renderFrame(frameIndex.get());
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoading, images, frameIndex]);

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-[#121212]">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center text-white bg-black">
                    Loading Sequence...
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
