import { SanitaryVisit } from '@/entities/Block';

export const getEverageMark = (visits: SanitaryVisit[]) => {
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

  return mark / marksAmount;
};
