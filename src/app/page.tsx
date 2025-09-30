"use client";
import { useState } from "react";

type Deal = {
  player: { name: string; ovr: number; league: string; position: string };
  buy: number; sell: number; profit: number; marginPct: number;
  source: string; platform: string;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [form, setForm] = useState({
    platform: "ps",
    budget: 100000,
    ovrMin: 0,
    ovrMax: 99,
    binMin: 150,
    binMax: 60000,
    minMarginPct: 3
  });

  const run = async () => {
    setLoading(true);
    const qs = new URLSearchParams(
      Object.entries(form).map(([k,v]) => [k, String(v)])
    );
    const res = await fetch(`/api/deals?${qs.toString()}`);
    const json = await res.json();
    setDeals(json.deals);
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="container">
        <h1 className="text-2xl font-semibold mb-4">ÜV-Listen-Generator</h1>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
          <div>
            <label className="text-sm">Plattform</label>
            <select className="w-full bg-neutral-800 p-2 rounded"
              value={form.platform}
              onChange={e=>setForm(f=>({...f, platform: e.target.value}))}>
              <option value="ps">PlayStation</option>
              <option value="xbox">Xbox</option>
              <option value="pc">PC</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Budget (Coins)</label>
            <input className="w-full bg-neutral-800 p-2 rounded" type="number"
              value={form.budget} onChange={e=>setForm(f=>({...f, budget:+e.target.value}))}/>
          </div>
          <div>
            <label className="text-sm">OVR min</label>
            <input className="w-full bg-neutral-800 p-2 rounded" type="number"
              value={form.ovrMin} onChange={e=>setForm(f=>({...f, ovrMin:+e.target.value}))}/>
          </div>
          <div>
            <label className="text-sm">OVR max</label>
            <input className="w-full bg-neutral-800 p-2 rounded" type="number"
              value={form.ovrMax} onChange={e=>setForm(f=>({...f, ovrMax:+e.target.value}))}/>
          </div>
          <div>
            <label className="text-sm">BIN min</label>
            <input className="w-full bg-neutral-800 p-2 rounded" type="number"
              value={form.binMin} onChange={e=>setForm(f=>({...f, binMin:+e.target.value}))}/>
          </div>
          <div>
            <label className="text-sm">BIN max</label>
            <input className="w-full bg-neutral-800 p-2 rounded" type="number"
              value={form.binMax} onChange={e=>setForm(f=>({...f, binMax:+e.target.value}))}/>
          </div>
          <div>
            <label className="text-sm">Min-Marge %</label>
            <input className="w-full bg-neutral-800 p-2 rounded" type="number"
              value={form.minMarginPct} onChange={e=>setForm(f=>({...f, minMarginPct:+e.target.value}))}/>
          </div>
          <button onClick={run}
            className="col-span-2 md:col-span-1 bg-emerald-600 hover:bg-emerald-500 rounded p-2">
            {loading ? "Berechne..." : "Erstellen"}
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-neutral-300">
              <tr className="text-left">
                <th className="py-2">Spieler</th>
                <th>POS</th>
                <th>OVR</th>
                <th>Quelle</th>
                <th>Kaufpreis</th>
                <th>Verkaufspreis</th>
                <th>Profit</th>
                <th>Marge</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((d, i) => (
                <tr key={i} className="border-t border-neutral-800">
                  <td className="py-2">{d.player.name}</td>
                  <td>{d.player.position}</td>
                  <td>{d.player.ovr}</td>
                  <td>{d.source.toUpperCase()}</td>
                  <td>{d.buy.toLocaleString()}</td>
                  <td>{d.sell.toLocaleString()}</td>
                  <td className={d.profit>0?"text-emerald-400":"text-red-400"}>
                    {d.profit.toLocaleString()}
                  </td>
                  <td>{d.marginPct.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {deals.length===0 && !loading && (
            <p className="text-neutral-400 mt-4">Keine Deals im gesetzten Rahmen.</p>
          )}
        </div>
      </div>
    </main>
  );
}
