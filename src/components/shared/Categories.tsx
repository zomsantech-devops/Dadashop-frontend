import { capitalize } from "@mui/material";

interface Category {
  name: string;
  count: number;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (categoryName: string) => void;
}

export const Categories = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoriesProps) => (
  <div className="flex self-center justify-left gap-4 mb-5 overflow-x-auto max-w-[1200px] screen_1250:max-w-full screen_500:gap-2 scrollbar-category rounded-xl">
    {categories.map((category) => (
      <button
        key={category.name}
        className={`px-4 py-2 rounded-2xl font-bold whitespace-nowrap screen_445:text-sm ${
          selectedCategory === category.name
            ? "bg-[#3d82d1] text-white"
            : "bg-gray-200 text-gray-800"
        } hover:bg-[#3d82d1] hover:text-white focus:outline-none`}
        onClick={() => onSelect(category.name)}
      >
        {category.count} {capitalize(category.name.replace(/^sparks_/, ""))}
      </button>
    ))}
  </div>
);
