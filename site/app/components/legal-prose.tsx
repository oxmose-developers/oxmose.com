export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose-headings:text-oxe-xxs/5 prose-p:text-oxe-xxs/5 prose-ol:text-oxe-xxs/5 prose-ul:text-oxe-xxs/5 prose max-w-[unset] text-black prose-a:underline prose-strong:font-medium md:prose-headings:text-oxe-sm md:prose-p:text-oxe-sm md:prose-ol:text-oxe-sm md:prose-ul:text-oxe-sm">
      {children}
    </div>
  );
}
