export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number | string;
  quotation: number;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
  };
}

export interface PlayerStats {
  id: string;
  championships: Championships;
  position: number;
  type: string;
  ultraPosition: number | string;
}

interface Championships {
  averagePercentRanks: object;
  clubs: string;
  keySeasonStats: object;
  total: object;
}

export interface Club {
  championships: object;
  defaultAssets: {
    logo: {
        small: string;
        medium: string;
    }
  }
  defaultJerseyUrl: string;
  id: string;
  name: { "en-GB": string; "es-ES": string; "fr-FR": string };
  shortName: string
}
