const dayNames: string[] = [
  'Ndz.',
  'Pon.',
  'Wt.',
  'Śr.',
  'Czw.',
  'Pt.',
  'Sob.',
];

export const getDayName = (date: Date) => {
  return dayNames[date.getDay()];
}
