export default function WorksTable() {
  return (
    <table className="w-full text-left text-oxe-xs font-medium lg:text-oxe-sm/[32px]">
      <thead>
        <tr>
          <td className="bg-white py-2 uppercase text-black">&nbsp;</td>
          <td className="bg-white py-2 uppercase text-black">Title</td>
          <td className="bg-white py-2 uppercase text-black">Artist</td>
          <td className="bg-white py-2 uppercase text-black">Time</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10">{`01`}</td>
          <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10">
            Genzitsu Touhi 現実逃避
          </td>
          <td className="px-0 py-0.5 pr-5 uppercase first:pl-10 last:pr-10">
            Takahiro Kinnoshita
          </td>
          <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10">03:24</td>
        </tr>
        <tr>
          <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10">02</td>
          <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10">
            Nakimushi Na Tori 泣き虫な鳥
          </td>
          <td className="px-0 py-0.5 pr-5 uppercase first:pl-10 last:pr-10">
            Takahiro Kinnoshita
          </td>
          <td className="px-0 py-0.5 pr-5 first:pl-10 last:pr-10">03:24</td>
        </tr>
      </tbody>
    </table>
  );
}
