import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {Colors} from '../../themes';

interface KeyboardAvoidingTemplateProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const KeyboardAvoidingTemplate: React.FC<KeyboardAvoidingTemplateProps> = ({
  children,
  contentContainerStyle,
  style,
}) => (
  <KeyboardAvoidingView
    style={[styles.container, style]}
    behavior={Platform.select({ios: 'padding', android: undefined})}
    // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset if needed
  >
    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
    <ScrollView
      bounces={false}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false} // Optional: Customize as needed
      nestedScrollEnabled>
      {children}
    </ScrollView>
    {/* </TouchableWithoutFeedback> */}
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageColor,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default KeyboardAvoidingTemplate;
