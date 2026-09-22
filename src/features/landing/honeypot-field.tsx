import { honeypotFieldName } from "@/features/landing/forms"

type HoneypotFieldProps = {
  id: string
  value: string
  onChange: (value: string) => void
}

/**
 * A decoy input that only a script ever fills.
 *
 * It is clipped to a single pixel rather than given `display: none`, because
 * plenty of bots skip fields they can tell are hidden but happily fill this
 * one. `aria-hidden` and `tabIndex={-1}` keep it out of the way of screen
 * readers and keyboard navigation, so nobody using the site meets it.
 */
export function HoneypotField({ id, value, onChange }: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]"
    >
      <label htmlFor={id}>Company</label>
      <input
        id={id}
        name={honeypotFieldName}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
