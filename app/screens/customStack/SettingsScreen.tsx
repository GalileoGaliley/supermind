import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  MailIcon,
  PrivacyIcon,
  RestoreIcon,
  ShareIcon,
  StarIcon,
  SubtractIcon,
} from '../../assets/images/icons/IconPack';
import {getAvailablePurchases} from 'react-native-iap';
import {
  addActiveSubsAction,
  setLoading,
} from '../../store/products/products.slice';
import {useDispatch} from 'react-redux';

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const openLink = (routeTo: string) => {
    Linking.canOpenURL(routeTo)
      .then(supported => {
        if (!supported) {
          console.log('Что-то не так');
        } else {
          return Linking.openURL(routeTo);
        }
      })
      .catch(error => console.error('Ошибка при открытии ссылки: ', error));
  };

  const share = () => {
    Share.share({
      title: 'ChatGPT here!',
      message: 'Try send message for AI',
    });
  };
  const rate = () => {};

  const settingData = [
    {
      title: 'Share Us',
      callback: share,
      Icon: () => <ShareIcon />,
    },
    {
      title: 'Terms of Service',
      callback: () => {
        const link = 'https://appmediaco.com/SuperMindTermsOfUse.html';
        openLink(link);
      },
      Icon: () => <SubtractIcon />,
    },
    {
      title: 'Privacy Policy',
      callback: () => {
        const link = 'https://appmediaco.com/SuperMindPolicy.html';
        openLink(link);
      },
      Icon: () => <PrivacyIcon />,
    },
    {
      title: 'E-mail Support',
      callback: () => {
        const emailAddress = 'ThePursuer@mail.ru';
        const mailtoUrl = `mailto:${emailAddress}`;
        openLink(mailtoUrl);
      },
      Icon: () => <MailIcon />,
    },
    {
      title: 'Rate Us',
      callback: rate,
      Icon: () => <StarIcon />,
    },
    {
      title: 'Restore Purchase',
      callback: async () => {
        dispatch(setLoading(true));
        const activeSub = await getAvailablePurchases();
        dispatch(setLoading(false));
        if (activeSub.length) {
          await dispatch(addActiveSubsAction(activeSub));
        }
      },
      Icon: () => <RestoreIcon />,
    },
  ];

  const SettingItem = ({Icon, title, callback}: (typeof settingData)[0]) => (
    <TouchableOpacity style={styles.settingItem} onPress={callback}>
      <View style={styles.icon}>
        <LinearGradient
          colors={['rgba(13, 77, 114, 0.7)', 'rgba(37, 137, 83, 0.7)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
        <Icon />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {settingData.map(item => (
        <SettingItem
          title={item.title}
          Icon={item.Icon}
          callback={item.callback}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  holder: {
    height: 82,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 15,
  },
  gradient: {
    width: '100%',
    borderRadius: 15,
    height: '100%',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16171d',
  },
  settingItem: {
    width: '100%',
    backgroundColor: '#23232D',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
  container: {
    position: 'relative',
    backgroundColor: '#16171D',
    paddingTop: 82,
    paddingHorizontal: 10,
  },
});

export default SettingsScreen;
