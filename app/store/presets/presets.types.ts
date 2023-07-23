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
  [key: string]: number[];
};

type PresetsState = {
  presets: PresetsData;
  titles: string[];
  items: {
    [key: number]: Preset;
  };
  loading: boolean;
};

export type {PresetsData, Presets, Preset, PresetsState};
