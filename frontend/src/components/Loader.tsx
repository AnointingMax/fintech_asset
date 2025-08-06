import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Loader = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col min-h-[50vh] w-full justify-center items-center animate-pulse",
        className,
      )}
    >
      {/* <img src={LogoDarkText} className="w-[65%] max-w-[250px]" alt="" /> */}
    </div>
  );
};

export default Loader;