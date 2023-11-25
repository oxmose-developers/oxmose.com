
interface ActionLink {
  href: string;
  title: string;
}

interface ActionPanelProps {
  left: ActionLink;
  right: ActionLink;
  classesWrapper?: string;
}

export default function ActionPanel({left, right, classesWrapper=""}: ActionPanelProps) {
  return (
    <div className={`w-full flex justify-between border-slate-400 px-7 py-1 uppercase text-xl font-semibold ${classesWrapper}`}>
      <a href={left.href} className="block">{left.title}</a>
      <a href={right.href} className="block">{right.title}</a>
    </div>
  )
}