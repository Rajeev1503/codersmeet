import "./globals.css";

export const metadata = {
  title: "CodersArena",
  description: "Video collaboration for CSE grads",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
