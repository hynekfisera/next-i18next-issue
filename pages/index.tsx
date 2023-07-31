import { Inter } from "next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
      projects: ["test", "test2"],
    },
  };
}

export default function Home({ projects }: { projects: string[] }) {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  return (
    <main className="h-screen bg-white text-black">
      <h1>{t("hello_world")}</h1>
      <Link href={router.pathname} locale={router.locale === "en" ? "cs" : "en"}>
        EN | CS
      </Link>
      {projects.map((project, i) => (
        <div key={i}>{project}</div>
      ))}
    </main>
  );
}
