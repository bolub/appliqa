import { extendTheme } from '@chakra-ui/react';
import colors from './foundations/colors';
import { fonts, fontSizes } from './foundations/fonts';
import styles from './styles';
import { Button } from './components/Button';

export const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  styles,
  components: { Button },
});
