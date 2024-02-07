import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

type PropsCheckbox = {
  label?: string
}
export const Checkbox = (props: PropsCheckbox) => {
  const { label } = props

  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <RadixCheckbox.Root className={s.CheckboxRoot} defaultChecked>
        <RadixCheckbox.Indicator className={s.CheckboxIndicator}>
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className={s.Label} htmlFor={label}>
        {label}
      </label>
    </div>
  )
}
