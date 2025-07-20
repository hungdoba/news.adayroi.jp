import React from 'react';
import { cn } from '@/lib/utils';
import type { MaxWidthWrapperProps } from '@/types';

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={cn('mx-auto max-w-7xl w-full my-12 px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;