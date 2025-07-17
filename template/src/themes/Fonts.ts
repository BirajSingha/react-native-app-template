import {Platform} from 'react-native';

const Fonts = {
  inter_bold: Platform?.OS == 'android' ? 'InterBold' : 'Inter18pt-Bold',
  inter_semi_bold:
    Platform?.OS == 'android' ? 'InterSemiBold' : 'Inter18pt-SemiBold',
  inter_medium: Platform?.OS == 'android' ? 'InterLight' : 'Inter18pt-Medium',
  inter_regular:
    Platform?.OS == 'android' ? 'InterRegular' : 'Inter18pt-Regular',

  figtree_bold: Platform?.OS == 'android' ? 'Figtree-Bold' : 'Figtree-Bold',
  figtree_semi_bold:
    Platform?.OS == 'android' ? 'Figtree-SemiBold' : 'Figtree-SemiBold',
  figtree_medium:
    Platform?.OS == 'android' ? 'Figtree-Medium' : 'Figtree-Medium',
  figtree_regular:
    Platform?.OS == 'android' ? 'Figtree-Regular' : 'Figtree-Regular',

  lora_bold: Platform?.OS == 'android' ? 'Lora-Bold' : 'Lora-Bold',
  lora_semi_bold: Platform?.OS == 'android' ? 'Lora-SemiBold' : 'Lora-SemiBold',
  lora_medium: Platform?.OS == 'android' ? 'Lora-Medium' : 'Lora-Medium',
  lora_regular: Platform?.OS == 'android' ? 'Lora-Regular' : 'Lora-Regular',
};

export default Fonts;
