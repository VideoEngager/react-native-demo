import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const SettingsIcon = ({size = 24, color = '#000000', ...rest}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...rest}>
    <Path
      d="M13.844.897a2.709 2.709 0 014.715 1.954l-.07 1.4a1.208 1.208 0 001.263 1.267l1.401-.071a2.709 2.709 0 011.95 4.716l-1.042.94a1.21 1.21 0 000 1.795l1.042.94a2.709 2.709 0 01-1.954 4.716l-1.4-.071a1.208 1.208 0 00-1.269 1.269l.071 1.405a2.709 2.709 0 01-4.707 1.946l-.942-1.041a1.209 1.209 0 00-1.796.001l-.945 1.042a2.709 2.709 0 01-4.71-1.952l.072-1.4a1.208 1.208 0 00-1.269-1.268l-1.399.071a2.708 2.708 0 01-1.958-4.713l1.041-.94a1.21 1.21 0 00-.001-1.797l-1.04-.944a2.708 2.708 0 011.95-4.711l1.401.071a1.208 1.208 0 001.27-1.275L5.45 2.845A2.709 2.709 0 0110.16.897l.942 1.039a1.207 1.207 0 001.797-.003zm2.472.7a1.21 1.21 0 00-1.362.308l-.943 1.035a2.707 2.707 0 01-4.02.001l-.94-1.036a1.209 1.209 0 00-2.102.87l.067 1.396A2.708 2.708 0 014.17 7.02l-1.398-.07a1.208 1.208 0 00-.869 2.1l1.04.944a2.71 2.71 0 010 4.023l-1.04.94a1.208 1.208 0 00.874 2.101l1.4-.071a2.708 2.708 0 012.843 2.844l-.072 1.395a1.209 1.209 0 002.102.87l.943-1.04a2.709 2.709 0 014.021 0l.938 1.038a1.209 1.209 0 002.1-.866l-.071-1.4a2.708 2.708 0 012.843-2.843l1.4.071a1.209 1.209 0 00.873-2.104l-1.043-.94a2.71 2.71 0 010-4.023l1.042-.94a1.209 1.209 0 00-.869-2.104l-1.401.071a2.708 2.708 0 01-2.837-2.841l.071-1.4a1.209 1.209 0 00-.745-1.179zM12 6.75a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
      fill={color}
      fillRule="evenodd"
    />
  </Svg>
);

export default SettingsIcon;
