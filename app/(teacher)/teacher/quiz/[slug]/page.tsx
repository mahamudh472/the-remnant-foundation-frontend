import ClientPage from "./page-client"

export async function generateStaticParams() {
  return [{ "slug": "1" }]
}

export default function Page() {
  return <ClientPage />
}
