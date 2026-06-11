export const EducationIcon = ({ fill, ...props }: ReactTagProps<"svg">) => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 18 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M16.5 7.5V12M16.5 7.5L9 3.75L1.5 7.5L9 11.25L16.5 7.5Z'
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M4.5 9V12.75C6.75 15 11.25 15 13.5 12.75V9'
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
