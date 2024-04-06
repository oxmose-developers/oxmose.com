"use client";

import { showSaveFilePicker } from "native-file-system-adapter";

export default function DownloadLink({
  href,
  fileName,
  children,
}: {
  href: string;
  fileName?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={async () => {
        try {
          const blob = await fetch(href).then((r) => r.blob());

          const fileHandle = await showSaveFilePicker({
            _preferPolyfill: false,
            suggestedName: fileName,
          });

          const writer = await fileHandle.createWritable();

          await writer.write(blob);

          await writer.close();
        } catch (err) {
          console.error(err);

          window.open(href);
        }
      }}
    >
      {children}
    </button>
  );
}
