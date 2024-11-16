import { LoadingIcon } from "@shared/icons";

interface ISpinnerProps {
  children?: React.ReactNode;
  size?: number;
}

export const Spinner = ({ children, size }: ISpinnerProps) => (
  <div className=' absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2'>
    <div className=''>
      <LoadingIcon size={size} />
      {children && <p>{children}</p>}
    </div>
  </div>
);
