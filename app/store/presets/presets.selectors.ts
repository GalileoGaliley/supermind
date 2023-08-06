import {useAppSelector} from '../hooks/useAppSelector';

const usePresetsIds = () => useAppSelector(state => state.presets.presets);
const usePresetsItems = () => useAppSelector(state => state.presets.items);
const usePresetsTitles = () => useAppSelector(state => state.presets.titles);
const usePresetsLoading = () => useAppSelector(state => state.presets.loading);

export {usePresetsItems, usePresetsIds, usePresetsTitles, usePresetsLoading};
