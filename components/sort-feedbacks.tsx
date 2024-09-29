import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SortFeedbacks = () => {
  const [sortBy, setSortBy] = useState('most-upvotes');

  return (
    <Select
      defaultValue="most-upvotes"
      value={sortBy}
      onValueChange={(value: string) => setSortBy(value)}
    >
      <SelectTrigger className="w-full sm:w-56 bg-background h-10">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="most-upvotes">Most Upvotes</SelectItem>
        <SelectItem value="least-upvotes">Least Upvotes</SelectItem>
        <SelectItem value="most-comments">Most Comments</SelectItem>
        <SelectItem value="least-comments">Least Comments</SelectItem>
        <SelectItem value="latest">Latest</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortFeedbacks;
