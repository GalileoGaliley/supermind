import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type IconType = {
  active: boolean;
};

const PresetsIcon = ({active = false}: IconType) => {
  const fill = active ? '#fff' : '#69737B';
  return (
    <View style={styles.iconContainer}>
      {active ? (
        <LinearGradient
          colors={['rgba(13, 77, 114, 0.7)', 'rgba(37, 137, 83, 0.7)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
      ) : null}
      <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
        <Path
          d="M14.2418 0.113495H5.90635C2.28572 0.113495 0.127258 2.33736 0.127258 6.06771V14.6557C0.127258 18.3861 2.28572 20.6099 5.90635 20.6099H14.2418C17.8624 20.6099 20.0209 18.3861 20.0209 14.6557V6.06771C20.0209 2.33736 17.8624 0.113495 14.2418 0.113495ZM8.05487 13.3337L5.81683 15.6396C5.66763 15.7933 5.47864 15.865 5.28965 15.865C5.10066 15.865 4.90173 15.7933 4.76247 15.6396L4.01646 14.8709C3.71806 14.5737 3.71806 14.0818 4.01646 13.7846C4.30492 13.4874 4.77242 13.4874 5.07082 13.7846L5.28965 14.0101L7.0005 12.2474C7.28896 11.9502 7.75646 11.9502 8.05487 12.2474C8.34332 12.5446 8.34332 13.0365 8.05487 13.3337ZM8.05487 6.15995L5.81683 8.4658C5.66763 8.61952 5.47864 8.69126 5.28965 8.69126C5.10066 8.69126 4.90173 8.61952 4.76247 8.4658L4.01646 7.69718C3.71806 7.39998 3.71806 6.90807 4.01646 6.61087C4.30492 6.31367 4.77242 6.31367 5.07082 6.61087L5.28965 6.83633L7.0005 5.07364C7.28896 4.77644 7.75646 4.77644 8.05487 5.07364C8.34332 5.37084 8.34332 5.86275 8.05487 6.15995ZM15.6045 15.0964H10.3824C9.9746 15.0964 9.63641 14.748 9.63641 14.3278C9.63641 13.9076 9.9746 13.5592 10.3824 13.5592H15.6045C16.0223 13.5592 16.3505 13.9076 16.3505 14.3278C16.3505 14.748 16.0223 15.0964 15.6045 15.0964ZM15.6045 7.92264H10.3824C9.9746 7.92264 9.63641 7.5742 9.63641 7.15403C9.63641 6.73385 9.9746 6.38541 10.3824 6.38541H15.6045C16.0223 6.38541 16.3505 6.73385 16.3505 7.15403C16.3505 7.5742 16.0223 7.92264 15.6045 7.92264Z"
          fill={fill}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#23232D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
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
});
export default PresetsIcon;
