import { ReactNode } from "react";

export interface CardProps {
  image: string;
  title: string;
  list: BulletList[];
  button: {
    name: string;
    link: string;
    color: {
      from: string;
      via?: string;
      to: string;
    };
  };
  location: string
  preset_id: string
}
interface BulletList {
  content: string;
  color: string;
}

export interface BasicTableProps {
  name: string;
  vBucks: string;
  infos: {
    status: string;
    time: string;
    buyerName: string;
  }[];
  isAvailable?: boolean;
}

export interface ProductInfo {
  status: string;
  time: string;
  buyerName: string;
}

export interface TransformedData {
  productName: string;
  vBucks: string;
  infos: ProductInfo[];
  isAvailable: boolean;
}

export interface BtnProps {
  text: string;
  link: string;
  className: string;
}

export interface CarouselProps {
  children: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export interface MemberCardProps {
  tier: string;
  name: string;
  name_display: string;
  discord_username: string;
  present_points: number;
  all_points: number;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface SmallCarouselProps {
  displayAssets: DisplayAssets[];
}

export interface DisplayAssets {
  display_id: string;
  image_background: string;
  image_url: string;
}

export interface UserBalance {
  id: string;
  discord_id: string;
  discord_username: string;
  name: string;
  name_display: string;
  current_points: number;
  total_points: number;
  tier: string;
}

// ItemDetail Props

export interface IdProps {
  itemId: string | null;
  onClose: () => void;
}

export interface Item {
  name: string;
  description: string;
  rarity: {
    name: string;
  };
  type: {
    id: string;
    name: string;
  };
  price: number | null;
  set: {
    name: string;
  };
  shopHistory: string[]
  styles: Styles[];
  previewVideos: [
    {
      url: string;
    }
  ];
  images: {
    background: string;
    icon_background: string;
  };
  grants: Grants[];
  displayAssets: DisplayAssetsItem[];
}

export interface Styles {
  channelName: string;
  image: string;
  video_url: string;
}

interface Grants {
  id: string;
  images: {
    icon_background: string;
  };
}

export interface DisplayAssetsItem {
  displayAsset: string;
  background: string;
  materialInstance: string;
}

export interface Bundle {
  id: string;
  name: string;
  price: string;
}

export interface ResponseData {
  success: boolean;
  data: {
    result: boolean;
    item: Item;
  };
}

// END

export interface ItemProps {
  _id: string | null;
  id: string | null;
  type_id: string | null;
  type_name: string | null;
  name: string | null;
  description: string | null;
  rarity_id: string | null;
  rarity_name: string | null;
  images_texture_background: string | null;
  images_item: string | null;
  images_background: string | null;
  images_full_background: string | null;
  display_assets: DisplayAssets[];
  section_name: string | null;
  finalPrice: number | null;
  release_date: string | null;
  time_fetch: string | null;
  time_update: string | null;
  uid_update: string | null;
  __v: number | null;
}

export interface AllImages {
  _id: string;
  name: string;
  dataUrl: string;
}
