export interface RoleCardProps {
  role: string;
  credits: string[];
  classesWrapper?: string;
}

export default function RoleCard({role, credits, classesWrapper = ""}: RoleCardProps) {
  return (
    <div className={classesWrapper}>
      <p className="uppercase font-bold text-2xl">{role}</p>
      {credits.map((credit, index) => (
        <p key={index} className="text-2xl">{credit}</p>
      ))}
    </div>
  )
}