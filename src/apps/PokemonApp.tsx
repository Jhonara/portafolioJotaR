import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Heart, Shield, Swords, Trophy, Zap } from "lucide-react";

const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Teselia", "Kalos", "Alola", "Galar", "Paldea"];
const team = [
  { name: "Pikachu", type: "ELÉCTRICO", emoji: "⚡", hp: 100, color: "from-yellow-300/30" },
  { name: "Charizard", type: "FUEGO / VOLADOR", emoji: "🔥", hp: 100, color: "from-orange-400/30" },
  { name: "Gengar", type: "FANTASMA / VENENO", emoji: "👻", hp: 100, color: "from-violet-400/30" },
  { name: "Lucario", type: "LUCHA / ACERO", emoji: "✦", hp: 100, color: "from-cyan-400/30" },
];

const PokemonApp = () => {
  const [battle, setBattle] = useState(false);
  const [playerHp, setPlayerHp] = useState(100);
  const [rivalHp, setRivalHp] = useState(100);
  const [message, setMessage] = useState("El campeón te espera en la arena.");
  const [won, setWon] = useState(false);

  const attack = () => {
    if (won || playerHp <= 0) return;
    const playerDamage = 18 + Math.floor(Math.random() * 14);
    const rivalDamage = 10 + Math.floor(Math.random() * 12);
    const nextRival = Math.max(0, rivalHp - playerDamage);
    const nextPlayer = Math.max(0, playerHp - rivalDamage);
    setRivalHp(nextRival); setPlayerHp(nextPlayer);
    if (nextRival === 0) { setWon(true); setMessage("¡Victoria! El título de campeón sigue siendo tuyo."); }
    else if (nextPlayer === 0) setMessage("Tu Pokémon cayó. La revancha te espera.");
    else setMessage(`Impacto crítico: -${playerDamage} HP. El rival responde con -${rivalDamage} HP.`);
  };

  if (battle) return <div className="text-white">
    <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-cyan-300">// champion_battle.exe</p><h2 className="text-2xl font-bold">Liga JotaR · Arena final</h2></div><button onClick={() => setBattle(false)} className="rounded-lg border border-white/15 px-3 py-2 text-xs text-white/60 hover:border-cyan-300">Volver al perfil</button></div>
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-950/70 via-slate-950 to-cyan-950/70 p-5">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.3) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="relative grid gap-5 md:grid-cols-2"><BattleCard name="Jhonatan" pokemon="Pikachu" hp={playerHp} emoji="⚡" /><BattleCard name="Rival IA" pokemon="Mewtwo" hp={rivalHp} emoji="☄️" enemy /></div>
      <p className="relative mt-5 rounded-lg bg-black/30 p-3 text-center font-mono text-sm text-cyan-100">{message}</p>
      <div className="relative mt-4 flex justify-center gap-3"><button onClick={attack} disabled={won || playerHp <= 0} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"><Swords size={17} /> {won ? "CAMPEÓN" : "Impactrueno"}</button><button onClick={() => { setPlayerHp(100); setRivalHp(100); setWon(false); setMessage("El campeón te espera en la arena."); }} className="rounded-xl border border-white/15 px-5 py-3 text-sm text-white/70 hover:border-white/40">Reiniciar</button></div>
    </div>
  </div>;

  return <div className="text-white"><div className="grid gap-5 lg:grid-cols-[220px_1fr]"><motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} className="relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-slate-950 p-4 text-center"><div className="absolute inset-0 bg-[url('/images/trainer-avatar.png')] bg-cover bg-center opacity-35" /><div className="relative"><div className="mx-auto h-32 w-32 rounded-full border-2 border-cyan-300/70 bg-[url('/images/trainer-avatar.png')] bg-cover bg-center shadow-[0_0_35px_rgba(34,211,238,.38)]" /><p className="mt-4 text-lg font-bold">Jhonatan</p><p className="font-mono text-xs text-cyan-300">TRAINER LV. 99</p><div className="mt-5 flex items-center justify-center gap-1 text-amber-300"><Crown size={16} /> CAMPEÓN ABSOLUTO</div></div></motion.div>
    <div><p className="font-mono text-sm text-cyan-300">// trainer_profile</p><h2 className="mt-1 text-3xl font-bold">Jhonatan · Maestro Pokémon</h2><p className="mt-2 text-white/60">Una aventura completa, nueve regiones conquistadas y una colección que sigue creciendo.</p><div className="mt-5 flex flex-wrap gap-2">{regions.map((region) => <span key={region} className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">🏆 {region}</span>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-3"><Stat icon={<Trophy size={18} />} label="Regiones" value="09 / 09" /><Stat icon={<Heart size={18} />} label="Atrapados" value="386" /><Stat icon={<Shield size={18} />} label="Medallas" value="72" /></div></div></div>
    <div className="mt-7"><div className="flex items-center justify-between"><h3 className="text-xl font-bold">Equipo campeón</h3><span className="font-mono text-xs text-white/40">4 / 6 slots</span></div><div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{team.map((pokemon, index) => <motion.div key={pokemon.name} whileHover={{ y: -5 }} className={`rounded-xl border border-white/10 bg-gradient-to-br ${pokemon.color} to-slate-950 p-4`}><div className="flex items-center justify-between"><span className="text-4xl">{pokemon.emoji}</span><span className="font-mono text-xs text-white/50">#{25 + index * 6}</span></div><p className="mt-4 font-bold">{pokemon.name}</p><p className="text-xs text-cyan-200/70">{pokemon.type}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/40"><div className="h-full w-[92%] rounded-full bg-emerald-400" /></div></motion.div>)}</div></div>
    <button onClick={() => setBattle(true)} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-bold text-white shadow-[0_0_30px_rgba(139,92,246,.25)] transition hover:scale-[1.02]"><Zap size={18} /> Retar al campeón</button>
  </div>;
};

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => <div className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="flex items-center gap-2 text-cyan-300">{icon}<span className="text-xs text-white/50">{label}</span></div><p className="mt-2 font-mono text-xl font-bold">{value}</p></div>;
const BattleCard = ({ name, pokemon, hp, emoji, enemy = false }: { name: string; pokemon: string; hp: number; emoji: string; enemy?: boolean }) => <div className={`rounded-xl border p-4 ${enemy ? "border-violet-400/30 bg-violet-400/10" : "border-cyan-400/30 bg-cyan-400/10"}`}><div className="flex items-center justify-between"><div><p className="text-xs text-white/50">{name}</p><p className="font-bold">{pokemon}</p></div><span className="text-5xl">{emoji}</span></div><div className="mt-5 flex items-center justify-between text-xs"><span>HP</span><span>{hp} / 100</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-black/40"><motion.div animate={{ width: `${hp}%` }} className={`h-full rounded-full ${hp > 35 ? "bg-emerald-400" : "bg-red-400"}`} /></div></div>;

export default PokemonApp;
