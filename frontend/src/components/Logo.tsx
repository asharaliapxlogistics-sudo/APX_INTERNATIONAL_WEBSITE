export default function Logo({ light = false, className = 'h-12 sm:h-14' }: { light?: boolean; className?: string }) {
  return (
    <img
      src={light ? '/apx-logo-light.svg' : '/apx-logo.svg'}
      alt="APX International — Where we think, this is fast!"
      className={`w-auto ${className}`}
    />
  )
}
