import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Icons, Images} from '../../themes';
import {normalize} from '../../utils/orientation';
import {goBack, navigate} from '../../navigation/RootNaivgation';
import {useAppSelector} from '@app/store';
import {IMAGE_URL} from '@env';

type Props = {
  logo?: boolean;
  notification?: boolean;
  backIcon?: boolean;
  title?: string;
  addIcon?: boolean;
  onTap?: any;
  onBackPress?: () => void;
  isBack?: boolean;
};

const Header = ({
  logo,
  notification,
  backIcon,
  title,
  addIcon,
  onTap,
  onBackPress = () => {},
  isBack,
}: Props) => {
  const {userInfo} = useAppSelector(state => state.user);
  const {data} = userInfo;
  return (
    <View style={styles.headerWrapper}>
      {logo && (
        <View style={styles.profileWrapper}>
          <Image
            source={
              data?.profileImage
                ? {uri: IMAGE_URL + data?.profileImage}
                : Images.user
            }
            style={styles.profileIcon}
          />
        </View>
      )}
      <View style={styles.headerWrapper}>
        {backIcon && (
          <Pressable
            onPress={() => {
              if (isBack) {
                onBackPress();
              } else {
                goBack();
              }
            }}
            style={styles.backWrapper}>
            <Image source={Icons.left_arrow} style={styles.backIcon} />
          </Pressable>
        )}
        {title && <Text style={styles.pageTitle}>{title}</Text>}
      </View>
      {notification && (
        <Pressable
          onPress={() => navigate('Notifications')}
          style={styles.bellWrapper}>
          <Image source={Icons.bell} style={styles.bellIcon} />
        </Pressable>
      )}
      {addIcon && (
        <Pressable onPress={onTap} style={styles.addIconWrapper}>
          <Image source={Icons.plus} style={styles.addIcon} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: normalize(5),
    marginHorizontal: normalize(10),
  },
  profileWrapper: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(35 / 2),
    backgroundColor: '#fff',
  },
  bellWrapper: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(35 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: normalize(1),
    borderColor: Colors.textColor + 70,
  },
  profileIcon: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(50),
  },
  bellIcon: {
    width: normalize(16),
    height: normalize(16),
    resizeMode: 'contain',
  },
  backWrapper: {
    width: normalize(35),
    height: normalize(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(8),
    backgroundColor: '#F9F4E6',
    marginRight: normalize(10),
  },
  backIcon: {
    width: normalize(18),
    height: normalize(18),
    resizeMode: 'contain',
  },
  pageTitle: {
    fontFamily: Fonts.lora_semi_bold,
    fontSize: normalize(16),
    color: Colors.textColor,
    textAlign: 'center',
  },
  addIconWrapper: {
    width: normalize(35),
    height: normalize(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(8),
    backgroundColor: Colors.textColor,
    marginRight: normalize(10),
  },
  addIcon: {
    width: normalize(10),
    height: normalize(10),
    resizeMode: 'contain',
  },
});
