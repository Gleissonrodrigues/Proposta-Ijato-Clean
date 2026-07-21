"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Rocket } from 'lucide-react';
// @ts-ignore
import cosmicAstronaut from '../../src/assets/images/cosmic_astronaut_1779405934513.png';
import {
    LogoDelta,
    LogoTorquato,
    LogoMicroscope,
    LogoCorredores,
    LogoCin,
    LogoMo,
    LogoMetta,
    LogoNewLogo
} from '../../src/components/CompanyLogos';

// The main hero component for FX Digital Solutions
const AetherFlowHero = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse: { x: number | null, y: number | null, radius: number } = { x: null, y: null, radius: 200 };

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas!.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas!.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Mouse collision detection
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius + this.size) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= forceDirectionX * force * 5;
                        this.y -= forceDirectionY * force * 5;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particles = [];
            if (!canvas) return;
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                // Using blue/white colors for FX theme
                let color = Math.random() > 0.5 ? 'rgba(74, 144, 217, 0.8)' : 'rgba(255, 255, 255, 0.6)'; 
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); 
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const connect = () => {
            if (!ctx || !canvas) return;
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        
                        let dx_mouse_a = particles[a].x - (mouse.x || 0);
                        let dy_mouse_a = particles[a].y - (mouse.y || 0);
                        let distance_mouse_a = Math.sqrt(dx_mouse_a*dx_mouse_a + dy_mouse_a*dy_mouse_a);
                        if (mouse.x && distance_mouse_a < mouse.radius) {
                             ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                        } else {
                             ctx.strokeStyle = `rgba(74, 144, 217, ${opacityValue * 0.4})`;
                        }
                        
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (!ctx || !canvas) return;
            // Background color matches the FX hero theme
            ctx.fillStyle = '#0D1F4C';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
        };
        
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2 + 0.5,
                duration: 0.8,
                ease: "easeInOut",
            },
        }),
    };

    const WHATSAPP_LINK_PROPOSAL = "https://wa.me/5587991234567?text=Ol%C3%A1%20FX%2C%20gostei%20da%20proposta%20e%20quero%20fechar%20o%20projeto!";

    return (
        <div 
            className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-16 md:py-0"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)' }}
        >
            {/* The canvas is now the primary background */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
            
            {/* Upper Floating Logo */}
            <div className="absolute top-8 left-6 md:left-12 flex items-center gap-2 z-20 select-none">
                <img 
                    src="https://i.ibb.co/psgg3vT/Nova-Logo-FX.png" 
                    alt="Fx Digital Logo" 
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 object-contain"
                />
                <span className="font-extrabold text-white text-lg tracking-tight">
                    <span className="text-[#185FA5] mr-0.5">Fx</span>Digital
                </span>
            </div>

            {/* Grid Content Wrapper */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
                    
                    {/* Left Column: Text Content & Actions */}
                    <div className="lg:col-span-7 flex flex-col justify-center text-left">
                        <motion.span
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-[#185FA5] text-sm md:text-base font-bold uppercase tracking-wider mb-3 block"
                        >
                            Agência de Marketing
                        </motion.span>

                        <motion.h1
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-4xl sm:text-5xl md:text-6xl text-white font-extrabold md:font-black tracking-tight leading-[1.08] mb-6 max-w-2xl"
                        >
                            Proposta de Estrutura Digital<span className="text-[#185FA5]">.</span>
                        </motion.h1>

                        <motion.p
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-normal"
                        >
                           Marketing para transformar presença digital em resultado
                        </motion.p>

                        <motion.div
                            custom={3}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col sm:flex-row items-start gap-5 mb-8"
                        >
                            <a 
                                href="#diagnostico" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById('diagnostico');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="w-full sm:w-auto text-center inline-flex items-center justify-center bg-[#0c6cf2] hover:bg-[#0b5cd6] text-white font-bold text-sm tracking-wide py-4 px-8 rounded-xl border-none shadow-[0_10px_25px_rgba(12,108,242,0.35)] transition-all duration-300 cursor-pointer"
                            >
                                Quero crescer agora!
                            </a>
                        </motion.div>

                        <motion.div
                            custom={4}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col items-start gap-2"
                        >
                            <div className="flex -space-x-2">
                                <div className="h-9 w-9 rounded-full border border-white/25 overflow-hidden shadow-md bg-black flex items-center justify-center" title="Delta">
                                    <LogoDelta />
                                </div>
                                <div className="h-9 w-9 rounded-full border border-white/25 overflow-hidden shadow-md bg-black flex items-center justify-center" title="Torquato Pit Bull">
                                    <LogoTorquato />
                                </div>
                                <div className="h-9 w-9 rounded-full border border-white/25 overflow-hidden shadow-md bg-white flex items-center justify-center" title="Genetics & Microscope">
                                    <LogoMicroscope />
                                </div>
                                <div className="h-9 w-9 rounded-full border border-white/25 overflow-hidden shadow-md bg-white flex items-center justify-center" title="Corredores do Vale">
                                    <LogoCorredores />
                                </div>
                                <div className="h-9 w-9 rounded-full border border-white/25 overflow-hidden shadow-md bg-white flex items-center justify-center" title="Instituto CIN">
                                    <LogoCin />
                                </div>
                                <div className="h-9 w-9 rounded-full border border-white/25 overflow-hidden shadow-md bg-[#FD5A02] flex items-center justify-center" title="MO Sgnã">
                                    <LogoMo />
                                </div>
                                <div className="h-9 w-9 rounded-full border border-white/25 overflow-hidden shadow-md bg-[#0C1D38] flex items-center justify-center" title="Metta Soluções">
                                    <LogoMetta />
                                </div>
                                <div className="h-9 w-9 rounded-full border border-white/25 overflow-hidden shadow-md bg-[#0C1D38] flex items-center justify-center" title="Logo Adicional">
                                    <LogoNewLogo />
                                </div>
                            </div>
                            <span className="text-gray-400 text-xs md:text-sm font-semibold tracking-wide pl-1">
                                +100 empresas aceleradas
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Column: Premium Astronaut Presentation Card */}
                    <div className="lg:col-span-5 flex justify-center items-center">
                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.6)] group bg-white"
                        >
                            {/* Inner Background Image - contained so logo text is fully visible */}
                            <img 
                                src="https://i.ibb.co/HfRJh03g/image.png" 
                                alt="Ijato Clean Logo" 
                                referrerPolicy="no-referrer"
                                className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Floating Stats Content - Sleek Top Badge to avoid obstruction */}
                            <div className="absolute top-4 right-4 bg-[#0D1F4C]/95 backdrop-blur-md border border-white/10 rounded-full py-1.5 px-3.5 z-20 shadow-md flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-white font-mono text-[9px] uppercase tracking-widest font-bold">STATUS · ATIVO</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Pulsating Arrow at the bottom boundary */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 mb-6"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-10 h-10 text-white/30" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AetherFlowHero;
