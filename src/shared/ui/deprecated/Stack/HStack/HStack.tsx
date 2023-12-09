import { memo, FC } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/** 
 * old design. Use from redesign folder
  @deprecated  
*/
export const HStack: FC<HStackProps> = memo((props) => <Flex {...props} direction="row" />);
