import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

type PropsCheckbox = {
  label?: string
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, PropsCheckbox>(
  ({ label }, ref) => {
    return (
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <RadixCheckbox.Root className={s.CheckboxRoot} ref={ref}>
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
)
