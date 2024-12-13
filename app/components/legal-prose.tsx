export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose max-w-[unset] text-black prose-headings:text-oxe-xs/5 prose-p:text-oxe-xs/5 prose-a:underline prose-strong:font-medium prose-ol:text-oxe-xs/5 prose-ul:text-oxe-xs/5 md:prose-headings:text-oxe-sm md:prose-p:text-oxe-sm md:prose-ol:text-oxe-sm md:prose-ul:text-oxe-sm">
      {children}
    </div>
  );
}
