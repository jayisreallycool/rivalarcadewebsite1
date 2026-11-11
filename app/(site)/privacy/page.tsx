import LegalPage from '@/components/LegalPage';
import { metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'Privacy Policy', description: 'How the RivalArcade website handles your data: newsletter, contact and creator forms, cookieless first-party analytics, optional Google Analytics, and your rights.', path: '/privacy', kicker: 'Privacy' });

const TOC = [
  { id: 'scope', label: 'Scope' }, { id: 'collect', label: 'What we collect' }, { id: 'newsletter', label: 'Newsletter' }, { id: 'analytics', label: 'Analytics & cookies' },
  { id: 'use', label: 'How we use data' }, { id: 'share', label: 'Service providers' }, { id: 'retention', label: 'Retention' }, { id: 'rights', label: 'Your rights' }, { id: 'security', label: 'Security' }, { id: 'children', label: 'Children' }, { id: 'changes', label: 'Changes' },
];

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="November 10, 2026" toc={TOC}>
      <h2 id="scope">Scope</h2>
      <p>This policy explains how RivalArcade (“we”, “us”) handles personal information collected through this marketing website. The RivalArcade game at rivalarcade.vercel.app is covered by the privacy policy published inside the game.</p>
      <h2 id="collect">What we collect</h2>
      <ul>
        <li><strong>Newsletter sign-ups:</strong> your email address, the date and time you subscribed and confirmed, the page you signed up from, any campaign (UTM) tags in that page’s address, the consent wording you agreed to and your IP address at the time (as a record of consent).</li>
        <li><strong>Contact, advertising, sponsorship, partnership and media forms:</strong> your name, email, company (optional), subject, message and any optional details you add, plus your IP address for spam and abuse prevention.</li>
        <li><strong>Creator applications:</strong> your name, email, creator handle, channel link, platforms, audience range, content focus and pitch, plus your IP address for abuse prevention.</li>
        <li><strong>Usage data:</strong> see <a href="#analytics">Analytics &amp; cookies</a>.</li>
      </ul>
      <p>We don’t ask for, and you shouldn’t send, payment details or sensitive personal information through these forms.</p>
      <h2 id="newsletter">Newsletter</h2>
      <p>We use double opt-in: after you subscribe we send a confirmation email, and you only receive newsletters once you confirm. Every newsletter contains a one-click unsubscribe link, and we honour unsubscribes immediately. Emails are sent through our email provider (Resend).</p>
      <h2 id="analytics">Analytics &amp; cookies</h2>
      <p><strong>First-party, cookieless measurement.</strong> To understand which pages and marketing channels bring visitors to RivalArcade, the site records page views and clicks (for example on “Play” buttons) with the page path, the referring website’s domain, campaign (UTM) tags, and your device type (mobile, tablet or desktop). Unique visitors are counted with a one-way hash of a daily-rotating secret, your IP address and your browser’s user-agent. The hash changes every day and can’t be turned back into your IP address. No cookies are set for this.</p>
      <p><strong>Google Analytics 4 (optional).</strong> If you click “Accept analytics” in the cookie banner, we load Google Analytics, which sets cookies to measure visits and traffic sources. IP anonymisation is on and advertising features are off. If you decline, Google Analytics isn’t loaded. You can change your choice any time with “Cookie settings” in the footer.</p>
      <p><strong>Session storage.</strong> The site keeps any campaign tags from the link you arrived on in your browser’s session storage, so that links to the game can credit the right campaign. It’s cleared when you close the tab.</p>
      <p><strong>Spam protection.</strong> Forms may use Cloudflare Turnstile to check that a human is submitting; Cloudflare processes technical data to do this under its own privacy policy.</p>
      <p><strong>Admin cookies.</strong> Staff who sign in to the site’s admin area receive a strictly necessary session cookie.</p>
      <h2 id="use">How we use data</h2>
      <ul>
        <li>To send the newsletter you asked for and keep a record of your consent.</li>
        <li>To reply to messages and review creator applications.</li>
        <li>To measure and improve the site and our marketing.</li>
        <li>To prevent spam, abuse and fraud (for example, rate limiting by IP address).</li>
      </ul>
      <p>We don’t sell personal information and we don’t use it for targeted advertising.</p>
      <h2 id="share">Service providers</h2>
      <p>We use providers that process data on our behalf: website hosting (Vercel), a managed PostgreSQL database, email delivery (Resend), Google Analytics (only if you consent) and Cloudflare Turnstile (if enabled). They may process data outside your country, under appropriate safeguards.</p>
      <h2 id="retention">Retention</h2>
      <ul>
        <li>Newsletter records: while you’re subscribed; after you unsubscribe we keep your email and the unsubscribe date so we don’t email you again. Unconfirmed sign-ups are removed periodically.</li>
        <li>Messages and applications: up to 24 months after the conversation ends, unless we need them longer for an active partnership.</li>
        <li>First-party analytics events: kept for up to 25 months, then deleted.</li>
      </ul>
      <h2 id="rights">Your rights</h2>
      <p>Depending on where you live (for example under the GDPR, UK GDPR or California law), you may have the right to access, correct, delete or export your personal information, to object to or restrict certain processing, and to withdraw consent at any time. To make a request, use the contact page. You also have the right to complain to your local data protection authority.</p>
      <h2 id="security">Security</h2>
      <p>The site is served over HTTPS, form input is validated and rate-limited, database access happens only on the server, and admin passwords are stored as salted scrypt hashes. No system is perfectly secure, but we work to protect your data.</p>
      <h2 id="children">Children</h2>
      <p>This website isn’t directed at children under 13, and we don’t knowingly collect their personal information. If you believe a child has sent us information, contact us and we’ll delete it.</p>
      <h2 id="changes">Changes</h2>
      <p>We’ll update this page when our practices change and revise the date above.</p>
    </LegalPage>
  );
}
