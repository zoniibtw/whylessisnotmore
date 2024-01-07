import React, { ReactNode, FC } from 'react';

interface SectionProps {
  children: ReactNode;
  color?: 'purple' | 'blue' | 'pink' | 'gold' | 'default' ;
}

const Section: FC<SectionProps> = ({ children, color = 'default' }) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-[#F4EAE6]';
      case 'blue':
        return 'bg-[#D8E1E4]';
      case 'pink':
        return 'bg-[#FAEEED]';
      case 'gold':
        return 'bg-[#F4E9CB]';
      default:
        return 'bg-white';
    }
  };

  return (
    <section
      className={`w-full py-[5%] md:px-0 md:w-70 mx-auto max-w-[1550px] ${getColorClass(color)}`}
    >
      {children}
    </section>
  );
};

export default Section;
