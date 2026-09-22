import type { RefObject } from "react"

import { honeypotFieldName } from "@/features/landing/forms"

type HoneypotFieldProps = {
  id: string
  inputRef: RefObject<HTMLInputElement | null>
}

/**
 * A decoy input that only a script ever fills.
 *
 * It is clipped to a single pixel rather than given `display: none`, because
 * plenty of bots skip fields they can tell are hidden but happily fill this
 * one. `aria-hidden` and `tabIndex={-1}` keep it out of the way of screen
 * readers and keyboard navigation, so nobody using the site meets it.
 *
 * The value is read straight off the DOM node at submit time rather than held
 * in React state. The cheapest filler script does
 * `querySelectorAll('input').forEach(i => i.value = 'x')`, which never fires
 * React's synthetic onChange, so a controlled input would sit there reading
 * empty while the trap had plainly been sprung.
 *
 * The field is called "subject" on purpose. Anything in the browser's
 * address-autofill vocabulary, "company" and "organization" above all, gets
 * filled from a saved address whatever the markup asks for, and a visitor
 * accepting an autofill suggestion would have had their message thrown away.
 * The `data-` attributes ask the common password managers to leave it alone
 * for the same reason.
 */
export function HoneypotField({ id, inputRef }: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]"
    >
      <label htmlFor={id}>Subject</label>
      <input
        id={id}
        ref={inputRef}
        name={honeypotFieldName}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        data-lpignore="true"
        data-1p-ignore=""
        data-form-type="other"
        defaultValue=""
      />
    </div>
  )
}
