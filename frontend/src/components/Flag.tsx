// Flag images (flagcdn.com) — emoji flags don't render on Windows.
export default function Flag({ code, className = 'h-4' }: { code: string; className?: string }) {
  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      alt=""
      className={`inline-block w-auto rounded-[3px] object-cover shadow-sm ${className}`}
    />
  )
}
