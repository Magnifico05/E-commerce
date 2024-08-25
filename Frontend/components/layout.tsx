import { ReactNode } from 'react';
import type { NextPage } from "next";
import Header from './header'; // Adjust the import path as needed
import styles from './layout.module.css'; // Optional: create a CSS module for layout styling

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
    //     <header className={styles.frameParent}>
    //     <div className={styles.headerWrapper}>
    //       <Header />
    //     </div>
    //     <img
    //       className={styles.frameChild}
    //       loading="lazy"
    //       alt=""
    //       src="/line-3.svg"
    //     />
    //   </header>
        // <div className={styles.frameParent}>
        //     <div className={styles.headerWrapper}>
        //         <Header />
        //     </div>
        //     <main className={styles.mainContent}>
        //         {children}
        //     </main>
        // </div>
        <div className={styles.layout}>
            <Header />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
