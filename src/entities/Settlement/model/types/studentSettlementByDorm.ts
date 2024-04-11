type SettlementResultStudent = {
  id: string;
  roomId: string | null;
  rejected: boolean;
};

export type StudentSettlementByDorm = {
  dormId: string;
  students?: Array<SettlementResultStudent>;
};
