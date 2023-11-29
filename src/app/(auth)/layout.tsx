const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container flex h-screen max-w-xl items-center">
      <div className="flex-1">{children}</div>
    </main>
  );
};

export default AuthLayout;
