// src/app/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p>&copy; {new Date().getFullYear()} MiTienda. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank">Facebook</a>
          <a href="https://instagram.com" target="_blank">Instagram</a>
          <a href="https://wa.me/54911XXXXXXX" target="_blank">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
