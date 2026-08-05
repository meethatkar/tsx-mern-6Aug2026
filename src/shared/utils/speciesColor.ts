export const getSpeciesColorClass = (speciesUrls: string[]) => {
  const isHuman = !speciesUrls || speciesUrls.length === 0;
  const isDroid = speciesUrls?.some((url) => url.includes('/species/2'));

  if (isHuman) return 'border-blue-500/40 bg-blue-950/20 text-blue-400';
  if (isDroid) return 'border-amber-500/40 bg-amber-950/20 text-amber-400';
  return 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400';
};