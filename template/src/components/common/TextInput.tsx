import React, {FC, useState} from 'react';
import {
  View,
  TextInput as Input,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  ImageStyle,
  StyleSheet,
  Text,
  Pressable,
  Platform,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes';
import {
  horizontalScale,
  moderateScale,
  normalize,
} from '../../utils/orientation';

interface TextInputProps {
  value: string;
  title?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  placeholder?: string;
  placeholderColor?: string;
  editable?: boolean;
  width?: string | number;
  height?: number;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: number;
  tintColor?: string;
  maxLength?: number;
  marginVertical?: number;
  rightIcon?: number;
  iconStyle?: ImageStyle;
  inputType?: 'OTP' | 'default';
  onMainPress?: () => void;
  onRightIconPress?: () => void;
  ref?: any;
  onFocus?: () => void;
  hasValue?: boolean;
  multiline?: boolean;
}

const TextInput: FC<TextInputProps> = ({
  value,
  title,
  onChangeText = () => {},
  keyboardType = 'default',
  secureTextEntry = false,
  placeholder = '',
  placeholderColor = '#ACB9C1',
  editable = true,
  width = '95%',
  height,
  backgroundColor = Colors.white,
  textAlign = 'left',
  fontSize = normalize(13),
  tintColor = Colors.textColor,
  maxLength,
  marginVertical = moderateScale(7),
  rightIcon,
  iconStyle,
  onMainPress,
  onRightIconPress,
  inputType,
  ref,
  onFocus,
  hasValue,
  multiline = false,
}) => {
  const containerStyle: StyleProp<ViewStyle | any> = {
    width: typeof width === 'number' ? width : `${width}`,
    height: height ? height : Platform.OS === 'ios' ? undefined : normalize(60),
    backgroundColor,
    marginVertical,
    borderRadius: moderateScale(10),
    borderWidth: normalize(1),
    borderColor: hasValue ? Colors.textColor : '#D0DED8',
    paddingHorizontal: horizontalScale(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <Pressable onPress={onMainPress} style={containerStyle}>
      <View
        style={
          inputType === 'OTP'
            ? styles.otpContainerStyle
            : styles.subContainerStyle
        }>
        <Text style={title ? styles.title : styles.noTitle}>{title}</Text>
        <Input
          ref={ref}
          value={value}
          editable={editable}
          maxLength={maxLength}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          keyboardType={keyboardType}
          multiline={multiline}
          style={[
            styles.input,
            {
              textAlign,
              fontSize,
              color: Colors.textColor,
              marginTop: title
                ? Platform.OS === 'android'
                  ? -normalize(3)
                  : 0
                : Platform.OS === 'android'
                ? normalize(2)
                : normalize(12),
              width: rightIcon
                ? '90%'
                : inputType === 'OTP'
                ? undefined
                : '100%',
            },
          ]}
          onFocus={onFocus}
        />
      </View>
      {secureTextEntry && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.iconWrapper}>
          <Image
            source={secureTextEntry ? Icons.hide : Icons.show}
            style={[styles.icon, {tintColor}, iconStyle]}
          />
        </TouchableOpacity>
      )}
      {rightIcon && (
        <TouchableOpacity
          disabled={!onRightIconPress}
          onPress={onRightIconPress}
          style={styles.iconWrapper}>
          <Image
            source={rightIcon}
            style={[styles.icon, {tintColor}, iconStyle]}
          />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  subContainerStyle: {
    marginVertical: normalize(10),
    gap: normalize(3),
    width: '100%',
  },
  otpContainerStyle: {
    marginVertical: normalize(10),
    gap: normalize(3),
    width: '100%',
    height: normalize(40),
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.figtree_medium,
    color: Colors.textColor,
    textAlign: 'left',
    fontSize: normalize(13),
    textTransform: 'capitalize',
    marginBottom: Platform.OS === 'android' ? -normalize(5) : 0,
    marginTop: Platform.OS === 'android' ? normalize(5) : 0,
  },
  noTitle: {
    display: 'none',
  },
  input: {
    fontFamily: Fonts.figtree_regular,
    marginLeft: Platform.OS === 'android' ? -normalize(3) : 0,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    right: horizontalScale(15),
    position: 'absolute',
  },
  icon: {
    width: normalize(18),
    height: normalize(18),
    resizeMode: 'contain',
  },
});
