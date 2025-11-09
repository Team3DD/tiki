export interface CollaborationData {
  name: string;
  logo: string;
  image?: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface Collaboration extends CollaborationData {
  onClick: () => void;
}