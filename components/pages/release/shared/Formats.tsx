interface FormatsProps {
  digitalPrice: number;
  physicalPrice: number;
}

export default function Formats({digitalPrice, physicalPrice}: FormatsProps) {
  return (
    <div className="px-7 py-5">
      <ul>
        <li className="list-disc flex justify-between">
          <div>
            <p className="uppercase font-semibold text-xl">digital</p>
            <span className="text-sm">WAV 24bit</span>
          </div>
          <span className="font-semibold text-xl">{digitalPrice.toFixed(2)}€</span>
        </li>
        <li className="list-[circle] flex justify-between">
          <div className="flex flex-col gap-0">
            <span className="uppercase font-semibold text-xl">vinyl</span>
            <span className="text-sm">{`12&" 180gr limited edition`}</span>
          </div>
          <span className="font-semibold text-xl">{physicalPrice.toFixed(2)}€</span>
        </li>
      </ul>
      
    </div>
  )
}