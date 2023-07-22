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

type PresetsData = {
  [key: string]: Preset[];
};

type PresetsState = {
  presets: PresetsData;
  titles: string[];
  loading: boolean;
};

export type {PresetsData, Presets, Preset, PresetsState};
