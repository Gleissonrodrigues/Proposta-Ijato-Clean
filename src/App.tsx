import { ReactNode, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AetherFlowHero from "@/components/ui/aether-flow-hero";
import { 
  ShoppingBag, 
  Sun, 
  Clock, 
  Calendar, 
  Zap, 
  Gift, 
  RefreshCw, 
  Shield, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Instagram, 
  Award, 
  Smartphone,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  FileText,
  MousePointerClick,
  ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const cardReveal = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.15 }
  }
};

const WHATSAPP_LINK_PROPOSAL = "https://wa.me/5587996475257?text=Ol%C3%A1%2C%20vi%20a%20proposta%20e%20quero%20fechar!";
const WHATSAPP_LINK_DOUBTS = "https://wa.me/5587996475257?text=Ol%C3%A1%2C%20tenho%20d%C3%BAvidas%20sobre%20a%20proposta.";

function AnimatedCounter({ value, duration = 1500 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.replace(/[\d+]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress * (2 - progress);
          setCount(Math.floor(easeProgress * numericValue));
          if (progress < 1) requestAnimationFrame(animate);
          else setCount(numericValue);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [numericValue, duration]);

  return (
    <span ref={elementRef} className="tabular-nums font-bold text-3xl sm:text-5xl text-[#0D1F4C]">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "growth" | "performance">("starter");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleSelectStart = (e: Event) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") { e.preventDefault(); return; }
      if (e.ctrlKey && e.shiftKey && ["I","J","C","i","j","c"].includes(e.key)) { e.preventDefault(); return; }
      if (e.metaKey && e.altKey && ["I","J","C","i","j","c"].includes(e.key)) { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && ["U","u","S","s","C","c","X","x"].includes(e.key)) { e.preventDefault(); return; }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("selectstart", handleSelectStart);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("selectstart", handleSelectStart);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans text-[#1a1a2e] antialiased select-none selection:bg-transparent selection:text-inherit">

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-slate-100/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#185FA5] via-[#4A90D9] to-orange-500 transition-all duration-100 ease-out shadow-[0_2px_10px_rgba(24,95,165,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <AetherFlowHero />

      {/* ─── SECTION 2: DIAGNÓSTICO ─── */}
      <section id="diagnostico" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-50 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-700 font-bold text-[10px] uppercase tracking-widest font-mono font-bold">Diagnóstico Digital</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-[#0D1F4C]">
              Oportunidades de melhoria identificadas
            </h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed font-light">
              Mapeamos as principais oportunidades de aquisição de clientes para a Ijato Clean antes de estruturar qualquer solução.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <Card className="border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] rounded-[2rem] overflow-hidden bg-white hover:shadow-[0_20px_50px_rgba(13,31,76,0.04)] transition-all duration-500">
              <div className="p-8 sm:p-12">
                {/* Brand Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0 bg-white flex items-center justify-center">
                      <img 
                        src="https://i.ibb.co/HfRJh03g/image.png" 
                        alt="Ijato Clean Logo" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-[#0D1F4C] tracking-tight">Ijato Clean</h3>
                      <span className="text-slate-400 text-xs font-light">Limpeza que transforma, conforto que você sente</span>
                    </div>
                  </div>
                </div>

                {/* Section: Pontos Positivos */}
                <div className="mb-10 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-800 font-bold text-[10px] uppercase tracking-widest font-mono">Pontos Positivos Identificados</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Segmento altamente visual",
                        text: "Lavagem de estofados e higienização permitem mostrar resultados claros, que despertam curiosidade e geram confiança."
                      },
                      {
                        title: "Clareza dos serviços",
                        text: "O perfil deixa claro quais são os serviços oferecidos. Isso facilita o entendimento do visitante."
                      },
                      {
                        title: "Boa percepção de profissionalismo",
                        text: "A identidade da marca e a apresentação da empresa transmitem seriedade. O cliente percebe que existe um processo profissional de atendimento"
                      },
                      {
                        title: "Conteúdo demonstra execução dos serviços",
                        text: "Mostra o trabalho sendo realizado reduz a insegurança do cliente e evidencia que existe conhecimento técnico"
                      }
                    ].map((pos, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:bg-white hover:border-emerald-100 hover:shadow-xs transition-all duration-300 text-left"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mt-0.5 shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0D1F4C] text-sm mb-1">{pos.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-light">{pos.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100 my-10" />

                {/* Section: Pontos de Melhoria */}
                <div className="mb-10 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-6 shadow-xs">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-red-700 font-bold text-[10px] uppercase tracking-widest font-mono">Pontos de Melhoria Identificados</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Pouca exploração do \"Antes e Depois\" no feed",
                        text: "Quanto maior o contraste visual entre o estado inicial e o resultado final, maior tende a ser a taxa de engajamento. O consumidor compra transformação"
                      },
                      {
                        title: "Conteúdo excessivamente comercial",
                        text: "O perfil precisa também educar o cliente com conteúdos que tiram dúvidas"
                      },
                      {
                        title: "Pouca Humanização",
                        text: "Mostrar aspectos do dia a dia profissional pode fortalecer o relacionamento. Esse conteúdo reforça autenticidade e aproxima o cliente"
                      },
                      {
                        title: "Maior utilização de prova social",
                        text: "A prova social reduz objeções e aumenta a confiança"
                      },
                      {
                        title: "Explorar mais vídeos curtos",
                        text: "Hoje o algoritmo privilegia Reels"
                      },
                      {
                        title: "Reorganização dos destaques",
                        text: "Separado por serviços, clientes, atendimentos e dúvidas."
                      }
                    ].map((prob, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:bg-white hover:border-red-100 hover:shadow-xs transition-all duration-300 text-left"
                      >
                        <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mt-0.5 shrink-0">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0D1F4C] text-sm mb-1">{prob.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-light">{prob.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Opportunity Box */}
                <div className="p-6 bg-emerald-50/60 border-l-4 border-emerald-500 rounded-r-2xl text-left">
                  <h5 className="font-bold text-emerald-800 text-sm sm:text-base mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Oportunidade Identificada
                  </h5>
                  <div className="text-emerald-900 text-xs sm:text-sm leading-relaxed font-light space-y-4">
                    <p>
                      Do ponto de vista de marketing, a <strong>Ijato Clean</strong> atua em um dos segmentos com maior potencial para produção de conteúdo orgânico. O serviço entrega uma transformação visível e desperta emoções imediatas, características que favorecem alto engajamento quando exploradas com consistência.
                    </p>
                    <p>
                      O principal desafio hoje não parece ser a qualidade do serviço, mas a forma como ele é comunicado. Há espaço para transformar o perfil em um canal de aquisição de clientes muito mais eficiente, combinando conteúdo educativo, demonstrações visuais, provas sociais e estratégias de relacionamento.
                    </p>
                  </div>
                </div>

              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: SOLUÇÃO ─── */}
      <section id="solucoes" className="py-24 px-6 bg-[#F8F9FB] border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5] animate-pulse" />
              <span className="text-[#185FA5] font-bold text-[10px] uppercase tracking-widest font-mono font-bold">Ijato Clean</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight text-[#0D1F4C]">
              Campanhas Estratégicas de Tráfego Pago
            </h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed font-light">
              Implementando um ecossistema de anúncios patrocinados altamente qualificados (Google Ads e Meta Ads) focado na captação de leads de higienização e limpeza de estofados.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* SERVIÇO 01 */}
            <motion.div variants={cardReveal} className="flex h-full">
              <Card className="border border-slate-100 rounded-[2rem] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col w-full text-left">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="text-xs font-mono font-bold text-[#185FA5] bg-blue-50 px-3 py-1 rounded-full">Serviço 01</span>
                      <Badge className="bg-blue-50 text-[#185FA5] border border-blue-100 font-mono text-[9px] uppercase tracking-wider">Google & Meta Ads</Badge>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4 text-[#185FA5]">
                      <MousePointerClick className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-xl text-[#0D1F4C] mb-3">Gestão de Campanhas de Alta Performance</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                      Criamos e otimizamos anúncios direcionados a quem precisa de serviços de higienização de estofados, colchões e tapetes: famílias, donos de pets, alérgicos e estabelecimentos comerciais.
                    </p>
                    <ul className="space-y-3 text-slate-600 text-[13px] font-light">
                      {[
                        "Segmentação cirúrgica por bairros nobres e classe social de alta renda",
                        "Campanhas no Google Search focadas em termos de alta intenção como 'limpeza de sofá' ou 'higienização de estofados'",
                        "Remarketing para reimpactar pessoas que já viram ou solicitaram orçamentos",
                        "Otimização constante de lances e orçamento para o menor Custo por Lead",
                        "Configuração e integração das tags de rastreamento de cliques e conversões"
                      ].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                           <CheckCircle2 className="w-4 h-4 text-[#185FA5] shrink-0 mt-0.5" />
                           <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-8 pt-4 border-t border-slate-100">
                    {["Google Search", "Meta Ads", "Público Alvo", "Estofados"].map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* SERVIÇO 02 */}
            <motion.div variants={cardReveal} className="flex h-full">
              <Card className="border border-slate-100 rounded-[2rem] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col w-full text-left">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Serviço 02</span>
                      <Badge className="bg-purple-50 text-purple-700 border border-purple-100 font-mono text-[9px] uppercase tracking-wider">Criativos & Vídeos</Badge>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4 text-purple-600">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-xl text-[#0D1F4C] mb-3">Roteirização & Criativos Magnéticos</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                      Desenvolvemos o design e estruturamos roteiros de alta conversão. Focamos na dor principal do cliente (sujeira acumulada, ácaros, alergias e manchas no estofado) e nos benefícios diretos da Ijato Clean.
                    </p>
                    <ul className="space-y-3 text-slate-600 text-[13px] font-light">
                      {[
                        "Roteiros magnéticos focados na transformação visual imediata de antes e depois",
                        "Desenvolvimento de criativos visuais premium alinhados à marca Ijato Clean",
                        "Design de anúncios focado em demonstrar saúde, bem-estar e renovação do ambiente",
                        "Ganchos fortes de atenção nos primeiros 3 segundos para prender o lead",
                        "Edição otimizada para anúncios de alta conversão no Instagram Reels e Stories"
                      ].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-8 pt-4 border-t border-slate-100">
                    {["Criativos Premium", "Roteiros de Vídeo", "Design Gráfico", "Teste A/B"].map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* SERVIÇO 03 */}
            <motion.div variants={cardReveal} className="flex h-full">
              <Card className="border border-dashed border-emerald-200 bg-emerald-50/10 rounded-[2rem] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col w-full text-left">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Serviço 03</span>
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full font-mono">Incluso de Brinde</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 text-emerald-600">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-xl text-[#0D1F4C] mb-3">Estruturação de Landing Page & Atendimento</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                      Não adianta gerar leads se eles não comprarem. Entregamos soluções de brinde para reter os leads, facilitando o agendamento de serviços e o envio rápido de orçamentos via WhatsApp.
                    </p>
                    <ul className="space-y-3 text-slate-600 text-[13px] font-light">
                      {[
                        "Página de links de alta conversão (Link de Bio profissional) entregue em 24h",
                        "Orientação de script rápido para qualificação de leads no WhatsApp",
                        "Facilidade para o cliente enviar fotos do estofado para orçamento rápido",
                        "Otimização da bio do perfil da Ijato Clean com gatilhos de vendas"
                      ].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-8 pt-4 border-t border-slate-100">
                    {["WhatsApp Funnel", "Link de Bio", "Atendimento Comercial", "Conversão"].map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* SERVIÇO 04 */}
            <motion.div variants={cardReveal} className="flex h-full">
              <Card className="border border-slate-100 rounded-[2rem] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col w-full text-left">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">Serviço 04</span>
                      <Badge className="bg-pink-50 text-pink-700 border border-pink-100 font-mono text-[9px] uppercase tracking-wider">Gestão de Rede Social</Badge>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center mb-4 text-pink-600">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-xl text-[#0D1F4C] mb-3">Gestão de Rede Social - Instagram</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                      Um perfil ativo e profissional é o seu melhor cartão de visitas. Desenvolvemos o posicionamento estratégico no Instagram para atrair clientes orgânicos qualificados, transformando visualizações em agendamentos de higienização de estofados.
                    </p>
                    <ul className="space-y-3 text-slate-600 text-[13px] font-light">
                      {[
                        "Criação de linha editorial estratégica focada em fotos de Antes & Depois reais",
                        "Design de posts para feed e carrosséis educativos sobre ácaros e conservação",
                        "Planejamento de Reels dinâmicos mostrando os processos de limpeza e higienização",
                        "Roteirização de Stories diários para humanizar a marca e gerar relacionamento",
                        "Otimização completa do perfil (Bio atrativa, destaques organizados e links)"
                      ].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-8 pt-4 border-t border-slate-100">
                    {["Instagram", "Mídias Sociais", "Produção de Conteúdo", "Engajamento"].map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 4: PACOTE ─── */}
      <section id="pacote" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4 shadow-sm">
              <span className="text-[#185FA5] font-bold text-[10px] uppercase tracking-widest font-mono">Planos de Crescimento</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-[#0D1F4C]">
              Escolha o plano ideal para a sua empresa
            </h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed font-light">
              Soluções completas e focadas em escala de vendas de serviços de higienização de estofados através de campanhas profissionais de Tráfego Pago.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left max-w-6xl mx-auto"
          >
            {/* CARD 0: STARTER */}
            <motion.div 
              variants={cardReveal}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`flex flex-col h-full rounded-[2.2rem] bg-[#0D1F4C] text-white p-8 sm:p-10 transition-all duration-300 relative overflow-hidden shadow-xl cursor-pointer ${
                selectedPlan === "starter" 
                  ? "ring-4 ring-[#185FA5]/50 shadow-[0_25px_60px_rgba(13,31,76,0.25)] scale-[1.02] lg:scale-[1.03] z-10" 
                  : "hover:shadow-[0_20px_40px_rgba(13,31,76,0.15)] bg-[#0c1a3f]"
              }`}
              onClick={() => setSelectedPlan("starter")}
            >
              {/* Highlight Ribbon */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white font-mono text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-sm z-10">
                Mais Recomendado ⭐
              </div>

              {/* Card Header */}
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 bg-white/10 text-blue-200 rounded-full">
                  Pacote Starter
                </span>
              </div>

              {/* Ideal For and Objective */}
              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                <div className="text-xs text-slate-300 leading-relaxed font-light">
                  <strong className="font-semibold text-white block mb-1">Ideal para:</strong>
                  Microempresas, prestadores de serviço, profissionais liberais e negócios locais.
                  <strong className="font-semibold text-white block mt-2 mb-1">Serviço:</strong>
                  Tráfego pago + Gestão de rede social
                  <strong className="font-semibold text-white block mt-2 mb-1">Objetivo:</strong>
                  Geração de leads ou mensagens no WhatsApp.
                </div>
              </div>

              {/* Deliverables List */}
              <div className="flex-grow space-y-4">
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block font-mono">O que inclui:</span>
                <ul className="space-y-3 text-slate-200 text-xs font-light leading-relaxed font-sans uppercase">
                  {[
                    "CONFIGURAÇÃO DA CONTA DE ANÚNCIOS",
                    "PIXEL E EVENTOS BÁSICOS",
                    "ATÉ 2 CAMPANHAS SIMULTÂNEAS",
                    "FACEBOOK E INSTAGRAM ADS",
                    "ATÉ 5 CRIATIVOS POR MÊS",
                    "RELATÓRIO MENSAL",
                    "SUPORTE VIA WHATSAPP",
                    "🎁 EXCLUSIVO: 1 CAPTAÇÃO DE VÍDEO GRATIS",
                    "🎁 EXCLUSIVO: +1 LINK DE BIO (SITE RÁPIDO PROFISSIONAL)",
                    "🎁 EXCLUSIVO: REBRANDING (NOVA LOGOMARCA)"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className={feat.startsWith("🎁") ? "font-semibold text-emerald-300" : ""}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing Breakdown */}
                <div className="mt-6 pt-5 border-t border-white/15 space-y-2 bg-white/5 rounded-2xl p-4">
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block font-mono">Precificação:</span>
                  <div className="space-y-1.5 text-xs text-slate-300 font-light font-sans">
                    <div className="flex justify-between items-center">
                      <span>Serviço tráfego pago:</span>
                      <span className="font-semibold text-white">R$ 1.000,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Landing Page:</span>
                      <span className="font-semibold text-white">R$ 300,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Gestão rede social:</span>
                      <span className="font-semibold text-white">R$ 800,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Captação (por vídeo):</span>
                      <span className="font-semibold text-white">R$ 350,00</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10 font-bold">
                      <span className="text-white uppercase font-mono tracking-wider text-[10px]">Valor total:</span>
                      <span className="text-red-500 line-through text-sm">R$ 2.450,00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price / Investment Section (at the end, below list) */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-[9px] uppercase font-bold text-blue-300 font-mono tracking-wider block">Investimento</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-sm font-medium text-blue-300 mr-1">R$</span>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">1.200,00</span>
                  <span className="text-blue-300 text-xs font-mono ml-2">/mês</span>
                </div>
                <span className="text-emerald-400 font-medium text-[10px] uppercase tracking-wider font-mono mt-1.5 block">
                  desconto para parceiro 49%
                </span>
              </div>

              {/* Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href={`https://wa.me/5587996475257?text=${encodeURIComponent("Olá! Tenho interesse no Pacote Starter da Ijato Clean de R$ 1.200,00/mês com desconto para tráfego pago.")}`}
                  className={`w-full text-center inline-flex items-center justify-center font-extrabold text-xs py-4 px-6 rounded-2xl transition-all duration-300 ${
                    selectedPlan === "starter"
                      ? "bg-[#185FA5] text-white hover:bg-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Fechar Pacote Starter <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>

            {/* CARD 1: PRO GROWTH */}
            <motion.div 
              variants={cardReveal}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`flex flex-col h-full rounded-[2.2rem] bg-white border p-8 sm:p-10 transition-all duration-300 relative overflow-hidden cursor-pointer ${
                selectedPlan === "growth" 
                  ? "border-[#185FA5] shadow-[0_20px_50px_rgba(24,95,165,0.08)] ring-2 ring-[#185FA5]/30" 
                  : "border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-slate-200 hover:shadow-md"
              }`}
              onClick={() => setSelectedPlan("growth")}
            >
              {/* Card Header */}
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full">
                  Plano Growth
                </span>
              </div>

              {/* Ideal For and Objective */}
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-100">
                <div className="text-xs text-slate-500 leading-relaxed font-light">
                  <strong className="font-semibold text-slate-700 block mb-1">Ideal para:</strong>
                  Pequenas empresas que já investem ou querem começar a investir de forma profissional em captação de leads de higienização de estofados.
                  <strong className="font-semibold text-slate-700 block mt-2 mb-1">Serviço:</strong>
                  Tráfego pago + Gestão de rede social
                  <strong className="font-semibold text-slate-700 block mt-2 mb-1">Objetivo:</strong>
                  Aumentar geração de oportunidades comerciais.
                </div>
              </div>

              {/* Deliverables List */}
              <div className="flex-grow space-y-4">
                <span className="text-xs font-bold text-[#0D1F4C] uppercase tracking-wider block font-mono">O que inclui:</span>
                <ul className="space-y-3 text-slate-600 text-xs font-light leading-relaxed">
                  {[
                    "CAMPANHAS PROFISSIONAIS NO METAS ADS OU GOOGLE ADS",
                    "ATÉ 5 CAMPANHAS ATIVAS SIMULTÂNEAMENTE",
                    "REMARKETING ATIVO PARA QUEM INTERAGIU",
                    "SEGMENTAÇÕES AVANÇADAS (BAIRROS NOBRES/ALTO PADRÃO)",
                    "ATÉ 10 CRIATIVOS MENSAIS EXCLUSIVOS",
                    "REUNIÃO MENSAL DE PLANEJAMENTO & RESULTADOS",
                    "RELATÓRIO DETALHADO DE DESEMPENHO E ROI",
                    "🎁 EXCLUSIVO: 1 CAPTAÇÃO DE VÍDEO GRATIS",
                    "🎁 EXCLUSIVO: +1 LINK DE BIO (SITE RÁPIDO PROFISSIONAL)"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={feat.startsWith("🎁") ? "font-semibold text-emerald-700" : ""}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price / Investment Section (at the end, below list) */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider block">Investimento</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-sm font-medium text-slate-500 mr-1">R$</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#0D1F4C] tracking-tight">2.750,00</span>
                  <span className="text-slate-400 text-xs font-mono ml-2">/mês</span>
                </div>
              </div>

              {/* Button */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <a
                  href={`https://wa.me/5587996475257?text=${encodeURIComponent("Olá! Tenho interesse no Plano Growth da Ijato Clean de R$ 2.750,00/mês para tráfego pago.")}`}
                  className={`w-full text-center inline-flex items-center justify-center font-extrabold text-xs py-4 px-6 rounded-2xl transition-all duration-300 ${
                    selectedPlan === "growth"
                      ? "bg-[#185FA5] text-white hover:bg-blue-600 shadow-md shadow-blue-500/10"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Fechar Plano Growth <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>

            {/* CARD 2: PRO PERFORMANCE */}
            <motion.div 
              variants={cardReveal}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`flex flex-col h-full rounded-[2.2rem] bg-[#0D1F4C] text-white p-8 sm:p-10 transition-all duration-300 relative overflow-hidden shadow-xl cursor-pointer ${
                selectedPlan === "performance" 
                  ? "ring-4 ring-[#185FA5]/50 shadow-[0_25px_60px_rgba(13,31,76,0.25)] scale-[1.02] lg:scale-[1.03] z-10" 
                  : "hover:shadow-[0_20px_40px_rgba(13,31,76,0.15)] bg-[#0c1a3f]"
              }`}
              onClick={() => setSelectedPlan("performance")}
            >
              {/* Card Header */}
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 bg-white/10 text-blue-200 rounded-full">
                  Plano Performance
                </span>
              </div>

              {/* Ideal For and Objective */}
              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                <div className="text-xs text-slate-300 leading-relaxed font-light">
                  <strong className="font-semibold text-white block mb-1">Ideal para:</strong>
                  Empresas com equipe comercial estruturada que buscam dominar o mercado local de higienização de estofados com funil de vendas completo.
                  <strong className="font-semibold text-white block mt-2 mb-1">Serviço:</strong>
                  Tráfego pago + Gestão de rede social
                  <strong className="font-semibold text-white block mt-2 mb-1">Objetivo:</strong>
                  Escalar geração de leads altamente qualificados.
                </div>
              </div>

              {/* Deliverables List */}
              <div className="flex-grow space-y-4">
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block font-mono">O que inclui:</span>
                <ul className="space-y-3 text-slate-200 text-xs font-light leading-relaxed">
                  {[
                    "CAMPANHAS NO META ADS (FACEBOOK & INSTAGRAM)",
                    "CAMPANHAS NO GOOGLE ADS (PESQUISA, DISPLAY & YOUTUBE)",
                    "REMARKETING AVANÇADO DE TODO O FUNIL",
                    "ESTRUTURAÇÃO COMPLETA DE FUNIL DE CONVERSÃO",
                    "LANDING PAGE PROFISSIONAL DE ALTA CONVERSÃO (1 PÁGINA)",
                    "ATÉ 15 CRIATIVOS MENSAIS EXCLUSIVOS E OTIMIZADOS",
                    "INTEGRAÇÃO COM SISTEMA CRM DO SEU COMERCIAL",
                    "REUNIÃO QUINZENAL DE DESEMPENHO E ALINHAMENTO",
                    "🎁 EXCLUSIVO: 1 CAPTAÇÃO DE VÍDEO GRATIS",
                    "🎁 EXCLUSIVO: +1 LINK DE BIO (SITE RÁPIDO PROFISSIONAL)"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className={feat.startsWith("🎁") ? "font-semibold text-emerald-300" : ""}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price / Investment Section (at the end, below list) */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-[9px] uppercase font-bold text-blue-300 font-mono tracking-wider block">Investimento</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-sm font-medium text-blue-300 mr-1">R$</span>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">3.500,00</span>
                  <span className="text-blue-300 text-xs font-mono ml-2">/mês</span>
                </div>
              </div>

              {/* Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href={`https://wa.me/5587996475257?text=${encodeURIComponent("Olá! Tenho interesse no Plano Performance da Ijato Clean de R$ 3.500,00/mês para tráfego pago.")}`}
                  className="w-full text-center inline-flex items-center justify-center bg-[#185FA5] hover:bg-blue-600 text-white font-extrabold text-xs py-4 px-6 rounded-2xl transition-all duration-300 shadow-md shadow-blue-500/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  Fechar Plano Performance <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Advertisements Budget Note */}
          <motion.div 
            variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="mt-12 p-6 bg-blue-50/60 border border-blue-100 text-[#185FA5] rounded-[1.8rem] flex flex-col sm:flex-row items-start gap-4 text-left max-w-4xl mx-auto shadow-sm"
          >
            <AlertCircle className="w-5 h-5 text-[#185FA5] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-extrabold text-[#0D1F4C] text-sm mb-1.5">Investimento em Anúncios (Verba de Tráfego)</h5>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                A verba investida nos anúncios (por exemplo, R$ 1.000 a R$ 3.000/mês) é configurada e paga diretamente pela <strong>Ijato Clean</strong> ao Meta/Google Ads, sendo totalmente independente do valor cobrado pela gestão das campanhas de tráfego pago.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION: RESULTADOS (DÚVIDAS) ─── */}
      <section id="resultados" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5] animate-pulse" />
              <span className="text-[#185FA5] font-bold text-[10px] uppercase tracking-widest font-mono">Resultados</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-[#0D1F4C] leading-tight">
              Ainda com<br />dúvidas?
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Esse é o resultado de apenas um de nossos clientes
            </p>
          </motion.div>

          <motion.div 
            variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-full max-w-[380px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(13,31,76,0.12)] border border-slate-100 bg-slate-50">
              <img 
                src="https://i.ibb.co/tMC5BzZj/image.png" 
                alt="Resultado de Cliente" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 5: MÉTODO DE TRABALHO ─── */}
      <section id="metodo" className="py-24 px-6 bg-[#F8F9FB] border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4 shadow-sm">
              <span className="text-[#185FA5] font-bold text-[10px] uppercase tracking-widest font-mono">Processo de Excelência</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight text-[#0D1F4C]">
              Como funciona o nosso fluxo de produção de Tráfego Pago
            </h2>
            <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed font-light">
              Garantimos um processo leve, profissional e altamente previsível para você. Você acompanha tudo, aprova antes de ir ao ar e não perde tempo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              {
                step: "01",
                title: "Briefing & Estudo do Público",
                desc: "Analisamos a fundo a Ijato Clean: as regiões de maior interesse (cidades e bairros nobres), o perfil do cliente ideal (residencial, comercial ou industrial) e os diferenciais técnicos."
              },
              {
                step: "02",
                title: "Planejamento de Campanhas & Roteiros",
                desc: "Mapeamos as palavras-chave com maior volume de buscas no Google, definimos as segmentações de público no Meta e escrevemos os roteiros magnéticos de criativos focados em transformação visível e higiene."
              },
              {
                step: "03",
                title: "Design de Criativos & Landing Page",
                desc: "Desenvolvemos os criativos visuais dos anúncios de alto padrão gráfico, redigimos as copys (textos) altamente persuasivas e preparamos a Landing Page de alta conversão para os leads solicitarem orçamentos rápidos."
              },
              {
                step: "04",
                title: "Aprovação, Lançamento & Otimização",
                desc: "Após a sua aprovação de criativos e copys, colocamos as campanhas no ar e iniciamos o monitoramento diário para controlar o custo por lead (CPL) e maximizar o retorno do investimento (ROI)."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-[0_10px_30px_rgba(13,31,76,0.02)] hover:border-slate-200 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 text-[#185FA5] flex items-center justify-center font-black font-mono text-sm sm:text-base shrink-0 shadow-sm border border-blue-100/50">
                    {item.step}
                  </span>
                  <div className="flex-grow">
                    <h4 className="font-extrabold text-[#0D1F4C] text-base sm:text-lg mb-2 leading-tight">{item.title}</h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Peace of Mind Box */}
          <div className="mt-8 p-5 bg-blue-50/60 border border-blue-100 text-[#185FA5] rounded-2xl flex items-start gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-[#185FA5] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-[#0D1F4C] text-sm mb-1">Total tranquilidade e controle</h5>
              <p className="text-slate-600 text-xs leading-relaxed font-light">
                Nenhum anúncio é colocado no ar sem a sua aprovação prévia. Você tem o controle absoluto de tudo o que representa a sua marca Ijato Clean nos anúncios patrocinados, sem se preocupar com aspectos técnicos complexos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: CRONOGRAMA ─── */}
      <section id="prazos" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5] animate-pulse" />
              <span className="text-[#185FA5] font-bold text-[10px] uppercase tracking-widest font-mono font-bold">Início Imediato</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-[#0D1F4C]">
              Da aprovação ao funil de leads rodando
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Somos extremamente ágeis. O planejamento das campanhas começa no mesmo dia e o funil de leads é ativado em tempo recorde.
            </p>
          </motion.div>

          <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-100 space-y-12 text-left max-w-2xl mx-auto">
            {[
              {
                day: "Dia 1",
                title: "Kick-off Imediato & Setup de Contas",
                highlight: true,
                items: [
                  "Reunião de kick-off para compartilhamento de acessos do gerenciador de anúncios",
                  "Instabio (página de links profissional de brinde) desenvolvida e no ar em até 24h",
                  "Início da análise técnica e mapeamento da concorrência local de higienização de estofados"
                ]
              },
              {
                day: "Dia 2",
                title: "Estratégia de Campanhas & Roteiros",
                highlight: false,
                items: [
                  "Definição de públicos segmentados e mapeamento de palavras-chave no Google",
                  "Roteiros para vídeos criativos focados no WhatsApp entregues",
                  "Estruturação das copys persuasivas para os anúncios de higienização"
                ]
              },
              {
                day: "Dia 3",
                title: "Design de Anúncios & Landing Page",
                highlight: false,
                items: [
                  "Desenvolvimento dos layouts premium para os anúncios do feed e stories",
                  "Configuração técnica da Landing Page de captação de leads",
                  "Apresentação de todo o material para sua aprovação rápida"
                ]
              },
              {
                day: "Dia 4",
                title: "Campanhas no Ar & Primeiros Leads",
                highlight: false,
                items: [
                  "Ativação oficial dos anúncios patrocinados no Google Ads e Meta Ads",
                  "Início do recebimento de leads qualificados direto no WhatsApp comercial da Ijato Clean",
                  "Monitoramento inicial intensivo para controle e redução do Custo por Lead (CPL)"
                ]
              },
              {
                day: "Dia 30",
                title: "Análise de ROI & Otimização",
                highlight: true,
                items: [
                  "Relatório completo contendo impressões, cliques, leads gerados e custo de aquisição",
                  "Análise técnica de conversão das oportunidades junto ao comercial da Ijato Clean",
                  "Otimização das campanhas vencedoras e escalabilidade da verba de anúncios"
                ]
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className={`absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-colors duration-300 ${step.highlight ? 'bg-[#0D1F4C] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {idx + 1}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${step.highlight ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-slate-50 text-slate-500'}`}>
                    {step.day}
                  </span>
                  <h3 className="font-extrabold text-[#0D1F4C] text-xl tracking-tight">{step.title}</h3>
                </div>
                <ul className="space-y-2 pl-4 border-l-2 border-slate-50">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-500 text-sm font-light">
                      <span className="w-1.5 h-1.5 bg-[#185FA5] rounded-full mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0A183C] text-blue-300/50 py-10 px-6 border-t border-white/5 text-center text-xs font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p>© 2026 FX Digital Solutions. Todos os direitos reservados de autoridade intelectual.</p>
          <div className="flex gap-4">
            <a href="https://instagram.com/fx.digitalsolutions" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <span>·</span>
            <a href="#diagnostico" className="hover:text-white transition-colors text-blue-300">Retornar ao Diagnóstico</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
