import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type IconType = {
  active: boolean;
};

const ChatPromptsIcon = ({active = false}: IconType) => {
  const fill = active ? '#fff' : '#69737B';
  return (
    <View style={styles.iconContainer}>
      {active ? (
        <LinearGradient
          colors={['rgba(13, 77, 114, 0.7)', 'rgba(37, 137, 83, 0.7)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 10, y: 5}}
        />
      ) : null}
      <Svg width="19" height="20" viewBox="0 0 19 20" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.57447 18.5768C14.4217 18.5768 18.3511 15.4676 18.3511 11.6322C18.3511 7.79673 14.4217 4.6875 9.57447 4.6875C4.72729 4.6875 0.797874 7.79673 0.797874 11.6322C0.797874 14.078 2.39582 16.2285 4.8107 17.4658C5.13595 17.6324 4.65736 18.4771 3.91001 19.4019C3.85817 19.466 3.90367 19.5612 3.986 19.5562C4.9881 19.4961 5.80805 19.0143 6.40396 18.6641C6.52814 18.5912 6.64258 18.5239 6.74692 18.4674C6.99105 18.3351 7.27346 18.3394 7.54637 18.3905C8.19737 18.5123 8.8764 18.5768 9.57447 18.5768ZM5.01064 13.1875C5.78619 13.1875 6.4149 12.5532 6.4149 11.7708C6.4149 10.9884 5.78619 10.3542 5.01064 10.3542C4.23509 10.3542 3.60638 10.9884 3.60638 11.7708C3.60638 12.5532 4.23509 13.1875 5.01064 13.1875ZM10.6277 11.7708C10.6277 12.5532 9.99896 13.1875 9.22341 13.1875C8.44786 13.1875 7.81915 12.5532 7.81915 11.7708C7.81915 10.9884 8.44786 10.3542 9.22341 10.3542C9.99896 10.3542 10.6277 10.9884 10.6277 11.7708ZM13.4362 13.1875C14.2117 13.1875 14.8404 12.5532 14.8404 11.7708C14.8404 10.9884 14.2117 10.3542 13.4362 10.3542C12.6606 10.3542 12.0319 10.9884 12.0319 11.7708C12.0319 12.5532 12.6606 13.1875 13.4362 13.1875Z"
          fill={fill}
        />
        <Path
          d="M15.5426 2.5625C15.5426 3.73611 14.5995 4.6875 13.4362 4.6875C12.2728 4.6875 11.3298 3.73611 11.3298 2.5625C11.3298 1.38889 12.2728 0.4375 13.4362 0.4375C14.5995 0.4375 15.5426 1.38889 15.5426 2.5625Z"
          fill={fill}
        />
        <Path
          d="M7.54255 2.5625C7.54255 3.7361 6.59949 4.6875 5.43617 4.6875C4.27285 4.6875 3.32979 3.7361 3.32979 2.5625C3.32979 1.38889 4.27285 0.4375 5.43617 0.4375C6.59949 0.4375 7.54255 1.38889 7.54255 2.5625Z"
          fill={fill}
        />
        <Path d="M5.01064 2.5625H6.41489V8.22917H5.01064V2.5625Z" fill={fill} />
        <Path d="M12.734 2.5625H14.1383V8.22917H12.734V2.5625Z" fill={fill} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23232D',
    width: 30,
    borderRadius: 10,
    height: 30,
  },
  gradient: {
    width: 30,
    borderRadius: 10,
    height: 30,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16171d',
  },
});
export default ChatPromptsIcon;
