import { Star } from 'lucide-react';
import React from 'react';

type RatingProps = {
  rating: number;
};

const Rating = (props: RatingProps) => {
  return [1, 2, 3, 4, 5].map((index) => (
    <Star
      key={index}
      color={index <= props.rating ? '#FFC107' : '#E4E9E9'}
      className='w-4 h-4'
    />
  ));
};

export default Rating;
