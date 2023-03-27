import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowLeftIcon = ({size = 24, color = '#000000', ...rest}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...rest}>
    <Path
      d="M11.564 4.506a.75.75 0 01.008.98l-.078.078-6.5 5.686H21a.75.75 0 01.102 1.493L21 12.75H4.994l6.5 5.686a.75.75 0 01.137.97l-.067.088a.75.75 0 01-.97.137l-.088-.067-8-7-.013-.012a.755.755 0 01-.045-.045l.058.057a.757.757 0 01-.194-.264.748.748 0 01.116-.785l.02-.022a.755.755 0 01.045-.045l.013-.012 8-7a.75.75 0 011.058.07z"
      fill={color}
      fillRule="evenodd"
    />
  </Svg>
);

export default ArrowLeftIcon;
