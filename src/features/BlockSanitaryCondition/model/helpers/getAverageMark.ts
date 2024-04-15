import { SanitaryVisit } from '@/entities/Block';

export const getAverageMark = (visits: SanitaryVisit[]) => {
  let mark = 0;
  let marksAmount = 0;

  visits.forEach((visit) => {
    visit.marks.forEach((visitMark) => {
      if (visitMark.mark !== null) {
        mark += visitMark.mark;
        marksAmount++;
      }
    });
  });

  if (marksAmount === 0) {
    return 0;
  }

  return mark / marksAmount;
};
