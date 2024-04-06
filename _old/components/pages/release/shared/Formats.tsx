interface FormatsProps {
  digitalPrice: number;
  physicalPrice: number;
  classesWrapper?: string;
}

export default function Formats({
  digitalPrice,
  physicalPrice,
  classesWrapper,
}: FormatsProps) {
  return (
    <div className={classesWrapper}>
      <div className="flex justify-between">
        <div className="flex gap-2 before:mt-2 before:block before:h-4 before:w-4 before:rounded-full before:bg-black before:content-['']">
          <div>
            <p className="text-xl font-semibold uppercase lg:text-2xl">
              digital
            </p>
            <span className="text-sm lg:text-lg">WAV 24bit</span>
          </div>
        </div>
        <span className="text-xl font-semibold  lg:text-2xl">
          {digitalPrice.toFixed(2)}€
        </span>
      </div>

      <div className="mt-4 flex justify-between">
        <div className="flex gap-2 before:mt-2 before:block before:h-4 before:w-4 before:rounded-full before:border before:border-black before:content-['']">
          <div>
            <p className="text-xl font-semibold uppercase lg:text-2xl">vinyl</p>
            <span className="text-sm lg:text-lg">{`12&" 180gr divmited edition`}</span>
          </div>
        </div>
        <span className="text-xl font-semibold  lg:text-2xl">
          {physicalPrice.toFixed(2)}€
        </span>
      </div>

      {/* <div className="flex gap-2 before:content-[''] before:block before:h-4 before:w-4 before:rounded-full before:bg-black before:mt-2">
        <div className="flex justify-between">
          <div className="flex flex-col gap-0">
            <p className="uppercase font-semibold text-xl lg:text-2xl">vinyl</p>
            <span className="text-sm lg:text-lg">{`12&" 180gr divmited edition`}</span>
          </div>
          <span className="font-semibold text-xl lg:text-2xl">{physicalPrice.toFixed(2)}€</span>
        </div>
          </div> */}
    </div>
  );
}
