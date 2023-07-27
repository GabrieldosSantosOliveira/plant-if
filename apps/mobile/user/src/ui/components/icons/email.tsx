import { Svg, Path, SvgProps } from 'react-native-svg'
export interface EmailProps extends SvgProps {
  color: string
}
export const Email: React.FC<EmailProps> = (props) => {
  return (
    <Svg viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M2.66683 3.16663H13.3335C14.0668 3.16663 14.6668 3.76663 14.6668 4.49996V12.5C14.6668 13.2333 14.0668 13.8333 13.3335 13.8333H2.66683C1.9335 13.8333 1.3335 13.2333 1.3335 12.5V4.49996C1.3335 3.76663 1.9335 3.16663 2.66683 3.16663Z"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.6668 4.5L8.00016 9.16667L1.3335 4.5"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}
