export type RouteLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>;
