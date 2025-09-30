import { NextRequest, NextResponse } from "next/server";
import data from "@/data/static-players.json";
import { computeDeals } from "@/lib/deals";
import { Player } from "@/lib/types";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const p = Object.fromEntries(url.searchParams.entries());

  const platform = (p.platform || "ps") as "ps" | "xbox" | "pc";
  const budget = Number(p.budget || 100000);
  const ovrMin = p.ovrMin ? Number(p.ovrMin) : undefined;
  const ovrMax = p.ovrMax ? Number(p.ovrMax) : undefined;
  const binMin = p.binMin ? Number(p.binMin) : undefined;
  const binMax = p.binMax ? Number(p.binMax) : undefined;
  const minMarginPct = p.minMarginPct ? Number(p.minMarginPct) : undefined;

  const players = data as unknown as Player[];
  const deals = computeDeals(players, {
    platform, budget, ovrMin, ovrMax, binMin, binMax, minMarginPct
  });

  return NextResponse.json({ count: deals.length, deals });
}
