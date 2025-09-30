import { Player } from "./types";

export type DealFilters = {
  platform: "ps" | "xbox" | "pc";
  budget: number;
  ovrMin?: number;
  ovrMax?: number;
  binMin?: number;
  binMax?: number;
  minMarginPct?: number;
};

export type DealRow = {
  player: Player;
  buy: number;
  sell: number;
  profit: number;
  marginPct: number;
  source: string;
  platform: string;
};

export function computeDeals(players: Player[], f: DealFilters): DealRow[] {
  const rows: DealRow[] = [];
  for (const p of players) {
    const price = p.prices.find(pr => pr.platform === f.platform);
    if (!price) continue;

    const buy = price.bin;
    if (f.budget && buy > f.budget) continue;
    if (f.binMin && buy < f.binMin) continue;
    if (f.binMax && buy > f.binMax) continue;
    if (f.ovrMin && p.ovr < f.ovrMin) continue;
    if (f.ovrMax && p.ovr > f.ovrMax) continue;

    const sell = suggestSellPrice(buy);
    const profit = Math.floor(sell * 0.95 - buy);
    const marginPct = Math.round((profit / buy) * 1000) / 10;

    if (f.minMarginPct && marginPct < f.minMarginPct) continue;

    rows.push({ player: p, buy, sell, profit, marginPct, source: price.source, platform: f.platform });
  }
  rows.sort((a,b)=> b.profit - a.profit);
  return rows;
}

export function suggestSellPrice(buy: number): number {
  let step = 100;
  if (buy >= 10000 && buy < 50000) step = 250;
  else if (buy >= 50000 && buy < 100000) step = 500;
  else if (buy >= 100000) step = 1000;

  const inflate = 1.03; // +3% als Beispiel
  const raw = Math.ceil((buy * inflate) / step) * step;
  return raw;
}
