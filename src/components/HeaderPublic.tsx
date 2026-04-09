'use client'

import { useTheme } from "next-themes"
import { Moon, Sun, MessageCircle } from "lucide-react"
import styles from "./components.module.scss"
import Image from "next/image"

export default function HeaderPublic() {
  const { theme, setTheme } = useTheme()

  return (
    <header className={styles.publicHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.logoArea}>
          <Image src="/logo.png" alt="Quero Notebook" width={48} height={48} className={styles.logoImage} />
          <h1 className={styles.logoText}>QUERO NOTEBOOK</h1>
        </div>
        
        <div className={styles.headerActions}>
          <a
            href="https://chat.whatsapp.com/FUdkVjkuEce8dhoR7I7DAk"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            <MessageCircle size={18} />
            <span className={styles.wppText}>Entre no nosso grupo</span>
          </a>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={styles.themeToggle}
            aria-label="Alternar tema"
          >
            <Sun className={styles.sunIcon} size={20} />
            <Moon className={styles.moonIcon} size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
