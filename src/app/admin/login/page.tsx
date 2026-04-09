import { login } from './actions'
import styles from './login.module.scss'

export default async function LoginPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const hasError = searchParams.error === 'true'

  return (
    <div className={styles.container}>
      <form className={styles.form} action={login}>
        <div className={styles.header}>
          <h1>Acesso Restrito</h1>
          <p>Faça login para gerenciar os produtos.</p>
        </div>

        {hasError && <div className={styles.error}>E-mail ou senha incorretos.</div>}

        <div className={styles.fieldset}>
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required placeholder="admin@exemplo.com" />
        </div>
        
        <div className={styles.fieldset}>
          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" required placeholder="••••••••" />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Entrar no Painel
        </button>
      </form>
    </div>
  )
}
