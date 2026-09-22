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
 *
 * The field is called "subject" on purpose. Anything in the browser's
 * address-autofill vocabulary, "company" and "organization" above all, gets
 * filled from a saved address whatever the markup asks for, and a visitor
 * accepting an autofill suggestion would have had their message thrown away.
 * The `data-` attributes ask the common password managers to leave it alone
 * for the same reason.
 */
export function HoneypotField({ id, value, onChange }: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]"
    >
      <label htmlFor={id}>Subject</label>
      <input
        id={id}
        name={honeypotFieldName}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        data-lpignore="true"
        data-1p-ignore=""
        data-form-type="other"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
