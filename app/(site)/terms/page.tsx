import LegalPage from '@/components/LegalPage';
import { metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'Terms of Service', description: 'Terms for using the RivalArcade website, including content, forms, newsletters, creator applications, invite links and the press kit.', path: '/terms', kicker: 'Terms' });

const TOC = [{ id: 'about', label: 'About these terms' }, { id: 'game', label: 'The game' }, { id: 'use', label: 'Using the site' }, { id: 'submissions', label: 'Your submissions' }, { id: 'creators', label: 'Creators & partners' }, { id: 'invites', label: 'Invites & promotions' }, { id: 'ip', label: 'Intellectual property' }, { id: 'links', label: 'Third-party links' }, { id: 'disclaimers', label: 'Disclaimers' }, { id: 'liability', label: 'Liability' }, { id: 'changes', label: 'Changes' }];

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" path="/terms" updated="November 10, 2026" toc={TOC}>
      <h2 id="about">About these terms</h2>
      <p>These terms apply to your use of this RivalArcade marketing website. By using the site you agree to them. If you don’t agree, please don’t use the site.</p>
      <h2 id="game">The game</h2>
      <p>The RivalArcade game is a separate service at rivalarcade.vercel.app with its own Terms of Service, Official Contest Rules and Fair Play Policy. Anything about accounts, matches, Rival Coins, cosmetics, cups and rewards is governed by those documents. Information on this site describes the game in good faith but the game’s own rules take priority if they differ.</p>
      <h2 id="use">Using the site</h2>
      <p>Don’t misuse the site: no attempts to break or overload it, bypass security or rate limits, scrape it at a harmful rate, submit spam or malicious content, or impersonate anyone.</p>
      <h2 id="submissions">Your submissions</h2>
      <p>When you send a message, subscribe or apply, you confirm the information is accurate and yours to share. We handle it as described in the <a href="/privacy">Privacy Policy</a>. Please don’t send confidential information you don’t want us to see; submitting an idea doesn’t create any obligation for us to use it or pay for it.</p>
      <h2 id="creators">Creators &amp; partners</h2>
      <p>Submitting a creator application or business inquiry doesn’t create a partnership. Any partnership, sponsorship or paid campaign is governed by a separate written agreement. Creators must clearly disclose sponsored or paid content as required by their platform and the law (for example the FTC’s endorsement guides in the US).</p>
      <h2 id="invites">Invites &amp; promotions</h2>
      <p>Invite links and campaign pages on this site point to the game and may carry tracking tags so we can measure our marketing. This website doesn’t hold balances or grant rewards. Any referral reward, promotional code or prize is granted, verified and governed only inside the RivalArcade game, under its rules, and may be changed or withdrawn there. Rival Coins have no cash value.</p>
      <h2 id="ip">Intellectual property</h2>
      <p>The RivalArcade name, crest, Rival Coin design, game art, screenshots and site content belong to RivalArcade. You may use the materials in the press kit for editorial coverage of RivalArcade, without modifying the logo or implying endorsement. Any other use needs our permission.</p>
      <h2 id="links">Third-party links</h2>
      <p>The site links to third-party services such as social networks and video platforms. We’re not responsible for their content or practices.</p>
      <h2 id="disclaimers">Disclaimers</h2>
      <p>The site is provided “as is”. We try to keep it accurate and available, but we don’t guarantee it will be error-free or uninterrupted, and features described may change.</p>
      <h2 id="liability">Liability</h2>
      <p>To the extent the law allows, RivalArcade isn’t liable for indirect or consequential losses arising from use of this website. Nothing in these terms limits liability that can’t be limited by law.</p>
      <h2 id="changes">Changes</h2>
      <p>We may update these terms; the date above shows the latest version. Continued use of the site after a change means you accept the updated terms.</p>
    </LegalPage>
  );
}
