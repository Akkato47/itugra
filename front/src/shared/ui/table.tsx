import { PersonIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { buttonVariants } from "@shared/constants/shade-cn";
import { PersonWithCrossIcon } from "@shared/icons";

import { Avatar } from "./avatar";
import { Button } from "./button";
import { Heading } from "./heading";

interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  children: React.ReactNode;
}

export const Table = ({ children, heading, ...props }: ITableProps) => (
  <div className='border border-slate-300 rounded-lg' {...props}>
    <Heading
      tag='h2'
      variant='h4'
      className='border-b border-slate-300 flex items-center justify-center w-full py-5'
    >
      {heading}
    </Heading>
    {children}
  </div>
);

interface ITableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: IImage;
  uid: string;
  username: string;
  role: string;
  circleColor: string;
}

export const TableRow = ({ image, username, role, circleColor, uid, ...props }: ITableRowProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className='flex flex-col'
      onMouseLeave={() => setIsVisible(false)}
      onMouseOver={() => setIsVisible(true)}
      {...props}
    >
      <div className='grid grid-cols-[1fr_100px_1fr] items-center px-10 py-4 border-b border-b-slate-300 last:border-0'>
        <div className='flex items-center gap-3'>
          <Avatar
            isEdit={false}
            size='small'
            src={image ? image.fileUrl : "/images/user.webp"}
            alt='userName avatar'
          />
          <p className='text-sm leading-[171%]'>{username}</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <div className='size-4 rounded-full' style={{ backgroundColor: circleColor }} />
          <p className='text-sm leading-[171%]'>{role}</p>
        </div>
        <div className=' text-end space-x-4'>
          {isVisible && (
            <>
              <Link
                to={`${paths.PROFILE}/${uid}`}
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <PersonIcon className='size-5' />
              </Link>
              <Button variant='outline' size='icon'>
                <PersonWithCrossIcon className='size-5' />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// interface ITableCellProps extends React.HTMLAttributes<HTMLDivElement> {
//   children: React.ReactNode;
// }

// export const TableCell = () => (
//   <div className='first:text-left last:text-end'>
//     <div className='flex items-center gap-3'>
//       <Avatar
//         isEdit={false}
//         size='small'
//         src={image ? image.fileUrl : "/images/user.webp"}
//         alt='userName avatar'
//       />
//       <p className='text-sm leading-[171%]'>{username}</p>
//     </div>
//   </div>
// );
