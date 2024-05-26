import Svg, { SvgProps, Path } from 'react-native-svg';
export const ArrowLeft = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 256 256" {...props}>
    <Path d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12Z" />
  </Svg>
);
