import {
  HomeAbout,
  HomeApplication,
  HomeFlow,
  HomeHero,
  HomeJournal,
  HomePhilosophy,
  HomeProfile,
  HomeSession,
} from '@/components/home-sections';

export default function Home() {
  return (
    <main id="main-content">
      <HomeHero />
      <HomeAbout />
      <HomePhilosophy />
      <HomeSession />
      <HomeFlow />
      <HomeProfile />
      <HomeJournal />
      <HomeApplication />
    </main>
  );
}
