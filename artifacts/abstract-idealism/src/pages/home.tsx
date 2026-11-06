import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TABS, type Block, type TabContent } from "@/content/tabs";

const ease = [0.22, 1, 0.36, 1] as const;

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[hsl(268_90%_84%)]">{p.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function Starfield() {
  const stars = useMemo(() => {
    let seed = 7;
    const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    return Array.from({ length: 90 }, () => ({
      x: r() * 100, y: r() * 100, s: r() * 1.6 + 0.4, o: r() * 0.6 + 0.15, d: 3 + r() * 6, delay: r() * 6,
    }));
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(268_60%_22%/.55),transparent_70%)]" />
      <div className="absolute -right-40 top-[30vh] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,hsl(250_50%_30%/.18),transparent_65%)]" />
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s,
          ["--o" as string]: s.o, ["--d" as string]: `${s.d}s`, ["--delay" as string]: `${s.delay}s` }} />
      ))}
      <svg className="orbit absolute left-1/2 top-[-30vh] h-[110vh] w-[110vh] -translate-x-1/2 opacity-[.13]" viewBox="0 0 200 200" fill="none" stroke="hsl(268 85% 78%)" strokeWidth=".15">
        <circle cx="100" cy="100" r="98" />
        <circle cx="100" cy="100" r="74" strokeDasharray="1 2" />
        <circle cx="100" cy="100" r="50" />
        <path d="M100 2 L185 149 L15 149 Z" />
        <path d="M100 198 L15 51 L185 51 Z" strokeDasharray="0.6 1.4" />
        <circle cx="100" cy="2" r="1.2" fill="hsl(268 85% 78%)" />
        <circle cx="185" cy="149" r="1" fill="hsl(268 85% 78%)" />
      </svg>
    </div>
  );
}

