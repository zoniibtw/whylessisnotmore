import React, { ReactNode, FC } from 'react';

interface SectionProps {
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ children }) => {
  return (
    <section
      className={`w-full px-4 md:px-0 md:w-11/12 xl:w-10/12 mx-auto max-w-custom`}
    >
      {children}
    </section>
  );
};

export default Section;
