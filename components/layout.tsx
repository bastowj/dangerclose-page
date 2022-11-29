import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

export default function Layout({
  children,
  title = "Default title",
}: LayoutProps) {
  return (
    <div>
      <Head>
        <title>Danger Close! Painting</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
