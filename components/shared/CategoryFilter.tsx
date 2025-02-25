"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategory } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategory();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);
  //   useEffect(() => {
  //     const delayDebounceFn = setTimeout(() => {
  //       let newUrl;
  //       if (categories) {
  //         newUrl = formUrlQuery({
  //           params: searchParams.toString(),
  //           key: "query",
  //           value: categories,
  //         });
  //       } else {
  //         newUrl = removeKeysFromQuery({
  //           params: searchParams.toString(),
  //           keysToRemove: ["query"],
  //         });
  //       }
  //       router.push(newUrl, { scroll: false });
  //     }, 300);
  //     return () => clearTimeout(delayDebounceFn);
  //   }, [categories, searchParams, router]);
  const onSelectCategory = (category: string) => {
    let newUrl;
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field ">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All Categories
        </SelectItem>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <SelectItem
                className="select-item p-regular-14 "
                value={category.name}
                key={category._id}
              >
                {category.name}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
