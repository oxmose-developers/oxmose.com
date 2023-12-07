export interface RoleCardProps {
  role: string;
  members: string;
  classesWrapper?: string;
}

export default function RoleCard({role, members, classesWrapper = ""}: RoleCardProps) {
  return (
    <div className={classesWrapper}>
      <p className="uppercase font-bold text-xl md:text-2xl">{role}</p>
      <p className="text-xl md:text-2xl">{members}</p>
    </div>
  )
}