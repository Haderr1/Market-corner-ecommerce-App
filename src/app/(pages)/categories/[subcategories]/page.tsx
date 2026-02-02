import { SubcategoryI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params'
import React from 'react'

export default async function SubCategories({params}: {params: Params}) {
  const { subcategories } = await params;
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${subcategories}/subcategories`,
  );
const { data: subcategoriesData }: { data: SubcategoryI[] } = await response.json();
console.log(subcategoriesData);

  return <>
  {subcategoriesData[0].name}
  </>
}
