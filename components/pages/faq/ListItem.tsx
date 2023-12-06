export default function ListItem ({ content, handleClick }: { content: string, handleClick: () => void }) {
  return (
    <div className="border-b border-slate-400 px-5 py-3" onClick={handleClick}>
      <h2 
        className="block text-5xl font-medium tracking-tight"
      >
        {content}
      </h2>
    </div>
  )
}