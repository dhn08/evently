"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { createCategory, getAllCategory } from "@/lib/actions/category.actions";
type DropDownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const DropDown = ({ value, onChangeHandler }: DropDownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setnewCategory] = useState("");
  const handleAddCategory = () => {
    createCategory({ categoryName: newCategory.trim() }).then((category) =>
      setCategories((prev) => [...prev, category])
    );
  };
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategory();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <SelectItem
                className="select-item p-regular-14 "
                value={category._id}
                key={category._id}
              >
                {category.name}
              </SelectItem>
            );
          })}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add New Category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setnewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default DropDown;
