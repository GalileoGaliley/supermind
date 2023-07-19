import {getPresets} from './getPresets';

class PresetsServices {
  getPresetsService = () => getPresets();
}

const presetsServices = new PresetsServices();

export {presetsServices};
