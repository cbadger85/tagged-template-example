import React, { useState, useEffect } from 'react';

const generateUniqueClassName = () => {
  const alphabet = 'qQwWeErRtTyYuUiIoOpPlLkKjJhHgGfFdDsSaAzZxXcCvVbBnNmM';

  return Array(12)
    .fill(null)
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join('');
};

const zipArray = (array1, array2) =>
  array1.reduce((acc, _, i) => {
    const zippedEl =
      array2[i] !== undefined ? [array1[i], array2[i]] : [array1[i]];
    return [...acc, ...zippedEl];
  }, []);

const useMakeStyles = (styles, ...values) => {
  const className = generateUniqueClassName();

  const styleBlock = zipArray(styles, values).join('');

  const styleContent = `
    .${className} {
      ${styleBlock}
    }
  `;

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = styleContent;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  });

  return className;
};

const Sample = () => {
  const [backgroundColor, setBackgroundColor] = useState('blue');

  const className = useMakeStyles`
    background-color: ${backgroundColor};
    width: 200px;
    height: 50px;
  `;

  return (
    <div className={className}>
      <button
        onClick={() =>
          setBackgroundColor(backgroundColor === 'blue' ? 'red' : 'blue')
        }
      >
        re-render!
      </button>
    </div>
  );
};

export default Sample;
