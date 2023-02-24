import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

export const ResetIcon = ({size = 24, color = '#000000', ...rest}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...rest}>
    <G fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3.987 1.078A8 8 0 108 0M4 5V1H0" fillRule="evenodd" />
    </G>
  </Svg>
);

export default ResetIcon;
