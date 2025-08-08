import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { CookieConsent } from "@/components/ui/cookie-consent";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full flex justify-center">
        <Header />
      </div>
      {children}
      <Footer />
      <CookieConsent />
    </>
  );
}
