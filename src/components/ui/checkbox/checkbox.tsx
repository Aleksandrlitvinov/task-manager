import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

type PropsCheckbox = {
  checked?: boolean
  disabled?: boolean
  label?: string
  onChange?: (checked: boolean) => void
  required?: boolean
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>
export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, PropsCheckbox>(
  ({ checked, label, onChange }, ref) => {
    return (
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <CheckboxRadix.Root
          checked={checked}
          className={s.CheckboxRoot}
          onCheckedChange={onChange}
          ref={ref}
        >
          <CheckboxRadix.Indicator className={s.CheckboxIndicator}>
            <CheckIcon />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        <label className={s.Label} htmlFor={label}>
          {label}
        </label>
      </div>
    )
  }
)
