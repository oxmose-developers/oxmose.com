import Prose from "../../../components/Prose";

export default function Page() {
  return (
    <div className="grid grid-cols-2 divide-x divide-black">
      <section lang="en" className="p-10">
        <div className="mb-28 flex gap-8">
          <h2 className="flex-1 text-oxe-xxl leading-none">Privacy policy</h2>

          <p className="shrink-0 text-oxe-xxl leading-none">En</p>
        </div>

        <Prose>
          <h1></h1>
        </Prose>
      </section>

      <section lang="fr" className="p-10">
        <div className="mb-28 flex gap-8">
          <h2 className="flex-1 text-oxe-xxl leading-none">
            Politique de confidentialité
          </h2>

          <p className="shrink-0 text-oxe-xxl leading-none">Fr</p>
        </div>

        <Prose>
          <h1></h1>
        </Prose>
      </section>
    </div>
  );
}
