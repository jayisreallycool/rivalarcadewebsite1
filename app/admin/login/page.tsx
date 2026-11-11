import { redirect } from 'next/navigation';
import { currentAdmin } from '@/lib/server/auth';
import { loginAction } from '@/lib/server/admin-actions';
import AdminForm from '../AdminForm';

export default async function LoginPage() {
  if (await currentAdmin()) redirect('/admin');
  return (
    <main style={{ maxWidth: 380, margin: '12vh auto', padding: '0 1rem' }}>
      <h1>RivalArcade admin</h1>
      <div className="adm-card">
        <AdminForm action={loginAction} submit="Sign in">
          <label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="username" required />
          <label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required />
        </AdminForm>
      </div>
    </main>
  );
}
