import { StudentSettlementByDorm } from '../types/studentSettlementByDorm';
import { StudentSettlement } from '../types/studentSettlement';

export const transformStudentSettlementsToSettlementResult = (
  studentSettlement: Array<StudentSettlement>
) => {
  const studentSettlementResult: Array<StudentSettlementByDorm> = [];

  studentSettlement.forEach((item) => {
    const studentSettlementResultItem = studentSettlementResult.filter(
      (resultItem) => resultItem.dormId === item.dormId
    )[0];

    if (studentSettlementResultItem) {
      studentSettlementResultItem.students?.push({
        id: item.student.id,
        roomId: item.roomId,
        rejected: item.rejected
      });
    } else if (item.dormId) {
      const itemToPush: StudentSettlementByDorm = {
        dormId: item.dormId,
        students: [
          {
            id: item.student.id,
            roomId: item.roomId,
            rejected: item.rejected
          }
        ]
      };

      studentSettlementResult.push(itemToPush);
    }
  });

  return studentSettlementResult;
};
