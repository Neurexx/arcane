import React from 'react';

// If you're using React functional components:
const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <header>
        {/* Header content */}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
