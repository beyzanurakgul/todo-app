import Footer from './Footer';
import pic01 from "./img/pic01.jpg";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Arka plan katmanı */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${pic01})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 1.0, // Sadece arka plan için şeffaflık
          zIndex: -1, // Arka planda kalmasını sağlar
        }}
      ></div>

      {/* İçerik katmanı */}

      <div className="flex flex-1 justify-center items-center">
        <main className="p-6 w-full max-w-3xl">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
