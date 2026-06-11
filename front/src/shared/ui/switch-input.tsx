import { cn } from "@shared/lib/shade-cn";

interface ISwitchInputProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: string;
  firstValue: string;
  secondValue: string;
  fristFieldName: string;
  secondFieldName: string;
}

export const SwitchInput = (props: ISwitchInputProps) => (
  <div className='flex items-center justify-center'>
    <label
      htmlFor={props.firstValue}
      className={cn(
        props.selectedValue === props.firstValue
          ? "bg-slate-900 text-white border-slate-900 border-l-0"
          : "bg-slate-50 text-slate-900 border-slate-300 border-r-0",
        "py-2 cursor-pointer w-[169px] border text-center rounded-l-md"
      )}
    >
      {props.fristFieldName}
      <input
        type='radio'
        className='hidden'
        onChange={(e) => props.setValue(e.target.value)}
        name='formType'
        value={props.firstValue}
        id={props.firstValue}
      />
    </label>
    <label
      htmlFor={props.secondValue}
      className={cn(
        props.selectedValue === props.secondValue
          ? "bg-slate-900 text-white border-slate-900 border-r-0"
          : "bg-slate-50 text-slate-900 border-slate-300 border-l-0",
        "py-2 cursor-pointer w-[169px] border text-center rounded-r-md"
      )}
    >
      {props.secondFieldName}
      <input
        type='radio'
        className='hidden'
        onChange={(e) => props.setValue(e.target.value)}
        name='formType'
        value={props.secondValue}
        id={props.secondValue}
      />
    </label>
  </div>
);
