import { ThemeProvider } from "../components/providers/theme-provider";
import type { Metadata } from "next";
import Layout from "../components/layout";
import Showcase from "../components/showcase";
import Latest from "../components/latest";

export const metadata: Metadata = {
  title: {
    template: "bastow.de - %s",
    default: "bastow.de",
  },
  description: "a personal website",
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <Showcase />
      <Latest />
    </Layout>
  );
}
