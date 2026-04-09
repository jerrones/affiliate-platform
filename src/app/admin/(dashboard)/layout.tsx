import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LogOut, Plus, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import styles from "./admin.module.scss";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Painel</h2>
          <p>{user.email}</p>
        </div>
        
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={20} />
            Produtos
          </Link>
          <Link href="/admin/new" className={styles.navLink}>
            <Plus size={20} />
            Adicionar Produto
          </Link>
        </nav>

        <form action={async () => {
          'use server'
          const auth = await createClient();
          await auth.auth.signOut();
          redirect("/admin/login");
        }} className={styles.logoutWrapper}>
          <button className={styles.logoutBtn}>
            <LogOut size={20} />
            Sair
          </button>
        </form>
      </aside>

      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
