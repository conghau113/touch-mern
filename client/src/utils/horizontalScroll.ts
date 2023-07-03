export function useHorizontalScroll(ref: any) {
  if (ref) {
    const onWheel = (e: { deltaY: number; preventDefault: () => void }) => {
      if (e.deltaY === 0) return

      e.preventDefault()
      ref.scrollTo({
        left: parseInt(ref.scrollLeft) + e.deltaY,
        behavior: 'smooth',
      })
    }
    ref.addEventListener('wheel', onWheel)
    return () => ref.removeEventListener('wheel', onWheel)
  }
}
