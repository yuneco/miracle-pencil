export const isInPwa = () =>
  !!((navigator as unknown as any).standalone) ||
  window.matchMedia('(display-mode: standalone)').matches
