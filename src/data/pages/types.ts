import type { ServiceCategory } from "../services";

export interface ContentSection {
  id?: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}
export interface GalleryImage {
  caption?: string;
  description?: string;
  href?: string;
  src: string;
  alt: string;
}
export interface ServicePageData {
  path: string;
  title: string;
  shortTitle: string;
  intro: string;
  heroImage: string;
  imageAlt?: string;
  category: ServiceCategory;
  highlights: string[];
  sections: ContentSection[];
  gallery: GalleryImage[];
  related: string[];
  source: string;
}
