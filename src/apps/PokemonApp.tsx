import { useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Crown, Medal, Swords, X, Zap } from "lucide-react";

const team = [{ name: "Umbreon", id: 197, type: "SINIESTRO" }, { name: "Crobat", id: 169, type: "VENENO / VOLADOR" }, { name: "Swampert", id: 260, type: "AGUA / TIERRA" }, { name: "Mawile", id: 303, type: "ACERO / HADA" }, { name: "Pawmot", id: 923, type: "ELECTRICO / LUCHA" }, { name: "Ceruledge", id: 937, type: "FUEGO / FANTASMA" }];
const challengers = [{ name: "Pikachu", id: 25, type: "ELECTRICO" }, { name: "Charizard", id: 6, type: "FUEGO / VOLADOR" }, { name: "Lucario", id: 448, type: "LUCHA / ACERO" }, { name: "Gengar", id: 94, type: "FANTASMA" }, { name: "Greninja", id: 658, type: "AGUA / SINIESTRO" }, { name: "Mewtwo", id: 150, type: "PSIQUICO" }];
const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Teselia", "Kalos", "Alola", "Galar", "Paldea"];
const image = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export default function PokemonApp() {
  const [chooser, setChooser] = useState(false); const [opponent, setOpponent] = useState<(typeof challengers)[number] | null>(null); const [champion, setChampion] = useState(team[0]); const [playerHp, setPlayerHp] = useState(100); const [championHp, setChampionHp] = useState(100); const [finished, setFinished] = useState<"won" | "lost" | null>(null); const [message, setMessage] = useState(""); const [certificates, setCertificates] = useState(false); const [region, setRegion] = useState("Paldea");
  //const start = (p: (typeof challengers)[number]) => { setOpponent(p); setChampion(team[Math.floor(Math.random() * team.length)]); setPlayerHp(100); setChampionHp(100); setWonChance(Math.random() < .05); setFinished(null); setMessage("¡El combate ha comenzado!"); setChooser(false); };
  const start = (p: (typeof challengers)[number]) => {
    setOpponent(p);
    setChampion(team[Math.floor(Math.random() * team.length)]);
    setPlayerHp(100);
    setChampionHp(100);
    setFinished(null);
    setMessage("¡El combate ha comenzado!");
    setChooser(false);
  };
  //const attack = () => { if (!opponent || finished) return; const damage = 6 + Math.floor(Math.random() * 13); const reply = 14 + Math.floor(Math.random() * 12); const nextChampion = wonChance ? Math.max(0, championHp - damage) : Math.max(1, championHp - damage); const nextPlayer = Math.max(0, playerHp - reply); setChampionHp(nextChampion); setPlayerHp(nextPlayer); if (nextChampion === 0) { setFinished("won"); setMessage("Has logrado la hazana: venciste al campeon."); } else if (nextPlayer === 0) { setFinished("lost"); setMessage("El campeon Jhonara defendio su titulo."); } else setMessage(`Ataque -${damage} HP. Respuesta del campeon -${reply} HP.`); };
  const attack = () => {
    if (!opponent || finished) return;

    // Daño normal del retador
    let damage = 6 + Math.floor(Math.random() * 6); // 6-11

    // 10% de crítico
    const critical = Math.random() < 0.14;

    if (critical) {
      damage += 35 + Math.floor(Math.random() * 12); // +35 a +54
    }

    // El campeón pega fuerte
    const reply = 16 + Math.floor(Math.random() * 12); //16-27

    const nextChampion = Math.max(0, championHp - damage);
    const nextPlayer = Math.max(0, playerHp - reply);


    setChampionHp(nextChampion);
    setPlayerHp(nextPlayer);

        if (nextChampion <= 0 && nextPlayer <= 0) {
      setFinished("lost"); // el campeón conserva el título

      setMessage(
        "⚔️ ¡Ambos Pokémon cayeron al mismo tiempo!\n\n👑 El Campeón Jhonara reconoce tu fuerza.\n\n🤝 El combate terminó en empate."
      );

      return;
    }

    // El campeón murió
    if (nextChampion <= 0) {
      setFinished("won");

      if (critical) {
        setMessage(
          `💥 ¡GOLPE CRÍTICO! (${damage} de daño) ¡Has derrotado al Campeón Jhonara!`
        );
      } else {
        setMessage("🏆 ¡Has derrotado al Campeón Jhonara!");
      }

      return;
    }


    // El jugador murió
    if (nextPlayer <= 0) {
      setFinished("lost");
      setMessage("👑 El Campeón Jhonara defendió su título.");
      return;
    }


    if (critical) {
      setMessage(
        `💥 ¡Golpe crítico! Hiciste ${damage} de daño. El campeón respondió con ${reply}.`
      );
    } else {
      setMessage(
        `Hiciste ${damage} de daño. El campeón respondió con ${reply}.`
      );
    }

  };

  const reset = () => { setOpponent(null); setFinished(null); setChooser(false); };
  return <div className="text-white"><div className="grid gap-5 lg:grid-cols-[220px_1fr]"><aside className="rounded-2xl border border-cyan-300/30 bg-slate-950 p-4 text-center"><div className="mx-auto h-32 w-32 rounded-full border-2 border-cyan-300/70 bg-[url('/images/trainer-avatar.png')] bg-cover bg-center" /><p className="mt-4 text-lg font-bold">Jhonara</p><p className="font-mono text-xs text-cyan-300">CHAMPION LV. 99</p><p className="mt-4 flex items-center justify-center gap-1 text-amber-300"><Crown size={16} /> CAMPEON ABSOLUTO</p></aside><section><p className="font-mono text-sm text-cyan-300">// TRAINER PROFILE</p><h2 className="mt-1 text-3xl font-bold">Jhonara · Maestro Pokemon</h2><p className="mt-2 text-white/60">Nueve regiones conquistadas y un equipo preparado para cada aventura.</p><div className="mt-5 flex flex-wrap gap-2">{regions.map((r) => <span key={r} className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">{r}</span>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-3"><Stat label="Regiones" value="09 / 09" /><Stat label="Atrapados" value="386" /><Stat label="Medallas" value="72" /></div><button onClick={() => setCertificates(true)} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-amber-300/35 bg-amber-300/10 px-4 py-2 text-sm text-amber-100"><Medal size={17} /> Diplomas</button></section></div><h3 className="mt-7 text-xl font-bold">Equipo campeon</h3><div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{team.map((p) => <motion.div key={p.name} whileHover={{ y: -5 }} className="rounded-xl border border-white/10 bg-gradient-to-br from-violet-400/20 to-slate-950 p-4"><img src={image(p.id)} alt={p.name} className="mx-auto h-24 w-24 object-contain" /><p className="font-bold">{p.name}</p><p className="text-xs text-cyan-200/70">{p.type}</p></motion.div>)}</div><button onClick={() => setChooser(true)} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-bold"><Zap size={18} /> Retar al campeon</button>{chooser && <Chooser onPick={start} onClose={() => setChooser(false)} />}{opponent && <Battle opponent={opponent} champion={champion} playerHp={playerHp} championHp={championHp} finished={finished} message={message} onAttack={attack} onReset={reset} />}{certificates && <Certificate region={region} setRegion={setRegion} onClose={() => setCertificates(false)} />}</div>;
}
const Stat = ({ label, value }: { label: string; value: string }) => <div className="rounded-xl border border-white/10 bg-white/5 p-3"><span className="text-xs text-white/50">{label}</span><p className="mt-2 font-mono text-xl font-bold">{value}</p></div>;
const Chooser = ({ onPick, onClose }: { onPick: (p: (typeof challengers)[number]) => void; onClose: () => void }) => createPortal(<div className="fixed inset-0 z-[999] grid place-items-center bg-slate-950/85 p-4 backdrop-blur-md"><motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl rounded-2xl border border-cyan-300/30 bg-[#0b1220] p-5 shadow-[0_0_80px_rgba(34,211,238,.25)]"><div className="flex items-center justify-between"><div><p className="font-mono text-xs text-cyan-300">// RETO AL CAMPEON</p><h3 className="text-xl font-bold">Elige tu Pokemon</h3></div><button onClick={onClose}><X size={18} /></button></div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{challengers.map((p) => <button key={p.name} onClick={() => onPick(p)} className="rounded-xl border border-white/10 bg-white/5 p-3 text-left hover:border-cyan-300/60"><img src={image(p.id)} alt={p.name} className="mx-auto h-24 w-24 object-contain" /><p className="font-bold">{p.name}</p><p className="text-xs text-white/45">{p.type}</p></button>)}</div></motion.div></div>, document.body);
const Hp = ({ value }: { value: number }) => <div className="mt-3"><div className="flex justify-between text-xs text-white/55"><span>HP</span><span>{value} / 100</span></div><div className="mt-1 h-3 overflow-hidden rounded-full bg-black/50"><motion.div animate={{ width: `${value}%` }} className={`h-full rounded-full ${value > 35 ? "bg-emerald-400" : "bg-red-400"}`} /></div></div>;
const Battle = ({ opponent, champion, playerHp, championHp, finished, message, onAttack, onReset }: { opponent: (typeof challengers)[number]; champion: (typeof team)[number]; playerHp: number; championHp: number; finished: "won" | "lost" | null; message: string; onAttack: () => void; onReset: () => void }) => createPortal(<div className="fixed inset-0 z-[999] grid place-items-center bg-slate-950/90 p-4 backdrop-blur-md"><motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-4xl rounded-2xl border border-violet-300/35 bg-gradient-to-br from-violet-950 to-cyan-950 p-5 shadow-[0_0_80px_rgba(34,211,238,.2)]"><div className="flex items-center justify-between"><div><p className="font-mono text-xs text-cyan-300">// ARENA DE BATALLA</p><h3 className="text-2xl font-bold">Reto al campeon</h3></div><button onClick={onReset}><X size={20} /></button></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Card label="Tu Pokemon" p={opponent} hp={playerHp} /><Card label="Campeon Jhonara" p={champion} hp={championHp} /></div><p className="mt-4 rounded-lg bg-black/35 p-3 text-center font-mono text-sm text-cyan-100">{message}</p>{finished ? <div className="relative mt-4 text-center">{finished === "won" && <Confetti />}<p className="text-3xl">{finished === "won" ? "🏆" : "⚔️"}</p><p className="mt-2 text-xl font-bold">{finished === "won" ? "¡Ganaste al campeon!" : "El campeon conserva su titulo"}</p><button onClick={onReset} className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950">Elegir otro Pokemon</button></div> : <button onClick={onAttack} className="mx-auto mt-5 flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950"><Swords size={18} /> Atacar</button>}</motion.div></div>, document.body);
const Card = ({ label, p, hp }: { label: string; p: { name: string; id: number; type: string }; hp: number }) => <div className="rounded-xl border border-white/15 bg-black/20 p-4"><div className="flex items-center justify-between"><div><p className="text-xs text-white/50">{label}</p><p className="font-bold">{p.name}</p><p className="text-xs text-cyan-200/70">{p.type}</p></div><img src={image(p.id)} alt={p.name} className="h-28 w-28 object-contain" /></div><Hp value={hp} /></div>;
const Confetti = () => <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">{Array.from({ length: 45 }, (_, i) => <motion.i key={i} initial={{ y: -20, x: `${(i * 31) % 100}%` }} animate={{ y: "110vh", rotate: 720 }} transition={{ duration: 2.2, delay: (i % 9) * .08 }} className="absolute h-3 w-2 rounded-sm bg-gradient-to-b from-cyan-300 to-fuchsia-500" />)}</div>;
const Certificate = ({ region, setRegion, onClose }: { region: string; setRegion: (r: string) => void; onClose: () => void }) => <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/80 p-4"><div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-[#111827] p-5"><button onClick={onClose} className="absolute right-4 top-4"><X size={18} /></button><h3 className="text-xl font-bold">Diplomas por region</h3><div className="mt-4 flex flex-wrap gap-2">{regions.map((r) => <button key={r} onClick={() => setRegion(r)} className="rounded-lg border border-white/15 px-3 py-2 text-xs">{r}</button>)}</div>{region === "Paldea" ? <img src="/images/paldea-diploma.png" alt="Diploma Paldea" className="mt-5 w-full rounded-xl" /> : <p className="mt-6 text-center text-white/50">Diploma pendiente de subir.</p>}</div></div>;
