interface FormatsProps {
  digitalPrice: number;
  physicalPrice: number;
  classesWrapper?: string;
}

export default function Formats({digitalPrice, physicalPrice, classesWrapper}: FormatsProps) {
  return (
    <div className={classesWrapper}>
      <ul>
        <li className="list-disc flex justify-between">
          <div>
            <p className="uppercase font-semibold text-xl lg:text-2xl">digital</p>
            <span className="text-sm lg:text-lg">WAV 24bit</span>
          </div>
          <span className="font-semibold text-xl  lg:text-2xl">{digitalPrice.toFixed(2)}€</span>
        </li>
        <li className="list-[circle] flex justify-between">
          <div className="flex flex-col gap-0">
            <span className="uppercase font-semibold text-xl lg:text-2xl">vinyl</span>
            <span className="text-sm lg:text-lg">{`12&" 180gr limited edition`}</span>
          </div>
          <span className="font-semibold text-xl lg:text-2xl">{physicalPrice.toFixed(2)}€</span>
        </li>
      </ul>
      
    </div>
  )
}