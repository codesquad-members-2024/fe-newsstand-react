interface Headline {
  thumbnailSrc: string;
  title: string;
  href: string;
}

interface Sidenews {
  title: string;
  href: string;
}

export interface News {
  id: string;
  pressName: string;
  logoImageSrc: string;
  editedTime: string;
  category: string;
  headline: Headline;
  sideNews: Sidenews[];
}

export interface RollingProps {
  news: News[];
}

export interface PressProps {
  news: News[];
  subscriptions: News[];
}

export interface ViewProps extends PressProps{
  menuSelected: number;
}

export interface LogoState {
  name: string;
  src: string;
}