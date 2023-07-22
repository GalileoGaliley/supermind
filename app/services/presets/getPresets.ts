import {endpoints} from '../../endpoints';
import {axiosInstance as axios} from '../../services/api';
import { Preset, Presets, PresetsData } from "../../store/presets/presets.types";

const {
  presets: {presets: presetsUrl},
} = endpoints;

const getPresets = async (): Promise<Presets[]> => {
  try {
    const {data: presets} = await axios.get(presetsUrl);
    return presets;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {getPresets};
