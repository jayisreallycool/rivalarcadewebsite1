import { requireAdmin } from '@/lib/server/auth';
import { sql } from '@/lib/server/db';
import { addUser, changePassword, setUserActive } from '@/lib/server/admin-actions';
import AdminForm from '../../AdminForm';

export default async function Users() {
  const me = await requireAdmin();
  const rows = me.role === 'owner' ? await sql()`select id, email, name, role, active, last_login_at from admin_users order by id` : [];
  return (
    <>
      <h1>Users</h1>
      <div className="adm-card"><h2>Change my password</h2><AdminForm action={changePassword} submit="Change password"><label>New password (12+ characters)</label><input type="password" name="password" minLength={12} autoComplete="new-password" required /></AdminForm></div>
      {me.role === 'owner' && (
        <>
          <div className="adm-card"><h2>Add a user</h2><AdminForm action={addUser} submit="Add user">
            <div className="row"><div><label>Email</label><input name="email" type="email" required /></div><div><label>Name</label><input name="name" /></div>
              <div><label>Role</label><select name="role"><option value="editor">Editor (content, inbox)</option><option value="owner">Owner (also sends newsletters, manages users)</option></select></div>
              <div><label>Temporary password (12+)</label><input name="password" type="password" minLength={12} autoComplete="new-password" required /></div></div>
          </AdminForm></div>
          <table><thead><tr><th>Email</th><th>Role</th><th>Last login</th><th></th></tr></thead><tbody>
            {rows.map((u) => <tr key={u.id}><td>{u.email}</td><td>{u.role}</td><td className="muted">{u.last_login_at?.toISOString().slice(0, 16) ?? 'never'}</td>
              <td>{u.id !== me.id && <form action={setUserActive}><input type="hidden" name="id" value={u.id} /><button className="ghost">{u.active ? 'Disable' : 'Enable'}</button></form>}</td></tr>)}
          </tbody></table>
        </>
      )}
    </>
  );
}
