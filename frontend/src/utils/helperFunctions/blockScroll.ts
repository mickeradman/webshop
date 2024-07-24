export function blockScroll(bool: boolean) {
  if (bool) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}
