import { memo, FC } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

/** 
 * old design. Use from redesign folder
  @deprecated  
*/
export const VStack: FC<VStackProps> = memo((props) => <Flex {...props} direction="column" />);
