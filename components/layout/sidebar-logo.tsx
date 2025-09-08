import Image from "next/image"

export default function SidebarLogo() {
  return (
    <div className="flex items-center gap-2 px-2 py-2 group-data-[state=collapsed]:hidden">
      <div className="rounded-lg">
        <Image
          src="/icon-btp-cfa.png"
          alt="BTP CFA IDF"
          width={32}
          height={32}
          className="h-18 w-18 object-contain"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold text-sm">BTP CFA IDF</h2>
        <p className="text-xs text-muted-foreground">Suivi Educatif et Socio-Pro</p>
      </div>
    </div>
  );
}
