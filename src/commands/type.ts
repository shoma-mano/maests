export type ElementMatcher = {
  id?: string;
  text?: string;
};

export type WhenCondition = {
  visible?: string;
  notVisible?: string;
  true?: any;
  platform?: "Android" | "iOS" | "Web";
};
