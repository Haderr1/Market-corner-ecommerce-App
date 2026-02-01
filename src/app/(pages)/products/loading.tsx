import CardsLoading from '@/components/cardLoading/cardsLoading';
import React from 'react'

export default function Loading() {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CardsLoading/>
        <CardsLoading/>
        <CardsLoading/>
        <CardsLoading/>
        <CardsLoading/>
        <CardsLoading/>
        <CardsLoading/>
        <CardsLoading/>
  </div>
    </>
  );
}
