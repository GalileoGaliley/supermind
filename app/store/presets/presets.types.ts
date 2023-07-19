type Preset = {
  id: number;
  title: string;
  desc: string;
};

type Presets = {
  id: number;
  title: string;
  presets: Preset[];
};

type PresetsData = Presets[];

type PresetsState = {
  presets: PresetsData;
  loading: boolean;
};

export {PresetsData, Presets, Preset, PresetsState};
