import React from 'react';

const MaxWidthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 flex flex-col py-3">
      {children}
    </div>
  );
};

export default MaxWidthContainer;
