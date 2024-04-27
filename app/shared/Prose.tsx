export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose max-w-[unset] text-black prose-headings:text-oxe-xs/5 prose-p:text-oxe-xs/5 prose-a:underline prose-strong:font-medium prose-ol:text-oxe-xs/5 prose-ul:text-oxe-xs/5 lg:prose-headings:text-oxe-sm lg:prose-p:text-oxe-sm lg:prose-ol:text-oxe-sm lg:prose-ul:text-oxe-sm">
      {children}
    </div>
  );
}
