export type PlayerPrice = {
  source: "futgg" | "futbin";
  updatedAt: number;
  platform: "ps" | "xbox" | "pc";
  bin: number;
};

export type Player = {
  id: string;
  name: string;
  league: string;
  nation: string;
  club: string;
  position: string;
  ovr: number;
  rarity?: string;
  prices: PlayerPrice[];
};
