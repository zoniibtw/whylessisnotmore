import React, { ReactNode, FC } from 'react';

interface SectionProps {
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ children }) => {
  return (
    <section
      className={`w-full py-[5%] md:px-0 md:w-70 mx-auto max-w-[1750px]`}
    >
      {children}
    </section>
  );
};

export default Section;
