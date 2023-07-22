import {useAppSelector} from '../hooks/useAppSelector';

const usePresets = () => useAppSelector(state => state.presets.presets);

export {usePresets};
