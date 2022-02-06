import React, { FC } from 'react'
import Select from 'react-select'

type OptionType = { value: string | number, label: string }
type OptionsType = Array<OptionType>
type ValueType = OptionType

interface Props {
  options: OptionsType,
  value?: ValueType
}

const SelectComponent: FC<Props> = ({
  options,
  value
}) => <Select options={options} value={value} />

export default SelectComponent