function SectionHead({ index, children }: { index: string; children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }} className="mb-8 flex items-baseline gap-4">
      <span className="font-mono text-xs tracking-[0.2em] text-primary">{index}</span>
      <h2 className="font-serif text-2xl font-normal italic leading-tight text-foreground sm:text-3xl">{children}</h2>
      <span className="ml-2 hidden h-px flex-1 translate-y-[-6px] bg-gradient-to-r from-border to-transparent sm:block" />
    </motion.div>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) =>
        b.kind === "p" ? (
          <p key={i}><Rich text={b.text} /></p>
        ) : (
          <ul key={i} className="space-y-5">
            {b.items.map((it, j) => (
              <li key={j} className="relative pl-6">
                <span aria-hidden className="absolute left-0 top-[0.7em] h-[5px] w-[5px] rotate-45 border border-primary" />
                <Rich text={it.text} />
                {it.sub && (
                  <ol className="mt-4 space-y-3 border-l border-primary/30 pl-5">
                    {it.sub.map((s, k) => (
                      <li key={k} className="flex gap-3">
                        <span className="font-mono text-xs leading-[1.9rem] text-primary">{k + 1}.</span>
                        <span><Rich text={s} /></span>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

function ComparisonTable({ tab }: { tab: TabContent }) {
  const [, a, b] = tab.columns;
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-card/60 backdrop-blur-sm" data-testid={`table-${tab.id}`}>
      <table className="w-full border-collapse text-left">
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-border">
            {tab.columns.map((c, i) => (
              <th key={c} scope="col" className={`px-5 py-4 align-bottom font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] ${i === 2 ? "text-primary" : "text-muted-foreground"} ${i === 0 ? "w-[22%]" : "w-[39%]"}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tab.rows.map(([dim, x, y], i) => (
            <motion.tr key={dim} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: i * 0.07, ease }}
              className="group block border-b border-border/70 last:border-b-0 transition-colors duration-300 hover:bg-[hsl(268_40%_14%/.45)] md:table-row">
              <th scope="row" className="block px-5 pb-2 pt-5 align-top font-serif text-lg font-medium leading-snug text-foreground md:table-cell md:py-5 md:text-base">
                <span className="mr-2 font-mono text-[0.65rem] text-muted-foreground transition-colors group-hover:text-primary">{String(i + 1).padStart(2, "0")}</span>
                {dim}
              </th>
              <td className="block px-5 py-2 align-top text-[0.98rem] leading-relaxed text-foreground/75 md:table-cell md:py-5">
                <span className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground md:hidden">{a}</span>
                <Rich text={x} />
              </td>
              <td className="block px-5 pb-5 pt-2 align-top text-[0.98rem] leading-relaxed text-foreground md:table-cell md:border-l md:border-primary/20 md:py-5">
                <span className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary md:hidden">{b}</span>
                <Rich text={y} />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TabBody({ tab }: { tab: TabContent }) {
  return (
    <div className="space-y-20">
      <section className="space-y-6">
        {tab.intro.map((p, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
            className={i === 0 ? "font-serif text-[1.35rem] font-light leading-[1.6] text-foreground sm:text-[1.55rem] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-primary" : ""}>
            <Rich text={p} />
          </motion.p>
        ))}
      </section>

      <section>
        <SectionHead index="I">{tab.tableTitle}</SectionHead>
        <ComparisonTable tab={tab} />
      </section>

      <section>
        <SectionHead index="II">{tab.divergenceTitle}</SectionHead>
        <div className="space-y-14">
          {tab.divergences.map((d, i) => (
            <motion.article key={d.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }}
              className="group grid gap-4 md:grid-cols-[4.5rem_1fr]">
              <div className="font-serif text-5xl font-light leading-none text-primary/40 transition-colors duration-500 group-hover:text-primary">{i + 1}.</div>
              <div>
                <h3 className="mb-4 font-serif text-xl font-medium leading-snug text-foreground sm:text-[1.4rem]">{d.title}</h3>
                <Blocks blocks={d.blocks} />
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}

const hashFor = (i: number) => (i === 1 ? "#matrix" : "#abstract");
const indexFromHash = () => (typeof window !== "undefined" && window.location.hash === "#matrix" ? 1 : 0);

export default function Home() {
  const [active, setActive] = useState(indexFromHash);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onHash = () => setActive(indexFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const select = (i: number) => {
    setActive(i);
    history.replaceState(null, "", hashFor(i));
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };

  const tab = TABS[active];

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <Starfield />
      <main className="relative mx-auto max-w-[56rem] px-5 pb-24 pt-20 sm:px-8 sm:pt-28">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
          aria-hidden className="mb-6 text-center font-mono text-[0.65rem] tracking-[0.4em] text-muted-foreground">
          ∀x · ∃R · (x ⊨ R)
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20, letterSpacing: "0.08em" }} animate={{ opacity: 1, y: 0, letterSpacing: "-0.02em" }}
          transition={{ duration: 1.4, ease }} data-testid="text-title"
          className="text-center font-serif text-[3.2rem] font-light leading-[0.95] text-foreground sm:text-[5.5rem]">
          Abstract <em className="font-normal italic text-primary">Idealism</em>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease }}
          role="tablist" aria-label="Constructs" onKeyDown={onKey}
          className="sticky top-0 z-20 mx-auto mt-12 grid max-w-xl grid-cols-2 border-b border-border bg-background/70 backdrop-blur-md">
          {TABS.map((t, i) => {
            const selected = i === active;
            return (
              <button key={t.id} ref={(el) => { refs.current[i] = el; }} role="tab" id={`tab-${t.id}`}
                aria-selected={selected} aria-controls={`panel-${t.id}`} tabIndex={selected ? 0 : -1}
                onClick={() => select(i)} data-testid={`tab-${t.id}`}
                className={`relative px-2 py-4 text-center outline-none transition-colors duration-300 focus-visible:bg-accent/40 ${selected ? "text-foreground" : "text-muted-foreground hover:text-foreground/90"}`}>
                <span className="block font-mono text-[0.6rem] tracking-[0.25em] text-primary/80">{i === 0 ? "0 1" : "1 0"}</span>
                <span className="mt-1 block font-serif text-base sm:text-lg">{t.label}</span>
                {selected && (
                  <motion.span layoutId="tab-indicator" transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    className="absolute inset-x-3 -bottom-px h-[2px] bg-primary">
                    <span className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary" />
                  </motion.span>
                )}
              </button>
            );
          })}
        </motion.div>

        <div className="mt-16 text-[1.12rem] leading-[1.8] text-foreground/85 sm:text-[1.2rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} tabIndex={0}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }} className="outline-none" data-testid={`panel-${tab.id}`}>
              <TabBody tab={tab} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <footer className="relative border-t border-border/60 py-10 text-center font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground">
        ABSTRACT IDEALISM
      </footer>
    </div>
  );
}
