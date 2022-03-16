import { FC, useEffect, useState } from 'react'
import { Select, SelectMenu, SelectMenuItem, SelectSelected, SelectContainerClass } from './styled-components'
import Icon from 'icons'
import cn from 'classnames'

type OptionType = { value: string | number, label: string }
type OptionsType = Array<OptionType>
type ValueType = any


interface Props {
  options: OptionsType,
  value?: ValueType,
  placeholder: string,
  onChange: (value: ValueType) => void,
  className?: string
}

const SelectComponent: FC<Props> = ({
  options,
  value,
  placeholder,
  onChange,
  className
}) => {
  const [ open, setOpen ] = useState(false)
  useEffect(() => {
    const callback = (evt: MouseEvent) => {
      const target = evt.target as HTMLDivElement
      if (!target) { return }
      const wasClickedOutside = !target.closest(`.${SelectContainerClass}`)
      if (wasClickedOutside) { setOpen(false) }
    }
    document.addEventListener('click', callback)

    return () => document.removeEventListener('click', callback)
  }, [])

  const selectedItem = options.find(option => option.value === value)

  return <Select
      onClick={() => setOpen(!open)}
      className={cn(SelectContainerClass, className)}
    >
    <SelectSelected opened={open}>
      {selectedItem ? selectedItem.label : placeholder}<Icon.SelectIcon />
    </SelectSelected>
    {open && <SelectMenu>
      {options.map(item => <SelectMenuItem onClick={() => onChange(item.value)}>{item.label}</SelectMenuItem>)}
    </SelectMenu>}
  </Select>
}

export default SelectComponent