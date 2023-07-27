import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useTheme } from '@/ui/hooks/use-theme'
import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
export interface CheckBoxProps {
  label: string
  defaultValue?: boolean
  onChanged: (state: boolean) => void
}
export const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  defaultValue = false,
  onChanged,
}) => {
  const [checked, setChecked] = useState(defaultValue)
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      accessibilityRole="checkbox"
      flexDirection="row"
      alignItems="center"
      gap="xs"
      aria-checked={checked}
      onPress={() => {
        setChecked(!checked)
        onChanged(!checked)
      }}
    >
      <Box
        height={16}
        width={16}
        borderRadius="rounded"
        borderWidth={2}
        borderColor="icon-main"
        justifyContent="center"
        alignItems="center"
      >
        {checked ? <Feather name="check" color={colors['icon-main']} /> : null}
      </Box>
      <Text variant="checkbox">{label}</Text>
    </TouchableOpacity>
  )
}
