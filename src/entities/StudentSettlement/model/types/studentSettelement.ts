export interface StudentSettlement {
  processId: string;
  student: { id: string; reputation: number };
  dormId: string | null;
  roomId: string | null;
  rejected: boolean;
}
