import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryTabs = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryTabsProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <Tabs value={activeCategory} onValueChange={onCategoryChange}>
        <TabsList className="inline-flex h-12 items-center justify-start w-max bg-muted/50 p-1 gap-1">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm whitespace-nowrap"
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};